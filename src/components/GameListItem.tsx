import { useState } from "react";
import { Game } from "../entities/Game";
import { getLinkIcon, recByFriend } from "../functions";
import GameImage from "./GameImage";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  game: Game;
}

const GameListItem = ({ game }: Props) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);

  return (
    <li
      className={`flex justify-between gap-x-6 p-5 hover:shadow-lg transition-all ease-in hover:bg-gray-100 ${
        recByFriend(game) && "bg-cyan-100 hover:bg-cyan-200"
      } ${game.isAuthorized === false && "bg-gray-200 opacity-50"}`}
    >
      <div className="flex min-w-0 gap-x-4">
        <GameImage game={game} />
        <div className="min-w-0 flex-auto">
          <p className="flex flex-row items-center text-sm font-semibold leading-6 text-gray-900">
            {game.title}{" "}
            {game.storeLink && (
              <a className="ml-2" href={game.storeLink} target="_blank">
                {getLinkIcon(game)}
              </a>
            )}
          </p>
          {game.wasCompleted && (
            <p className="flex flex-row items-center text-xs font-semibold leading-6 text-gray-900">
              <FaCheckCircle className="mr-1" />
              Played
              {game.vodLink && (
                <a
                  href={game.vodLink}
                  className="flex flex-row"
                  target="_blank"
                >
                  <span className="underline ml-1">(Watch)</span>
                </a>
              )}
            </p>
          )}
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            Rec. by <span className="italic">{game.recBy}</span>
            {game.isSeconded && " (and others)"}
          </p>
          {game.recTo.toLowerCase() !== "both" && (
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              for {game.recTo}{" "}
            </p>
          )}
          {showNotes && game.notes?.length > 0 && (
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Note: {game.notes}{" "}
              <span
                className="underline cursor-pointer text-gray-700"
                onClick={() => setShowNotes(false)}
              >
                Hide Note
              </span>
            </p>
          )}
          {!showNotes && game.notes?.length > 0 && (
            <p
              className="mt-1 text-xs leading-5 text-gray-700 cursor-pointer underline"
              onClick={() => setShowNotes(true)}
            >
              Show Note
            </p>
          )}
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{game.genre}</p>
        {game.msrp.toLowerCase() !== "free" ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">{game.msrp}</p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <p className="text-xs leading-5 text-gray-500 font-bold">Free</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default GameListItem;
