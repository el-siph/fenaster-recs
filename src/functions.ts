import { Game } from "./entities/Game";
import { FriendsOfFenAster } from "./store/preferenceSlice";

export const recByFriend = (game: Game): boolean =>
  FriendsOfFenAster.includes(game.recBy);
