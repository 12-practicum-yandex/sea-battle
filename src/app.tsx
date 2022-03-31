import { ErrorBoundary } from './components/error-boundary';
import { Router } from './router';

export const App = () => (
  <ErrorBoundary>
    <Router />
  </ErrorBoundary>
);
