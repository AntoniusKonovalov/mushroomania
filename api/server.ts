import express from "express"
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
const app = express()

app.use(cookieParser())
app.use(express.static("client/build"))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

const dotenv = require('dotenv').config()

import mushroomsRouter from './routes/mushrooms/mushroomsRouter'
app.use('/api/mushrooms', mushroomsRouter)

import authRouter from './routes/auth/authRouter'
app.use('/api/users', authRouter)
import mushroomRouter from './routes/mushrooms/mushroomsRouter'
app.use('/api/mushrooms', mushroomRouter)
import ordersRouter from './routes/orders/ordersRouter'
app.use('/api/orders', ordersRouter)

app.listen(8800, () => {
  console.log("Connected")
})