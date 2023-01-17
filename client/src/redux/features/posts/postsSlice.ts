import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/post',
  credentials: 'include',
  prepareHeaders(headers, { getState }) {
    const token = (getState() as any).auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  }
})
export const postApi = createApi({
  reducerPath: 'posts',
  baseQuery,
  endpoints: (builder) => ({
    getTopPosts: builder.query({
      query: () => '/'
    }),
    createPost: builder.mutation({
      query: ({ postText }) => ({
        url: '/',
        method: 'POST',
        body: { text: postText }
      })
    })
  })
});

export const { useGetTopPostsQuery, useCreatePostMutation } = postApi;
