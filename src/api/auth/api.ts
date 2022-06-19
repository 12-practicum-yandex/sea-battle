import { instanceApi } from '@api';
import {
  TGetServiceRequest,
  TGetServiceResponse,
  TGetUserResponse,
  TOAuthRequest,
  TSignInRequest,
  TSignUpRequest,
  TSignUpResponse,
} from './types';

export const authApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<string, TSignInRequest>({
      query: (body) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<TSignUpResponse, TSignUpRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getUser: builder.query<TGetUserResponse, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'user' }],
    }),
    getService: builder.query<TGetServiceResponse, TGetServiceRequest>({
      query: (params) => ({
        url: '/oauth/yandex/service-id',
        method: 'GET',
        params,
      }),
    }),
    oAuthSignIn: builder.mutation<void, TOAuthRequest>({
      query: (body) => ({
        url: '/oauth/yandex',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useGetUserQuery,
  useGetServiceQuery,
  useOAuthSignInMutation,
} = authApi;
