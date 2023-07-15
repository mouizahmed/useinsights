import Image from "next/image";
import { Inter } from "next/font/google";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useRouter } from "next/router";
import Divider from "@mui/joy/Divider";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import axios from 'axios';
import {
  ChevronUpIcon,
  CheckIcon,
  ChevronUpDownIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition, Tab, Disclosure, Listbox } from "@headlessui/react";

export default function SQLPrompt () {
    
    const [inputPrompt, setInputPrompt] = useState("");
    //const [checked, setChecked] = useState(false);

    const router = useRouter();
  
    const charts = [
      { title: "Bar Chart", chartType: "bar" },
      { title: "Area Chart", chartType: "area" },
      { title: "Line Chart", chartType: "line" },
      { title: "Pie Chart", chartType: "pie" },
      { title: "Scatter Chart", chartType: "scatter" }
    ];
    const [selected, setSelected] = useState(charts[0]);
    const [selectedError, setSelectedError] = useState<boolean>(false);
  
    const handleChartTypeChange = (chartType: string) => {
      if (chartType === "Not Valid") {
        setSelectedError(true);
      } else {
        setSelectedError(false);
      }
    };
  
  
    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault() 
      try {
        let getGraphType = await axios.post('http://localhost:3000/api/get-graph-type', { userPrompt: inputPrompt});
        console.log(getGraphType?.data.toLowerCase());
        setSelected({ title: `${getGraphType?.data} Chart`, chartType: getGraphType?.data});
        
        console.log(charts[Math.floor(Math.random() * charts.length)])
        if(getGraphType?.data.toLowerCase() === "random") setSelected(charts[Math.floor(Math.random() * charts.length)])
        if (getGraphType?.data.toLowerCase() === "not valid") setSelectedError(true);
      } catch (err) {
        console.error(err);
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
            <form
                id="data-generation"
                // onSubmit={handleSubmit}
                className="h-tabs grid grid-rows-3 grid-flow-row gap-4"
              >
                <div className="row-span-3 space-y-4">
                  <Disclosure defaultOpen={true}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <SectionHeader
                            stepNumber={1}
                            headerTitle={
                              "Enter a prompt to generate a SQL query"
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
                            placeholder="Enter a prompt to generate a SQL query..."
                            required
                            autoFocus
                            rows={5}
                            value={inputPrompt}
                            onChange={handleInputChange}
                          ></textarea>
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
                            headerTitle={
                              "Connect SQL Database (Optional)"
                            }
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
                        <input type="checkbox" id="analytics" name="analyticsCheckBox" value="Bike" />
                        <label htmlFor="analyticsCheckBox" className="ml-1 text-gray-700 text-sm">Advanced Analytics</label>
                        </div>

                          <div className="flex items-center">
                          <input type="checkbox" id="table" name="tableCheckBox" value="Bike" />
                          <label htmlFor="tableCheckBox" className="ml-1 text-gray-700 text-sm">Show Table</label>
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
                  <SparklesIcon className="h-5 w-5"/> Generate
                </button>
              </form>
        </div>
    )
}