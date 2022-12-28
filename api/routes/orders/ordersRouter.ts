import express from 'express'
import { addOrders, addProduct, getPaidOrders } from './ordersCont'

const router = express.Router()

router
  .get("/get-paid-orders", getPaidOrders)
  .post("/add-product", addProduct)
  .post("/add-cart-orders", addOrders)

export default router