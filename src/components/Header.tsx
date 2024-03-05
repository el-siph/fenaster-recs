import { Disclosure } from "@headlessui/react";
import { classNames, navItem, navigation } from "../constants";
import { Game } from "../entities/Game";
import { getFilteredGameCount } from "../filters";
import { DisplayTabs, setCurrentDisplayTab } from "../store/gameListSlice";
import { useGetGamesQuery } from "../store/gamesApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Header = () => {
  const { currentDisplayTab } = useAppSelector((state) => state.gameList);
  const { data: games } = useGetGamesQuery();
  const dispatch = useAppDispatch();

  const handleDisplayTabChange = (newTab: DisplayTabs) => {
    if (newTab !== currentDisplayTab) dispatch(setCurrentDisplayTab(newTab));
  };

  const isItemDisabled = (item: navItem) => {
    return (
      item.disabled ||
      getFilteredGameCount(item.tabName, (games as Game[]) ?? null) < 1
    );
  };

  return (
    <>
      <div className="mb-4 min-h-full shadow-lg">
        <Disclosure as="nav" className="border-r-6 bg-blue-600 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-end">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        disabled={isItemDisabled(item)}
                        onClick={() => handleDisplayTabChange(item.tabName)}
                        className={classNames(
                          item.tabName === currentDisplayTab
                            ? "bg-blue-500 text-white"
                            : "text-gray-100 hover:bg-blue-500 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                          isItemDisabled(item)
                            ? "cursor-not-allowed opacity-50"
                            : "opacity-100"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
      </div>
    </>
  );
};

export default Header;
