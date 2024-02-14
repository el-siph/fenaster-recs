import { recByFriend } from "../functions";
import { useGetGamesQuery } from "../store/gamesApi";
import { useAppSelector } from "../store/hooks";
import { FriendsOfFenAster } from "../store/preferenceSlice";
import ErrorDisplay from "./ErrorDisplay";
import GameListItem from "./GameListItem";

const GameList = () => {
  const { data, isLoading, error } = useGetGamesQuery();
  const {
    showCompleted,
    showRecsTo,
    showRecsBy,
    showOnlyFriends,
    columnCount,
  } = useAppSelector((state) => state.preference);

  let content;

  if (isLoading) content = <div>Loading...</div>;
  else if (error) content = <ErrorDisplay error={error} />;
  else {
    // filter games based on selected preferences
    let filteredGames = [...data!];
    if (!showCompleted)
      filteredGames = filteredGames!.filter((game) => !game.wasCompleted);
    if (showRecsTo !== "both")
      filteredGames = filteredGames!.filter((game) =>
        showRecsTo.includes(game.recTo)
      );

    if (showRecsBy.length > 0) {
      filteredGames = filteredGames!.filter((game) =>
        showRecsBy.includes(game.recBy)
      );
    }

    if (showOnlyFriends)
      filteredGames = filteredGames!.filter((game) => recByFriend(game));

    content = (
      <div className={`grid grid-cols-${columnCount} gap-3`}>
        {filteredGames?.map((game) => (
          <GameListItem key={game.id} game={game} />
        ))}
      </div>
    );
  }

  return content;
};

export default GameList;
