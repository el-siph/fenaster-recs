import "./App.css";
import PreferenceBar from "./PreferenceBar";
import GameList from "./components/GameList";

const App = () => {
  return (
    <div className="container flex flex-row mx-auto my-10 justify-between">
      <GameList />
      <PreferenceBar />
    </div>
  );
};

export default App;
