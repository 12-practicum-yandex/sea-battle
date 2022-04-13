import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import { useAuth } from './use-auth';

type Props = { children: JSX.Element };

export const RequireAuth = ({ children }: Props) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user && [ROUTES.SIGN_IN, ROUTES.SIGN_UP].includes(location.pathname)) {
    return <Navigate to={ROUTES.GAME} replace />;
  }

  if (!auth.user) {
    return <Navigate to={ROUTES.CHECK_AUTH} state={{ from: location }} replace />;
  }

  return children;
};
