import { Game } from "../entities/Game";
import { getFilteredGames } from "../functions";
import useFetchGames from "../hooks/useFetchGames";
import { useAppSelector } from "../store/hooks";
import ErrorDisplay from "./ErrorDisplay";
import GameGridItem from "./GameGridItem";

const GameGrid = () => {
  const { data, isLoading, error } = useFetchGames();
  const { activeGame, columnCount } = useAppSelector((state) => state.gameList);

  let content;

  if (isLoading) content = <div>Loading...</div>;
  else if (error) content = <ErrorDisplay error={error} />;
  else if (data) {
    const filteredGames = getFilteredGames(data as Game[]);

    if (filteredGames.length < 1)
      content = <div className="w-3/4">No games match this criteria.</div>;
    else
      content = (
        <div className={`grid grid-cols-${columnCount} gap-3`}>
          {filteredGames?.map((game) => (
            <GameGridItem
              key={game.id}
              game={game}
              isActive={game.id === activeGame?.id}
            />
          ))}
        </div>
      );
  } else content = <div>Error loading Grid.</div>;

  return content;
};

export default GameGrid;
