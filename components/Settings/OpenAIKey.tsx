import { useCallback, useEffect, useState } from "react";
import { InformationAlert } from "../ui/InformationAlert";
import { TrashIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useSession, getSession } from "next-auth/react";
import { hideKey } from "../../util/helper";
import axios from "axios";
import { supabase } from "../../lib/supabase-client";
import { NotificationVariantType } from "@/types";
export function OpenAIKey({
  setShow,
  setKeep,
  setKeepDuration,
  setTitle,
  setDescription,
  setVariant,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setKeep: React.Dispatch<React.SetStateAction<boolean>>;
  setKeepDuration: React.Dispatch<React.SetStateAction<number>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setVariant: React.Dispatch<React.SetStateAction<NotificationVariantType>>;
}) {
  const { data: session, update } = useSession();

  const [openAI, setOpenAI] = useState("");
  const [unhiddenOpenAI, setUnhiddenOpenAI] = useState<string>("");
  const [isOpenAIHidden, setIsOpenAIHidden] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user.openAI) {
      const hiddenKey = hideKey(session?.user.openAI, 8);
      setOpenAI(hiddenKey);
      setUnhiddenOpenAI(session?.user.openAI);
      setIsOpenAIHidden(true);
    }
  }, [session]);

  function toggleShow() {
    if (isOpenAIHidden) {
      setOpenAI(unhiddenOpenAI);
      setIsOpenAIHidden(false);
    } else {
      setOpenAI(hideKey(openAI, 8));
      setIsOpenAIHidden(true);
    }

    console.log("FFF");
  }

  const handleInputChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLInputElement>,
      type: string
    ) => {
      switch (type) {
        case "openAI":
          setOpenAI(event.target.value);
          setUnhiddenOpenAI(event.target.value);
          // setIsOpenAIHidden(false);
          break;
      }
    },
    []
  );

  async function handleOpenAI() {
    try {
      await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Say this is a test!" }],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAI}`,
          },
        }
      );
      
      await axios.put('/api/account/set-openai-key', {
        openAI: openAI,
        userID: session?.user.id
      });
      // const hiddenKey = hideKey(openAI, 8)
      // setOpenAI(hiddenKey);
      // setHiddenOpenAI(hiddenKey);
      
      update();
      setShow(true);
      setKeep(false);
      setKeepDuration(2500);
      setTitle("Success!");
      setDescription("Your OpenAI API key is now ready to be used.");
      setVariant("success");
    } catch (err) {
      setShow(true);
      setKeep(false);
      setTitle("Error!");
      setDescription((err as Error).message);
      setVariant("error");
      console.error(err);
    }
  }

  function disableOpenAI(): boolean {
    if (openAI.length !== 51) return true;
    if (openAI.slice(0, 3) !== "sk-") return true;
    if (
      session?.user.openAI === openAI ||
      session?.user.openAI === unhiddenOpenAI
    )
      return true;
    if (openAI.includes("*")) return true;
    return false;
  }

  return (
    <>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold tracking-tight leading-none">
          OpenAI API Key
        </h1>
        <InformationAlert
          text="If you want to use the GPT-4 model, make sure that you have access to it on your OpenAI account."
          link="https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4"
        />
        <div className="flex justify-between space-x-4">
          <button
            className="flex items-center justify-center p-2 hover:bg-red-200 rounded-lg disabled:opacity-50"
            onClick={() => setOpenAI("")}
            disabled={isOpenAIHidden}
          >
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
          <button
            className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50"
            onClick={() => toggleShow()}
            disabled={openAI.length === 0 || openAI.length <= 8}
          >
            {isOpenAIHidden ? (<EyeIcon className="w-5 h-5 text-gray-600" />) : (<EyeSlashIcon className="w-5 h-5 text-gray-600" />)}
          </button>
          <input
            type="text"
            disabled={isOpenAIHidden}
            value={openAI}
            onChange={(e) => handleInputChange(e, "openAI")}
            placeholder="Enter a number (leave blank for unlimited)"
            className="flex-1 resize-none w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:blue-purple-600 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            disabled={disableOpenAI()}
            onClick={handleOpenAI}
            className="bg-gray-900 p-2 text-white rounded-lg tracking-tight leading-none disabled:opacity-50 disabled:cursor-no-drop"
          >
            Set
          </button>
        </div>
      </div>
    </>
  );
};
