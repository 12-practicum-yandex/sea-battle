import { bffApi } from '@api';
import { TUserUpdateRequest } from './types';
import { TGetUserResponse } from '@api/auth/types';

export const profileApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<TGetUserResponse, TUserUpdateRequest>({
      query: (body) => ({
        url: '/profile',
        method: 'PUT',
        body,
      }),
    }),
    updateAvatar: builder.mutation<TGetUserResponse, FormData>({
      query: (body) => ({
        url: '/profile/avatar',
        method: 'PUT',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateProfileMutation, useUpdateAvatarMutation } = profileApi;
