import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ICharacter } from "../interfaces/character";
import { DropdownItem, MultiValue } from "./MultiValue";
import { getFilteredCharacters } from "../api/characters";
import { debounce } from "lodash";
import TableSkeleton from "./Skeleton";

export const MultiSelect = () => {
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ICharacter[]>([]);
  const [enteredValues, setEnteredValues] = useState<ICharacter[]>([]);

  const debouncedQuery = debounce(() => {
    if (input) {
      getFilteredCharacters({ name: input })
        .then((res) => {
          if (res) {
            setCursor(0);
            setResults(res.data.results);
          } else {
            setResults([]);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, 500);

  useEffect(() => {
    if (input) {
      setLoading(true);
      debouncedQuery();
    }
    return debouncedQuery.cancel;
  }, [input]);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-slate-400 font-semibold text-xs">
        Type in to Search the API
      </span>
      <div
        className={`flex justify-between p-4 rounded-xl border border-slate-400 shadow-lg bg-white`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-2 items-center">
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
              onKeyDown={({ key }) => {
                if (key === "ArrowDown" && cursor + 1 < results.length) {
                  setCursor(cursor + 1);
                } else if (key === "ArrowUp" && cursor !== 0) {
                  setCursor(cursor - 1);
                } else if (key === "Enter" && results.length) {
                  setEnteredValues([...enteredValues, results[cursor]]);
                }
              }}
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
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="max-h-[20rem] overflow-auto scroll-smooth bg-slate-50 border border-slate-400 rounded-xl">
          {results.map((item, i) => (
            <DropdownItem
              key={i}
              active={cursor === i}
              data={item}
              suggestion={input.toLowerCase()}
              checked={!!enteredValues.find((value) => value.id === item.id)}
              handleChange={(value) => {
                if (value) {
                  setEnteredValues([...enteredValues, item]);
                } else {
                  const updatedValues = enteredValues.filter((v) => v.id !== item.id);
                  setEnteredValues(updatedValues);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
