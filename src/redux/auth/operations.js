import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com', //адреса бекенда за замовчуванням
})

export const setToken = (token) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}` //записуємо токен в хедер запитів
  } else {
    delete instance.defaults.headers.common.Authorization //видаляємо токен з хедера запитів
  }
}
export const clearToken = () => {
  instance.defaults.headers.common.Authorization = ''
}

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/signup', formData) //виконуємо запит на реєстрацію
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
      const { data } = await instance.post('/users/login', formData) //виконуємо запит на вхід
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
      const { data } = await instance.get('/users/current') //виконуємо запит на отримання поточного користувача
      // console.log('refresh', data)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/users/logout') //виконуємо запит на видалення токена
    // console.log('logout', data)
    clearToken()
    return
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})
