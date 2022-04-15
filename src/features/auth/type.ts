import { TGetUserResponse } from '@api/auth/types';

export type TAuthContext = {
  user: TGetUserResponse | null;
  setUser: (user: TGetUserResponse) => void;
};
