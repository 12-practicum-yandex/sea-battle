import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './service-worker-registration';

import { App } from './app';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

registerServiceWorker();
