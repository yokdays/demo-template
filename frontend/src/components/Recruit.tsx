import axios from "axios";
import { useEffect, useState } from "react";

export default function Recruit() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    axios.get("/api/recruit").then((res) => {
      const { labels, values } = res.data;
      setData(
        labels.map((label: string, i: number) => ({
          name: label,
          value: values[i],
        })),
      );
    });
  }, []);

  const VALUE_COLORS: Record<number, string> = {
    0: "#000000",
    1: "#000000",
    2: "#000000",
  };

  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("th-TH", { month: "long" });
  const year = now.getFullYear() + 543;
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">ความคืบหน้าการนัดหมาย</h2>
        <h1 className="text-gray-400">
          ข้อมูล ณ วันที่ {day} {month} {year}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-12 rounded-lg bg-slate-100"
          >
            <span className="text-lg text-gray-500">{item.name}</span>
            <span
              className="text-4xl font-bold"
              style={{ color: VALUE_COLORS[index] ?? "#4b5563" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
