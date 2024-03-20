import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import { Game } from "../entities/Game";
import {
  setActiveGame,
  setShowingAddVodLinkModal,
} from "../store/gameListSlice";
import {
  useMarkAuthorizedMutation,
  useMarkCompleteMutation,
  useRemoveGameMutation,
} from "../store/gamesApi";
import { useAppDispatch } from "../store/hooks";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdAddLink } from "react-icons/md";

interface Props {
  game: Game;
}

const GameListActions = ({ game }: Props) => {
  const dispatch = useAppDispatch();
  const [markAuthorized] = useMarkAuthorizedMutation();
  const [markComplete] = useMarkCompleteMutation();
  const [markDeleted] = useRemoveGameMutation();

  const handleAuthorized = () => {
    markAuthorized(game);
  };

  const handleRejected = () => {
    markDeleted(game);
  };

  const handleCompleted = () => {
    markComplete(game);
  };

  const handleVodLink = () => {
    dispatch(setActiveGame(game));
    dispatch(setShowingAddVodLinkModal(true));
  };

  return (
    <p className="flex flex-col gap-1 my-2 ml-2">
      {!game.isAuthorized && (
        <>
          <a
            className="flex flex-row cursor-pointer text-sm hover:underline"
            onClick={handleAuthorized}
          >
            <LuThumbsUp className="m-1 ml-0" />
            Approve
          </a>
          <a
            className="flex flex-row cursor-pointer text-sm hover:underline"
            onClick={handleRejected}
          >
            <LuThumbsDown className="m-1 ml-0" />
            Reject
          </a>
        </>
      )}
      {!game.wasCompleted && game.isAuthorized && (
        <a
          className="flex flex-row cursor-pointer text-sm hover:underline"
          onClick={handleCompleted}
        >
          <IoIosCheckmarkCircleOutline className="m-1 ml-0" />
          Mark Complete
        </a>
      )}
      {game.wasCompleted && !game.vodLink && (
        <a
          className="flex flex-row cursor-pointer text-sm hover:underline"
          onClick={handleVodLink}
        >
          <MdAddLink className="m-1 ml-0" />
          Add VOD
        </a>
      )}
    </p>
  );
};

export default GameListActions;
