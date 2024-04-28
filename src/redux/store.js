import { configureStore } from '@reduxjs/toolkit'

import { contactsReducer } from './contacts/slice'
import { filterSliceReducer } from './filters/slice'
import { authSliceReducer } from './auth/slice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
  key: 'auth', //Ключ зберігання в localStorage
  storage, // Сторінка зберігання даних в localStorage
  whitelist: ['token'], //Поля слайсу, які треба зберігати в localStorage
}

export const store = configureStore({
  reducer: {
    phonebook: contactsReducer, //Конфігурація слайсу контактів
    filter: filterSliceReducer, // Конфігурація слайсу фільтрації
    auth: persistReducer(authPersistConfig, authSliceReducer), //Конфігурація слайсу авторизації
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store) //Підключення слайсу зберігання в localStorage
