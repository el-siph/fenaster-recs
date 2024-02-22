import { Game } from "../entities/Game";
import { getFilteredGames } from "../functions";
import { useGetGamesQuery } from "../store/gamesApi";
import { useTestGetGamesQuery } from "../store/gamesTestApi";
import { useAppSelector } from "../store/hooks";
import ErrorDisplay from "./ErrorDisplay";
import GameListItem from "./GameListItem";
import LoadingSymbol from "./LoadingSymbol";

const GameList = () => {
  const useTestApi = useAppSelector((state) => state.gameList.useTestApi);
  const { data, isLoading, error } = useTestApi
    ? useTestGetGamesQuery()
    : useGetGamesQuery();

  let content;

  if (isLoading) content = <LoadingSymbol />;
  else if (error) content = <ErrorDisplay error={error} />;
  else if (data) {
    const filteredGames = getFilteredGames(data as Game[]);
    if (filteredGames.length > 0)
      content = (
        <ul
          role="list"
          className="divide-gray-20 flex flex-col divide-y shadow"
        >
          {filteredGames?.map((game) => (
            <GameListItem game={game} key={game.id} />
          ))}
        </ul>
      );
    else
      content = (
        <div className="text-center">No games match your criteria.</div>
      );
  } else content = <div>Received no data.</div>;

  return content;
};

export default GameList;
