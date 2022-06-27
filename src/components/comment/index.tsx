import { memo } from 'react';
import { Card as CardBase, styled } from '@mui/material';

const Card = styled(CardBase)`
  margin-top: ${({ theme }) => theme.spacing(5)};
  padding: ${({ theme }) => theme.spacing(3)};
`;

const User = styled('div')`
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: #a3adb9;
`;

type Props = {
  comment: string;
  userLogin: string;
};

export const Comment = memo(({ comment, userLogin }: Props) => {
  return (
    <>
      <Card>
        <div>{comment}</div>
        <User>{userLogin}</User>
      </Card>
    </>
  );
});
