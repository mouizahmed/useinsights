import Image from "next/image";
import TablePrompt from "../components/TablePrompt";
import SQLPrompt from "../components/SQLPrompt";
import { Inter } from "next/font/google";

import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";

import { Tab } from "@headlessui/react";

import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

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
              Database
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
              <TablePrompt />
            </Tab.Panel>
            <Tab.Panel className="mt-4 focus:outline-none">
              <SQLPrompt />
            </Tab.Panel>
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
