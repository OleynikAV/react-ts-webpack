import { postsApi } from '../api/postsApi';
import { Posts } from './types.endPoints';

const jsonServe = postsApi.injectEndpoints({
   endpoints: (build) => ({
      getPosts: build.query({
         query: (params) => ({
            method: 'GET',
            url: params.type,
         }),
         providesTags: ['Posts'],
         transformResponse: (response: { id: string; name: string; date: string; description: string; photo: string }[]) => response,
      }),


      getUsers: build.query({
         query: (params) => ({
            method: 'GET',
            url: params.type,
         }),
         providesTags: ['Users'],
         transformResponse: (response) => response,
      }),

      creatUser: build.mutation({
         query: (params) => ({
            url: '/login',
            method: 'POST',
            body: params,
         }),
         invalidatesTags: ['Users'],
         transformResponse: (response: Posts) => response,
      }),
   }),
});
export const {
   useGetPostsQuery,
   useCreatUserMutation,
   useGetUsersQuery,

} = jsonServe;
