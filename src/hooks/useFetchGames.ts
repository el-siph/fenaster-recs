import { useGetGamesQuery } from "../store/gamesApi";
import { useTestGetGamesQuery } from "../store/gamesTestApi";
import { useAppSelector } from "../store/hooks";

const useGamesList = () => {
  const useTestApi = useAppSelector((state) => state.gameList.useTestApi);
  const { data, isLoading, error } = useTestApi
    ? useTestGetGamesQuery()
    : useGetGamesQuery();
  return {
    data,
    isLoading,
    error,
  };
};

export default useGamesList;
