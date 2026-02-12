import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

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
  const chartData = AGE_KEYS.map((ageKey) => {
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
    };
  });

  const grandTotal = chartData.reduce(
    (acc, curr) => ({
      Quota: acc.Quota + curr.Quota,
      Success: acc.Success + curr.Success,
    }),
    { Quota: 0, Success: 0 },
  );

  chartData.unshift({
    age: "รวมทั้งหมด",
    Quota: grandTotal.Quota,
    Success: grandTotal.Success,
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        ความคืบหน้าตามช่วงอายุ
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis dataKey="age" />

          <YAxis domain={[0, 2000]} hide />

          <Tooltip />

          <Bar dataKey="Quota" fill="#3b82f6" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="Quota"
              position="top"
              formatter={(value: number) => value.toLocaleString()}
            />
          </Bar>

          <Bar dataKey="Success" fill="#fe5000" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="Success"
              position="top"
              formatter={(value: number) => value.toLocaleString()}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
