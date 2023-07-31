import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { API } from "../../types";
import { APIKeysRow } from "./APIKeyRow";

export function APIKeysTable() {
  const { data: session, update } = useSession();

  const [secretKeys, setSecretKeys] = useState<API[]>([]);
  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    // More people...
  ];

  useEffect(() => {
    const getKeys = async () => {
      let { data: Secret_Keys, error: api_error } = await supabase
        .from("Secret_Keys")
        .select()
        .eq("created_by", session?.user.email);

      if (Secret_Keys) setSecretKeys(Secret_Keys);
    };

    getKeys();
  });

  const addKey = async () => {
    const { data, error } = await supabase
      .from("Secret_Keys")
      .insert([{ created_by: session?.user.email }])
      .select();

      console.log(data);
  };

  return (
    <>
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => addKey()}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-neutral-900 px-4 py-2 text-sm font-medium text-white sm:w-auto"
            >
              Add Secret Key
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Secret Key
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      ></th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      ></th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {secretKeys.map((api) => (
                      <APIKeysRow
                        key={api.secret_key}
                        api_key={api.secret_key}
                        secretKeys={secretKeys}
                        setSecretKeys={setSecretKeys}
                        created_at={api.created_at}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
