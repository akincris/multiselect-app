const TableSkeleton = ({ x }: { x?: number }) => {
  const rows = new Array<number>(x || 3).fill(1);

  return (
    <div
      className={`w-full p-4 space-y-4 divide-y divide-gray-200 bg-slate-50 rounded shadow animate-pulse md:p-6`}
    >
      {rows.map((row, i) => (
        <div key={i} className="flex items-center justify-between pt-2">
          <div>
            <div className="h-3 bg-gray-300 rounded-full w-14 sm:w-28 mb-2.5"></div>
            <div className="w-16 sm:w-36 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TableSkeleton;
