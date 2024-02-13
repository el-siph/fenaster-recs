import { FaExternalLinkAlt } from "react-icons/fa";
import { Game } from "../entities/Game";
import { useMarkCompleteMutation } from "../store/gamesApi";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Props {
  game: Game;
}

const GameListItem = ({ game }: Props) => {
  const [markComplete, markCompleteResult] = useMarkCompleteMutation();
  const [error, setError] = useState<
    FetchBaseQueryError | SerializedError | undefined
  >();

  const handleMarkCompleted = () => {
    markComplete(game);

    if (markCompleteResult.error) setError(markCompleteResult.error);
  };

  return (
    <div
      className="h-auto p-5 border-2 shadow-md hover:shadow-lg rounded-lg cursor-pointer"
      key={game.id}
    >
      <h2 className="font-bold text-lg text-center mb-5">
        <a className="justify-between" href={game.storeLink} target="_blank">
          <span>
            {game.title} <FaExternalLinkAlt />
          </span>
        </a>
      </h2>
      <p className="text-md italic">{game.genre}</p>
      <p className="text-md">
        Recommended by <span className="italic">{game.recBy}</span>
        {game.recTo && <span> (and others)</span>}
      </p>
      <p className="text-md">{game.userScore}</p>
      {game.hasEnglishVO && <p className="text-md ">No English VO</p>}
      {game.notes.length > 0 && <p className="text-md">Note: {game.notes}</p>}
      {error && <p>Error marking complete.</p>}
      <button className="btn" onClick={handleMarkCompleted}>
        Completed
      </button>
    </div>
  );
};

export default GameListItem;
