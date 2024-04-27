import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
})

export const setToken = (token) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete instance.defaults.headers.common.Authorization
  }
}
export const clearToken = () => {
  instance.defaults.headers.common.Authorization = ''
}

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/signup', formData)
      console.log(data)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/login', formData)
      setToken(data.token)
      //   console.log(data)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const token = state.auth.token

      setToken(token)
      const { data } = await instance.get('/users/current')
      // console.log('refresh', data)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
