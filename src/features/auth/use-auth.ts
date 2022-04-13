import { useContext } from 'react';

import { authContext } from './auth-provider';

export const useAuth = () => useContext(authContext);
