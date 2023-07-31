import { Inter } from "next/font/google";
import SQLOutput from "../components/Output/SQLOutput";
import { ChartType } from "../types";
import Tabs from "../components/Tabs";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import PromptOutput from "@/components/Output/GraphOutput";

export default function Home() {
  const { data: session, update } = useSession();

  const [chartKey, setChartKey] = useState<string>("");
  const [sqlQuery, setSQLQuery] = useState<string>("");
  const [sqlToHuman, setSQLToHuman] = useState<string>("");
  const [copySQL, setCopySQL] = useState<boolean>(false);
  const [copyDatabasePromptAnswer, setCopyDatabasePromptAnswer] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Prompt");
  const [humanToSQL, setHumanToSQL] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [inputPromptSQL, setInputPromptSQL] = useState<string>("");
  const [chartRelatedQuestions, setChartRelatedQuestions] = useState<any[]>([]);
  const [promptLoading, setPromptLoading] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [chartType, setChartType] = useState<ChartType>({
    title: "Bar Chart",
    chartType: "bar",
  });
  const [databasePromptAnswer, setDatabasePromptAnswer] = useState<string>("");
  const [databaseAnswerHeader, setDatabaseAnswerHeader] = useState<string>("");
  const [databaseTable, setDatabaseTable] = useState<any[]>([]);

  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 gap-4 sm:h-calc-mobile md:h-calc p-4 border">
      <Tabs
        hide={hide}
        setActiveTab={setActiveTab}
        chartData={chartData}
        setChartData={setChartData}
        chartRelatedQuestions={chartRelatedQuestions}
        setChartRelatedQuestions={setChartRelatedQuestions}
        chartType={chartType}
        setChartType={setChartType}
        promptLoading={promptLoading}
        setPromptLoading={setPromptLoading}
        sqlQuery={sqlQuery}
        setSQLQuery={setSQLQuery}
        setSQLToHuman={setSQLToHuman}
        humanToSQL={humanToSQL}
        setHumanToSQL={setHumanToSQL}
        inputPromptSQL={inputPromptSQL}
        setInputPromptSQL={setInputPromptSQL}
        setDatabasePromptAnswer={setDatabasePromptAnswer}
        setDatabaseTable={setDatabaseTable}
        setDatabaseAnswerHeader={setDatabaseAnswerHeader}
      />
      <div
        className={` bg-zinc-100 rounded-xl h-calc-mobile md:h-calc md:col-span-${
          hide ? "4" : "3"
        } heropattern-plus-zinc-500 p-4 overflow-y-auto`}
        id="graph-box"
      >
        <div className="mb-4 inline-block space-x-4">
          <button
            className="hidden md:inline-block z-10 bg-white border rounded-lg p-1 shadow-md hover:bg-gray-100"
            onClick={() => setHide(!hide)}
          >
            {hide ? (
              <ChevronDoubleRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            )}
          </button>
          <button className="hidden md:inline-block z-10 bg-white border rounded-lg p-1 shadow-md hover:bg-gray-100">
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
        {activeTab === "Prompt" ? (
          <PromptOutput
            chartData={chartData}
            setChartData={setChartData}
            chartKey={chartKey}
            setChartKey={setChartKey}
            chartRelatedQuestions={chartRelatedQuestions}
            promptLoading={promptLoading}
            chartType={chartType}
          />
        ) : activeTab === "Database" ? (
          <SQLOutput
            sqlQuery={sqlQuery}
            sqlToHuman={sqlToHuman}
            copySQL={copySQL}
            databasePromptAnswer={databasePromptAnswer}
            databaseAnswerHeader={databaseAnswerHeader}
            copyDatabasePromptAnswer={copyDatabasePromptAnswer}
            databaseTable={databaseTable}
            setDatabaseTable={setDatabaseTable}
            setChartKey={setChartKey}
            setCopySQL={setCopySQL}
            setCopyDatabasePromptAnswer={setCopyDatabasePromptAnswer}
            setSQLToHuman={setSQLToHuman}
            setInputPromptSQL={setInputPromptSQL}
            setSQLQuery={setSQLQuery}
            humanToSQL={humanToSQL}
            setHumanToSQL={setHumanToSQL}
            inputPromptSQL={inputPromptSQL}
          />
        ) : null}
      </div>
    </div>
  );
}
