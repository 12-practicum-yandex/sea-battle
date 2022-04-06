import { FC, memo } from 'react';
import { Card as CardBase, styled, Typography } from '@mui/material';

interface IProps {
  title: string;
  textPreview: string;
  themCounter: number;
  answerCounter: number;
  lastTheme: string;
}

const Card = styled(CardBase)`
  margin-top: ${({ theme }) => `${theme.spacing(5)}`};
  padding: ${({ theme }) => `${theme.spacing(3)}`};
  display: flex;
  align-items: stretch;
`;

const Left = styled('div')`
  width: 50%;
  border-right: 1px solid #1e4676;
  padding-right: ${({ theme }) => `${theme.spacing(2)}`};
`;

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}`};
`;

const Right = styled('div')`
  margin-left: ${({ theme }) => `${theme.spacing(2)}`};
  width: 50%;
`;

const RightTop = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #1e4676;
  padding: ${({ theme }) => `${theme.spacing(2)} 0`};
`;

const RightBottom = styled('div')`
  padding: ${({ theme }) => `${theme.spacing(2)} 0`};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TextPreview = styled('div')`
  color: #a3adb9;
  font-size: 14px;
  line-height: 16px;
`;

const CountContainer = styled('div')`
  padding: ${({ theme }) => `${theme.spacing(1)}`};
  font-size: 22px;
  border-radius: 5px;
  border: 1px solid #1e4676;
  width: max-content;
`;

export const ForumCategoryCard: FC<IProps> = memo(
  ({ title, textPreview, themCounter, answerCounter, lastTheme }: IProps) => {
    return (
      <Card>
        <Left>
          <Title>{title}</Title>
          <TextPreview>{textPreview}</TextPreview>
        </Left>
        <Right>
          <RightTop>
            <Typography sx={{ marginRight: 2 }}>Темы:</Typography>
            <CountContainer sx={{ marginRight: 5 }}>{themCounter}</CountContainer>
            <Typography sx={{ marginRight: 2 }}>Ответы:</Typography>
            <CountContainer>{answerCounter}</CountContainer>
          </RightTop>
          <RightBottom>
            <Typography sx={{ marginRight: 2 }}>Последняя тема:</Typography>
            <TextPreview>{lastTheme}</TextPreview>
          </RightBottom>
        </Right>
      </Card>
    );
  },
);
