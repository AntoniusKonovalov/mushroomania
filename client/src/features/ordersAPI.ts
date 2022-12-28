import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { orderClientSideProps } from "./ordersSlice";

// export const handleAddProductCart = createAsyncThunk(
//   "api/orders/add-product",
//   async(inputs: any, thunkApi) => {
//     try {
//       const { data } = await axios.post('/api/orders/add-product', inputs)
//     } catch (error) {
//       console.error(error)
//     }
//   }
// )

export const addCartOrders = createAsyncThunk(
  "api/orders/add-cart-orders",
  async(orders: orderClientSideProps[], thunkApi) => {
    try {
      const { data } = await axios.post('/api/orders/add-cart-orders', orders)
      return data
    } catch (error) {
      console.error(error)
    }
  }
)
export const getPaidOrders = createAsyncThunk(
  "api/orders/get-paid-orders",
  async(_, thunkApi) => {
    try {
      const { data } = await axios.get('/api/orders/get-paid-orders')
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const removeOrders = createAsyncThunk(
  "api/orders/reset-orders-state",
  async() => {
    return null
  }
)

