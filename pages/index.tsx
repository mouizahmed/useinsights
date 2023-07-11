import Image from "next/image";
import { Inter } from "next/font/google";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useRouter } from "next/router";
import Divider from "@mui/joy/Divider";
import React, { useState, useCallback, Fragment } from "react";
import {
  ChevronUpIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition, Tab, Disclosure, Listbox } from "@headlessui/react";

import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState("");
  //const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const charts = [
    { title: "Bar Chart", chartType: "bar" },
    { title: "Area Chart", chartType: "area" },
    { title: "Line Chart", chartType: "line" },
    { title: "Pie Chart", chartType: "pie" },
    { title: "Scatter Chart", chartType: "scatter" },
  ];
  const [selected, setSelected] = useState(charts[0]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    router.push("#graph-box");
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputPrompt(event.target.value);
    },
    []
  );

  // const handleFileSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  //   console.log(event.target.checked);
  //   //console.log(checked);
  // };

  //console.log(session);
  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 gap-4 sm:h-calc-mobile md:h-calc p-4">
      <div className="">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 border">
            <Tab
              key={0}
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
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "bg-white shadow focus:outline-none"
                    : "hover:bg-gray-200"
                )
              }
            >
              Table
            </Tab>
            <Tab
              key={2}
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
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="mt-4 focus:outline-none">
              <form
                id="chart-generation"
                onSubmit={handleSubmit}
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
                              "Enter a prompt to visualize your data"
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
                            id="prompt-graph"
                            placeholder="Enter a prompt to visualize your data..."
                            required
                            autoFocus
                            rows={5}
                            value={inputPrompt}
                            onChange={handleInputChange}
                          ></textarea>
                          <label className="text-gray-700 text-sm">Chart Type:</label>
                          <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
                                <span className="block truncate">
                                  {selected.title}
                                </span>
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
                                            selected.title === chart.title
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {chart.title}
                                        </span>
                                        {selected?.title === chart.title ? (
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
                            headerTitle={
                              "Upload custom data sources (Optional)"
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
                            headerTitle={"Additional Options"}
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
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full row-span-1"
                >
                  Generate
                </button>
              </form>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div
        className=" bg-zinc-100 rounded-xl h-calc-mobile md:h-calc md:col-span-2 heropattern-plus-zinc-500"
        id="graph-box"
      ></div>
    </div>
  );
}

// bg-zinc-100 rounded-xl mb-4
