import { Game } from "./entities/Game";
import {
  getPriceFloat,
  isDiscountValid,
  isHasEnglishVO,
  recByFriend,
} from "./helpers";
import { DisplayTabs, RecsToType, SortByType } from "./store/gameListSlice";
import { store } from "./store/store";

export const getFilteredGames = (games: Game[]): Game[] => {
  const {
    showRecsBy,
    showOnlyFriends,
    hideEnglishVO,
    searchTerm,
    sortResultsDescending,
    currentDisplayTab,
  } = store.getState().gameList;

  let filteredGames = [...games];
  filteredGames = filterByCompleted(filteredGames);
  filteredGames = sortGamesBy(filteredGames);
  filteredGames = filterGamesByDisplayTab(currentDisplayTab, filteredGames);

  if (showRecsBy.length > 0)
    filteredGames = filteredGames.filter((game) =>
      showRecsBy.includes(game.recBy),
    );

  if (showOnlyFriends)
    filteredGames = filteredGames.filter((game) => recByFriend(game));

  if (hideEnglishVO)
    filteredGames = filteredGames.filter((game) => isHasEnglishVO(game));

  if (searchTerm.length > 1)
    filteredGames = filteredGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  if (!sortResultsDescending) filteredGames = filteredGames.reverse();

  return filteredGames;
};

const filterByCompleted = (filteredGames: Game[]): Game[] => {
  const { showRecsTo } = store.getState().gameList;

  switch (showRecsTo) {
    case RecsToType.both:
      break;
    case RecsToType.aster:
      filteredGames = filteredGames.filter(
        (game) => !game.recTo.toLowerCase().includes(RecsToType.fen.toString()),
      );
      break;
    case RecsToType.asterOnly:
      filteredGames = filteredGames.filter((game) =>
        game.recTo.toLowerCase().includes(RecsToType.aster.toString()),
      );
      break;
    case RecsToType.fen:
      filteredGames = filteredGames.filter(
        (game) =>
          !game.recTo.toLowerCase().includes(RecsToType.aster.toString()),
      );
      break;
    case RecsToType.fenOnly:
      filteredGames = filteredGames.filter((game) =>
        game.recTo.toLowerCase().includes(RecsToType.fen.toString()),
      );
      break;
    default:
      break;
  }

  return filteredGames;
};

const sortGamesBy = (filteredGames: Game[]): Game[] => {
  const { sortBy } = store.getState().gameList;

  switch (sortBy) {
    case SortByType.title:
      filteredGames = filteredGames.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      break;
    case SortByType.genre:
      filteredGames = filteredGames.sort((a, b) =>
        a.genre.toLowerCase().localeCompare(b.genre!.toLowerCase()),
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
      games = games.filter((game) => !game.wasCompleted);
      break;
    case DisplayTabs.pending:
      games = games.filter((game) => !game.isAuthorized);
      games = games.filter((game) => !game.wasCompleted);
      break;
    case DisplayTabs.onSale:
      games = games.filter((game) => isDiscountValid(game));
      games = games.filter((game) => !game.wasCompleted);
      break;
    case DisplayTabs.completed:
      games = games.filter((game) => game.wasCompleted);
      break;
    default:
      games = games.filter((game) => game.isAuthorized);
      games = games.filter((game) => !game.wasCompleted);
      break;
  }

  return games;
};
