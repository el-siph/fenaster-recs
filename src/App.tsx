import { Toaster } from "react-hot-toast";
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
        <div className="hidden sm:show w-3/4 fixed bottom-0 h-10 opacity-50 bg-white sm:flex flex-row justify-center items-center">
          <p className="">
            Developed by{" "}
            <a
              href="https://github.com/el-siph/fenaster-recs"
              className="underline hover:no-underline"
              target="_blank"
            >
              Siph
            </a>
          </p>
        </div>
      </div>
      <div className={`hidden sm:block sm:fixed right-0 top-0 sm:w-1/4`}>
        <PreferenceBar />
        <Toaster
          position="top-center"
          toastOptions={{
            className: "bg-green-400 text-white",
          }}
        />
      </div>
    </div>
  );
};

export default App;
