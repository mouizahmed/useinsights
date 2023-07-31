import { ChartType } from "@/types";
import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import TableFromChart from "./Table";
import LoadingGraph from "../ui/LoadingGraph";

export default function PromptOutput({
    chartData,
    chartKey,
    setChartKey,
    setChartData,
    chartRelatedQuestions,
    promptLoading,
    chartType,
}:{
    chartData: any[];
    chartKey: string;
    setChartKey: React.Dispatch<React.SetStateAction<string>>;
    setChartData: React.Dispatch<React.SetStateAction<any[]>>;
    chartRelatedQuestions: any[];
    promptLoading: boolean;
    chartType: ChartType;
}) {
 
  return (
    <div>
      {!promptLoading ? (
        <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4 h-calc-mobile md:h-calc">
          {chartData.length > 0 ? (
            <div className="z-5 bg-white rounded-lg shadow-md p-4">
              <Chart key={chartKey} data={chartData} chartType={chartType} />
            </div>
          ) : null}

          {chartRelatedQuestions.length > 0 ? (
            <div className="z-5 bg-white rounded-lg shadow-md p-4">
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
                </div>
              ))}
            </div>
          ) : null}
          {chartData.length > 0 ? (
            <div className="z-5 bg-white rounded-lg shadow-md p-4">
              <TableFromChart data={chartData} setData={setChartData} setChartKey={setChartKey}/>
            </div>
          ) : null}
        </div>
      ) : (
        <LoadingGraph />
      )}
    </div>
  );
}
