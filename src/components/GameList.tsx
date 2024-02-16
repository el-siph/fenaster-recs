import { Game } from "../entities/Game";
import { getFilteredGames } from "../functions";
import { useGetGamesQuery } from "../store/gamesApi";
import ErrorDisplay from "./ErrorDisplay";
import GameListItem from "./GameListItem";

const GameList = () => {
  const { data, isLoading, error } = useGetGamesQuery();

  let content;

  if (isLoading) content = <div>Loading...</div>;
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
