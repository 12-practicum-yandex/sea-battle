import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './service-worker-registration';

import { App } from './app';
import { Provider } from 'react-redux';
import { create } from './store';

export const store = create(window.__PRELOADED_STATE__ || {});

delete window.__PRELOADED_STATE__;

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
