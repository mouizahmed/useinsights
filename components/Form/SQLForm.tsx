import Image from "next/image";
import { Inter } from "next/font/google";
import { SectionHeader } from "../ui/SectionHeader";
import { getUserCredits, decreaseUserCredits } from "../../util/helper";
import { useRouter } from "next/router";
import Divider from "@mui/joy/Divider";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import {
  ChevronUpIcon,
  CheckIcon,
  ChevronUpDownIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import Modal from "../ui/Modal";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Tab, Disclosure, Listbox } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { DatabaseCredentials } from "@/types";

export default function SQLPrompt({
  sqlQuery,
  setSQLQuery,
  setSQLToHuman,
  humanToSQL,
  setHumanToSQL,
  inputPromptSQL,
  setInputPromptSQL,
  setDatabasePromptAnswer,
  setDatabaseTable,
  setDatabaseAnswerHeader,
  classNames,
}: {
  sqlQuery: string;
  humanToSQL: boolean;
  setSQLQuery: React.Dispatch<React.SetStateAction<string>>;
  setSQLToHuman: React.Dispatch<React.SetStateAction<string>>;
  setHumanToSQL: React.Dispatch<React.SetStateAction<boolean>>;
  inputPromptSQL: string;
  setInputPromptSQL: React.Dispatch<React.SetStateAction<string>>;
  setDatabasePromptAnswer: React.Dispatch<React.SetStateAction<string>>;
  setDatabaseTable: React.Dispatch<React.SetStateAction<any[]>>;
  setDatabaseAnswerHeader: React.Dispatch<React.SetStateAction<string>>;
  classNames: (...classes: string[]) => string;
}) {
  //const [inputPrompt, setInputPrompt] = useState<string>("");

  //const [checked, setChecked] = useState(false);

  const router = useRouter();
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNoCreditsOpen, setIsNoCreditsOpen] = useState<boolean>(false);
  const [enableDatabase, setEnableDatabase] = useState<boolean>(false);
  const [swapDisabled, setSwapDisabled] = useState<boolean>(false);
  const [limit, setLimit] = useState<string>("1");
  const [credentials, setCredentials] = useState<DatabaseCredentials>({
    host: "",
    port: 3306,
    user: "",
    password: "",
    database: "",
  });

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
        if (enableDatabase) {
          let sqlQueryDatabase = await axios.post(
            "/api/database-query",
            { credentials: credentials, prompt: inputPromptSQL, limit: (limit === "" ? ("Unlimited") : limit)  }
          );
          setSQLQuery(sqlQueryDatabase.data.sql);
          setDatabasePromptAnswer(sqlQueryDatabase.data.result.final_answer);
          setDatabaseTable(sqlQueryDatabase.data.result.chart);
          setDatabaseAnswerHeader(inputPromptSQL);
          console.log(sqlQueryDatabase);
        } else {
          let getSQLQuery = await axios.post(
            "/api/get-sql-query",
            { userPrompt: inputPromptSQL }
          );
          setSQLQuery(getSQLQuery.data);
        }

        await decreaseUserCredits(session.user?.email);
        update(); // update auth session dynamically

        setSQLToHuman("");
      } else {
        let getSQLToHuman = await axios.post(
          "/api/sql-to-human",
          { userPrompt: inputPromptSQL }
        );
        // UPDATE COOKIE IN ABOVE API END POINT
        await decreaseUserCredits(session.user?.email);
        update();
        setSQLToHuman(getSQLToHuman.data);
        //setInputPromptSQL(sqlQuery);
        setSQLQuery("");
      }
    } catch (err) {
      console.error(err);
    }

    //router.push("#graph-box");
  };

  const testDatabaseConnection = async () => {
    try {
      let establishConnection = await axios.post(
        "/api/test-database",
        { credentials: credentials }
      );

      console.log(establishConnection.data);
    } catch (err) {
      console.log(err);
    }
  };

  const disableSwap = () => {
    //setHumanToSQL(true);
    setEnableDatabase(!enableDatabase);
    setSwapDisabled(!enableDatabase);
    setHumanToSQL(true);
  };

  const handleInputChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLInputElement>,
      inputName: string,
      type: string
    ) => {
      switch (type) {
        case "prompt":
          setInputPromptSQL(event.target.value);
          break;
        case "database":
          setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [inputName]: event.target.value,
          }));
          break;
        case "limit":
          setLimit(event.target.value);
          break;
      }
    },
    []
  );

  return (
    <div>
      {isOpen ? (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} type="login" />
      ) : null}
      {isNoCreditsOpen ? (
        <Modal
          isOpen={isNoCreditsOpen}
          setIsOpen={setIsNoCreditsOpen}
          type="no-credits"
        />
      ) : null}
      <form
        id="sql-generation"
        onSubmit={handleSubmit}
        autoComplete="off"
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
                    onChange={(e) => handleInputChange(e, "", "prompt")}
                  ></textarea>
                  <label className="text-gray-700 text-sm">
                    <span>
                      Rows Limit{" "}
                      <span className="italic text-xs">
                        (blank for unlimited)
                      </span>
                    </span>
                  </label>
                  <input
                    type="number"
                    value={limit}
                    min="1"
                    onChange={(e) => handleInputChange(e, "", "limit")}
                    placeholder="Enter a number (leave blank for unlimited)"
                    className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                  />
                  <div className="flex justify-end items-center pt-4">
                    <button
                      type="button"
                      disabled={swapDisabled}
                      className={classNames(
                        swapDisabled ? "opacity-50" : "hover:bg-gray-200",
                        "border p-1 rounded-md ",
                        !humanToSQL ? "border-red-500" : ""
                      )}
                      onClick={() => setHumanToSQL(!humanToSQL)}
                    >
                      <ArrowPathIcon
                        className={classNames(
                          swapDisabled ? "opacity-50" : "",
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
                    <label className="text-gray-700 text-sm">
                      Database Name
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      value={credentials.database}
                      onChange={(e) =>
                        handleInputChange(e, "database", "database")
                      }
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Username
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      value={credentials.user}
                      onChange={(e) => handleInputChange(e, "user", "database")}
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Password
                    </label>
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(e) =>
                        handleInputChange(e, "password", "database")
                      }
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Host
                    </label>
                    <input
                      type="text"
                      value={credentials.host}
                      onChange={(e) => handleInputChange(e, "host", "database")}
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">
                      Database Port
                    </label>
                    <input
                      type="text"
                      value={credentials.port}
                      onChange={(e) => handleInputChange(e, "port", "database")}
                      className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-4">
                    <p>{enableDatabase ? "Enabled" : "Disabled"}</p>
                    <Switch
                      checked={enableDatabase}
                      onChange={disableSwap}
                      className={`${
                        enableDatabase ? "bg-red-500" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          enableDatabase ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>

                    <button
                      type="button"
                      className="border p-1 rounded-lg border-black hover:bg-gray-200"
                      onClick={testDatabaseConnection}
                    >
                      Test Connection
                    </button>
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
