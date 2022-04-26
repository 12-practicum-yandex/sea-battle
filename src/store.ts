import { configureStore } from '@reduxjs/toolkit';
import { instanceApi } from './api';

export const store = configureStore({
  reducer: {
    [instanceApi.reducerPath]: instanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instanceApi.middleware),
});
