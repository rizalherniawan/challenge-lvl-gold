const express = require('express')
const cookieParser = require('cookie-parser')
const PORT = 4000
const app = express()
const api = require('./routes/index')


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(api)

app.listen(PORT, () => {
    console.log(`server is connected to port: ${PORT}`)
})