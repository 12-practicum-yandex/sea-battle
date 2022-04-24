import { Box, styled } from '@mui/material';
import { ReactNode, forwardRef } from 'react';
import { Header } from '@components';

const Wrapper = styled(Box)`
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #ffffff;
  border-radius: 10px;
`;

const ContentWrapper = styled('div')`
  padding: 30px 100px;
  height: 100%;
`;

type Props = {
  children: ReactNode;
};

export const AuthPageLayout = forwardRef(({ children }: Props, ref) => {
  return (
    <Wrapper ref={ref}>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
});
