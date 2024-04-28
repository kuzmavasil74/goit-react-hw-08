import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { login, logout, refreshUser, register } from './operations'

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

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSignedIn = true
        state.userData = action.payload.user
        state.token = action.payload.token
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSignedIn = true
        state.userData = action.payload.user
        state.token = action.payload.token
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSignedIn = true
        state.userData = action.payload
      })

      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE
      })

      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          refreshUser.pending,
          logout.pending
        ),
        (state) => {
          state.isLoading = true
          state.isLoading = false
        }
      )

      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          refreshUser.rejected,
          logout.rejected
        ),
        (state) => {
          state.isLoading = false
          state.isError = true
        }
      )
  },
})

export const authSliceReducer = authSlice.reducer
