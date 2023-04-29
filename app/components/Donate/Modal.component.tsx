import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { selectAppState, toggleDonateModal } from "~/lib/state/app-state/slice";
import { useAppDispatch, useAppSelector } from "~/hooks/use-redux";
import Image from "next/image";
import { ButtonType } from "~/types";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Button } from "~/components";

export function Modal(): JSX.Element {
  const appState = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  function toggleModal(): void {
    dispatch(toggleDonateModal());
  }

  return (
    <>
      <Transition appear show={appState.isDonateModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-60"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900 dark:bg-opacity-75 backdrop-filter backdrop-blur-md border border-gray-100 dark:border-gray-500">
                  <Dialog.Title
                    as="div"
                    className="flex items-center text-2xl font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    <span>Donate</span>
                    <button
                      className="flex items-center justify-center min-w-6 w-6 h-6 ml-auto rounded-full cursor-pointer border bg-white hover:bg-gray-100 hover:dark:bg-gray-600 transition ease-out duration-300 dark:bg-gray-900 dark:bg-opacity-75 backdrop-filter backdrop-blur-md dark:border-gray-500"
                      type="submit"
                      onClick={toggleModal}
                    >
                      <Image
                        alt="exit-modal-icon"
                        src="/x-icon.svg"
                        width={16}
                        height={16}
                      />
                    </button>
                  </Dialog.Title>
                  <Dialog.Description>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        If you like my open-source projects, please consider
                        donating to support them. Thank you!
                      </p>
                    </div>
                  </Dialog.Description>

                  <Button.Outline
                    type={ButtonType.LINK}
                    className="mt-6"
                    href="https://send.monobank.ua/jar/2g7fYkjnah"
                    target="_blank"
                  >
                    Go to monobank
                    <Icon
                      aria-hidden="true"
                      className={clsx("w-4 h-4 ml-3")}
                      icon="feather:external-link"
                    />
                  </Button.Outline>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
