import { Game } from "../entities/Game";
import { getLinkIcon, recByFriend } from "../functions";
import GameImage from "./GameImage";

interface Props {
  game: Game;
}

const GameListItem = ({ game }: Props) => (
  <li
    className={`flex justify-between gap-x-6 p-5 ${
      recByFriend(game) && "bg-cyan-200"
    }`}
  >
    <div className="flex min-w-0 gap-x-4">
      <GameImage game={game} />
      <div className="min-w-0 flex-auto">
        <p className="flex flex-row text-sm font-semibold leading-6 text-gray-900">
          {game.title}{" "}
          <a className="ml-2" href={game.storeLink} target="_blank">
            {getLinkIcon(game)}
          </a>
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          Rec. by <span className="italic">{game.recBy}</span>
          {game.isSeconded && " (and others)"}
        </p>
        {game.recTo.toLowerCase() !== "both" && (
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            for {game.recTo}{" "}
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

export default GameListItem;
