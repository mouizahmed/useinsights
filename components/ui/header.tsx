import { SignIn } from "../SignIn";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { parse, serialize } from "cookie";
import React, { useState, useEffect } from "react";

export const Header = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parse(document.cookie);
    if (!cookies.available_credits) {
        document.cookie = `chart_generations=3;path=/;max-age=${60*60*24*7};samesite=lax`;
    }
    
  }, []);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <nav className="w-full flex items-center justify-between h-12 px-4 border-2 border-zinc-200 row-span-3">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleClick}
      >
        <div className="border rounded-md p-1 hover:bg-slate-50">
          <EyeIcon className="w-5 h-5" />
        </div>
        <h1 className="font-bold sm:text-md flex items-center">Insightify</h1>
      </div>
      <SignIn />
    </nav>
  );
};
