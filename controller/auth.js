const { user, biodata, sequelize } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helper/tokenHandler')
const errorHandler = require('../helper/errorHandler')

class authController {
    static async register(req,res) {
        try {
            const {email,password} = req.body
            const t = await sequelize.transaction()
            const userCreated = await user.create({
                    email: email,
                    password: password
                }, {transaction: t})
            const biodataCreated = await biodata.create({
                    user_id: userCreated.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    gender: req.body.gender,
                    address: req.body.address,
                    dob: req.body.dob
                }, {transaction: t})
            !biodataCreated && !userCreated ? await t.rollback() : await t.commit()
            return res.status(201).json({message: "successfully created user"})
        } catch (error) {
            const er = errorHandler(error)
            er ? res.status(400).json({message: er}) : res.status(500).json({message: 'Network error'})
        }
    }
    static async login(req,res) {
        try {
            const findEmail = await user.findOne({where: {email: req.body.email}})
            if(!findEmail) return res.status(400).json({message: "wrong email"})
            const {password, ...payload} = findEmail.dataValues
            const verifiedPassword = await bcrypt.compare(req.body.password, password)
            if(!verifiedPassword) return res.status(400).json({message: "wrong password"})
            const token = generateToken(payload)
            res.cookie('token', token, {
                maxAge: 86400 * 1000,
                httpOnly: true
            })
            return res.status(200).json({message: "login success"})              
        } catch (error) {
            res.status(500).json({message: "Network error"})
        }
    }
    static async updateBio(req,res){
        try {
            const { id } = req.data
            const payload = {
                user_id: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                address: req.body.address,
                dob: req.body.dob
            }
            await biodata.update(payload, {
                where: {user_id: id}
            })
            res.status(200).json({message: "update success"})
        } catch (error) {
            const er = errorHandler(error)
            er ? res.status(400).json({message: er}) : res.status(500).json({message: 'Network error'})
        }
    }
}

module.exports = authController