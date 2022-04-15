import { ReactNode, createContext, useState } from 'react';

import { TGetUserResponse } from '@api/auth/types';

import { TAuthContext } from './type';

const defaultAuthContextValue: TAuthContext = {
  setUser: () => null,
  user: null,
};

export const authContext = createContext<TAuthContext>(defaultAuthContextValue);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TGetUserResponse | null>(null);

  const value: TAuthContext = {
    user,
    setUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
