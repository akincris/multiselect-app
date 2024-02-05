import { useRef, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ICharacter } from "../interfaces/character";

export const MultiSelect = () => {
  const [value, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [enteredValues, setEnteredValues] = useState<ICharacter[]>([]);

  const values = [
    { name: "Rick Bestun", episodes: 22, imageURL: "" },
    { name: "Morty Mc.warren", episodes: 24, imageURL: "" },
    { name: "Mrs. Black", episodes: 5, imageURL: "" },
  ]

  const MultiValue = ({ data }: { data: any }) => {
    return (
      <div className="flex gap-2 bg-slate-200 px-2 py-1 rounded-lg text-slate-600">
        <div>{data.name}</div>
        <div className="flex items-center">
          <button
            className="bg-slate-500 p-0.5 rounded"
            onClick={() => {
              const updatedValues = enteredValues.filter((value) => value.name !== data.name);
              setEnteredValues(updatedValues);
            }}
          >
            <XMarkIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    );
  };

  const DropdownItem = ({ data }: { data: any }) => {
    return (
      <div className="p-2 px-3 flex gap-3 text-slate-600 items-center border-b border-slate-400">
        <input
          type="checkbox"
          checked={!!enteredValues.find((value) => value.name === data.name)}
          onChange={(value) => {
            if (value.target.checked) {
              setEnteredValues([...enteredValues, data]);
            } else {
              const updatedValues = enteredValues.filter((v) => v.name !== data.name);
              setEnteredValues(updatedValues);
            }
          }}
        />
        <div className="flex gap-2 items-center">
          <img className="rounded h-8 w-8" src={data.imageURL} />
          <div className="flex flex-col">
            <div>
              <span className="font-semibold text-slate-700">{data.name}</span>
            </div>
            <span className="text-xs">{`${data.episodes} episodes`}</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex justify-between p-4 rounded-xl border border-slate-400 shadow-md bg-white`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-2">
          {enteredValues.map((item, i) => (
            <MultiValue key={i} data={item} />
          ))}
          <div className="flex">
            <input
              className="outline-0"
              ref={inputRef}
              value={value}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <button>
          <ChevronDownIcon className="w-6 h-6 fill-slate-500" />
        </button>
      </div>
      <div className="max-h-[20rem] overflow-auto scroll-smooth bg-slate-50 border border-slate-400 rounded-xl">
        {values.map((item, i) => (
          <DropdownItem key={i} data={item} />
        ))}
      </div>
    </div>
  );
};
