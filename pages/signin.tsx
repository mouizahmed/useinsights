import { EyeIcon } from "@heroicons/react/24/outline";
import { GetServerSidePropsContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { redirect } from 'next/navigation'

export default function Signin() {


  async function handleSignIn() {
    signIn("google");
  }

  return (
    <div className="flex flex-col h-calc">
      <div className="m-auto my-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
          <div className="border rounded-md p-1 hover:bg-slate-50">
            <EyeIcon className="w-10 h-10" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              sign up and get 3 free credits
            </span>
            !
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md z-10 border rounded-lg sm:px-10">
            <div className="">
              <div className="">
                <div>
                  <button
                    onClick={handleSignIn}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    
        let session = await getSession(ctx)
        if (session) {
            return {
              redirect: {
                destination: '/app',
                permanent: true
              }
            };
          }
         return { props: {} };
  };
