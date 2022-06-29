import { ThemeOptions } from '@mui/material';

type ThemeOptionsSea = ThemeOptions & { palette: { primary: { main: string } } };

export type TypeTHEME = {
  blue: ThemeOptionsSea;
  dark: ThemeOptionsSea;
};

export const THEME: TypeTHEME = {
  blue: {
    palette: {
      primary: {
        main: '#1E4676',
      },
      background: {
        default: 'linear-gradient(#2A5298, #1E4676)',
      },
    },
    typography: {
      body1: {
        color: '#1E4676',
      },
      h4: {
        color: '#1E4676',
      },
    },
  },
  dark: {
    palette: {
      primary: {
        main: '#000',
      },
      background: {
        default: '#000',
      },
    },
    typography: {
      body1: {
        color: '#000',
      },
      h4: {
        color: '#000',
      },
    },
  },
};
