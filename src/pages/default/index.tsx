import { useOAuthSignInMutation, useGetUserQuery } from '@api/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { parse } from 'qs';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@features/auth';

export const Default = () => {
  const [oauthMutation] = useOAuthSignInMutation();
  const { refetch } = useGetUserQuery();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { search } = useLocation();
  const code = useMemo(() => {
    return parse(search?.replace('?', ''))?.code as string;
  }, [search]);

  useEffect(() => {
    if (code) {
      (async () => {
        await oauthMutation({
          code,
          redirect_uri: global?.location?.origin,
        });
        await refetch();
        setAuth(true);
        navigate(ROUTES.GAME);
      })();
    }
  }, []);

  return <></>;
};
