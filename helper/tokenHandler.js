require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = (data) => {
    return jwt.sign(data, process.env.KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.KEY, function(err,decoded) {
        if(err) return null
        return decoded
    })
}

module.exports = {
    generateToken,
    verifyToken
}
