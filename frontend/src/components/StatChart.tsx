import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChartIcon } from "lucide-react";

interface PieData {
  name: string;
  value: number;
}

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
const renderLabel = ({ name, percent }: any) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

export default function PieStats() {
  const [data, setData] = useState<PieData[]>([]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/stats").then((res) => {
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
      {/* PIE */}
      <div className="w-[10vw] h-[8vw]">
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
              y="56%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl font-bold fill-slate-800"
            >
              {total}
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
