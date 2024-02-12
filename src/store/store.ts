import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
} from 'redux-persist'

import { apiSlice } from './features/api-slice'
import authReducer from './features/auth-slice'
import usersReducer, { userApiSlice } from './features/user-slice'

import storage from './customStorage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  userApi: userApiSlice.reducer, // Fixed the duplicate property name
  auth: authReducer,
  users: usersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch