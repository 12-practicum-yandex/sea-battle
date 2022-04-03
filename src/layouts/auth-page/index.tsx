import { Box, styled } from '@mui/material';
import { ReactNode } from 'react';
import { Header } from 'components';

const Wrapper = styled(Box)`
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #ffffff;
  border-radius: 10px;
`;

type Props = {
  children: ReactNode;
};

export const AuthPageLayout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};
