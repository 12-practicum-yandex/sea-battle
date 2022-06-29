import GlobalStyles from '@mui/material/GlobalStyles';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader/root';

import { ErrorBoundary } from '@components/error-boundary';
import { AuthProvider } from '@features/auth';
import { SnakesProvider } from '@features/snakes';

import { Router } from './router';
import { createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { THEME } from '@constants/colors';
import { RootState } from './store';

const inputGlobalStyles = (background: string) => (
  <GlobalStyles
    styles={{
      body: {
        margin: '30px',
        background,
        color: '#1E4676',
        minHeight: '100vh',
      },
    }}
  />
);

export const App = hot(() => {
  const [theme, setTheme] = useState(createTheme(THEME['blue']));
  const themeSelector = useSelector((state: RootState) => state);

  useEffect(() => {
    const type = themeSelector.themeApp.theme;

    if (type === 'blue' || type === 'dark') {
      const theme = createTheme(THEME[type]);
      setTheme(theme);
    }
  }, [themeSelector]);

  return (
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
        <ThemeProvider theme={theme}>
          {inputGlobalStyles(theme.palette.background.default)}
          <SnakesProvider>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </SnakesProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
});
