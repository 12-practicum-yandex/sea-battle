import { AuthPageLayout } from 'layouts';
import { LeaderboardCard } from 'components';
import { styled } from '@mui/material';

const PageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Leaderboard = () => {
  return (
    <AuthPageLayout>
      <PageWrapper>
        <LeaderboardCard
          place={1}
          imgUrl={''}
          winCounter={12}
          userName={'Сафохин Артем Анатольевич'}
        />
        <LeaderboardCard place={2} imgUrl={''} winCounter={10} userName={'Сафохин Артем '} />
      </PageWrapper>
    </AuthPageLayout>
  );
};
