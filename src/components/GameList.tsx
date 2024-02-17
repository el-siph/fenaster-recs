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
    content = (
      <ul role="list" className="flex flex-col divide-y divide-gray-20 shadow">
        {filteredGames?.map((game) => (
          <GameListItem game={game} key={game.id} />
        ))}
      </ul>
    );
  } else content = <div>Received no data.</div>;

  return content;
};

export default GameList;
