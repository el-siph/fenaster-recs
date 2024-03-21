import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "../entities/Game";
import { isInAdminMode } from "../helpers";
import { supabaseClient } from "../supabaseClient";
import { Tables } from "../types/supabase";

interface InsertGameResponse {
  status: number;
  count: number;
}

export interface InsertVodLinkRequest {
  game: Game;
  vodLink: string;
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
    addGame: builder.mutation<InsertGameResponse, Partial<Game>>({
      invalidatesTags: () => [{ type: "Games" as const, id: "LIST" }],

      // @ts-expect-error
      queryFn: async (game) => {
        const { status, count, error } = await supabaseClient
          .from("games")
          .insert({
            ...(game as Tables<"games">),
          });

        if (error) throw error;
        return { status, count };
      },
    }),
    removeGame: builder.mutation<void, Game>({
      invalidatesTags: () => [{ type: "Games" as const, id: "LIST" }],

      // @ts-expect-error
      queryFn: async (game) => {
        if (isInAdminMode()) {
          const { status, count, error } = await supabaseClient
            .from("games")
            .delete()
            .eq("id", game.id);

          if (error) throw error;
          return { status, count };
        }
      },
    }),
    markAuthorized: builder.mutation<void, Game>({
      invalidatesTags: () => [{ type: "Games" as const, id: "LIST" }],

      // @ts-expect-error
      queryFn: async (game) => {
        if (isInAdminMode()) {
          const { status, count, error } = await supabaseClient
            .from("games")
            .update({ isAuthorized: true })
            .eq("id", game.id);

          if (error) throw error;
          return { status, count };
        }
      },
    }),

    markComplete: builder.mutation<void, Game>({
      invalidatesTags: () => [{ type: "Games" as const, id: "LIST" }],

      // @ts-expect-error
      queryFn: async (game) => {
        if (isInAdminMode()) {
          const { status, count, error } = await supabaseClient
            .from("games")
            .update({ wasCompleted: true })
            .eq("id", game.id);

          if (error) throw error;
          return { status, count };
        }
      },
    }),

    addVodLink: builder.mutation<void, InsertVodLinkRequest>({
      invalidatesTags: () => [{ type: "Games" as const, id: "LIST" }],

      // @ts-expect-error
      queryFn: async (request) => {
        if (isInAdminMode()) {
          const { status, count, error } = await supabaseClient
            .from("games")
            .update({ vodLink: request.vodLink })
            .eq("id", request.game.id);

          if (error) throw error;
          return { status, count };
        }
      },
    }),
  }),
});

export const {
  useGetGamesQuery,
  useAddGameMutation,
  useMarkCompleteMutation,
  useRemoveGameMutation,
  useAddVodLinkMutation,
  useMarkAuthorizedMutation,
} = gamesApi;
