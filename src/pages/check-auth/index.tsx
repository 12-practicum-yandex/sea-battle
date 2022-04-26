import { CircularProgress, styled } from '@mui/material';

import { useAuthCheck } from '@features/auth';

const LoadingWrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckAuth = () => {
  useAuthCheck();

  return (
    <LoadingWrapper>
      <CircularProgress size={60} />
    </LoadingWrapper>
  );
};
