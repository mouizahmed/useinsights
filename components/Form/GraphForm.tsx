import Image from "next/image";
import { SectionHeader } from "../ui/SectionHeader";
import { useRouter } from "next/router";
import Divider from "@mui/joy/Divider";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Modal from "../ui/Modal";
import { getUserCredits, decreaseUserCredits } from "../../util/helper"
import { ChartType } from '../../types';
import {
  ChevronUpIcon,
  CheckIcon,
  ChevronUpDownIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition, Tab, Disclosure, Listbox } from "@headlessui/react";
import FileUpload from "./FileUpload";

export default function TablePrompt({
  chartData,
  setChartData,
  chartRelatedQuestions,
  setChartRelatedQuestions,
  chartType,
  setChartType,
  loading,
  setLoading,
} : {
  chartData: any[];
  setChartData: React.Dispatch<React.SetStateAction<any[]>>;
  chartRelatedQuestions: any[]
  setChartRelatedQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  chartType: ChartType
  setChartType: React.Dispatch<React.SetStateAction<ChartType>>;
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [inputPrompt, setInputPrompt] = useState("");
  //const [checked, setChecked] = useState(false);

  const router = useRouter();

  const charts = [
    { title: "Bar Chart", chartType: "bar" },
    { title: "Area Chart", chartType: "area" },
    { title: "Line Chart", chartType: "line" },
    { title: "Pie Chart", chartType: "pie" },
    { title: "Scatter Chart", chartType: "scatter" },
  ];
  const [selectedError, setSelectedError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNoCreditsOpen, setIsNoCreditsOpen] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const { data: session, update } = useSession();
 

  const handleChartTypeChange = (chartType: string) => {
    
    if (chartType === "Not Valid") {
      setSelectedError(true);
    } else {
      setSelectedError(false);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    setSelectedError(false);
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

      let getGraphType = await axios.post(
        "http://localhost:3000/api/get-graph-type",
        { userPrompt: inputPrompt, type: chartType }
      );
      console.log(getGraphType?.data.toLowerCase());
      setChartType({
        title: `${getGraphType?.data} Chart`,
        chartType: getGraphType?.data,
      });

      console.log(charts[Math.floor(Math.random() * charts.length)]);
      if (getGraphType?.data.toLowerCase() === "random")
        setChartType(charts[Math.floor(Math.random() * charts.length)]);
      if (getGraphType?.data.toLowerCase() === "not valid") {
          setSelectedError(true);
          throw Error("Invalid chart type");
      }
       
      


        let getGraphJSON = await axios.post(
          "http://localhost:3000/api/get-graph-json",
          { userPrompt: inputPrompt.trim(), chartType: chartType.chartType }
        );

        
        let getRelatedQuestionsJSON = await axios.post("http://localhost:3000/api/get-related-questions", { chartData: getGraphJSON.data, chartPrompt: inputPrompt.trim() });
        console.log(getRelatedQuestionsJSON.data);
        setChartRelatedQuestions(getRelatedQuestionsJSON.data);

        console.log(getGraphJSON);
        setChartData(getGraphJSON.data);
        await decreaseUserCredits(session.user?.email);
        update();
          
      


      setLoading(false);
    } catch (err) {
      console.error(err);

      setLoading(false);
    }

    //router.push("#graph-box");
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputPrompt(event.target.value);
    },
    []
  );

  return (
    <div>
      
      {isOpen ? <Modal isOpen={isOpen} setIsOpen={setIsOpen} type="login" /> : null}
      {isNoCreditsOpen ? (
        <Modal
          isOpen={isNoCreditsOpen}
          setIsOpen={setIsNoCreditsOpen}
          type="no-credits"
        />
      ) : null}
      <form
        id="chart-generation"
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
                    color={"blue"}
                    headerTitle={"Enter a prompt to visualize your data"}
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
                    id="prompt-graph"
                    placeholder="Enter a prompt to visualize your data..."
                    required
                    autoFocus
                    rows={5}
                    value={inputPrompt}
                    onChange={handleInputChange}
                  ></textarea>
                  <label className="text-gray-700 text-sm">Chart Type:</label>
                  <Listbox
                    value={chartType}
                    onChange={(chartType) => {
                      setChartType(chartType);
                      handleChartTypeChange(chartType.chartType);
                    }}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button
                        className={
                          !selectedError
                            ? "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
                            : "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-red-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
                        }
                      >
                        <span className="block truncate">{chartType.title}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {charts.map((chart, chartIdx) => (
                            <Listbox.Option
                              key={chartIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={chart}
                            >
                              <>
                                <span
                                  className={`block truncate ${
                                    chartType.title === chart.title
                                      ? "font-medium"
                                      : "font-normal"
                                  }`}
                                >
                                  {chart.title}
                                </span>
                                {chartType?.title === chart.title ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
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
                    color={"blue"}
                    headerTitle={"Upload custom data sources (Optional)"}
                  />
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-700`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <FileUpload />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/* <Grid container columns={3}>
                  <Grid item xs={2}>
                    <SectionHeader
                      stepNumber={2}
                      headerTitle={"Upload custom data sources (Optional)"}
                    />
                  </Grid>
                  <Grid item xs={1} className="flex items-end justify-end">
                    <Switch checked={checked} onChange={handleFileSwitch} />
                  </Grid>
                  {checked ? <div>Yes</div> : <div></div>}
                  </Grid> */}
          <Divider />
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <SectionHeader
                    stepNumber={3}
                    color={"blue"}
                    headerTitle={"Customize your chart"}
                  />
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-700`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  Yes
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
                    color={"blue"}
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
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full row-span-1 flex items-center justify-center space-x-4"
        >
          {!loading ? ( <div className="flex"><SparklesIcon className="h-5 w-5" /> Generate </div>) : (<div>Loading...</div>)}
        </button>
      </form>
    </div>
  );
}
