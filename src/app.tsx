import { Provider } from 'react-redux';
import GlobalStyles from '@mui/material/GlobalStyles';

import { ErrorBoundary } from '@components/error-boundary';
import { AuthProvider } from '@features/auth';
import { SnakesProvider } from '@features/snakes';

import { Router } from './router';
import { store } from './store';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: '30px',
        // background: 'linear-gradient(#2A5298, #1E4676)',
        color: '#1E4676',
        minHeight: '100vh',
      },
    }}
  />
);

export const App = () => (
  <ErrorBoundary>
    {inputGlobalStyles}
    <Provider store={store}>
      <SnakesProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SnakesProvider>
    </Provider>
  </ErrorBoundary>
);
