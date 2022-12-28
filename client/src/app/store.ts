import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import loggedInReducer from '../features/authSlice';
import loginReducer from '../features/authSlice';
import mushroomsReducer from '../features/mushroomsSlice';
import addProductReducer from '../features/mushroomsSlice';
import productDataReducer from '../features/mushroomsSlice';
import ordersReducer from '../features/ordersSlice';
import ordersClientSideReducer from '../features/ordersSlice';
import { createAction } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['mushrooms', 'addProductData', 'productDataDetails']
};

const reducerStorage = combineReducers({
  login: loginReducer,
  loggedIn: loggedInReducer,
  mushrooms: mushroomsReducer,
  orders: ordersReducer,
  orderClientSide: ordersClientSideReducer,
  addFormData: addProductReducer,
  productDataDetails: productDataReducer,
});

const persistedReducer = persistReducer(persistConfig, reducerStorage)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
