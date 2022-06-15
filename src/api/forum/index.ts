import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { Topic } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5432',
  credentials: 'include',
});

export const instanceApi = createApi({
  reducerPath: '/',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['user'],
});

export const forumApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<Topic[], any>({
      query: () => ({
        url: '/api/topics/all',
      }),
    }),
  }),
});

export const { useGetTopicsQuery } = forumApi;
