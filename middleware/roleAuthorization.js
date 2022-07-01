module.exports = (...option) => {
    return (req,res,next) => {
        const { role } = req.data
        const roleChecked = option.includes(role)
        if(!roleChecked) return res.status(400).json({message: 'unauthorized'})
        next()
    }
}