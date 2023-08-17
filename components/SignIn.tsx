import React, { Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "@mui/joy/Avatar";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export const SignIn = () => {
  const { data: session } = useSession();

  async function handleSignIn() {
    signIn("google");
  }

  async function handleSignOut() {
    signOut();
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  if (session) {
    return (
      <>
        <div className="flex space-x-4">
          <div className="hidden md:flex">
            <button
              className="flex justify-center items-center  w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm text-gray-700 hover:bg-gray-50"
              // onClick={handleSignIn}
            >
              {session.user?.Plan} Tier
            </button>
          </div>
          <div className="">
            <Link href="/credits">
            <button
              className="flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm text-gray-700 hover:bg-gray-50"
            >
              {session.user?.credits} Credits
            </button>
            </Link>
          </div>
          <Menu as="div" className="z-10 relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                <Avatar
                  alt={session.user?.name as string}
                  src={session.user?.image as string}
                  sx={{ width: 20, height: 20 }}
                />
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/account"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Signed in as {session.user?.name}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item disabled>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-default md:hidden"
                        )}
                      >
                        {session.user?.Plan} Tier
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900 inline-flex items-center w-full"
                            : "text-gray-700",
                          "px-4 py-2 text-sm inline-flex items-center w-full"
                        )}
                      >
                        {/* <PlusCircleIcon className="h-5 w-5 mr-1" /> */}
                        Buy more Credits
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Upgrade Plan
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={handleSignOut}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Signout
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex space-x-4">
        {/* <div>
            <button
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm text-gray-700 hover:bg-gray-50"
              // onClick={handleSignIn}
            >
              Free Tier
            </button>
          </div>
          <div>
            <button
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm text-gray-700 hover:bg-gray-50"
              // onClick={handleSignIn}
            >
              {cookieCredits} Credits
            </button>
          </div> */}
          <div>
            <button
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={handleSignIn}
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </>
    );
  }
};
