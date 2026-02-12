import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface ChartItem {
  age: string;
  Quota: number;
  Success: number;
}

interface Props {
  data: ChartItem[];
}

export default function AgeProgressChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        ความคืบหน้าตามช่วงอายุ
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="age" />

          <YAxis hide />

          <Tooltip />

          <Bar dataKey="Quota" fill="#3b82f6" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="Quota"
              position="top"
              formatter={(value: number) =>
                value.toLocaleString()
              }
            />
          </Bar>

          <Bar dataKey="Success" fill="#fe5000" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="Success"
              position="top"
              formatter={(value: number) =>
                value.toLocaleString()
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
