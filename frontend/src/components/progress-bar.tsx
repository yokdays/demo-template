interface Props {
  heading?: string;
  value: number;
  total: number;
}

export default function ProgressBar({ heading, value, total }: Props) {
  const percent = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-md ">
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-slate-700">
            {heading && (
              <div>
                <div className="text-lg font-semibold">
                  {heading}
                </div>
                <div className="w-12 h-1 bg-[#ffcc00] mt-1 rounded-full" />
              </div>
            )}
            <br />
            <span className="text-3xl text-[#144194]">{value}</span> /{" "}
            <span className="text-sm text-[#5189BC]">{total}</span>
          </span>
        </div>
        <span className="text-sm font-bold text-slate-800 text-end">
          {percent.toFixed(2)}%
        </span>
      </div>

      <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#144194] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
