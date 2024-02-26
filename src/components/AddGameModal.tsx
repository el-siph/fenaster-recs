import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setShowingAddGameModal } from "../store/gameListSlice";
import { useTestAddGameMutation } from "../store/gamesTestApi";
import { useAddGameMutation } from "../store/gamesApi";
import { Game } from "../entities/Game";

const AddGameModal = () => {
  const dispatch = useAppDispatch();
  const { useTestApi, isShowingAddGameModal: open } = useAppSelector(
    (state) => state.gameList
  );
  const [addGame] = useTestApi
    ? useTestAddGameMutation()
    : useAddGameMutation();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const genreRef = useRef<HTMLInputElement | null>(null);
  const msrpRef = useRef<HTMLInputElement | null>(null);
  const recByRef = useRef<HTMLInputElement | null>(null);
  const recToRef = useRef<HTMLSelectElement | null>(null);
  const userScoreRef = useRef<HTMLSelectElement | null>(null);
  const hasEnglishVORef = useRef<HTMLSelectElement | null>(null);
  const notesRef = useRef<HTMLInputElement | null>(null);
  const storeLinkRef = useRef<HTMLInputElement | null>(null);

  const handleCloseModal = () => {
    dispatch(setShowingAddGameModal(false));
  };

  const handleSubmit = () => {
    const autoApproveSymbol = import.meta.env.VITE_AUTO_APPROVE_SYMBOL;

    const newGame: Partial<Game> = {
      title: titleRef.current?.value,
      genre: genreRef.current?.value,
      msrp: `$${msrpRef.current?.value}`,
      recBy: recByRef.current?.value,
      recTo: recToRef.current?.value,
      isSeconded: false,
      userScore: userScoreRef.current?.value,
      hasEnglishVO: hasEnglishVORef.current?.value,
      notes: notesRef.current?.value,
      storeLink: storeLinkRef.current?.value,
      wasCompleted: false,
      vodLink: "",
      isAuthorized: false,
    };

    if (newGame.recBy?.substring(0, 1) === autoApproveSymbol) {
      newGame.isAuthorized = true;
      newGame.recBy = newGame.recBy?.substring(1, newGame.recBy.length);
    }

    addGame(newGame);
    dispatch(setShowingAddGameModal(false));
  };

  const handleCancel = () => {
    // reset form elements
    dispatch(setShowingAddGameModal(false));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={titleRef}
        onClose={handleCloseModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-2 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mx-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 mb-4 sm:mb-10"
                      >
                        Suggest a Game
                        <p className="text-sm text-gray-400 font-normal">
                          Your suggestion will be subject to review before
                          approval.
                        </p>
                      </Dialog.Title>
                      <div className="mt-2">
                        <form className="flex flex-col gap-2 sm:gap-4 mb-10 text-sm sm:text-md">
                          <label className="flex flex-row justify-between">
                            Title *
                          </label>
                          <input
                            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            type="text"
                            ref={titleRef}
                          />
                          <label className="flex flex-row justify-between">
                            Genre *
                          </label>
                          <input
                            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            type="text"
                            ref={genreRef}
                            placeholder="JRPG, Visual Novel, Action, etc."
                          />
                          <label className="flex flex-row justify-between">
                            Retail Price (in USD) *
                          </label>
                          <input
                            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            type="number"
                            ref={msrpRef}
                          />
                          <label className="flex flex-row justify-between">
                            Your Username *
                          </label>
                          <input
                            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            type="text"
                            ref={recByRef}
                          />
                          <label className="flex flex-row justify-between">
                            Purchase/Download Link (Steam Page, etc.) *
                          </label>
                          <input
                            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            type="text"
                            ref={storeLinkRef}
                            placeholder="https://"
                          />
                          <label className="flex flex-row justify-between">
                            Recommended to
                            <select
                              className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              ref={recToRef}
                            >
                              <option selected value="Both">
                                Aster & Fenrir
                              </option>
                              <option value="Aster">Just Aster</option>
                              <option value="Fen">Just Fenrir</option>
                            </select>
                          </label>
                          <label className="flex flex-row justify-between">
                            User Score
                            <select
                              className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              ref={userScoreRef}
                            >
                              <option selected value="Overwhelmingly Positive">
                                Overwhelmingly Positive
                              </option>
                              <option value="Very Positive">
                                Very Positive
                              </option>
                              <option value="Positive">Positive</option>
                              <option value="Mixed">Mixed</option>
                            </select>
                          </label>
                          <label className="flex flex-row justify-between">
                            Has English Voice-Over?
                            <select
                              className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              ref={hasEnglishVORef}
                            >
                              <option selected value="No">
                                No
                              </option>
                              <option value="Yes">Yes</option>
                            </select>
                          </label>
                          <label className="flex flex-row justify-between">
                            Notes
                          </label>
                          <input
                            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            ref={notesRef}
                            placeholder="(optional)"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center gap-2 sm:gap-4 mb-6 px-4">
                  <button
                    type="button"
                    className="bg-blue-300 text-white mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddGameModal;
