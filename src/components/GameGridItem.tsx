import { IoMdCheckmarkCircle } from "react-icons/io";
import { Game } from "../entities/Game";
import { getLinkIcon, recByFriend } from "../functions";
import { useAppDispatch } from "../store/hooks";
import { setActiveGame } from "../store/gameListSlice";

interface Props {
  game: Game;
  isActive: boolean;
}

const GameGridItem = ({ game, isActive }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`h-auto cursor-zoom-in rounded-lg border-2 p-5 shadow-md hover:shadow-lg ${
        recByFriend(game) && "bg-cyan-200"
      } ${
        isActive &&
        "col-span-2 row-span-2 cursor-zoom-out items-center justify-center"
      }`}
      onClick={() => dispatch(setActiveGame(game))}
    >
      <h2 className="mb-5 text-center text-lg font-bold">
        <span className="flex flex-row justify-between">
          {game.title}
          {game.storeLink && (
            <a href={game.storeLink} target="_blank">
              {getLinkIcon(game)}
            </a>
          )}
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
          {game.notes && <p className="text-md">Note: {game.notes}</p>}
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

export default GameGridItem;
