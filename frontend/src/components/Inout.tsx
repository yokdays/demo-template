import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapPinIcon } from "lucide-react";

interface PieData {
  name: string;
  value: number;
}

interface Props {
  region: string;
}

const COLORS = ["#fe5000", "#2563eb"];

export default function Inout({ region }: Props) {
  const [data, setData] = useState<PieData[]>([]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  useEffect(() => {
    axios
      .get(`/api/inout?region=${region}`)
      .then((res) => {
        const { inArea, outArea } = res.data;

        setData([
          { name: "ในเขตอำเภอ", value: inArea },
          { name: "นอกเขตอำเภอ", value: outArea },
        ]);
      });
  }, [region]);

  return (
    <div className="bg-white rounded-xl shadow p-4 grid justify-center w-full">
      <div>
        <h2 className="text-lg font-bold mb-1 text-slate-800">
          สัดส่วนพื้นที่ในและนอกเขตอำเภอ
        </h2>
      </div>

      <div className="w-[14vw] h-[14vw] mx-auto flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
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
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
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
              <MapPinIcon size={25} className="mx-auto text-slate-700" />
            </foreignObject>

            {/* TOTAL (แสดง ในเขต / รวมทั้งหมด) */}
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-lg font-bold fill-slate-800"
            >
              {/* {data[0]?.value || 0}/{total} */}
              {total}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((d, i) => {
          const percent =
            total > 0
              ? ((d.value / total) * 100).toFixed(0)
              : 0;

          return (
            <div
              key={i}
              className="grid grid-cols-[3fr_1fr] items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[i % COLORS.length],
                  }}
                />
                <span className="text-slate-700">
                  {d.name}
                </span>
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
