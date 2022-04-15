import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetUserQuery } from '@api/auth';

import { useAuth } from './use-auth';

export const useAuthCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const locationState = location.state as {
    from: Location;
  };

  const from = locationState?.from?.pathname ?? '/';

  const {
    isError: isUserQueryError,
    isSuccess: isUserQuerySuccess,
    isFetching: isUserQueryFetching,
    data: userData,
  } = useGetUserQuery();

  useEffect(() => {
    if (isUserQuerySuccess && userData) {
      setUser(userData);

      navigate(from, { replace: true });
    }
  }, [userData, isUserQueryError, isUserQuerySuccess]);

  return { isUserQueryFetching };
};
