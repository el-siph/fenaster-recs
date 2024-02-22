import { Game } from "./entities/Game";
import {
  DisplayTabs,
  FriendsOfFenAster,
  RecsToType,
  SortByType,
} from "./store/gameListSlice";
import { store } from "./store/store";
import { FaExternalLinkAlt, FaSteamSymbol } from "react-icons/fa";
import { Tables } from "./supabase";
import urlMetadata from "url-metadata";

export const enum Storefronts {
  Steam,
  Epic,
  Other,
}

export const recByFriend = (game: Game): boolean =>
  FriendsOfFenAster.includes(game.recBy);

export const getFilteredGames = (games: Game[]): Game[] => {
  const {
    showCompleted,
    showRecsTo,
    showRecsBy,
    showOnlyFriends,
    searchTerm,
    sortBy,
    sortResultsDescending,
    currentDisplayTab,
  } = store.getState().gameList;

  let filteredGames = [...games];

  if (!showCompleted)
    filteredGames = filteredGames.filter((game) => !game.wasCompleted);

  switch (showRecsTo) {
    case RecsToType.both:
      break;
    case RecsToType.aster:
      filteredGames = filteredGames.filter((game) =>
        game.recTo.toLowerCase().includes(RecsToType.aster.toString()),
      );
      break;
    case RecsToType.fen:
      filteredGames = filteredGames.filter((game) =>
        game.recTo.toLowerCase().includes(RecsToType.fen.toString()),
      );
      break;
    default:
      break;
  }

  if (showRecsBy.length > 0)
    filteredGames = filteredGames.filter((game) =>
      showRecsBy.includes(game.recBy),
    );

  if (showOnlyFriends)
    filteredGames = filteredGames.filter((game) => recByFriend(game));

  if (searchTerm.length > 1)
    filteredGames = filteredGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  switch (sortBy) {
    case SortByType.title:
      filteredGames = filteredGames.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      break;
    case SortByType.genre:
      filteredGames = filteredGames.sort((a, b) =>
        a.genre.toLowerCase().localeCompare(b.genre.toLowerCase()),
      );
      break;
    case SortByType.price:
      filteredGames = filteredGames.sort((a, b) => {
        const aCost = getPriceFloat(a);
        const bCost = getPriceFloat(b);
        return aCost - bCost;
      });
      break;
    default:
      filteredGames = filteredGames.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      break;
  }

  filteredGames = filterGamesByDisplayTab(currentDisplayTab, filteredGames);

  if (!sortResultsDescending) filteredGames = filteredGames.reverse();

  return filteredGames;
};

export const getFilteredGameCount = (
  tabName: DisplayTabs,
  games: Game[] | null,
): number => {
  if (games) return filterGamesByDisplayTab(tabName, games).length;
  else return 0;
};

const filterGamesByDisplayTab = (
  tabName: DisplayTabs,
  games: Game[],
): Game[] => {
  switch (tabName) {
    case DisplayTabs.approved:
      games = games.filter((game) => game.isAuthorized);
      break;
    case DisplayTabs.pending:
      games = games.filter((game) => !game.isAuthorized);
      break;
    // case DisplayTabs.onSale:
    //   filteredGames = filteredGames.filter((game) => !game.isAuthorized);
    //   break;
    default:
      games = games.filter((game) => game.isAuthorized);
      break;
  }

  return games;
};

const fetchSteamStoreLinkTitle = async (game: Game) => {
  if (detectStorefront(game) !== Storefronts.Steam) return false;

  try {
    const url = `${import.meta.env.VITE_CORS_PROXY}/${game.storeLink}`;
    const metadata = await urlMetadata(url, {
      requestHeaders: {
        origin: import.meta.env.VITE_ORIGIN_URL,
      },
    });
    return metadata.title;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchDiscount = async (game: Game) => {
  const title = await fetchSteamStoreLinkTitle(game);
  if (!title) return false;
  else if (!title.includes("Save ")) return false;
  else {
    let stringArr = title.split("Save ");
    stringArr = stringArr[1].split("%");
    const discountPercent = parseFloat(stringArr[0]) / 100;
    const newMSPR = (getPriceFloat(game) * (1 - discountPercent)).toFixed(2);
    return parseFloat(newMSPR);
  }
};

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

export const convertGamesTableToGameArray = (data: Tables<"games">[]) => {
  const games: Game[] = [];
  data.map((entry) => games.push(entry as Game));
  return games;
};
