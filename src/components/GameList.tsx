import { useGetGamesQuery } from "../store/gamesApi";
import ErrorDisplay from "./ErrorDisplay";
import GameListItem from "./GameListItem";

const GameList = () => {
  const { data, isLoading, error } = useGetGamesQuery();

  let content;

  if (isLoading) content = <div>Loading...</div>;
  else if (error) content = <ErrorDisplay error={error} />;
  else
    content = (
      <div className="grid grid-cols-5 gap-3">
        {data?.map((game) => (
          <GameListItem game={game} />
        ))}
      </div>
    );

  return content;
};

export default GameList;
