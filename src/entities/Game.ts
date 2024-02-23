import { Tables } from "../types/supabase";

export interface Game extends Tables<"games"> {
  discounts: {
    gameId: number;
    discountPercent: number;
    lastChecked: string;
  };
}
