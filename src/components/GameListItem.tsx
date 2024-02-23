import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Game } from "../entities/Game";
import {
  calculateDiscount,
  getLinkIcon,
  isDiscountValid,
  recByFriend,
} from "../helpers";
import GameImage from "./GameImage";

interface Props {
  game: Game;
}

const GameListItem = ({ game }: Props) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);

  return (
    <li
      className={`flex justify-between gap-x-6 p-5 transition-all ease-in hover:bg-gray-100 hover:shadow-lg ${
        recByFriend(game) && "bg-cyan-100 hover:bg-cyan-200"
      }`}
    >
      <div className="flex min-w-0 gap-x-4">
        <GameImage game={game} />
        <div className="min-w-0 flex-auto">
          <p className="flex flex-row items-center text-sm font-semibold leading-6 text-gray-900">
            {game.title}{" "}
            {game.storeLink && (
              <>
                <a className="ml-2" href={game.storeLink} target="_blank">
                  {getLinkIcon(game)}
                </a>
              </>
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
                  <span className="ml-1 underline">(Watch)</span>
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
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {game.userScore}
          </p>
          {showNotes && game.notes && (
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Note: {game.notes}{" "}
              <span
                className="cursor-pointer text-gray-700 underline"
                onClick={() => setShowNotes(false)}
              >
                Hide Note
              </span>
            </p>
          )}
          {!showNotes && game.notes && (
            <p
              className="mt-1 cursor-pointer text-xs leading-5 text-gray-700 underline"
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
          <>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              <span
                className={`
                ${isDiscountValid(game) && "line-through"}`}
              >
                {game.msrp}
              </span>
              {isDiscountValid(game) && (
                <span
                  className={`bold ml-1 mt-1 text-xs leading-5 text-green-500`}
                >
                  ${calculateDiscount(game)}
                </span>
              )}
            </p>
          </>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <p className="text-xs font-bold leading-5 text-gray-500">Free</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default GameListItem;
