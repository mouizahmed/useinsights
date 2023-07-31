import { Tab } from "@headlessui/react";
import TablePrompt from "./Form/GraphForm";
import SQLPrompt from "./Form/SQLForm";
import { ChartType } from "../types";

export default function Tabs({
  hide,
  setActiveTab,
  chartData,
  setChartData,
  chartRelatedQuestions,
  setChartRelatedQuestions,
  chartType,
  setChartType,
  promptLoading,
  setPromptLoading,
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
}: {
  hide: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  chartData: any[];
  setChartData: React.Dispatch<React.SetStateAction<any[]>>;
  chartRelatedQuestions:  any[];
  setChartRelatedQuestions:  React.Dispatch<React.SetStateAction<any[]>>;
  chartType: ChartType;
  setChartType:  React.Dispatch<React.SetStateAction<ChartType>>;
  promptLoading: boolean;
  setPromptLoading:  React.Dispatch<React.SetStateAction<boolean>>;
  sqlQuery: string;
  setSQLQuery:  React.Dispatch<React.SetStateAction<string>>;
  setSQLToHuman: React.Dispatch<React.SetStateAction<string>>;
  humanToSQL: boolean;
  setHumanToSQL:  React.Dispatch<React.SetStateAction<boolean>>;
  inputPromptSQL: string;
  setInputPromptSQL:  React.Dispatch<React.SetStateAction<string>>;
  setDatabasePromptAnswer:  React.Dispatch<React.SetStateAction<string>>;
  setDatabaseTable:  React.Dispatch<React.SetStateAction<any[]>>;
  setDatabaseAnswerHeader:  React.Dispatch<React.SetStateAction<string>>;
}) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className={hide ? "hidden" : ""}>
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
              chartType={chartType}
              setChartType={setChartType}
              loading={promptLoading}
              setLoading={setPromptLoading}
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
              setDatabasePromptAnswer={setDatabasePromptAnswer}
              setDatabaseTable={setDatabaseTable}
              setDatabaseAnswerHeader={setDatabaseAnswerHeader}
              classNames={classNames}
            />
          </Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
