import { Tables } from "../supabase";

export interface Game extends Tables<"games">, Tables<"discounts"> {
  discounts: {
    gameId: number;
    discountPercent: number;
    lastChecked: Date;
  };
}
