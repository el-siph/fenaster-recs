import { useRef, useState } from "react";
import { navItem, navigation } from "../constants";
import { Game } from "../entities/Game";
import { getFilteredGameCount } from "../filters";
import {
  RecsToType,
  setCurrentDisplayTab,
  setShowingAddGameModal,
  setShowRecsTo,
} from "../store/gameListSlice";
import { useGetGamesQuery } from "../store/gamesApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: games } = useGetGamesQuery();

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const isItemDisabled = (item: navItem) => {
    return (
      item.disabled ||
      getFilteredGameCount(item.tabName, (games as Game[]) ?? null) < 1
    );
  };

  const handleSelectTab = (item: navItem) => {
    setIsOpen(false);
    dispatch(setCurrentDisplayTab(item.tabName));
  };

  const dispatch = useAppDispatch();
  const { currentDisplayTab,
    showRecsTo
  } = useAppSelector((state) => state.gameList);

  const recToSelect = useRef<HTMLSelectElement | null>(null);

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
    else if (
      recToSelect.current?.value?.toLowerCase().toString() ===
      RecsToType.asterOnly.toLowerCase().toString()
    )
      newRecTo = RecsToType.asterOnly;
    else if (
      recToSelect.current?.value?.toLowerCase().toString() ===
      RecsToType.fenOnly.toLowerCase().toString()
    )
      newRecTo = RecsToType.fenOnly;
    dispatch(setShowRecsTo(newRecTo ?? RecsToType.both));
  };


  return (
    <nav className="fixed top-0 w-screen bg-white border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            FenAster Recs
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleToggleOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${!isOpen && "hidden"
            } w-full md:block md:w-auto" id="navbar-default`}
        >
          <ul className="gap-4 font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  className={`${isItemDisabled(item) && "opacity-50"} ${item.tabName === currentDisplayTab && "bg-gray-700"
                    } block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`}
                  aria-current="page"
                  onClick={() => handleSelectTab(item)}
                  disabled={isItemDisabled(item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li>
              <button
                className="block py-2 px-3 text-white bg-gray-500 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
                onClick={() => {
                  setIsOpen(false);
                  dispatch(setShowingAddGameModal(true));
                }}
              >
                Suggest a Game
              </button>
            </li>
            <li>
              <select
                className="focus:shadow-outline block appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                value={showRecsTo}
                onChange={handleRecsByChange}
                ref={recToSelect}
              >
                <option value={RecsToType.both}>For Both</option>
                <option value={RecsToType.aster}>For Aster</option>
                <option value={RecsToType.asterOnly}>Only for Aster</option>
                <option value={RecsToType.fen}>For Fenrir</option>
                <option value={RecsToType.fenOnly}>Only for Fenrir</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderMobile;
