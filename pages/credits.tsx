import { useSession, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import SliderComponent from "../components/ui/slider";
import { GetServerSidePropsContext } from "next";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Credits() {
  const { data: session, update } = useSession();
  const [credits, setCredits] = useState<number[]>([10]);
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto my-10 p-4">
      <h2 className="text-center text-5xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Credits
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-gray-500">
        You currently have{" "}
        <span className="underline font-bold">{session?.user.credits}</span>{" "}
        remaining.
      </p>
      <p className="mt-4 max-w-3xl mx-auto text-center text-md text-gray-700">
        If you&apos;re not ready to commit to a subscription plan, you can
        purchase the number of chart generations you need.
      </p>
      <SliderComponent credits={credits} setCredits={setCredits} />
      <button className="p-4 rounded-lg border bg-black text-white shadow-md mt-4">
        Purchase credits
      </button>
      <div className="border p-4 rounded-lg shadow-md mt-16 flex flex-col items-center justify-center">
        <h3 className="font-bold">What&apos;s included?</h3>
        <ul className="mt-4">
          <li className="flex items-center space-x-4">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />{" "}
            <span className="text-gray-500">Open source interface</span>
          </li>
          <li className="flex items-center space-x-4">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />{" "}
            <span className="text-gray-500">.PNG download</span>
          </li>
          <li className="flex items-center space-x-4">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />{" "}
            <span className="text-gray-500">Custom data source</span>
          </li>
          <li className="flex items-center space-x-4">
            <XCircleIcon className="w-5 h-5 text-red-400" />{" "}
            <span className="text-gray-500">Database connection</span>
          </li>
          <li className="flex items-center space-x-4">
            <XCircleIcon className="w-5 h-5 text-red-400" />{" "}
            <span className="text-gray-500">Chatbot for your data</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let session = await getSession(ctx);
    if (session && session?.user.Plan === 'Free') {
      return {
        redirect: {
          destination: "/pricing",
          permanent: true,
        },
      };
    } else if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: true,
            },
        }
    }
    return { props: {} };
  };
