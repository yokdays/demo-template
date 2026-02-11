import { ArrowUpRightIcon } from "lucide-react";
import React from "react";

type AgeKey = "total" | "15-24" | "25-34" | "35-44" | "45-54" | "55-64" | "65+";

interface AgeProgress {
  Quota: number;
  Success: number;
}

interface GroupProgress {
  name: string;
  ageGroups: Record<AgeKey, AgeProgress>;
}

const AGE_COLUMNS: { key: AgeKey; label: string }[] = [
  { key: "total", label: "รวมทั้งหมด" },
  { key: "15-24", label: "15 - 24 ปี" },
  { key: "25-34", label: "25 - 34 ปี" },
  { key: "35-44", label: "35 - 44 ปี" },
  { key: "45-54", label: "45 - 54 ปี" },
  { key: "55-64", label: "55 - 64 ปี" },
  { key: "65+", label: "65 ปีขึ้นไป" },
];

const data: GroupProgress[] = [
  {
    name: "รวมทั้งหมด 5 ภูมิภาค",
    ageGroups: {
      total: { Quota: 4783, Success: 200 },
      "15-24": { Quota: 820, Success: 32 },
      "25-34": { Quota: 1150, Success: 55 },
      "35-44": { Quota: 1050, Success: 48 },
      "45-54": { Quota: 850, Success: 35 },
      "55-64": { Quota: 600, Success: 20 },
      "65+": { Quota: 313, Success: 10 },
    },
  },

  {
    name: "กรุงเทพและปริมณฑล",
    ageGroups: {
      total: { Quota: 1200, Success: 60 },

      "15-24": { Quota: 200, Success: 8 },
      "25-34": { Quota: 350, Success: 18 },
      "35-44": { Quota: 280, Success: 14 },
      "45-54": { Quota: 200, Success: 10 },
      "55-64": { Quota: 120, Success: 6 },
      "65+": { Quota: 50, Success: 4 },
    },
  },

  {
    name: "ภาคเหนือ",
    ageGroups: {
      total: { Quota: 900, Success: 40 },

      "15-24": { Quota: 150, Success: 6 },
      "25-34": { Quota: 220, Success: 10 },
      "35-44": { Quota: 200, Success: 9 },
      "45-54": { Quota: 170, Success: 8 },
      "55-64": { Quota: 110, Success: 5 },
      "65+": { Quota: 50, Success: 2 },
    },
  },

  {
    name: "ภาคตะวันออกเฉียงเหนือ",
    ageGroups: {
      total: { Quota: 1100, Success: 45 },

      "15-24": { Quota: 190, Success: 7 },
      "25-34": { Quota: 270, Success: 12 },
      "35-44": { Quota: 240, Success: 10 },
      "45-54": { Quota: 200, Success: 8 },
      "55-64": { Quota: 130, Success: 5 },
      "65+": { Quota: 70, Success: 3 },
    },
  },

  {
    name: "ภาคกลาง/ตะวันออก/ตะวันตก",
    ageGroups: {
      total: { Quota: 950, Success: 35 },

      "15-24": { Quota: 160, Success: 6 },
      "25-34": { Quota: 230, Success: 9 },
      "35-44": { Quota: 210, Success: 8 },
      "45-54": { Quota: 170, Success: 7 },
      "55-64": { Quota: 120, Success: 3 },
      "65+": { Quota: 60, Success: 2 },
    },
  },

  {
    name: "ภาคใต้",
    ageGroups: {
      total: { Quota: 633, Success: 20 },

      "15-24": { Quota: 120, Success: 5 },
      "25-34": { Quota: 150, Success: 6 },
      "35-44": { Quota: 120, Success: 5 },
      "45-54": { Quota: 110, Success: 3 },
      "55-64": { Quota: 80, Success: 1 },
      "65+": { Quota: 53, Success: 0 },
    },
  },
];

export default function Progress() {
  return (
    <div className="p-4 bg-white rounded-xl h-full">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-bold">ความคืบหน้าการสำรวจ</h2>
        <div className="relative text-gray-400 mr-4 hover:text-gray-900 cursor-pointer">
          <h3>ผลวิเคราะห์</h3>
          <ArrowUpRightIcon size={14} className="absolute top-1.5 -right-4" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th rowSpan={2} className="px-4 py-3 text-left">
                ภูมิภาค
              </th>

              {AGE_COLUMNS.map((col) => (
                <th key={col.key} colSpan={2} className="px-4 py-3 text-center">
                  {col.label}
                </th>
              ))}
            </tr>

            <tr className="bg-gray-50 text-gray-500">
              {AGE_COLUMNS.map((col) => (
                <React.Fragment key={col.key}>
                  <th className="px-4 py-2 text-center">โควต้า</th>
                  <th className="px-4 py-2 text-center">สำเร็จ</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((group) => (
              <tr
                key={group.name}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {group.name}
                </td>

                {AGE_COLUMNS.map((col) => {
                  const values = group.ageGroups[col.key];
                  return (
                    <React.Fragment key={col.key}>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">
                        {values?.Quota ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center text-[#FE5102] font-semibold">
                        {values?.Success ?? 0}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
