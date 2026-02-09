import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChartIcon } from "lucide-react";

interface PieData {
  name: string;
  value: number;
}

const COLORS = ["#e64a19", "#e0e0e0"];
const renderLabel = ({ name, percent }: any) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

export default function ChartOutsight() {
  const [data, setData] = useState<PieData[]>([]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  useEffect(() => {
    axios.get("/api/outsight").then((res) => {
      const { labels, values } = res.data;
      setData(
        labels.map((label: string, i: number) => ({
          name: label,
          value: values[i],
        })),
      );
    });
  }, []);

  return (
    <div className="w-[20vw] bg-white rounded-xl shadow p-4 grid justify-center">
      <div>
        <h2 className="text-lg font-bold mb-1 text-slate-800">กลุ่มลูกค้าต่างประเทศ</h2>
      </div>
      <div className="w-[16vw] h-[8vw]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="75%"
              outerRadius="100%"
              paddingAngle={5}
              cx="50%"
              cy="50%"
              cornerRadius="50%"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* ICON */}
            <foreignObject
              x="50%"
              y="45%"
              width="40"
              height="40"
              transform="translate(-20,-20)"
            >
              <PieChartIcon className="w-6 h-6 text-slate-600 mx-auto" />
            </foreignObject>

            {/* TOTAL */}
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-lg font-bold fill-slate-800"
            >
              {data[0]?.value || 0}/{total}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="mt-4 space-y-2">
        {data.map((d, i) => {
          const percent = ((d.value / total) * 100).toFixed(0);
          return (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-slate-700">{d.name}</span>
              </div>

              <span className="font-medium text-slate-800">
                {d.value} ({percent}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
