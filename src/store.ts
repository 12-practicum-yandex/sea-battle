import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bffApi } from '@api';

const rootReducer = combineReducers({
  [bffApi.reducerPath]: bffApi.reducer,
});

export function create(preloadedState: any) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bffApi.middleware),
    preloadedState,
  });
}
