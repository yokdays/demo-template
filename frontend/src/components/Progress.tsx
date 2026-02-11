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
];

const north: GroupProgress[] = [
  {
    name: "รวม 6 จังหวัดภาคเหนือ",
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
    name: "เชียงใหม่",
    ageGroups: {
      total: { Quota: 220, Success: 10 },
      "15-24": { Quota: 40, Success: 2 },
      "25-34": { Quota: 55, Success: 3 },
      "35-44": { Quota: 50, Success: 2 },
      "45-54": { Quota: 40, Success: 2 },
      "55-64": { Quota: 25, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "นครสวรรค์",
    ageGroups: {
      total: { Quota: 160, Success: 7 },
      "15-24": { Quota: 25, Success: 1 },
      "25-34": { Quota: 40, Success: 2 },
      "35-44": { Quota: 35, Success: 2 },
      "45-54": { Quota: 30, Success: 1 },
      "55-64": { Quota: 20, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "พิษณุโลก",
    ageGroups: {
      total: { Quota: 150, Success: 7 },
      "15-24": { Quota: 25, Success: 1 },
      "25-34": { Quota: 35, Success: 2 },
      "35-44": { Quota: 35, Success: 2 },
      "45-54": { Quota: 30, Success: 1 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "กำแพงเพชร",
    ageGroups: {
      total: { Quota: 140, Success: 6 },
      "15-24": { Quota: 20, Success: 1 },
      "25-34": { Quota: 35, Success: 2 },
      "35-44": { Quota: 30, Success: 1 },
      "45-54": { Quota: 30, Success: 1 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "พิจิตร",
    ageGroups: {
      total: { Quota: 130, Success: 6 },
      "15-24": { Quota: 20, Success: 1 },
      "25-34": { Quota: 30, Success: 2 },
      "35-44": { Quota: 30, Success: 1 },
      "45-54": { Quota: 25, Success: 1 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "สุโขทัย",
    ageGroups: {
      total: { Quota: 100, Success: 4 },
      "15-24": { Quota: 20, Success: 0 },
      "25-34": { Quota: 25, Success: 1 },
      "35-44": { Quota: 20, Success: 1 },
      "45-54": { Quota: 20, Success: 1 },
      "55-64": { Quota: 10, Success: 1 },
      "65+": { Quota: 5, Success: 0 },
    },
  },
];

const northeast: GroupProgress[] = [
  {
    name: "รวม 6 จังหวัดภาคตะวันออกเฉียงเหนือ",
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
    name: "นครราชสีมา",
    ageGroups: {
      total: { Quota: 250, Success: 10 },
      "15-24": { Quota: 40, Success: 2 },
      "25-34": { Quota: 65, Success: 3 },
      "35-44": { Quota: 55, Success: 2 },
      "45-54": { Quota: 45, Success: 2 },
      "55-64": { Quota: 30, Success: 1 },
      "65+": { Quota: 15, Success: 0 },
    },
  },
  {
    name: "อุบลราชธานี",
    ageGroups: {
      total: { Quota: 220, Success: 9 },
      "15-24": { Quota: 35, Success: 1 },
      "25-34": { Quota: 55, Success: 2 },
      "35-44": { Quota: 50, Success: 2 },
      "45-54": { Quota: 40, Success: 2 },
      "55-64": { Quota: 25, Success: 1 },
      "65+": { Quota: 15, Success: 1 },
    },
  },
  {
    name: "ขอนแก่น",
    ageGroups: {
      total: { Quota: 230, Success: 10 },
      "15-24": { Quota: 40, Success: 2 },
      "25-34": { Quota: 60, Success: 3 },
      "35-44": { Quota: 50, Success: 2 },
      "45-54": { Quota: 40, Success: 2 },
      "55-64": { Quota: 25, Success: 1 },
      "65+": { Quota: 15, Success: 0 },
    },
  },
  {
    name: "สุรินทร์",
    ageGroups: {
      total: { Quota: 180, Success: 7 },
      "15-24": { Quota: 30, Success: 1 },
      "25-34": { Quota: 45, Success: 2 },
      "35-44": { Quota: 40, Success: 2 },
      "45-54": { Quota: 35, Success: 1 },
      "55-64": { Quota: 20, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "อุดรธานี",
    ageGroups: {
      total: { Quota: 120, Success: 5 },
      "15-24": { Quota: 20, Success: 1 },
      "25-34": { Quota: 30, Success: 1 },
      "35-44": { Quota: 25, Success: 1 },
      "45-54": { Quota: 25, Success: 1 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 5, Success: 0 },
    },
  },
  {
    name: "ชัยภูมิ",
    ageGroups: {
      total: { Quota: 100, Success: 4 },
      "15-24": { Quota: 15, Success: 0 },
      "25-34": { Quota: 25, Success: 1 },
      "35-44": { Quota: 25, Success: 1 },
      "45-54": { Quota: 20, Success: 1 },
      "55-64": { Quota: 10, Success: 1 },
      "65+": { Quota: 5, Success: 0 },
    },
  },
];
const central: GroupProgress[] = [
  {
    name: "รวม 6 จังหวัดภาคกลาง/ตะวันออก/ตะวันตก",
    ageGroups: {
      total: { Quota: 950, Success: 35 },
      "15-24": { Quota: 160, Success: 6 },
      "25-34": { Quota: 230, Success: 9 },
      "35-44": { Quota: 210, Success: 8 },
      "45-54": { Quota: 170, Success: 6 },
      "55-64": { Quota: 120, Success: 4 },
      "65+": { Quota: 60, Success: 2 },
    },
  },
  {
    name: "ชลบุรี",
    ageGroups: {
      total: { Quota: 170, Success: 6 },
      "15-24": { Quota: 30, Success: 1 },
      "25-34": { Quota: 40, Success: 2 },
      "35-44": { Quota: 35, Success: 1 },
      "45-54": { Quota: 30, Success: 1 },
      "55-64": { Quota: 20, Success: 1 },
      "65+": { Quota: 15, Success: 0 },
    },
  },
  {
    name: "ฉะเชิงเทรา",
    ageGroups: {
      total: { Quota: 160, Success: 6 },
      "15-24": { Quota: 25, Success: 1 },
      "25-34": { Quota: 45, Success: 2 },
      "35-44": { Quota: 35, Success: 1 },
      "45-54": { Quota: 30, Success: 1 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "อยุธยา",
    ageGroups: {
      total: { Quota: 180, Success: 7 },
      "15-24": { Quota: 30, Success: 1 },
      "25-34": { Quota: 45, Success: 2 },
      "35-44": { Quota: 40, Success: 2 },
      "45-54": { Quota: 35, Success: 1 },
      "55-64": { Quota: 20, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "สุพรรณบุรี",
    ageGroups: {
      total: { Quota: 150, Success: 5 },
      "15-24": { Quota: 25, Success: 1 },
      "25-34": { Quota: 35, Success: 1 },
      "35-44": { Quota: 35, Success: 1 },
      "45-54": { Quota: 30, Success: 1 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "สระบุรี",
    ageGroups: {
      total: { Quota: 150, Success: 6 },
      "15-24": { Quota: 25, Success: 1 },
      "25-34": { Quota: 35, Success: 2 },
      "35-44": { Quota: 30, Success: 1 },
      "45-54": { Quota: 30, Success: 1 },
      "55-64": { Quota: 20, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "กาญจนบุรี",
    ageGroups: {
      total: { Quota: 140, Success: 5 },
      "15-24": { Quota: 25, Success: 1 },
      "25-34": { Quota: 30, Success: 1 },
      "35-44": { Quota: 35, Success: 2 },
      "45-54": { Quota: 25, Success: 1 },
      "55-64": { Quota: 15, Success: 0 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
];

const data_bkk: GroupProgress[] = [
  {
    name: "รวมทั้งหมด 6 จังหวัดในกรุงเทพและปริมณฑล",
    ageGroups: {
      total: { Quota: 1200, Success: 60 },
      "15-24": { Quota: 200, Success: 10 },
      "25-34": { Quota: 300, Success: 16 },
      "35-44": { Quota: 250, Success: 13 },
      "45-54": { Quota: 220, Success: 11 },
      "55-64": { Quota: 150, Success: 7 },
      "65+": { Quota: 80, Success: 3 },
    },
  },

  {
    name: "กรุงเทพมหานคร",
    ageGroups: {
      total: { Quota: 500, Success: 25 },
      "15-24": { Quota: 90, Success: 5 },
      "25-34": { Quota: 130, Success: 7 },
      "35-44": { Quota: 110, Success: 6 },
      "45-54": { Quota: 90, Success: 4 },
      "55-64": { Quota: 60, Success: 2 },
      "65+": { Quota: 20, Success: 1 },
    },
  },

  {
    name: "สมุทรปราการ",
    ageGroups: {
      total: { Quota: 200, Success: 10 },
      "15-24": { Quota: 35, Success: 2 },
      "25-34": { Quota: 55, Success: 3 },
      "35-44": { Quota: 40, Success: 2 },
      "45-54": { Quota: 35, Success: 2 },
      "55-64": { Quota: 25, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },

  {
    name: "นนทบุรี",
    ageGroups: {
      total: { Quota: 180, Success: 9 },
      "15-24": { Quota: 30, Success: 1 },
      "25-34": { Quota: 50, Success: 3 },
      "35-44": { Quota: 40, Success: 2 },
      "45-54": { Quota: 35, Success: 2 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },

  {
    name: "ปทุมธานี",
    ageGroups: {
      total: { Quota: 160, Success: 8 },
      "15-24": { Quota: 25, Success: 1 },
      "25-34": { Quota: 45, Success: 2 },
      "35-44": { Quota: 35, Success: 2 },
      "45-54": { Quota: 30, Success: 2 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },

  {
    name: "นครปฐม",
    ageGroups: {
      total: { Quota: 90, Success: 4 },
      "15-24": { Quota: 10, Success: 0 },
      "25-34": { Quota: 15, Success: 1 },
      "35-44": { Quota: 20, Success: 1 },
      "45-54": { Quota: 20, Success: 1 },
      "55-64": { Quota: 15, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },

  {
    name: "สมุทรสาคร",
    ageGroups: {
      total: { Quota: 70, Success: 4 },
      "15-24": { Quota: 10, Success: 1 },
      "25-34": { Quota: 15, Success: 1 },
      "35-44": { Quota: 15, Success: 1 },
      "45-54": { Quota: 10, Success: 0 },
      "55-64": { Quota: 10, Success: 1 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
];

const south: GroupProgress[] = [
  {
    name: "รวม 6 จังหวัดภาคใต้",
    ageGroups: {
      total: { Quota: 633, Success: 20 },
      "15-24": { Quota: 110, Success: 3 },
      "25-34": { Quota: 155, Success: 5 },
      "35-44": { Quota: 140, Success: 4 },
      "45-54": { Quota: 115, Success: 4 },
      "55-64": { Quota: 75, Success: 2 },
      "65+": { Quota: 38, Success: 2 },
    },
  },
  {
    name: "นครศรีธรรมราช",
    ageGroups: {
      total: { Quota: 120, Success: 4 },
      "15-24": { Quota: 20, Success: 1 },
      "25-34": { Quota: 30, Success: 1 },
      "35-44": { Quota: 25, Success: 1 },
      "45-54": { Quota: 20, Success: 1 },
      "55-64": { Quota: 15, Success: 0 },
      "65+": { Quota: 10, Success: 0 },
    },
  },
  {
    name: "สงขลา",
    ageGroups: {
      total: { Quota: 110, Success: 3 },
      "15-24": { Quota: 20, Success: 0 },
      "25-34": { Quota: 30, Success: 1 },
      "35-44": { Quota: 25, Success: 1 },
      "45-54": { Quota: 20, Success: 1 },
      "55-64": { Quota: 10, Success: 0 },
      "65+": { Quota: 5, Success: 0 },
    },
  },
  {
    name: "สุราษฎร์ธานี",
    ageGroups: {
      total: { Quota: 105, Success: 4 },
      "15-24": { Quota: 20, Success: 1 },
      "25-34": { Quota: 25, Success: 1 },
      "35-44": { Quota: 25, Success: 1 },
      "45-54": { Quota: 20, Success: 1 },
      "55-64": { Quota: 10, Success: 0 },
      "65+": { Quota: 5, Success: 0 },
    },
  },
  {
    name: "ภูเก็ต",
    ageGroups: {
      total: { Quota: 100, Success: 3 },
      "15-24": { Quota: 15, Success: 0 },
      "25-34": { Quota: 25, Success: 1 },
      "35-44": { Quota: 25, Success: 1 },
      "45-54": { Quota: 20, Success: 1 },
      "55-64": { Quota: 10, Success: 0 },
      "65+": { Quota: 5, Success: 0 },
    },
  },
  {
    name: "สตูล",
    ageGroups: {
      total: { Quota: 98, Success: 3 },
      "15-24": { Quota: 20, Success: 1 },
      "25-34": { Quota: 25, Success: 1 },
      "35-44": { Quota: 20, Success: 0 },
      "45-54": { Quota: 18, Success: 1 },
      "55-64": { Quota: 10, Success: 0 },
      "65+": { Quota: 5, Success: 0 },
    },
  },
  {
    name: "ตรัง",
    ageGroups: {
      total: { Quota: 100, Success: 3 },
      "15-24": { Quota: 15, Success: 0 },
      "25-34": { Quota: 20, Success: 0 },
      "35-44": { Quota: 20, Success: 0 },
      "45-54": { Quota: 17, Success: 0 },
      "55-64": { Quota: 20, Success: 2 },
      "65+": { Quota: 8, Success: 1 },
    },
  },
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
    <div className="p-4 bg-white rounded-xl h-full space-y-10">
      <SectionTable title="แบ่งเป็น 5 ภูมิภาค" data={data} />

      <SectionTable title="กรุงเทพและปริมณฑล" data={data_bkk} />

      <SectionTable title="ภาคเหนือ" data={north} />

      <SectionTable title="ภาคตะวันออกเฉียงเหนือ" data={northeast} />

      <SectionTable title="ภาคกลาง/ตะวันออก/ตะวันตก" data={central} />

      <SectionTable title="ภาคใต้" data={south} />
    </div>
  );
}

function SectionTable({ title, data }) {
  return (
    <div className="w-full">
      <div className="bg-[#fe5000] text-white font-semibold px-4 py-4 text-xl rounded-t-xl">
        {title}
      </div>

      <div className="overflow-x-auto rounded-b-xl border">
        <table className="w-full min-w-[900px] text-sm border-collapse table-fixed">
          <colgroup>
            <col className="w-[220px]" />
            {AGE_COLUMNS.map((_, index) => (
              <React.Fragment key={index}>
                <col className="w-[90px]" />
                <col className="w-[90px]" />
              </React.Fragment>
            ))}
          </colgroup>

          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th rowSpan={2} className="px-4 py-3 text-left">
                {title}
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
                  <th className="px-4 py-2 text-center">สำเร็จ</th>
                  <th className="px-4 py-2 text-center">โควต้า</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((group : any) => (
              <tr key={group.name} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {group.name}
                </td>

                {AGE_COLUMNS.map((col) => {
                  const values = group.ageGroups[col.key];
                  return (
                    <React.Fragment key={col.key}>
                      <td className="px-4 py-3 text-center text-[#FE5102] font-semibold tabular-nums">
                        {values?.Success ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 font-semibold tabular-nums">
                        {values?.Quota ?? 0}
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
