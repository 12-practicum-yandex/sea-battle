import { store } from './index';

declare global {
  interface Window {
    __PRELOADED_STATE__?: any;
  }
  type GlobalStore = ReturnType<typeof store.getState>;
  type GlobalDispatch = typeof store.dispatch;
}
