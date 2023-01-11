import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/post' }),
  endpoints: (builder) => ({
    getTopPosts: builder.query({
      query: () => '/'
    })
  })
});

export const { useGetTopPostsQuery } = postApi;
