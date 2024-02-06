import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
   reducerPath: 'json-serve',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/',
   }),
   tagTypes: ['Posts', 'Users'],
   refetchOnFocus: false,
   endpoints: () => ({}),
});
