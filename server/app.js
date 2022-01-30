const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

dotenv.config()

const app = express()

//API Secuirity
app.use(helmet())

//handle cors
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))

//logger
app.use(morgan("tiny"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`app listening on Port: ${PORT}`) })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/v1/user', require('./src/routers/user'))
app.use('/v1/ticket', require('./src/routers/ticket'))

const handleError = require('./src/utils/errorHandler')

app.use((req, res, next) => {
    const error = new Error("resource not found");
    error.status = 404;
    console.log("hi");
    next(error)
})

app.use((error, req, res, next) => {
    console.log("hi")
    handleError(error, res)
})

try {
    mongoose.connect(process.env.mongo_url, () => {
        console.log("connected to mongodb")
    })
} catch (err) {
    console.error(err)
}




