import "./App.css";
import ErrorDisplay from "./components/ErrorDisplay";
import { Game } from "./entities/Game";
import { useGetGamesQuery } from "./store/gamesApi";

const App = () => {
  const { data, isLoading, error } = useGetGamesQuery();

  let content;

  if (isLoading) content = <div>Loading...</div>;
  else if (error) content = <ErrorDisplay error={error} />;
  else
    content = (
      <div>
        <ul>
          {data?.map((game: Game) => (
            <li>{game.Title}</li>
          ))}
        </ul>
      </div>
    );

  return content;
};

export default App;
