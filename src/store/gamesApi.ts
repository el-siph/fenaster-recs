import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "../entities/Game";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getGames: builder.query<Game[], void>({
      query: () => "games",
    }),
    addGame: builder.mutation<void, Game>({
      query: (game) => ({
        url: "games",
        method: "POST",
        body: {
          ...game,
        },
      }),
    }),
    removeGame: builder.mutation<void, Game>({
      query: (game) => ({
        url: `games/${game.id}`,
        method: "DELETE",
      }),
    }),
    markComplete: builder.mutation<void, Game>({
      query: (game) => ({
        method: "PATCH",
        url: `games/${game.id}`,
        body: {
          ...game,
        },
      }),
    }),
  }),
});

export const {
  useGetGamesQuery,
  useAddGameMutation,
  useMarkCompleteMutation,
  useRemoveGameMutation,
} = gamesApi;
