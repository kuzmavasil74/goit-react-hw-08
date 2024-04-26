import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const INITIAL_STATE = {
  isSignedIn: false,
  userData: null,
  token: null,
  isLoading: false,
  isError: false,
}

const authSlice = createSlice({
  // Ініціалізація стану
  // Ім'я слайсу
  name: 'auth',

  //Початкове значення стану
  initialState: INITIAL_STATE,
  // Ініціалізація редюсера
})

export const authSliceReducer = authSlice.reducer
