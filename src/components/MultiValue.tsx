import { XMarkIcon } from "@heroicons/react/20/solid";
import { ICharacter } from "../interfaces/character";

const MultiValue = ({
  data,
  handleDelete,
}: {
  data: any;
  handleDelete: () => void;
}) => {
  return (
    <div className="flex gap-2 bg-slate-200 px-2 py-1 rounded-lg text-slate-600">
      <div>{data.name}</div>
      <div className="flex items-center">
        <button className="bg-slate-500 p-0.5 rounded" onClick={handleDelete}>
          <XMarkIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

const DropdownItem = ({
  data,
  suggestion,
  active,
  checked,
  handleChange,
}: {
  data: ICharacter;
  suggestion: string;
  active: boolean;
  checked: boolean;
  handleChange: (value: boolean) => void;
}) => {
  const { id, name, image } = data;
  let indexOfBoldTxt = name.toLowerCase().indexOf(suggestion);
  return (
    <div
      className={`p-2 px-3 flex gap-3 text-slate-600 items-center border-b border-slate-400 ${
        active && "bg-green-50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => handleChange(e.target.checked)}
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
                  <b>
                    {name.slice(indexOfBoldTxt, indexOfBoldTxt + suggestion.length)}
                  </b>
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

export { MultiValue, DropdownItem };
