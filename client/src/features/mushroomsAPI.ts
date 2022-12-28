import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "./mushroomsSlice";


export const getMushrooms = createAsyncThunk(
  "api/mushroom/get-mushroom",
  async (cat: string, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/mushrooms/get-mushrooms${cat}`)
      if (data) {
        return data
      } else {
        throw new Error('No data recieved from API')
      }
    } catch (error: any) {
      console.error(error)
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
)
  
  export const addMushroom = createAsyncThunk(
    "api/mushroom/add-mushroom",
    async(inputs:any, thunkApi) => {
      try {
        const { data } = await axios.post('/api/mushrooms/add-mushroom', inputs, {
          maxContentLength: Infinity,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return data
      } catch (error) {
        console.error(error)
        return {
          cat: Category.FUNGI,
          image: '',
          name: '',
          price: '',
          description: ''
        }
      }
    }
  )
  export const updateMushroom = createAsyncThunk(
    "api/mushroom/update-mushroom",
    async({mushroomId, inputs}:any, thunkApi) => {
      try {
        const { data } = await axios.patch(`api/mushrooms/update-mushroom/${mushroomId}`, inputs)
        return data
      } catch (error) {
        console.error(error)
      }
    }
  )

  export const removeMushroom =  createAsyncThunk(
  "api/mushroom/delete-mushroom",
  async(mushroomId:number) => {
    try {
      const { data } = await axios.delete(`api/mushrooms/delete-mushroom/${mushroomId}`)
      console.log(data)
      return data
    } catch (error) {
      console.error(error)
    }
  }
  )


