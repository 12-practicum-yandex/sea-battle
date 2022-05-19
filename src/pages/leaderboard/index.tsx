import { AuthPageLayout } from '@layouts';
import { LeaderboardCard } from '@components';
import { styled, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ILeaderboardItem, useGetTeamLeaderboardMutation } from '@api/leaderboard';

const PageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Leaderboard = () => {
  const [leaderList, selLeaderList] = useState<ILeaderboardItem[]>();
  const [getLeaderboard, { isLoading }] = useGetTeamLeaderboardMutation();

  const getData = useCallback(async () => {
    const res = await getLeaderboard({
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    }).unwrap();
    selLeaderList(res.map((item) => item.data));
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
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
