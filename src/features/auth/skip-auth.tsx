import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import { useAuth } from './use-auth';

type Props = { children: JSX.Element };

const loginRoutes = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

export const SkipAuth = ({ children }: Props) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (isAuth && loginRoutes.includes(location.pathname)) {
    return <Navigate to={ROUTES.GAME} replace />;
  }

  return children;
};
