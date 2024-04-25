import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    name: '',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filters.name = action.payload
    },
  },
})

export const { changeFilter } = filterSlice.actions

export const filterSliceReducer = filterSlice.reducer
