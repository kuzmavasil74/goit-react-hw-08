import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../auth/operations'

export const apiGetContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('/contacts')
      // console.log('data GetContacts: ', data)
      return data
    } catch (e) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
export const apiAddContacts = createAsyncThunk(
  'contacts/addNew',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/contacts', formData)
      // console.log('data AddContacts: ', data)
      return data
    } catch (e) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)

export const apiDeleteContacts = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`)
      // console.log('data DeleteContacts: ', data)
      return data
    } catch (e) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
