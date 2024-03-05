import { useRef } from "react";
import {
  RecsToType,
  SortByType,
  setColumnCount,
  setSearchTerm,
  setShowOnlyFriends,
  setShowRecsTo,
  setShowingAddGameModal,
  setSortBy,
  setSortResultsDecending,
} from "../store/gameListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AddGameModal from "./AddGameModal";

const PreferenceBar = () => {
  const {
    displayType,
    columnCount,
    showOnlyFriends,
    sortBy,
    isShowingAddGameModal,
    sortResultsDescending,
    showRecsTo,
  } = useAppSelector((state) => state.gameList);
  const dispatch = useAppDispatch();

  const columnCountInput = useRef<HTMLInputElement | null>(null);
  const showOnlyFriendsInput = useRef<HTMLInputElement | null>(null);
  const searchTermInput = useRef<HTMLInputElement | null>(null);
  const sortBySelect = useRef<HTMLSelectElement | null>(null);
  const recToSelect = useRef<HTMLSelectElement | null>(null);

  const handleColumnCountChange = () => {
    const newColumnCount = columnCountInput?.current?.value;
    if (newColumnCount !== undefined)
      dispatch(setColumnCount(parseInt(newColumnCount)));
  };

  const handleShowOnlyFriendsChange = () => {
    dispatch(setShowOnlyFriends(!showOnlyFriends));
  };

  const handleSearchTermChange = () => {
    const newSearchTerm = searchTermInput?.current?.value;
    dispatch(setSearchTerm(newSearchTerm ?? ""));
  };

  const handleSortByChange = () => {
    let newSortBy;
    if (sortBySelect.current?.value?.toString() === SortByType.title.toString())
      newSortBy = SortByType.title;
    if (sortBySelect.current?.value?.toString() === SortByType.genre.toString())
      newSortBy = SortByType.genre;
    if (sortBySelect.current?.value?.toString() === SortByType.price.toString())
      newSortBy = SortByType.price;
    dispatch(setSortBy(newSortBy ?? SortByType.title));
  };

  const handleRecsByChange = () => {
    let newRecTo;
    if (
      recToSelect.current?.value?.toLowerCase().toString() ===
      RecsToType.both.toLowerCase().toString()
    )
      newRecTo = RecsToType.both;
    else if (
      recToSelect.current?.value?.toLowerCase().toString() ===
      RecsToType.aster.toLowerCase().toString()
    )
      newRecTo = RecsToType.aster;
    else if (
      recToSelect.current?.value?.toLowerCase().toString() ===
      RecsToType.fen.toLowerCase().toString()
    )
      newRecTo = RecsToType.fen;
    dispatch(setShowRecsTo(newRecTo ?? RecsToType.both));
  };

  const handleSuggestGameClick = () => {
    dispatch(setShowingAddGameModal(true));
  };

  const handleSetSortResults = (value: string) => {
    dispatch(setSortResultsDecending(value === "true"));
  };

  return (
    <div className="h-screen w-full px-10 py-10 shadow">
      {import.meta.env.VITE_USE_TEST_API === "true" && (
        <p className="font-bold">Test Mode</p>
      )}

      <button
        onClick={handleSuggestGameClick}
        className={`mb-5 rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100 ${
          isShowingAddGameModal && "cursor-not-allowed opacity-50"
        }`}
      >
        Suggest Game
      </button>

      <AddGameModal />

      <div className={`mt-5 flex flex-col gap-1`}>
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
        <label className="flex cursor-pointer flex-row">
          <input
            ref={showOnlyFriendsInput}
            className="mr-1 cursor-pointer"
            type="checkbox"
            checked={showOnlyFriends}
            onChange={handleShowOnlyFriendsChange}
          />
          Show Friend Recs Only
        </label>
        <label className="mt-10 flex flex-row">Search By Title</label>
        <input
          ref={searchTermInput}
          className="mb-3 block w-full appearance-none rounded border border-gray-500 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          type="text"
          onChange={handleSearchTermChange}
        />
        <label>Suggestions for</label>
        <select
          className="focus:shadow-outline block appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
          value={showRecsTo}
          onChange={handleRecsByChange}
          ref={recToSelect}
        >
          <option value={RecsToType.both}>Both</option>
          <option value={RecsToType.aster}>Aster</option>
          <option value={RecsToType.fen}>Fenrir</option>
        </select>
        <label>Sort By</label>
        <select
          className="focus:shadow-outline block appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
          value={sortBy}
          onChange={handleSortByChange}
          ref={sortBySelect}
        >
          <option value={SortByType.title}>Title</option>
          <option value={SortByType.genre}>Genre</option>
          <option value={SortByType.price}>Retail Price</option>
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
