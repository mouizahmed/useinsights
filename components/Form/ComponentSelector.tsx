import {
  ChartBarSquareIcon,
  TableCellsIcon,
  QuestionMarkCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ComponentSelector() {
  const [selected, setSelected] = useState([
    { type: "chart", selected: true, component: <ChartBarSquareIcon className="h-7 w-7" /> },
    { type: "table", selected: true, component: <TableCellsIcon className="h-7 w-7" /> },
    {
      type: "suggested-questions",
      selected: false,
      component: <QuestionMarkCircleIcon className="h-7 w-7" />,
    },
    { type: "key-fact", selected: false, component: <NewspaperIcon className="h-7 w-7" /> },
    {
      type: "chatbot",
      selected: false,
      component: <ChatBubbleBottomCenterTextIcon className="h-7 w-7" />,
    },
  ]);

  const select = (index: number) => {
    let temp = [...selected];
    temp[index].selected = !temp[index].selected;
    console.log(temp);
    setSelected(temp);
  };

  return (
    <div className="flex items-center justify-between">
      {/* <div className="flex items-center">
        <input
          type="checkbox"
          id="analytics"
          name="analyticsCheckBox"
          value="Bike"
        />
        <label
          htmlFor="analyticsCheckBox"
          className="ml-1 text-gray-700 text-sm"
        >
          Advanced Analytics
        </label>
      </div> */}
      {selected.map((type, i) => (
        <div
          key={type.type}
          className={`border-2 ${type.selected ? "border-blue-500" : ""} rounded-lg shadow-md p-2 hover:bg-gray-200 cursor-pointer`}
          onClick={() => select(i)}
        >
          {type.component}
        </div>
      ))}
      {/* <div className="flex items-center">
        <input type="checkbox" id="table" name="tableCheckBox" value="Bike" />
        <label htmlFor="tableCheckBox" className="ml-1 text-gray-700 text-sm">
          Show Table
        </label>
      </div> */}
    </div>
  );
}
