import "./App.css";
import GameList from "./components/GameList";

const App = () => {
  return (
    <div className="container flex flex-col mx-auto my-10">
      <GameList />
    </div>
  );
};

export default App;
