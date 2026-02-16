import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

interface ChartItem {
  age: string;
  Quota: number;
  Success: number;
}

interface Props {
  data: ChartItem[];
}

export default function AgeProgressChart({ data }: Props) {
  const { chartData, grandTotal, maxValue } = useMemo(() => {
    if (!data?.length)
      return {
        chartData: [],
        grandTotal: { Quota: 0, Success: 0 },
        maxValue: 0,
      };

    const total = data.reduce(
      (acc, curr) => ({
        Quota: acc.Quota + curr.Quota,
        Success: acc.Success + curr.Success,
      }),
      { Quota: 0, Success: 0 },
    );

    const max = Math.max(...data.map((d) => Math.max(d.Quota, d.Success)));

    const enriched = data.map((item) => ({
      ...item,
      percent:
        item.Quota > 0 ? ((item.Success / item.Quota) * 100).toFixed(1) : "0",
    }));

    return { chartData: enriched, grandTotal: total, maxValue: max };
  }, [data]);

  const completionRate =
    grandTotal.Quota > 0
      ? ((grandTotal.Success / grandTotal.Quota) * 100).toFixed(2)
      : "0";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 w-full">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          ความคืบหน้าตามช่วงอายุ
        </h2>
        <div className="w-12 h-1 bg-[#fe5000] mt-2 rounded-full" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Quota</p>
          <p className="text-xl font-bold text-[#0c5ca4]">
            {grandTotal.Quota.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Success</p>
          <p className="text-xl font-bold text-[#fe5000]">
            {grandTotal.Success.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Completion</p>
          <p className="text-xl font-bold text-slate-700">{completionRate}%</p>
        </div>
      </div>

      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            barCategoryGap="10%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis dataKey="age" tick={{ fontSize: 12 }} interval={0} />

            <YAxis
              domain={[0, maxValue * 1.15]}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => v.toLocaleString()}
              hide
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number, name: string, props: any) => {
                if (name === "Success") {
                  return [
                    `${value.toLocaleString()} (${props.payload.percent}%)`,
                    "Success",
                  ];
                }
                return [value.toLocaleString(), name];
              }}
            />

            <Bar
              dataKey="Quota"
              fill="#0C5CA4"
              radius={[8, 8, 0, 0]}
              maxBarSize={42}
            >
              <LabelList
                dataKey="Quota"
                position="top"
                fontSize={11}
                formatter={(v: number) => v.toLocaleString()}
              />
            </Bar>

            <Bar
              dataKey="Success"
              fill="#fe5000"
              radius={[8, 8, 0, 0]}
              maxBarSize={42}
            >
              <LabelList
                dataKey="Success"
                position="top"
                fontSize={11}
                formatter={(v: number) => v.toLocaleString()}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
