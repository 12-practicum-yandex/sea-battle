import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { Comment, CreateTopic, Topic } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
});

export const instanceApiForum = createApi({
  reducerPath: 'forum',
  baseQuery,
  endpoints: () => ({}),
});

export const forumApi = instanceApiForum.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<Topic[], void>({
      query: () => ({
        url: '/topics/all',
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: { topics: Topic[] }) {
        return baseQueryReturnValue?.topics;
      },
    }),
    createTopic: builder.mutation<string, CreateTopic>({
      query: (body) => ({
        url: '/topics/add',
        method: 'POST',
        body,
      }),
    }),
    getComments: builder.query<Comment[], { id: number }>({
      query: (body) => ({
        url: `/topics/get-comments`,
        method: 'POST',
        body,
      }),
      transformResponse(baseQueryReturnValue: { comments: Comment[] }) {
        return baseQueryReturnValue?.comments;
      },
    }),
    createComment: builder.mutation<string, Comment>({
      query: (body) => ({
        url: '/topics/add-comment',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useGetCommentsQuery,
  useCreateTopicMutation,
  useCreateCommentMutation,
} = forumApi;
