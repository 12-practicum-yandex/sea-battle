import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { instanceApi, instanceApiForum } from '@api';

const rootReducer = combineReducers({
  [instanceApi.reducerPath]: instanceApi.reducer,
  [instanceApiForum.reducerPath]: instanceApiForum.reducer,
});

export function create(preloadedState: any) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instanceApi.middleware),
    preloadedState,
  });
}
