import { FaExternalLinkAlt, FaSteamSymbol } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Game } from "../entities/Game";
import { recByFriend } from "../functions";
import { useAppDispatch } from "../store/hooks";
import { setActiveGame } from "../store/gameListSlice";

interface Props {
  game: Game;
  isActive: boolean;
}

const GameListItem = ({ game, isActive }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`h-auto p-5 border-2 shadow-md hover:shadow-lg rounded-lg cursor-zoom-in ${
        recByFriend(game) && "bg-cyan-200"
      } ${
        isActive &&
        "col-span-2 row-span-2 items-center justify-center cursor-zoom-out"
      }`}
      onClick={() => dispatch(setActiveGame(game))}
    >
      <h2 className="font-bold text-lg text-center mb-5">
        <span className="flex flex-row justify-between">
          {game.title}
          <a href={game.storeLink} target="_blank">
            {game.storeLink.includes("steampowered") ? (
              <FaSteamSymbol />
            ) : (
              <FaExternalLinkAlt />
            )}
          </a>
        </span>
      </h2>
      <p className="text-md italic">{game.genre}</p>
      <p className="text-md italic">Price: {game.msrp}</p>
      <p className="text-md">
        Recommended by <span className="italic">{game.recBy}</span>
        {game.isSeconded && <span> (and others)</span>}
      </p>
      {isActive && (
        <>
          <p className="text-md">{game.userScore}</p>
          {game.hasEnglishVO && <p className="text-md ">No English VO</p>}
          {game.notes.length > 0 && (
            <p className="text-md">Note: {game.notes}</p>
          )}
        </>
      )}
      {game.wasCompleted && (
        <span className="flex flex-row align-middle">
          <IoMdCheckmarkCircle />
          <a className="underline" href={"#"}>
            Watch VOD
          </a>
        </span>
      )}
    </div>
  );
};

export default GameListItem;
