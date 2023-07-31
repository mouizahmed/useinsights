import {
  ArrowPathIcon,
  CheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import TableFromChart from "./Table";
import Chart from "./Chart";

export default function SQLOutput({
  sqlQuery,
  sqlToHuman,
  copySQL,
  databasePromptAnswer,
  databaseAnswerHeader,
  copyDatabasePromptAnswer,
  databaseTable,
  setDatabaseTable,
  setChartKey,
  setCopySQL,
  setCopyDatabasePromptAnswer,
  setSQLToHuman,
  setInputPromptSQL,
  setSQLQuery,
  humanToSQL,
  setHumanToSQL,
  inputPromptSQL,
}: {
  sqlQuery: string;
  sqlToHuman: string;
  copySQL: boolean;
  databasePromptAnswer: string;
  databaseAnswerHeader: string;
  copyDatabasePromptAnswer: boolean;
  databaseTable: any[];
  setDatabaseTable: React.Dispatch<React.SetStateAction<any[]>>;
  setChartKey: React.Dispatch<React.SetStateAction<string>>;
  setCopySQL: React.Dispatch<React.SetStateAction<boolean>>;
  setCopyDatabasePromptAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  setSQLToHuman: React.Dispatch<React.SetStateAction<string>>;
  setInputPromptSQL: React.Dispatch<React.SetStateAction<string>>;
  setSQLQuery: React.Dispatch<React.SetStateAction<string>>;
  humanToSQL: boolean;
  setHumanToSQL: React.Dispatch<React.SetStateAction<boolean>>;
  inputPromptSQL: string;


}) {
  const copyText = async (text: string, type: string) => {
    navigator.clipboard.writeText(text);

    switch (type) {
      case "sql":
        setCopySQL(true);
        setTimeout(() => {
          setCopySQL(false);
        }, 1000);
        break;

      case "final":
        setCopyDatabasePromptAnswer(true);
        setTimeout(() => {
          setCopyDatabasePromptAnswer(false);
        }, 1000);
        break;
    }
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
    <div>
      {sqlQuery || sqlToHuman ? (
        <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4 h-calc-mobile md:h-calc">
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
                onClick={() => copyText(sqlQuery || sqlToHuman, "sql")}
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

          {databasePromptAnswer ? (
            <>
              <div className="bg-white rounded-lg p-4 z-10 shadow-md space-y-4">
                <h1 className="font-semibold">
                  {sqlQuery ? (
                    <span>{databaseAnswerHeader}</span>
                  ) : (
                    <span>Natural Language</span>
                  )}
                </h1>
                <div className="border p-1 rounded-lg">
                  <div className="p-2">
                    {<span>{databasePromptAnswer}</span>}
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    className="p-1 rounded-md border hover:bg-gray-200"
                    onClick={() => copyText(databasePromptAnswer, "final")}
                  >
                    {!copyDatabasePromptAnswer ? (
                      <ClipboardDocumentIcon className="w-5 h-5" />
                    ) : (
                      <CheckIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {databaseTable.length > 1 ? (
                <div className="bg-white rounded-lg p-4 z-10 shadow-md space-y-4">
                  <Chart
                    data={databaseTable}
                    chartType={{ chartType: "bar", title: "Bar Chart" }}
                  />
                </div>
              ) : null}
              {databaseTable.length > 0 ? (
                <div className="z-10 bg-white rounded-lg shadow-md p-4">
                  <TableFromChart
                    data={databaseTable}
                    setData={setDatabaseTable}
                    setChartKey={setChartKey}
                  />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
