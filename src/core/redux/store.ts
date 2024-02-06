import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi } from '../api/postsApi';
import reducer from './slices/storeSlice';

export const store = configureStore({
   reducer: {
      [postsApi.reducerPath]: postsApi.reducer,
      store: reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;