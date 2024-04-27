import { createSlice } from '@reduxjs/toolkit'
import { login, refreshUser, register } from './operations'

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

      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSignedIn = true
        state.userData = action.payload
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const authSliceReducer = authSlice.reducer
