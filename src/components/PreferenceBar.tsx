import { useRef } from "react";
import { IoClose, IoSettings } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  SortByType,
  setColumnCount,
  setSearchTerm,
  setShowCompleted,
  setShowOnlyFriends,
  setShowPreferenceBar,
  setSortBy,
} from "../store/gameListSlice";

const PreferenceBar = () => {
  const {
    displayType,
    columnCount,
    showPreferenceBar,
    showCompleted,
    showOnlyFriends,
    sortBy,
  } = useAppSelector((state) => state.gameList);
  const dispatch = useAppDispatch();

  const columnCountInput = useRef<HTMLInputElement | null>(null);
  const showCompletedInput = useRef<HTMLInputElement | null>(null);
  const showOnlyFriendsInput = useRef<HTMLInputElement | null>(null);
  const searchTermInput = useRef<HTMLInputElement | null>(null);
  const sortBySelect = useRef<HTMLSelectElement | null>(null);

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

  const handleSearchTermChange = () => {
    const newSearchTerm = searchTermInput?.current?.value;
    dispatch(setSearchTerm(newSearchTerm ?? ""));
  };

  const handleSortByChange = () => {
    const newSortBy: SortByType = sortBySelect?.current?.value ?? "title";
    dispatch(setSortBy(newSortBy));
  };

  return (
    <div className="shadow w-full h-screen py-10 px-10">
      <div className={`flex flex-row justify-start`}>
        <button onClick={handleShowPreferenceChange}>
          {!showPreferenceBar ? (
            <span className="flex flex-row items-center gap-2 mr-2">
              <IoSettings />
              Settings
            </span>
          ) : (
            <span className="flex flex-row items-center">
              <IoClose />
              Close
            </span>
          )}
        </button>
      </div>
      <div
        className={`flex flex-col gap-1 mt-5 ${!showPreferenceBar && "hidden"}`}
      >
        {displayType === "grid" && (
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
        )}
        <label className="flex flex-row cursor-pointer">
          <input
            ref={showCompletedInput}
            className="mr-1 cursor-pointer"
            type="checkbox"
            checked={showCompleted}
            onChange={handleShowCompletedChange}
          />
          Show Completed
        </label>
        <label className="flex flex-row cursor-pointer">
          <input
            ref={showOnlyFriendsInput}
            className="mr-1 cursor-pointer"
            type="checkbox"
            checked={showOnlyFriends}
            onChange={handleShowOnlyFriendsChange}
          />
          Only Friend Recs
        </label>
        <label className="flex flex-row">
          <input
            ref={searchTermInput}
            type="text"
            placeholder="Search by title..."
            onChange={handleSearchTermChange}
          />
        </label>
        <label>Sort By</label>
        <select value={sortBy} onChange={handleSortByChange} ref={sortBySelect}>
          <option value={"title"}>Title</option>
          <option value={"genre"}>Genre</option>
          <option value={"price"}>Retail Price</option>
        </select>
      </div>
    </div>
  );
};

export default PreferenceBar;
