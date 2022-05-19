import { TGetUserResponse } from '@api/auth/types';
import { TEAM_NAME } from './api';

export interface ILeaderboardItem extends TGetUserResponse {
  score: number;
}

export type TGetTeamLeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TGetLeaderboardResponse = Array<{ data: ILeaderboardItem }>;

export type IAddLeaderboardRequest = {
  data: ILeaderboardItem;
  ratingFieldName: string;
  teamName: typeof TEAM_NAME;
};
