import { instanceApi } from '@api';
import {
  IAddLeaderboardRequest,
  ILeaderboardItem,
  TGetLeaderboardResponse,
  TGetTeamLeaderboardRequest,
} from '@api/leaderboard/types';

export const TEAM_NAME = 'atlantida';

export const leaderboardApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    addToLeaderboard: builder.mutation<string, IAddLeaderboardRequest>({
      query: (body) => ({
        url: '/leaderboard',
        method: 'POST',
        body,
      }),
    }),
    getTeamLeaderboard: builder.query<ILeaderboardItem[], TGetTeamLeaderboardRequest>({
      query: (body) => ({
        url: `/leaderboard/${TEAM_NAME}`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: TGetLeaderboardResponse): ILeaderboardItem[] =>
        response.map((item) => item.data),
    }),
  }),
});
export const { useAddToLeaderboardMutation, useGetTeamLeaderboardQuery } = leaderboardApi;
