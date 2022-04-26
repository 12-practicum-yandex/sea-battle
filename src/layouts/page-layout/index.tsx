import { Box, styled } from '@mui/material';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled(Box)<{ isCenter: boolean }>`
  display: flex;
  flex: 1;
  width: 100%;
  ${({ isCenter }) =>
    isCenter &&
    `
    align-items: center;
    justify-content: center;
  `}
`;

type Props = {
  children: JSX.Element;
  isCenter?: boolean;
};

export const PageLayout = ({ children, isCenter = false }: Props) => (
  <Wrapper>
    <Content isCenter={isCenter}>{children}</Content>
  </Wrapper>
);
