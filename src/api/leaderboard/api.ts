import { instanceApi } from '@api';
import {
  IAddLeaderboardRequest,
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
    getTeamLeaderboard: builder.mutation<TGetLeaderboardResponse, TGetTeamLeaderboardRequest>({
      query: (body) => ({
        url: `/leaderboard/${TEAM_NAME}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const { useAddToLeaderboardMutation, useGetTeamLeaderboardMutation } = leaderboardApi;
