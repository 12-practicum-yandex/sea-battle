import { FC, memo } from 'react';
import { styled, Avatar } from '@mui/material';
import { baseUrl } from '@constants/base-url';

interface IProps {
  place: number;
  avatar: string;
  score: number;
  first_name: string;
  second_name: string;
}

const Card = styled('div')`
  margin-top: 30px;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  border: 1px solid #edf2f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  &:first-of-type {
    margin-top: 0;
  }
`;

const Place = styled('div')`
  margin-right: 36px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #365278;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  line-height: 38px;
`;

const Name = styled('div')`
  margin-left: 20px;
  font-size: 16px;
  line-height: 19px;
  color: #1e1e1e;
  font-weight: 500;
  flex-grow: 1;
`;

const WinTitle = styled('div')`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-right: 16px;
  color: #1e1e1e;
`;

const WinCounter = styled('div')`
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  color: #1e4676;
`;

export const LeaderboardCard: FC<IProps> = memo(
  ({ place, score, first_name, second_name, avatar }: IProps) => {
    return (
      <Card>
        <Place>{place}</Place>
        <Avatar src={`${baseUrl}/resources${avatar}`} />
        <Name>{[first_name, second_name].join(' ')}</Name>
        <WinTitle>Счет:</WinTitle>
        <WinCounter>{score}</WinCounter>
      </Card>
    );
  },
);
