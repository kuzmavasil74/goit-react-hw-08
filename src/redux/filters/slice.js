import { createSelector, createSlice } from '@reduxjs/toolkit'
import { selectPhonebookContacts } from '../contacts/selectors'

const initialState = {
  filters: {
    name: '',
    number: '',
  },
}
export const selectFilter = (state) => state.filter
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filters = action.payload
    },
  },
})

export const { changeFilter } = filterSlice.actions

export const filterSliceReducer = filterSlice.reducer

export const selectFilteredContacts = createSelector(
  [selectPhonebookContacts, selectFilter],
  (contacts, filter) => {
    const filterName = filter.filters.name.toLowerCase()
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterName)
    )
  }
)
