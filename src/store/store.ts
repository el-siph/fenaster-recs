import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { gamesApi } from "./gamesApi";
import { gameListSlice } from "./gameListSlice";
import { gamesTestApi } from "./gamesTestApi";

export const store = configureStore({
  reducer: {
    [gameListSlice.reducerPath]: gameListSlice.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [gamesTestApi.reducerPath]: gamesTestApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(gamesApi.middleware)
      .concat(gamesTestApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
