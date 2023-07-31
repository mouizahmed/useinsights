//import { StatusOnlineIcon } from "@heroicons/react/outline";
import ContentEditable from "react-contenteditable";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import React, { useState, useEffect } from "react";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import {
  ArrowPathIcon,
  InformationCircleIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

interface NewRow {
  [key: string]: any;
}

export default function TableFromChart({
  data,
  setData,
  setChartKey,
}: {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setChartKey: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [tabularData, setTabularData] = useState<Matrix<CellBase<any>>>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    console.log(data);
    let tempHeaders: string[] = Object.keys(data[0]);
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
    }
  }, []);


  const newRow = () => {
    let emptyRow: NewRow = {};
    for (const header in headers) {
      emptyRow[header] = "";
    }
    setData([...data, emptyRow]);
  }

  return (
    <div className="flex flex-col overflow-x-auto p-2">
      <div className="">
        <div className="relative min-w-full align-middle ">
          <button className="absolute right-0 p-1 rounded-full hover:bg-gray-50">
            <InformationCircleIcon className="w-5 h-5" />
          </button>
          <div className="space-x-2">
            <button
              onClick={() => setChartKey(Math.random().toString())}
              className="border p-1 mb-4 rounded-lg hover:bg-gray-50"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
            <button type="button" className="p-1 rounded-lg border hover:bg-gray-50" onClick={() => newRow()}>
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={`whitespace-nowrap py-3.5 pl-4 pr-3 border text-left text-sm font-semibold text-gray-900 sm:pl-6 ${
                        i === 0
                          ? "rounded-tl-lg"
                          : i === headers.length - 1
                          ? "rounded-tr-lg"
                          : ""
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((row, i) => (
                  <tr key={i}>
                    {headers.map((header, h_i) => (
                      <td
                        key={h_i}
                        className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 border"
                      >
                        <div
                          contentEditable="true"
                          suppressContentEditableWarning={true}
                          onInput={(e) => {
                            console.log(
                              `Text inside div ${i}`,
                              e.currentTarget.textContent
                            );
                            const newData = data;
                            const checkRow = data[i];
                            if (header === "name") {
                              checkRow[header] = e.currentTarget.textContent;
                            } else {
                              checkRow[header] = parseInt(
                                e.currentTarget.textContent ?? "null"
                              );
                            }
                            newData[i] = checkRow;
                            console.log(newData);
                            setData(newData);
                          }}
                        >
                        
                          {typeof row[header] === "number" ? Intl.NumberFormat("us").format(row[header]).toString() : row[header]}
                        </div>
                      </td>
                    ))}
                    <td className="flex justify-center p-2 items-center hover:bg-gray-50 cursor-pointer">
                      <MinusIcon className="w-2 h-5" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    // <div className="overflow-x-auto flex items-center justify-center">
    //   <Spreadsheet
    //     className="w-full"
    //     data={tabularData}
    //     onChange={(e) => tabularInput(e)}
    //     columnLabels={headers}
    //     rowLabels={[]}
    //     hideRowIndicators={true}
    //   />
    // </div>
    // <Table className="flex justify-center">
    //   <TableHead>
    //     <TableRow>
    //       {headers.map((header, i) => (
    //         <TableHeaderCell key={i}>{header}</TableHeaderCell>
    //       ))}
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     {data.map((item) => (
    //       <TableRow key={item.name}>
    //         {/* <TableCell>{item.name}</TableCell>
    //           <TableCell>
    //             <Text>{item.Role}</Text>
    //           </TableCell>
    //           <TableCell>
    //             <Text>{item.departement}</Text>
    //           </TableCell> */}
    //         {headers.map((header, i) => (
    //           <TableCell key={i}>{item[header]}</TableCell>
    //         ))}
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>
  );
}
