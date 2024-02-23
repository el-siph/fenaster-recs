import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "../entities/Game";

export const gamesTestApi = createApi({
  reducerPath: "gamesTestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Games"],
  endpoints: (builder) => ({
    testGetGames: builder.query<Game[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Games" as const, id })),
              { type: "Games", id: "LIST" },
            ]
          : [{ type: "Games", id: "LIST" }],
      query: () => ({
        url: "games",
      }),
    }),

    testAddGame: builder.mutation<void, Partial<Game>>({
      query: (game) => ({
        url: "games",
        method: "POST",
        body: {
          ...game,
        },
      }),
      invalidatesTags: () => [{ type: "Games" as const, id: "LIST" }],
    }),
    testRemoveGame: builder.mutation<void, Game>({
      query: (game) => ({
        url: `games/${game.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useTestGetGamesQuery,
  useTestAddGameMutation,
  useTestRemoveGameMutation,
} = gamesTestApi;
