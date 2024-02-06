import { XMarkIcon } from "@heroicons/react/20/solid";

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

export { MultiValue };
