import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);
