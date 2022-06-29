import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { TCreateThemeRequest, TCreateThemeResponse, TGetThemesRequest } from '@api/themes/types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
});

export const instanceApiTheme = createApi({
  reducerPath: 'theme',
  baseQuery,
  endpoints: () => ({}),
});

const themesApi = instanceApiTheme.injectEndpoints({
  endpoints: (builder) => ({
    createTheme: builder.mutation<TCreateThemeRequest, TCreateThemeResponse>({
      query: (body) => ({
        url: '/theme',
        method: 'POST',
        body,
      }),
    }),
    getThemes: builder.query<TGetThemesRequest[], void>({
      query: () => ({
        url: '/theme',
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: { themes: TGetThemesRequest[] }) {
        return baseQueryReturnValue?.themes;
      },
    }),
  }),
});

export const { useCreateThemeMutation, useGetThemesQuery } = themesApi;
