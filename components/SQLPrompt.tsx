import Image from "next/image";
import { Inter } from "next/font/google";
import { SectionHeader } from "../components/ui/SectionHeader";
import { getUserCredits, decreaseUserCredits } from "../util/helper"
import { useRouter } from "next/router";
import Divider from "@mui/joy/Divider";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import {
  ChevronUpIcon,
  CheckIcon,
  ChevronUpDownIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import Modal from "../components/ui/Modal";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Tab, Disclosure, Listbox } from "@headlessui/react";
import { useSession } from "next-auth/react";

export default function SQLPrompt({
  sqlQuery,
  setSQLQuery,
  setSQLToHuman,
  humanToSQL,
  setHumanToSQL,
  inputPromptSQL,
  setInputPromptSQL,
  classNames,
}: {
  sqlQuery: string;
  humanToSQL: boolean;
  setSQLQuery: React.Dispatch<React.SetStateAction<string>>;
  setSQLToHuman: React.Dispatch<React.SetStateAction<string>>;
  setHumanToSQL: React.Dispatch<React.SetStateAction<boolean>>;
  inputPromptSQL: string;
  setInputPromptSQL: React.Dispatch<React.SetStateAction<string>>;
  classNames: (...classes: string[]) => string;
}) {
  //const [inputPrompt, setInputPrompt] = useState<string>("");

  //const [checked, setChecked] = useState(false);

  const router = useRouter();
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNoCreditsOpen, setIsNoCreditsOpen] = useState<boolean>(false);




  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
   
        if (!session) {
          setIsOpen(true);
          throw Error("No Session available");
        } else {
          if (!session.user.credits || session.user?.credits <= 0) {
            setIsNoCreditsOpen(true);
            throw Error("No credits available");
          }
        }

      if (humanToSQL) {
        let getSQLQuery = await axios.post(
          "http://localhost:3000/api/get-sql-query",
          { userPrompt: inputPromptSQL }
        );
        // UPDATE COOKIE IN ABOVE API END POINT
        await decreaseUserCredits(session.user?.email);
        update()
        setSQLQuery(getSQLQuery.data);
        setSQLToHuman("");
      } else {
        let getSQLToHuman = await axios.post(
          "http://localhost:3000/api/sql-to-human",
          { userPrompt: inputPromptSQL }
        );
        // UPDATE COOKIE IN ABOVE API END POINT
        await decreaseUserCredits(session.user?.email);
        update()
        setSQLToHuman(getSQLToHuman.data);
        //setInputPromptSQL(sqlQuery);
        setSQLQuery("");
      }

    } catch (err) {
      console.error(err);
    }

    //router.push("#graph-box");
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputPromptSQL(event.target.value);
    },
    []
  );

  return (
    <div>
      {isOpen ? (<Modal isOpen={isOpen} setIsOpen={setIsOpen} type="login" />) : null}
      {isNoCreditsOpen ? (<Modal isOpen={isNoCreditsOpen} setIsOpen={setIsNoCreditsOpen} type="no-credits"/>) : null}
      <form
        id="sql-generation"
        onSubmit={handleSubmit}
        className="h-tabs grid grid-rows-3 grid-flow-row gap-4"
      >
        
        <div className="row-span-3 space-y-4 p-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-rounded-lg scrollbar-track-gray-300">
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <SectionHeader
                    stepNumber={1}
                    color={"red"}
                    headerTitle={
                      humanToSQL
                        ? "Natural Language to SQL Query"
                        : "SQL Query To Natural Language"
                    }
                  />
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-700`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <textarea
                    className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    id="prompt-database"
                    placeholder={
                      humanToSQL
                        ? "Enter a prompt to generate a SQL query..."
                        : "Enter a SQL query to convert to human language..."
                    }
                    required
                    autoFocus
                    rows={5}
                    value={inputPromptSQL}
                    onChange={handleInputChange}
                  ></textarea>
                  <div className="flex justify-end items-center">
                    <button
                      type="button"
                      className={classNames(
                        "border p-1 rounded-md hover:bg-gray-200",
                        !humanToSQL ? "border-red-500" : ""
                      )}
                      onClick={() => setHumanToSQL(!humanToSQL)}
                    >
                      <ArrowPathIcon
                        className={classNames(
                          "w-5 h-5",
                          !humanToSQL ? "text-red-500" : ""
                        )}
                      />
                    </button>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Divider />
          <Disclosure defaultOpen={false}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <SectionHeader
                    stepNumber={2}
                    color={"red"}
                    headerTitle={"Connect SQL Database (Optional)"}
                  />
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-700`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500 space-y-4">
                  <div>
                    
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Name
                    </label>
                    <input
                      type="text"
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Username
                    </label>
                    <input
                      type="text"
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Password
                    </label>
                    <input
                      type="password"
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Port
                    </label>
                    <input
                      type="text"
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Divider />
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <SectionHeader
                    stepNumber={4}
                    color={"red"}
                    headerTitle={"Additional Options"}
                  />
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-700`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="analytics"
                        name="analyticsCheckBox"
                        value="Bike"
                      />
                      <label
                        htmlFor="analyticsCheckBox"
                        className="ml-1 text-gray-700 text-sm"
                      >
                        Advanced Analytics
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="table"
                        name="tableCheckBox"
                        value="Bike"
                      />
                      <label
                        htmlFor="tableCheckBox"
                        className="ml-1 text-gray-700 text-sm"
                      >
                        Show Table
                      </label>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full row-span-1 flex items-center justify-center space-x-4"
        >
          <SparklesIcon className="h-5 w-5" /> Generate
        </button>
      </form>
    </div>
  );
}
