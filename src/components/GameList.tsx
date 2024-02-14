import { getFilteredGames } from "../functions";
import { useGetGamesQuery } from "../store/gamesApi";
import { useAppSelector } from "../store/hooks";
import ErrorDisplay from "./ErrorDisplay";
import GameListItem from "./GameListItem";

const GameList = () => {
  const { data, isLoading, error } = useGetGamesQuery();
  const { activeGame, columnCount } = useAppSelector((state) => state.gameList);

  let content;

  if (isLoading) content = <div>Loading...</div>;
  else if (error) content = <ErrorDisplay error={error} />;
  else {
    const filteredGames = getFilteredGames(data!);

    if (filteredGames.length < 1)
      content = <div className="w-3/4">No games match this criteria.</div>;
    else
      content = (
        <div className={`grid grid-cols-${columnCount} gap-3`}>
          {filteredGames?.map((game) => (
            <GameListItem
              key={game.id}
              game={game}
              isActive={game.id === activeGame?.id}
            />
          ))}
        </div>
      );
  }

  return content;
};

export default GameList;
