const { user, order, item, sequelize, confirmOrder, orderHistory } = require('../models')
const errorHandler = require('../helper/errorHandler')



class orderController {
    static async addToCart(req,res){
        try {
            const { id } = req.data
            const payload = {
                user_id: id,
                item_id: req.body.item_id,
                amount: req.body.amount
            }
            const t = await sequelize.transaction()
            const findCart = await order.findOne({where: {
                user_id: id,
                item_id: req.body.item_id,
            }}, { transaction: t })
            if(findCart) {
                await t.rollback()
                return res.status(400).json({message: "item already in cart"})
            }
            const checkItem = await item.findOne({where: {id: req.body.item_id}}, { transaction: t })
            if(!checkItem){
                await t.rollback()
                return res.status(400).json({message: "item does not exist"})
            }
            if(parseInt(req.body.amount) > parseInt(checkItem.stocks)){
                await t.rollback()
                return res.status(400).json({message: "stock item tidak memenuhi"})
            }
            await order.create(payload, { transaction: t })
            await t.commit()
            return res.status(200).json({message: "item added to cart"})
        } catch (error) {
            const er = errorHandler(error)
            er ? res.status(400).json({message: er}) : res.status(500).json({message: 'network error'})
        }
    }
    static async updateCart(req,res){
        try {
            const { id } = req.data
            const { amount, item_id } = req.body
            const t = await sequelize.transaction()
            const checkOrder = await order.findOne({where: {user_id: id, item_id: item_id}}, { transaction: t })
            if(!checkOrder){
                await t.rollback()
                return res.status(400).json({message: "item not found in cart"})
            }
            const checkItem = await item.findOne({where:{id:item_id}}, { transaction: t })
            if(parseInt(req.body.amount) > parseInt(checkItem.stocks)){
                await t.rollback()
                return res.status(400).json({message: "stock item tidak memenuhi"})
            }
            await order.update({amount: amount}, {where: {user_id: id, item_id: item_id}})
            res.status(200).json({message: "cart successfully updated"})
        } catch (error) {
            const er = errorHandler(error)
            er ? res.status(400).json({message: er}) : res.status(500).json({message: 'network error'})
        }
    }
    static async viewCart(req,res){
        try {
            const { id } = req.data
            const cart = await user.findAll({
                where: {id:id},
                include: 'item_user'
            })
            const item = cart[0].item_user.map(e => {
                return {
                    name: e.name,
                    category: e.category,
                    price: e.price,
                    amount: e.order.amount
                }
            })
            res.status(200).json({data: cart})
        } catch (error) {
            res.status(500).json({message: "bad network"})
        }
    }
    static async deleteCart(req,res){
        try {
            const { id } = req.data
            const { item_id } = req.body
            const checkOrder = await order.findOne({where: {user_id: id, item_id: item_id}})
            if(!checkOrder) return res.status(400).json({message: "item not found in cart"})
            await order.destroy({where:{user_id: id,item_id: item_id}})
            res.status(200).json({message: "delete success"})
        } catch (error) {
            res.status(500).json({message: "bad network"})
        }
    }
    static async checkOutCart(req,res){
        try {
            const { id } = req.data
            const userCart = await user.findAll({where:{id:id},include:'item_user'})
            const cart  = userCart[0].item_user
            let totalPrice = 0
            for(let i = 0; i < cart.length; i++){
                if(cart[i].stocks < cart[i].order.amount){
                    return res.status(400).json({message: `Stok ${cart[i].name} tidak memenuhi`})
                }
                totalPrice += cart[i].price * cart[i].order.amount
                await item.update({
                    stocks: cart[i].stocks - cart[i].order.amount
                },{
                    where: {
                        id: cart[i].id
                    }
                })
            }
            const confirm = await confirmOrder.create({
                user_id: id,
                totalPrice
            })
            for(let j = 0; j < cart.length; j++){
                await orderHistory.create({
                    order_id: confirm.id,
                    user_id: id,
                    item_id: cart[j].id,
                    amount: cart[j].order.amount,
                })
            }
            await order.destroy({where:{user_id:id}})
            res.status(200).json({message: `Pembelian sukses, total pembelian anda adalah sebesar: ${confirm.totalPrice} dan orderId: ${confirm.id}`})
        } catch (error) {
            res.status(500).json({message: "bad network"})
        }
    }
}

module.exports = orderController