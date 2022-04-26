import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { baseUrl } from '@constants/base-url';

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
});
