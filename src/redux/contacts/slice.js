import { createSelector, createSlice } from '@reduxjs/toolkit'
import { fetchContacts, addContact, deleteContact } from './operations'
import { selectFilter } from '../filters/selectors'
import { selectContact } from './selectors'

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: {
      items: [],
      loading: false,
      error: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.loading = true
        state.contacts.error = null
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload
        state.contacts.loading = false
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.contacts.loading = false
        state.contacts.error = 'Something went wrong'
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.loading = true
        state.contacts.error = false
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload)
        state.contacts.loading = false
      })
      .addCase(addContact.rejected, (state) => {
        state.contacts.loading = false
        state.contacts.error = 'Something went wrong'
      })
      .addCase(deleteContact.pending, (state) => {
        state.contacts.loading = true
        state.contacts.error = null
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload.id
        )
        state.contacts.loading = false
      })
      .addCase(deleteContact.rejected, (state) => {
        state.contacts.loading = false
        state.contacts.error = 'Something went wrong'
      })
  },
})

export const contactSliceReducer = contactSlice.reducer

export const {
  addContact: addContactAction,
  deleteContact: deleteContactAction,
} = contactSlice.actions

export const selectFilteredContacts = createSelector(
  [selectContact, selectFilter],
  (contacts, filters) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filters.toLowerCase())
    )
  }
)
