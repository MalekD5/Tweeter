import type { Tweet } from './Tweet';
import { apiSlice } from '@/redux/apiSlice';

export const tweetService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: () => '/tweet',
      providesTags: (result = [], error, _arg) => {
        if (error) return [];

        return [
          'Tweet',
          ...result.map(({ id }: Tweet) => ({ type: 'Tweet', id }))
        ];
      }
    }),
    editTweet: builder.mutation({
      query: (post: Tweet) => ({
        url: '/tweet',
        method: 'PATCH',
        body: post.body
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Tweet', id: arg.id }]
    }),
    addTweet: builder.mutation({
      query: (post: { text: string }) => ({
        url: '/tweet',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Tweet']
    })
  })
});

export const { useGetTweetsQuery, useAddTweetMutation, useEditTweetMutation } =
  tweetService;
