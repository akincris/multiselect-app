import { useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";

export const MultiSelect = () => {
  const [value, setInput] = useState("");
  const [enteredValues, setEnteredValues] = useState([
    { name: "Rick Bestun", episodes: 22, imageURL: "" },
    { name: "Morty Mc.warren", episodes: 24, imageURL: "" },
    { name: "Black", episodes: 5, imageURL: "" },
  ]);

  return (
    <div className="flex justify-between p-4 rounded-xl border border-slate-400 shadow-md bg-white">
      <div className="flex flex-wrap gap-2">
        {enteredValues.map((item, i) => (
          <div
            className="flex gap-2 bg-slate-200 px-2 py-1 rounded-lg text-slate-600"
            key={i}
          >
            <div>{item.name}</div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  const updatedValues = enteredValues.filter(
                    (value) => value.name !== item.name
                  );
                  setEnteredValues(updatedValues);
                }}
              >
                <XMarkIcon className="h-4 w-4 m-1 bg-slate-500 rounded text-white" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex">
          <input
            type="text"
            value={value}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <button>
        <ChevronDownIcon className="w-6 h-6 fill-slate-500" />
      </button>
    </div>
  );
};
