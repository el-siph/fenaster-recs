import { Disclosure } from "@headlessui/react";
import { DisplayTabs, setCurrentDisplayTab } from "../store/gameListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const navigation = [
  { name: "Approved", tabName: DisplayTabs.approved, disabled: false },
  { name: "Pending", tabName: DisplayTabs.pending, disabled: false },
  { name: "On Sale", tabName: DisplayTabs.onSale, disabled: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { currentDisplayTab } = useAppSelector((state) => state.gameList);
  const dispatch = useAppDispatch();

  const handleDisplayTabChange = (newTab: DisplayTabs) => {
    if (newTab !== currentDisplayTab) dispatch(setCurrentDisplayTab(newTab));
  };

  return (
    <>
      <div className="mb-4 min-h-full shadow-lg">
        <Disclosure as="nav" className="border-r-6 bg-blue-400 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-end">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        disabled={item.disabled}
                        onClick={() => handleDisplayTabChange(item.tabName)}
                        className={classNames(
                          item.tabName === currentDisplayTab
                            ? "bg-blue-500 text-white"
                            : "text-gray-100 hover:bg-blue-500 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                          item.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "opacity-100",
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
