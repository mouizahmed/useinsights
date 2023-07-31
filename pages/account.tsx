import React, { useCallback, useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { Notification } from "../components/ui/Notification";
import { NotificationVariantType } from "@/types";
import { OpenAIKey } from "@/components/Settings/OpenAIKey";
import { APIKeysTable } from "@/components/Settings/APIKeysTable";

export default function Account() {
  const { data: session, update } = useSession();
  console.log(session);
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState<boolean>(false);
  const [keepDuration, setKeepDuration] = useState<number>(5000);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [variant, setVariant] = useState<NotificationVariantType>('success');

  return (
    <main className="w-screen overflow-x-hidden">
      <Notification
        show={show}
        setShow={setShow}
        keep={keep}
        title={title}
        description={description}
        variant={variant}
        keepDuration={keepDuration}
      />
      <div className="mx-auto p-10 max-w-4xl space-y-4">
        <section className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            Account
          </h1>
        </section>
        <section className="border rounded-lg shadow-sm" id="email">
          <div className="space-y-4 p-4">
            <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-4">
              <Image
                className="h-10 w-10 rounded-full"
                width={40}
                height={40}
                src={session?.user.image ?? ""}
                alt=""
              />
              <p className="border rounded-lg p-2 bg-gray-50 w-full">
                {session?.user.email}
              </p>
              <p className="border rounded-lg p-2 bg-gray-50 w-full">
                {session?.user.name}
              </p>
            </div>
          </div>
        </section>
        <section className="border rounded-lg shadow-sm" id="plan">
          <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold tracking-tight leading-none">
              Your Plan
            </h1>
            <p>
              You are currently on the{" "}
              <span className="font-bold">{session?.user.Plan}</span> plan.
            </p>
          </div>
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Manage/Update your subscription
            </p>
            <button className="bg-gray-900 rounded-lg p-2 text-white text-sm tracking-tight leading-none">
              Manage Subscription
            </button>
          </div>
        </section>
        <section className="border rounded-lg shadow-sm" id="usage">
          <div className="space-y-4 p-4 ">
            <h1 className="text-xl font-bold tracking-tight leading-none">
              Usage
            </h1>
            <p>
              You currently have{" "}
              <span className="font-bold">{session?.user.credits}</span> credits.
            </p>
          </div>
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Manage credits
            </p>
            <button className="bg-gray-900 rounded-lg p-2 text-white text-sm tracking-tight leading-none">
              Add Credits
            </button>
          </div>
        </section>
        <section
          className={`border rounded-lg shadow-sm ${
            session?.user.Plan === "Basic" ? "hidden" : ""
          }`}
          id="openai"
        >
          <OpenAIKey
            setShow={setShow}
            setKeep={setKeep}
            setKeepDuration={setKeepDuration}
            setTitle={setTitle}
            setDescription={setDescription}
            setVariant={setVariant}
          />
        </section>
        <section
          className={`border rounded-lg shadow-sm ${
            session?.user.Plan === "Basic" ? "hidden" : ""
          }`}
          id="api_keys"
        >
          <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold tracking-tight leading-none">
              API Keys
            </h1>
            <APIKeysTable />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: true,
      },
    };
  }
  return { props: {} };
};
