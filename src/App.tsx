import "./App.css";
import GameGrid from "./components/GameGrid";
import GameList from "./components/GameList";
import PreferenceBar from "./components/PreferenceBar";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const { displayType } = useAppSelector((state) => state.gameList);

  return (
    <div className="container mx-auto my-10 flex flex-row justify-between">
      {displayType === "grid" ? <GameGrid /> : <GameList />}
      <PreferenceBar />
    </div>
  );
};

export default App;
