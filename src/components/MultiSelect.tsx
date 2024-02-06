import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ICharacter } from "../interfaces/character";
import { MultiValue } from "./MultiValue";
import { getFilteredCharacters } from "../api/characters";

export const MultiSelect = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<ICharacter[]>([]);
  const [enteredValues, setEnteredValues] = useState<ICharacter[]>([]);

  useEffect(() => {
    if (input) {
      getFilteredCharacters({ name: input }).then((res) => {
        if (res) {
          setResults(res.data.results);
        } else {
          setResults([]);
        }
      });
    } else {
      setResults([]);
    }
  }, [input]);

  const DropdownItem = ({
    data,
    suggestion,
  }: {
    data: ICharacter;
    suggestion: string;
  }) => {
    const { id, name, image } = data;
    let indexOfBoldTxt = name.toLowerCase().indexOf(suggestion);
    return (
      <div className="p-2 px-3 flex gap-3 text-slate-600 items-center border-b border-slate-400">
        <input
          type="checkbox"
          checked={!!enteredValues.find((value) => value.id === id)}
          onChange={(value) => {
            if (value.target.checked) {
              setEnteredValues([...enteredValues, data]);
            } else {
              const updatedValues = enteredValues.filter((v) => v.id !== id);
              setEnteredValues(updatedValues);
            }
          }}
        />
        <div className="flex gap-2 items-center">
          <img className="rounded h-9 w-9" src={image} />
          <div className="flex flex-col">
            <div>
              <span>
                {indexOfBoldTxt === 0 ? (
                  <>
                    <b>{name.slice(0, suggestion.length)}</b>
                    {name.slice(suggestion.length)}
                  </>
                ) : (
                  <>
                    {name.slice(0, indexOfBoldTxt)}
                    <b>{name.slice(indexOfBoldTxt, indexOfBoldTxt + suggestion.length)}</b>
                    {name.slice(indexOfBoldTxt + suggestion.length)}
                  </>
                )}
              </span>
            </div>
            <span className="text-xs">{`${data.episode.length} episodes`}</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex justify-between p-4 rounded-xl border border-slate-400 shadow-lg bg-white`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-2">
          {enteredValues.map((item, i) => (
            <MultiValue
              key={i}
              data={item}
              handleDelete={() => {
                const updatedValues = enteredValues.filter((value) => value.id !== item.id);
                setEnteredValues(updatedValues);
              }}
            />
          ))}
          <div>
            <input
              className="outline-0"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <button>
          <ChevronDownIcon className="h-6 fill-slate-500" />
        </button>
      </div>
      <div className="max-h-[20rem] overflow-auto scroll-smooth bg-slate-50 border border-slate-400 rounded-xl">
        {results.map((item, i) => (
          <DropdownItem key={i} data={item} suggestion={input.toLowerCase()} />
        ))}
      </div>
    </div>
  );
};
