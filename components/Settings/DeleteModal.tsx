import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";

export function DeleteModal({
  isOpen,
  setIsOpen,
  email,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}) {

    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleDelete() {

    try {
        await axios.post('/api/account/delete-user', { email: email });

        signOut();
    } catch (err) {
        console.error(err);
    }
  }


  const handleInputChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLInputElement>
    ) => {
          if (event.target.value === `${email}/useinsights`) setIsConfirmed(true);
          else setIsConfirmed(false);
    },
    [email]
  );



  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete your account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Once you delete your Insights account, you will lose all
                      data associated with it.
                    </p>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-gray-700 text-sm select-none">
                        To confirm, type{" "}
                        <q className="font-bold">{email}/useinsights</q> in the
                        box below.
                      </label>
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(e)}
                        onPaste={(e: any) => {
                          e.preventDefault();
                          return false;
                        }}
                        className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={!isConfirmed}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      onClick={handleDelete}
                    >
                      Delete Account
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
