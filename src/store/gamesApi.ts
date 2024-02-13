import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "../entities/Game";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getGames: builder.query<Game[], void>({
      query: () => "data",
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
