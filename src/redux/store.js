import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { authReducer } from './auth/slice';
import { transactionsReducer } from './transactions/slice';

// Persist config for auth slice
const persistConfig = {
  key: 'auth',
  storage,
  // whitelist: ['token', 'user'], // İstersen sadece bazı alanları saklayabilirsin
};

// Configure store
const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux-persist ve thunk için gerekli
    }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
