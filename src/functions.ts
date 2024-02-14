import { Game } from "./entities/Game";
import { FriendsOfFenAster } from "./store/preferenceSlice";
import { store } from "./store/store";

export const recByFriend = (game: Game): boolean =>
  FriendsOfFenAster.includes(game.recBy);

export const getFilteredGames = (games: Game[]): Game[] => {
  const { showCompleted, showRecsTo, showRecsBy, showOnlyFriends, searchTerm } =
    store.getState().preference;

  let filteredGames = [...games];

  if (!showCompleted)
    filteredGames = filteredGames.filter((game) => !game.wasCompleted);

  if (showRecsTo !== "both")
    filteredGames = filteredGames.filter((game) =>
      showRecsTo.includes(game.recTo)
    );

  if (showRecsBy.length > 0)
    filteredGames = filteredGames.filter((game) =>
      showRecsBy.includes(game.recBy)
    );

  if (showOnlyFriends)
    filteredGames = filteredGames.filter((game) => recByFriend(game));

  if (searchTerm.length > 3)
    filteredGames = filteredGames.filter((game) =>
      game.title.includes(searchTerm)
    );

  return filteredGames;
};
