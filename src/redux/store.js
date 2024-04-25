import { configureStore } from '@reduxjs/toolkit'

import { contactSliceReducer } from './contacts/slice'
import { filterSliceReducer } from './filters/slice'

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const contactPersistConfig = {
//   key: 'contacts',
//   storage,
//   whitelist: ['contacts'],
// }

export const store = configureStore({
  reducer: {
    // contact: persistReducer(contactPersistConfig, contactSliceReducer),
    contact: contactSliceReducer,
    filter: filterSliceReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
})

// export const persistor = persistStore(store)
