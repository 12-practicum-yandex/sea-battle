import { AuthPageLayout } from '@layouts';
import { LeaderboardCard } from '@components';
import { styled } from '@mui/material';

const PageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const list = [
  {
    place: 1,
    imgUrl: '',
    winCounter: 12,
    userName: 'Сафохин Артем Анатольевич',
  },
  {
    place: 2,
    imgUrl: '',
    winCounter: 10,
    userName: 'Сафохин Артем',
  },
];

export const Leaderboard = () => {
  return (
    <AuthPageLayout>
      <PageWrapper>
        {list.map((item) => (
          <LeaderboardCard {...item} key={item.place} />
        ))}
      </PageWrapper>
    </AuthPageLayout>
  );
};
