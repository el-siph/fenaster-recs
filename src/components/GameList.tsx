import { Game } from "../entities/Game";
import { getFilteredGames } from "../filters";
import { isDiscountValid } from "../helpers";
import useFetchGames from "../hooks/useFetchGames";
import { DisplayTabs } from "../store/gameListSlice";
import { useAppSelector } from "../store/hooks";
import ErrorDisplay from "./ErrorDisplay";
import GameListItem from "./GameListItem";
import LoadingSymbol from "./LoadingSymbol";

const GameList = () => {
  const {
    data: games,
    isLoading: isLoadingGames,
    error: isErrorGames,
  } = useFetchGames();

  const { currentDisplayTab } = useAppSelector((state) => state.gameList);

  let content;

  if (isLoadingGames) content = <LoadingSymbol />;
  else if (isErrorGames) content = <ErrorDisplay error={isErrorGames} />;
  else if (games) {
    let filteredGames = getFilteredGames(games as Game[]);

    if (currentDisplayTab === DisplayTabs.onSale) {
      filteredGames = filteredGames.filter((game) => isDiscountValid(game));
    }

    if (filteredGames.length > 0) {
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
    } else
      content = (
        <div className="text-center">No games match your criteria.</div>
      );
  } else content = <div>Received no data.</div>;

  return content;
};

export default GameList;
