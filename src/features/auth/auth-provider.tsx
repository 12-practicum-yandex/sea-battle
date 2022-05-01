import { ReactNode, createContext, useState, useEffect } from 'react';

import { TAuthContext } from './type';

const AUTH_STORAGE_KEY = 'auth';

const defaultAuthContextValue: TAuthContext = {
  setAuth: () => null,
  isAuth: false,
};

export const authContext = createContext<TAuthContext>(defaultAuthContextValue);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem(AUTH_STORAGE_KEY)));
  }, []);

  const value: TAuthContext = {
    isAuth,
    setAuth: (value) => {
      if (value) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        setIsAuth(true);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setIsAuth(false);
      }
    },
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
