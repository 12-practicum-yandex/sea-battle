import ReactDOM from 'react-dom';
import { App } from './app';
import { ErrorBoundary } from '/src/components/error-boundary';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root'),
);
