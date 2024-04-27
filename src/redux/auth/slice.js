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
      console.log('refresh', data)
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
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSignedIn = true
        state.userData = action.payload.user
        state.token = action.payload.token
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSignedIn = true
        state.userData = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const authSliceReducer = authSlice.reducer
