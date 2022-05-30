import { Provider } from 'react-redux';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader/root';

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
        background: 'linear-gradient(#2A5298, #1E4676)',
        color: '#1E4676',
        minHeight: '100vh',
      },
    }}
  />
);

export const App = hot(() => (
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sea battle</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Helmet>
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
  </>
));
