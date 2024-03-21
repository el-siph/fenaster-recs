import { CiImageOff } from "react-icons/ci";
import { Game } from "../entities/Game";
import { getGameImageUrl } from "../helpers";

interface Props {
  game: Game;
}

const GameImage = ({ game }: Props) => {
  const gameUrl = getGameImageUrl(game);

  if (gameUrl === null)
    return (
      <div className="w-[135px] h-[63px] sm:w-[250px] sm:h-auto flex flex-row justify-center">
        <CiImageOff className="h-full w-[50px]" />
      </div>
    );
  else
    return (
      <img
        className="w-[135px] h-[63px] sm:w-[250px] sm:h-auto flex-none bg-gray-50"
        src={gameUrl}
        alt={`cover art for ${game.title}`}
      />
    );
};

export default GameImage;
