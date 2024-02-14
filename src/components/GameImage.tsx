import { Game } from "../entities/Game";
import { getGameImageUrl } from "../functions";

interface Props {
  game: Game;
}

const GameImage = ({ game }: Props) => {
  const gameUrl = getGameImageUrl(game);

  if (gameUrl === null) return null;
  else
    return (
      <img
        className="h-12 flex-none bg-gray-50"
        src={gameUrl}
        alt={`cover art for ${game.title}`}
      />
    );
};

export default GameImage;
