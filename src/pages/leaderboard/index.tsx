import { AuthPageLayout } from '@layouts';
import { LeaderboardCard } from '@components';
import { styled, CircularProgress } from '@mui/material';
import { useGetTeamLeaderboardQuery } from '@api/leaderboard';

const PageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Leaderboard = () => {
  const { data: leaderList, isLoading } = useGetTeamLeaderboardQuery({
    ratingFieldName: 'score',
    cursor: 0,
    limit: 10,
  });
  return (
    <AuthPageLayout>
      <PageWrapper>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {leaderList?.map((item, index) => (
              <LeaderboardCard {...item} place={index + 1} key={index} />
            ))}
          </>
        )}
      </PageWrapper>
    </AuthPageLayout>
  );
};
