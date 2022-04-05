import { ErrorBoundary } from './components/error-boundary';
import { Router } from './router';
import GlobalStyles from '@mui/material/GlobalStyles';

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

export const App = () => (
  <ErrorBoundary>
    {inputGlobalStyles}
    <Router />
  </ErrorBoundary>
);
