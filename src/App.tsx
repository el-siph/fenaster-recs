import "./App.css";
import GameGrid from "./components/GameGrid";
import GameList from "./components/GameList";
import PreferenceBar from "./components/PreferenceBar";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const { displayType } = useAppSelector((state) => state.gameList);

  return (
    <div className="container mx-auto my-10">
      <div className="w-3/4">
        {displayType === "grid" ? <GameGrid /> : <GameList />}
      </div>
      <div className={`fixed right-0 top-0 w-1/4`}>
        <PreferenceBar />
      </div>
    </div>
  );
};

export default App;
