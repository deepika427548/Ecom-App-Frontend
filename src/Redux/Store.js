import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './Api/productsApi'
import { authApi } from './Api/authApi'
import { userApi } from './Api/userApi'
import userReducer from './features/userSlice'


export const store = configureStore({
  reducer: {
    auth:userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware,authApi.middleware,userApi.middleware]),
})