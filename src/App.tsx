import "./App.css";
import GameGrid from "./components/GameGrid";
import GameList from "./components/GameList";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import PreferenceBar from "./components/PreferenceBar";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const { displayType } = useAppSelector((state) => state.gameList);

  return (
    <div className="container mx-auto sm:my-10">
      <div className="sm:w-3/4">
        <div className="hidden sm:block">
          <Header />
        </div>
        <div className="sm:hidden">
          <HeaderMobile />
        </div>
        <div className="mt-14 sm:mt-0">
          {displayType === "grid" ? <GameGrid /> : <GameList />}
        </div>
      </div>
      <div className={`hidden sm:fixed right-0 top-0 sm:w-1/4`}>
        <PreferenceBar />
      </div>
    </div>
  );
};

export default App;
