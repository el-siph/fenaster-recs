import { FaExternalLinkAlt, FaSteamSymbol } from "react-icons/fa";
import { Game } from "./entities/Game";
import { FriendsOfFenAster } from "./store/gameListSlice";
import toast from "react-hot-toast";

export const enum Storefronts {
  Steam,
  Epic,
  Other,
}

export const notifyToaster = (msg: string) => toast(msg);

export const recByFriend = (game: Game): boolean =>
  FriendsOfFenAster.includes(game.recBy);

export const getPriceFloat = (game: Game): number => {
  switch (game.msrp.toLowerCase()) {
    case "free":
      return 0.0;
    case "varies":
      return 0.1;
    case "n/a":
      return 0.2;
    default:
      return parseFloat(game.msrp.substring(1, game.msrp.length));
  }
};

export const detectStorefront = (game: Game) => {
  if (game.storeLink?.includes("steampowered")) return Storefronts.Steam;
  return Storefronts.Other;
};

export const getLinkIcon = (game: Game) =>
  detectStorefront(game) === Storefronts.Steam ? (
    <FaSteamSymbol />
  ) : (
    <FaExternalLinkAlt />
  );

export const extractSteamId = (game: Game): string | null => {
  if (detectStorefront(game) !== Storefronts.Steam) return null;
  if (!game.storeLink) return null;
  const linkArr = game.storeLink.split("/app/");
  if (linkArr[1] === undefined) return null;
  const steamIdArr = linkArr[1].split("/");
  return steamIdArr[0];
};

export const getGameImageUrl = (game: Game): string | null => {
  const steamId = extractSteamId(game);
  if (detectStorefront(game) === Storefronts.Steam)
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${steamId}/header.jpg`;
  return null;
};

export const calculateDiscount = (game: Game) => {
  return (getPriceFloat(game) * (1 - game.discounts.discountPercent)).toFixed(
    2
  );
};

export const isDiscountValid = (game: Game): boolean => {
  if (!game.discounts) return false;
  const lastCheckedDate = game.discounts.lastChecked;
  return isWithinLast24Hours(new Date(lastCheckedDate));
};

function isWithinLast24Hours(date: Date): boolean {
  const staleHourCount = import.meta.env.VITE_STALE_HOUR_COUNT;
  const oneDayInMillis = staleHourCount * 60 * 60 * 1000;
  const now = Date.now();
  return now - date.getTime() < oneDayInMillis;
}
