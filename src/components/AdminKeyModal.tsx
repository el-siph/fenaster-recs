import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { isValidAdminKey, notifyToaster } from "../helpers";
import { setAdminKey, setShowingAdminModal } from "../store/gameListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const AdminKeyModal = () => {
  const dispatch = useAppDispatch();
  const { isShowingAdminModal: open } = useAppSelector(
    (state) => state.gameList
  );

  const adminKeyRef = useRef<HTMLInputElement | null>(null);

  const handleCloseModal = () => {
    dispatch(setShowingAdminModal(false));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adminKey = adminKeyRef.current?.value;

    if (adminKey) {
      if (isValidAdminKey(adminKey)) {
        dispatch(setAdminKey(adminKey));
        notifyToaster(`Administrator Mode enabled.`);
      } else {
        notifyToaster(`Admin Key invalid.`);
      }
    }
    handleCloseModal();
  };

  const handleCancel = () => {
    // reset form elements
    handleCloseModal();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={adminKeyRef}
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
                    <div className="mt-1 text-center sm:mx-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 mb-2 sm:mb-4"
                      >
                        Administrator Mode
                        <p className="text-sm text-gray-500 font-normal">
                          Enter passkey
                        </p>
                      </Dialog.Title>
                      <div>
                        <form
                          className="flex flex-col gap-2 sm:gap-4 mb-2 text-sm sm:text-md"
                          onSubmit={handleSubmit}
                        >
                          <input
                            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            type="text"
                            ref={adminKeyRef}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center gap-2 sm:gap-4 mb-6 px-4">
                  <button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500 mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto text-white"
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

export default AdminKeyModal;
