// Import necessary libraries
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from 'redux';
import authReducer from '../features/AuthSlice';
import sondageReducer from '../features/SondageSlices';

// Combine auth and sondage reducers
const rootReducer = combineReducers({
  auth: authReducer,
  sondage: sondageReducer,
});

// Configure the persistor with the combined rootReducer
const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth", "sondage"],
  },
  rootReducer
);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
export const persistor = persistStore(store);
