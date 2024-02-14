import { useRef } from "react";
import { IoClose, IoSettings } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  setColumnCount,
  setShowCompleted,
  setShowOnlyFriends,
  setShowPreferenceBar,
} from "./store/preferenceSlice";

const PreferenceBar = () => {
  const { columnCount, showPreferenceBar, showCompleted, showOnlyFriends } =
    useAppSelector((state) => state.preference);
  const dispatch = useAppDispatch();

  const columnCountInput = useRef<HTMLInputElement | null>(null);
  const showCompletedInput = useRef<HTMLInputElement | null>(null);
  const showOnlyFriendsInput = useRef<HTMLInputElement | null>(null);

  const handleShowPreferenceChange = () => {
    dispatch(setShowPreferenceBar(!showPreferenceBar));
  };

  const handleColumnCountChange = () => {
    const newColumnCount = columnCountInput?.current?.value;
    if (newColumnCount !== undefined)
      dispatch(setColumnCount(parseInt(newColumnCount)));
  };

  const handleShowCompletedChange = () => {
    dispatch(setShowCompleted(!showCompleted));
  };

  const handleShowOnlyFriendsChange = () => {
    dispatch(setShowOnlyFriends(!showOnlyFriends));
  };

  return (
    <>
      <div>
        <button onClick={handleShowPreferenceChange}>
          {!showPreferenceBar ? <IoSettings /> : <IoClose />}
        </button>
      </div>
      <div className={`flex flex-col ${!showPreferenceBar && "hidden"}`}>
        <h2>Preferences</h2>
        <label className="flex flex-row justify-between">
          Columns
          <input
            ref={columnCountInput}
            type="number"
            min={1}
            max={5}
            value={columnCount}
            onChange={handleColumnCountChange}
          />
        </label>
        <label className="flex flex-row">
          <input
            ref={showCompletedInput}
            type="checkbox"
            checked={showCompleted}
            onChange={handleShowCompletedChange}
          />
          Show Completed
        </label>
        <label className="flex flex-row">
          <input
            ref={showOnlyFriendsInput}
            type="checkbox"
            checked={showOnlyFriends}
            onChange={handleShowOnlyFriendsChange}
          />
          Only Friend Recs
        </label>
      </div>
    </>
  );
};

export default PreferenceBar;
