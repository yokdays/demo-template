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

interface GenderData {
  Quota: number;
  Success: number;
}

interface AgeGroup {
  Quota: number;
  Success: number;
  male: GenderData;
  female: GenderData;
}

interface Region {
  name: string;
  ageGroups: {
    total: AgeGroup;
    [key: string]: AgeGroup;
  };
}

interface Props {
  regions: Region[];
}

const AGE_KEYS = ["15-24", "25-34", "35-44", "45-54", "55-64", "65+"];

export default function AgeProgressChart({ regions }: Props) {
  const { chartData, grandTotal } = useMemo(() => {
    const data = AGE_KEYS.map((ageKey) => {
      let totalQuota = 0;
      let totalSuccess = 0;

      regions.forEach((province) => {
        const age = province.ageGroups?.[ageKey];
        if (age) {
          totalQuota += age.Quota || 0;
          totalSuccess += age.Success || 0;
        }
      });

      return {
        age: ageKey,
        Quota: totalQuota,
        Success: totalSuccess,
        percent:
          totalQuota > 0
            ? ((totalSuccess / totalQuota) * 100).toFixed(1)
            : 0,
      };
    });

    const total = data.reduce(
      (acc, curr) => ({
        Quota: acc.Quota + curr.Quota,
        Success: acc.Success + curr.Success,
      }),
      { Quota: 0, Success: 0 }
    );

    return { chartData: data, grandTotal: total };
  }, [regions]);

  const completionRate =
    grandTotal.Quota > 0
      ? ((grandTotal.Success / grandTotal.Quota) * 100).toFixed(1)
      : 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full">
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          ความคืบหน้าตามช่วงอายุ
        </h2>
        <div className="w-12 h-1 bg-[#fe5000] mt-2 rounded-full" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Quota รวม</p>
          <p className="text-xl font-bold text-[#0c5ca4]">
            {grandTotal.Quota.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Success รวม</p>
          <p className="text-xl font-bold text-[#fe5000]">
            {grandTotal.Success.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Completion Rate</p>
          <p className="text-xl font-bold text-slate-700">
            {completionRate}%
          </p>
        </div>
      </div>

      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            barCategoryGap="10%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="age"
              tick={{ fontSize: 12 }}
              interval={0}
            />

            <YAxis hide />

            <Tooltip
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
              fill="#0c5ca4"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
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
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
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
