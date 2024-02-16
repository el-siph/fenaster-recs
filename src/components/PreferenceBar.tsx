import { useRef } from "react";
import {
  SortByType,
  setColumnCount,
  setSearchTerm,
  setShowCompleted,
  setShowOnlyFriends,
  setShowingAddGameModal,
  setShowingUnapproved,
  setSortBy,
  setSortResultsDecending,
} from "../store/gameListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AddGameModal from "./AddGameModal";

const PreferenceBar = () => {
  const {
    displayType,
    columnCount,
    showCompleted,
    showOnlyFriends,
    sortBy,
    isShowingAddGameModal,
    isShowingUnapproved,
    sortResultsDescending,
  } = useAppSelector((state) => state.gameList);
  const dispatch = useAppDispatch();

  const columnCountInput = useRef<HTMLInputElement | null>(null);
  const showCompletedInput = useRef<HTMLInputElement | null>(null);
  const showOnlyFriendsInput = useRef<HTMLInputElement | null>(null);
  const searchTermInput = useRef<HTMLInputElement | null>(null);
  const sortBySelect = useRef<HTMLSelectElement | null>(null);

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

  const handleSuggestGameClick = () => {
    dispatch(setShowingAddGameModal(true));
  };

  const handleShowUnapprovedChange = () => {
    dispatch(setShowingUnapproved(!isShowingUnapproved));
  };

  const handleSetSortResults = (value: string) => {
    dispatch(setSortResultsDecending(value === "true"));
  };

  return (
    <div className="shadow w-full h-screen py-10 px-10">
      <button
        onClick={handleSuggestGameClick}
        className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 ${
          isShowingAddGameModal && "cursor-not-allowed opacity-50"
        }`}
      >
        Suggest Game
      </button>

      <AddGameModal />

      <div className={`flex flex-col gap-1 mt-5`}>
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
          Show Friend Recs Only
        </label>
        <label className="flex flex-row cursor-pointer">
          <input
            ref={showOnlyFriendsInput}
            className="mr-1 cursor-pointer"
            type="checkbox"
            checked={isShowingUnapproved}
            onChange={handleShowUnapprovedChange}
          />
          Show Unapproved Recs
        </label>
        <label className="flex flex-row mt-10">Search By Title</label>
        <input
          ref={searchTermInput}
          className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          onChange={handleSearchTermChange}
        />
        <label>Sort By</label>
        <select
          className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={sortBy}
          onChange={handleSortByChange}
          ref={sortBySelect}
        >
          <option value={"title"}>Title</option>
          <option value={"genre"}>Genre</option>
          <option value={"price"}>Retail Price</option>
        </select>
        <label>
          <input
            className="mr-1 mt-4"
            type="radio"
            value="true"
            onChange={(e) => handleSetSortResults(e.target.value)}
            checked={sortResultsDescending}
          />
          Descending
        </label>
        <label>
          <input
            className="mr-1"
            type="radio"
            value="false"
            onChange={(e) => handleSetSortResults(e.target.value)}
            checked={!sortResultsDescending}
          />
          Ascending
        </label>
      </div>
    </div>
  );
};

export default PreferenceBar;
