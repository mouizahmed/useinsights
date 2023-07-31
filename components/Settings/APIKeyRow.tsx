import { API } from "@/types";
import {
  TrashIcon,
  EyeSlashIcon,
  EyeIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { hideKey } from "../../util/helper";
import { supabase } from "../../lib/supabase";
import { useState } from "react";

export function APIKeysRow({
  api_key,
  setSecretKeys,
  secretKeys,
  created_at,
}: {
  api_key: string | null;
  setSecretKeys: React.Dispatch<React.SetStateAction<API[]>>;
  secretKeys: API[];
  created_at: string | null;
}) {
  const [shown, setShown] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(api_key ?? "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const deleteKey = async () => {
    const { error } = await supabase
      .from("Secret_Keys")
      .delete()
      .eq("secret_key", api_key);

      setSecretKeys(secretKeys.filter((key) => key.secret_key !== api_key))
  };

  return (
    <>
      <tr>
        <td className="text-sm font-medium text-gray-900 sm:pl-6 w-full">
          {shown ? (
            <span>{api_key}</span>
          ) : (
            <span>{hideKey(api_key ?? "", 0)}</span>
          )}
        </td>
        <td className="p-4">
          <button
            className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50"
            onClick={() => copyKey()}
            // disabled={openAI.length === 0 || openAI.length <= 8}
          >
            {!copied ? (
              <ClipboardDocumentIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <CheckIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </td>
        <td className="p-4">
          <button
            className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50"
            onClick={() => setShown(!shown)}
            // disabled={openAI.length === 0 || openAI.length <= 8}
          >
            {shown ? (
              <EyeSlashIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </td>
        <td className="p-4">
          <button
            className="flex items-center justify-center p-2 hover:bg-red-200 rounded-lg disabled:opacity-50"
            onClick={() => deleteKey()}
          >
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
        </td>
      </tr>
    </>
  );
}
