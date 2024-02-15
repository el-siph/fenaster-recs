import { getFilteredGames } from "../functions";
import { useGetGamesQuery } from "../store/gamesApi";
import ErrorDisplay from "./ErrorDisplay";
import GameListItem from "./GameListItem";

const GameList = () => {
  const { data, isLoading, error } = useGetGamesQuery();

  let content;

  if (isLoading) content = <div>Loading...</div>;
  else if (error) content = <ErrorDisplay error={error} />;
  else {
    const filteredGames = getFilteredGames(data!);
    content = (
      <ul role="list" className="divide-y divide-gray-10 shadow">
        {filteredGames?.map((game) => (
          <GameListItem game={game} key={game.id} />
        ))}
      </ul>
    );
  }

  return content;
};

export default GameList;
