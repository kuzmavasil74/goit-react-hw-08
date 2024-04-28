import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { apiAddContacts, apiDeleteContacts, apiGetContacts } from './operations'

const INITIAL_STATE = {
  contacts: [],
  isLoading: false,
  isError: false,
}

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  // Об'єкт редюсерів
  extraReducers: (builder) => {
    builder

      //getContacts

      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false
        state.contacts = action.payload
      })

      //  addContacts
      .addCase(apiAddContacts.fulfilled, (state, action) => {
        state.isLoading = false
        state.contacts.push(action.payload)
      })

      //  deleteContacts
      .addCase(apiDeleteContacts.fulfilled, (state, action) => {
        state.isLoading = false
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        )
      })

      .addMatcher(
        isAnyOf(
          apiGetContacts.pending,
          apiAddContacts.pending,
          apiDeleteContacts.pending
        ),
        (state) => {
          state.isLoading = true
          state.isError = false
        }
      )
      .addMatcher(
        isAnyOf(
          apiGetContacts.rejected,
          apiAddContacts.rejected,
          apiDeleteContacts.rejected
        ),
        (state) => {
          state.isLoading = false
          state.isError = true
        }
      )
  },
})

export const contactsReducer = contactsSlice.reducer
