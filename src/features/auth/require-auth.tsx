import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import { useAuth } from './use-auth';

type Props = { children: JSX.Element };

export const RequireAuth = ({ children }: Props) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return children;
};
