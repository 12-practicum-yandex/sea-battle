import { bffApi } from '@api';
import {
  IAddLeaderboardRequest,
  ILeaderboardItem,
  TGetLeaderboardResponse,
  TGetTeamLeaderboardRequest,
} from '@api/leaderboard/types';

export const TEAM_NAME = 'atlantida';

export const leaderboardApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    addToLeaderboard: builder.mutation<string, IAddLeaderboardRequest>({
      query: (body) => ({
        url: '/leaderboard/add',
        method: 'POST',
        body,
      }),
    }),
    getTeamLeaderboard: builder.query<ILeaderboardItem[], TGetTeamLeaderboardRequest>({
      query: (body) => ({
        url: `/leaderboard/all`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: TGetLeaderboardResponse): ILeaderboardItem[] =>
        response.map((item) => item.data),
    }),
  }),
});
export const { useAddToLeaderboardMutation, useGetTeamLeaderboardQuery } = leaderboardApi;
