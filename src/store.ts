import { combineReducers, configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { bffApi, instanceApiForum, instanceApiTheme } from '@api';

interface ThemeState {
  theme: string;
}

const themeBlue = createAction('theme/blue');
const themeDark = createAction('theme/dark');

const initialState = { theme: 'blue' } as ThemeState;

const themeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(themeBlue, (state, action) => {
      state.theme = 'blue';
    })
    .addCase(themeDark, (state, action) => {
      state.theme = 'dark';
    });
});

const rootReducer = combineReducers({
  [bffApi.reducerPath]: bffApi.reducer,
  [instanceApiTheme.reducerPath]: instanceApiTheme.reducer,
  [instanceApiForum.reducerPath]: instanceApiForum.reducer,
  themeApp: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function create(preloadedState: any) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bffApi.middleware),
    preloadedState,
  });
}
