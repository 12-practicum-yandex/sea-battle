import { instanceApi } from '@api';
import {
  ILeaderboardItem,
  TGetLeaderboardResponse,
  TGetTeamLeaderboadRequest,
} from '@api/leaderboard/types';

export const TEAM_NAME = 'atlantida';

export const leaderboardApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    addToLeaderboard: builder.mutation<ILeaderboardItem, string>({
      query: (body) => ({
        url: '/leaderboard',
        method: 'POST',
        body,
      }),
    }),
    getTeamLeaderboard: builder.mutation<TGetLeaderboardResponse, TGetTeamLeaderboadRequest>({
      query: (body) => ({
        url: `/leaderboard/${TEAM_NAME}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const { useAddToLeaderboardMutation, useGetTeamLeaderboardMutation } = leaderboardApi;
