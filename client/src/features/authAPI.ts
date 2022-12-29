import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FormDataProps } from "../pages/SignIn";


export const signUp = createAsyncThunk(
  "api/user/signUp-user",
  async(inputs:FormDataProps, thunkApi) => {
    try {
      const { data } = await axios.post('/api/users/add-user', inputs)
   
      if(data) {
        return data
      } else {
        throw new Error('No data recieved from API')
      }
      
    } catch (error:any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
) 

export const login = createAsyncThunk(
  "api/user/login-user",
  async(inputs:FormDataProps, thunkApi) => {
    try {
      const { data } = await axios.post('/api/users/login-user', inputs)
   
      if(data) {
        return data
      } else {
        throw new Error('No data recieved from API')
      }
      
    } catch (error:any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
) 


export const updateUser = createAsyncThunk(
  "api/user/update-user",
  async(inputs:FormDataProps, thunkApi) => {
    try {
      const { data } = await axios.put('/api/users/update-user', inputs)    
      if(data) {
        return data
      } else {
        throw new Error('No data recieved from API')
      }
      
    } catch (error:any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
) 

export const logoutUser = createAsyncThunk(
  "api/user/logout-user",
  async(userId:any, thunkApi) => {
    try {
      const { data } = await axios.post('/api/users/logout-user', userId)    
      if(data) {
        return null
      } else {
        throw new Error('No data recieved from API')
      }
      
    } catch (error:any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
)
