import { useGetGamesQuery } from "../store/gamesApi";
import ErrorDisplay from "./ErrorDisplay";

import { FaExternalLinkAlt } from "react-icons/fa";

const GameList = () => {
  const { data, isLoading, error } = useGetGamesQuery();

  let content;

  if (isLoading) content = <div>Loading...</div>;
  else if (error) content = <ErrorDisplay error={error} />;
  else
    content = (
      <div className="grid grid-cols-5 gap-3">
        {data?.map((game) => (
          <div
            className="h-auto p-5 border-2 shadow-md hover:shadow-lg rounded-lg cursor-pointer"
            key={game.Title}
          >
            <h2 className="font-bold text-lg text-center mb-5">
              <a
                className="justify-between"
                href={game["Store Link"]}
                target="_blank"
              >
                <span>
                  {game.Title} <FaExternalLinkAlt />
                </span>
              </a>
            </h2>
            <p className="text-md italic">{game.Genre}</p>
            <p className="text-md">
              Recommended by <span className="italic">{game["Rec. By"]}</span>
              {game["Seconded?"] && <span> (and others)</span>}
            </p>
            <p className="text-md">{game["User Score"]}</p>
            {game["English VO?"] && <p className="text-md ">No English VO</p>}
            {game.Notes.length > 0 && (
              <p className="text-md">Note: {game.Notes}</p>
            )}
          </div>
        ))}
      </div>
    );

  return content;
};

export default GameList;
