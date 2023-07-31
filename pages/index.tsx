import Footer from "../components/Footer";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <section>
        <div className="m-auto h-calc max-w-7xl lg:grid lg:grid-cols-2 lg:gap-10">
          <div className="mx-10 my-10 flex flex-col text-center lg:items-end lg:justify-center lg:text-end space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
              Ask your data a question,<br></br>{" "}
              <span className="text-transparent bg-clip-text bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500">
                in plain English.
              </span>
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl">
              Upload files or connect any database, ask a question, get an
              answer with advanced visual analytics in seconds.
            </p>
            <Link
              href="/signin"
              className="py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              Get Started
            </Link>
          </div>
          <div className="mx-10 my-10 md:flex md:items-center md:justify-center">
            <div className="bg-white border rounded-lg shadow-md p-2">
              <video
                width="720"
                height="1080"
                autoPlay
                muted
                loop
                controls
                className="rounded-lg"
              >
                <source src="/video_placeholder.mp4" type="video/mp4"></source>
              </video>
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen h-screen p-10 bg-slate-100">
        <div className="m-auto h-screen max-w-7xl lg:grid lg:grid-cols-2 lg:gap-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">
              Get the answers you need without knowing SQL or Spreadsheets.
            </h1>
          </div>
        </div>
      </section>      
  
      <Footer />
    </div>
  );
}
