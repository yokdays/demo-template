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

const COLORS = ["#FFAD39", "#b43900CC"];

export default function Inout({ region }: Props) {
  const [data, setData] = useState<PieData[]>([]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  useEffect(() => {
    axios.get(`/api/inout?region=${region}`).then((res) => {
      const { inArea, outArea } = res.data;

      setData([
        { name: "ในเขตอำเภอ", value: inArea },
        { name: "นอกเขตอำเภอ", value: outArea },
      ]);
    });
  }, [region]);

   return (
      <div className="w-full grid bg-white rounded-xl shadow p-4">
        <div>
          <h2 className="text-lg font-semibold mb-1 text-slate-800">
            สัดส่วนพื้นที่ในและนอกเขตอำเภอ
          </h2>
        </div>
        <div className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] mx-auto aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={4}
                cornerRadius={8}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
  
              <foreignObject
                x="50%"
                y="45%"
                width="40"
                height="40"
                transform="translate(-20,-20)"
              >
                <MapPinIcon size={22} className="mx-auto text-slate-700" />
              </foreignObject>
  
              <text
                x="50%"
                y="62%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-800 text-base sm:text-lg font-bold"
              >
                {total}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
  
        <div className="mt-4 space-y-2">
          {data.map((d, i) => {
            const percent = total > 0 ? ((d.value / total) * 100).toFixed(0) : 0;
  
            return (
              <div
                key={i}
                className="grid grid-cols-[3fr_1fr] items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[i % COLORS.length],
                    }}
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
