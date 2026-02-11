import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { PersonStandingIcon } from "lucide-react";

interface PieData {
  name: string;
  value: number;
}

const COLORS = ["#fe5000", "#e0e0e0"];


export default function PieStats() {
  const [data, setData] = useState<PieData[]>([]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  useEffect(() => {
    axios.get("/api/stats").then((res) => {
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
        <h2 className="text-lg font-bold mb-1 text-slate-800">ภาพรวมทั้งหมด</h2>
      </div>
      <div className="w-[18vw] h-[8vw]">
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
              <PersonStandingIcon size={25} className="mx-auto" />
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
      <div className="mt-4 space-y-2">
        {data.map((d, i) => {
          const percent = ((d.value / total) * 100).toFixed(0);
          return (
            <div key={i} className="grid grid-cols-[3fr_1fr] items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-slate-700">{d.name}</span>
              </div>

              <div className="font-medium text-slate-800 flex justify-end">
                {d.value} ({percent}%)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
