import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { MapPinIcon } from "lucide-react";

interface Props {
  inArea: number;
  outArea: number;
}

interface PieData {
  name: string;
  value: number;
}

const COLORS = ["#FFAD39", "#b43900CC"];


export default function InoutDashboard({ inArea, outArea }: Props) {
  const data: PieData[] = [
    { name: "ในเขตเทศบาล", value: inArea },
    { name: "นอกเขตเทศบาล", value: outArea },
  ];

  const total = inArea + outArea;

  return (
    <div className="bg-white rounded-xl shadow p-4 grid w-full">
      <div>
        <h2 className="text-lg font-semibold mb-1 text-slate-800">
          สัดส่วนพื้นที่ในและนอกเขตเทศบาล
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
      
                    {/* ICON */}
                    <foreignObject
                      x="50%"
                      y="45%"
                      width="40"
                      height="40"
                      transform="translate(-20,-20)"
                    >
                      <MapPinIcon size={22} className="mx-auto text-slate-700" />
                    </foreignObject>
      
                    {/* TOTAL */}
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
              className="grid grid-cols-[3fr_1fr] items-center text-sm"
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
