interface Props {
  heading?: string;
  value: number;
  total: number;
}

export default function ProgressBar({ heading, value, total }: Props) {
  const percent = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md ">
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-slate-700">
            {heading && (
              <span className="text-lg text-gray-400 font-semibold">
                {heading}
              </span>
            )}
            <br />
            <span className="text-3xl text-[#cf5612]">{value}</span> / <span className="text-sm text-[#2582c6]">{total}</span>
          </span>
        </div>
        <span className="text-sm font-bold text-slate-800 text-end">
          {percent.toFixed(2)}%
        </span>
      </div>

      <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
