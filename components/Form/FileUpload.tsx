import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCSVReader } from "react-papaparse";

export default function FileUpload() {
  const [dropZoneAttachedFiles, setDropZoneAttachedFiles] = useState<File[]>(
    []
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      console.log(acceptedFiles);
      setDropZoneAttachedFiles([...dropZoneAttachedFiles, ...acceptedFiles])
    }
  }, [dropZoneAttachedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/html": [".pdf", ".doc", ".docx", ".txt", ".csv", ".xlsx"],
    },
    onDrop,
    validator: (file) => {
      // dont allow duplicate files
      if (
        dropZoneAttachedFiles.some(
          (f) =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
        )
      ) {
        console.log(file.name);
        return {
          code: "duplicate-file",
          message: "This file has already been added",
        };
      }
      return null;
    },
  });

  return (
    <div className="m-1 space-y-4">
      <section
        id="dropzone"
        {...getRootProps({
          className: "dropzone",
        })}
        className="border border-dashed border-neutral-200 p-12 rounded-lg"
      >
        <input {...getInputProps({ name: "file" })} />
        <div className="flex flex-col items-center justify-center gap-4">
          {/* <ArrowUpTrayIcon className='h-5 w-5 fill-current' /> */}
          <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
          {isDragActive ? (
            <p className="text-sm text-gray-600 text-center">
              Drop the files here ...
            </p>
          ) : (
            <>
              <div className="text-center justify-center items-center">
                <p className="text-sm text-gray-600 ">
                  Drag & drop files here, or click to select files
                </p>
                <span
                  className="text-xs text-gray-500 dark:text-gray-300"
                  id="file_type_help"
                >
                  Supported File Types: .pdf, .doc, .docx, .txt, .csv, .xlsx
                </span>
              </div>
            </>
          )}
        </div>
      </section>
      <section id="attached-file-list" className="">
            {dropZoneAttachedFiles.map((file, i) => (
                <AttachedFileItem 
                    key={i}
                    attachedFile={file}
                    index={i}
                />
            )
            )}
      </section>
    </div>
  );
}


const AttachedFileItem = ({
    attachedFile,
    // removeAttachedFile,
    index
  }: {
    attachedFile: File;
    // removeAttachedFile: (index: number, fileName: string) => void;
    index: number;
  }) => {
    return (
      <div className="grid grid-cols-10 p-2 m-2 border rounded-lg">
        <div className="col-span-9">
          <span className="break-words">{attachedFile?.name}</span>{' '}
          {/* <span className="text-zinc-500 text-sm">
            ({numberWithCommas(attachedFile?.characters)} chars)
          </span> */}
        </div>
        <div className="flex items-center justify-end">
          <button
            // onClick={() => removeAttachedFile(index, attachedFile.name)}
          >
            <TrashIcon className="w-4 h-4 text-red-600 ml-1" />
          </button>
        </div>
      </div>
    );
  };
