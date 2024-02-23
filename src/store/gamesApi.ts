import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "../entities/Game";
import { Tables } from "../types/supabase";
import { supabaseClient } from "../supabaseClient";

interface InsertResponse {
  status: number;
  count: number;
}

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Games"],
  endpoints: (builder) => ({
    getGames: builder.query<Game[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Games" as const, id })),
              { type: "Games", id: "LIST" },
            ]
          : [{ type: "Games", id: "LIST" }],

      // @ts-expect-error
      queryFn: async () => {
        const { data, error } = await supabaseClient
          .from("games")
          .select(
            `
          *,
          discounts (
            discountPercent,
            lastChecked
          )
        `
          )
          .returns<Game[]>();
        if (error) return { error };
        return await { data, error };
      },
    }),
    addGame: builder.mutation<InsertResponse, Partial<Game>>({
      invalidatesTags: () => [{ type: "Games" as const, id: "LIST" }],

      // @ts-expect-error
      queryFn: async (game) => {
        const { status, count, error } = await supabaseClient
          .from("games")
          .insert({
            ...(game as Tables<"games">),
            isAuthorized: false,
          });

        if (error) throw error;
        return { status, count };
      },
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
