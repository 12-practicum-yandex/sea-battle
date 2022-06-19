import {
  ActionCreatorWithoutPayload,
  combineReducers,
  configureStore,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';
import { instanceApi } from '@api';

const serverDataAction = createAction<string, 'SERVER_DATA'>('SERVER_DATA');

export const serverData = createReducer(
  {},
  {
    [serverDataAction.type]: function (state) {
      return state;
    },
  },
);

const rootReducer = combineReducers({
  [instanceApi.reducerPath]: instanceApi.reducer,
  serverData,
});

export function create(preloadedState: any) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instanceApi.middleware),
    preloadedState,
  });
}
