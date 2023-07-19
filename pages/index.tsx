import Image from "next/image";
import TablePrompt from "../components/TablePrompt";
import SQLPrompt from "../components/SQLPrompt";
import Divider from "@mui/joy/Divider";
import { Inter } from "next/font/google";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs, dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Chart from "../components/ui/Chart";
import TableFromChart from "../components/ui/TableFromChart";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";

import { Tab } from "@headlessui/react";

import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, update } = useSession();
  console.log(session);
  const router = useRouter();

  const [sqlQuery, setSQLQuery] = useState<string>("");
  const [sqlToHuman, setSQLToHuman] = useState<string>("");
  const [copySQL, setCopySQL] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Prompt");
  const [humanToSQL, setHumanToSQL] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [inputPromptSQL, setInputPromptSQL] = useState<string>("");
  const [chartRelatedQuestions, setChartRelatedQuestions] = useState<any[]>([]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const copyText = async (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySQL(true);
    setTimeout(() => {
      setCopySQL(false);
    }, 1000);
  };

  const SQLSwap = async (event: { preventDefault: () => void }) => {
    if (humanToSQL) {
      setSQLToHuman(inputPromptSQL);
      setInputPromptSQL(sqlQuery);
      setSQLQuery("");
    } else {
      setSQLQuery(inputPromptSQL);
      setInputPromptSQL(sqlToHuman);
      setSQLToHuman("");
    }

    setHumanToSQL(!humanToSQL);

    // let getSQLToHuman = await axios.post(
    //   "http://localhost:3000/api/sql-to-human",
    //   { userPrompt: sqlQuery }
    // );

    //setSQLToHuman(getSQLToHuman.data);
    //setSQLQuery("");
  };

  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 gap-4 sm:h-calc-mobile md:h-calc p-4">
      <div className="">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 border">
            <Tab
              key={0}
              onClick={() => setActiveTab("Prompt")}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",

                  selected
                    ? "bg-white shadow focus:outline-none"
                    : "hover:bg-gray-200"
                )
              }
            >
              Prompt
            </Tab>
            <Tab
              key={1}
              onClick={() => setActiveTab("Database")}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "bg-white shadow focus:outline-none"
                    : "hover:bg-gray-200"
                )
              }
            >
              Database
            </Tab>
            <Tab
              key={2}
              onClick={() => setActiveTab("Image")}
              disabled
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                  selected
                    ? "bg-white shadow focus:outline-none"
                    : " hover:bg-gray-200"
                )
              }
            >
              Image
              {/* <span className="text-xs font-normal">(Coming Soon)</span> */}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="mt-4 focus:outline-none">
              <TablePrompt
                chartData={chartData}
                setChartData={setChartData}
                chartRelatedQuestions={chartRelatedQuestions}
                setChartRelatedQuestions={setChartRelatedQuestions}
              />
            </Tab.Panel>
            <Tab.Panel className="mt-4 focus:outline-none">
              <SQLPrompt
                sqlQuery={sqlQuery}
                setSQLQuery={setSQLQuery}
                setSQLToHuman={setSQLToHuman}
                humanToSQL={humanToSQL}
                setHumanToSQL={setHumanToSQL}
                inputPromptSQL={inputPromptSQL}
                setInputPromptSQL={setInputPromptSQL}
                classNames={classNames}
              />
            </Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div
        className=" bg-zinc-100 rounded-xl h-calc-mobile md:h-calc md:col-span-2 heropattern-plus-zinc-500 p-4 overflow-y-auto"
        id="graph-box"
      >
        {activeTab === "Prompt" ? (
          <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4 h-calc-mobile md:h-calc">
            {chartData.length > 0 ? (
              <div className="z-10 bg-white rounded-lg shadow-md p-4">
                <Chart data={chartData} chartType="line" />
              </div>
            ) : null}

            {chartRelatedQuestions.length > 0 ? (
              <div className="z-10 bg-white rounded-lg shadow-md p-4">
                {chartRelatedQuestions.map((chartRelatedQuestion, i) => (
                  <div key={i} className="grid grid-cols-3">
                    <div className="col-span-2 m-2">
                      <h1 className="font-medium">
                        {chartRelatedQuestion.question}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="border p-2 rounded-lg w-full hover:bg-blue-100 border-blue-300">
                        Ask
                      </button>
                    </div>
                    {/* <Divider className="col-span-3 mt-1 mb-1"/> */}
                  </div>
                ))}
              </div>
            ) : null}
            {chartData.length > 0 ? (<div className="z-10 bg-white rounded-lg shadow-md p-4">
                <TableFromChart data={chartData} />
            </div>) : null}
          </div>
        ) : activeTab === "Database" ? (
          <div>
            {sqlQuery || sqlToHuman ? (
              <div className="bg-white rounded-lg p-4 z-10 shadow-md space-y-4">
                <h1 className="font-semibold">
                  {sqlQuery ? <span>SQL</span> : <span>Natural Language</span>}
                </h1>
                <div className="border p-1 rounded-lg">
                  {sqlQuery ? (
                    <SyntaxHighlighter language="sql" style={vs} className="">
                      {sqlQuery}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="p-2">{<span>{sqlToHuman}</span>}</div>
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    className="p-1 rounded-md border hover:bg-gray-200"
                    onClick={() => copyText(sqlQuery || sqlToHuman)}
                  >
                    {!copySQL ? (
                      <ClipboardDocumentIcon className="w-5 h-5" />
                    ) : (
                      <CheckIcon className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="border p-1 rounded-md hover:bg-gray-200"
                    onClick={SQLSwap}
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
