import { store } from './store';

declare global {
  type GlobalStore = ReturnType<typeof store.getState>;
  type GlobalDispatch = typeof store.dispatch;
}
