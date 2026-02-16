import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";
interface Dataset {
  key: string;
  label: string;
  data: number[];
  color: string;
}

interface AnabarProps {
  heading: string;
  heading2: string;
  labels: string[];
  datasets: Dataset[];
}

export default function Anabar({
  heading2,
  labels,
  datasets,
}: AnabarProps) {
  const chartData = labels.map((label, index) => {
    const entry: Record<string, string | number> = { name: label };

    datasets.forEach((ds) => {
      entry[ds.key] = ds.data[index] ?? 0;
    });

    return entry;
  });

  return (
    <div className="my-4">
      {/* <h2 className="text-lg font-semibold mb-4">{heading}</h2> */}
      
      <h2 className="text-lg font-semibold mb-4">{heading2}</h2>

      <div className="w-full h-[500px]">
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            layout="vertical"
            barCategoryGap="10%"
            barGap={6}
          >
            <XAxis type="number" hide />

            <YAxis type="category" dataKey="name" width={200} />

            <Tooltip />
            <Legend />

            {datasets.map((ds) => (
              <Bar
                key={ds.key}
                dataKey={ds.key}
                name={ds.label}
                fill={ds.color}
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey={ds.key}
                  position="right"
                  formatter={(value) =>
                    typeof value === "number" && value > 0
                      ? value.toFixed(2).toLocaleString()
                      : ""
                  }
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
