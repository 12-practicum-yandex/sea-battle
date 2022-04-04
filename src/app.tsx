import { Provider } from 'react-redux';

import { ErrorBoundary } from './components/error-boundary';
import { Router } from './router';
import { store } from './store';

export const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router />
    </Provider>
  </ErrorBoundary>
);
