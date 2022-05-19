import { TGetUserResponse } from '@api/auth/types';

export interface ILeaderboardItem extends TGetUserResponse {
  score: number;
}

export type TGetTeamLeaderboadRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TGetLeaderboardResponse = Array<{ data: ILeaderboardItem }>;
