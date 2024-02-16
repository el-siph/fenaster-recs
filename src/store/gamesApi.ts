import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "../entities/Game";
import { Tables } from "../supabase";
import { supabaseClient } from "../supabaseClient";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getGames: builder.query<Tables<"games">[], void>({
      queryFn: async () => {
        const { data, error } = await supabaseClient
          .from("games")
          .select()
          .returns<Tables<"games">[]>();
        if (error) throw error;
        return { data };
      },
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
