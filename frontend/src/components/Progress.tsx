import React from "react";
import { useEffect, useState } from "react";
type AgeKey = "total" | "15-24" | "25-34" | "35-44" | "45-54" | "55-64" | "65+";

interface AgeGroup {
  Quota: number;
  Success: number;
}

interface GroupProgress {
  name: string;
  ageGroups: {
    [key: string]: AgeGroup;
  };
}

interface ProgressResponse {
  summary: GroupProgress[];
  bkk: GroupProgress[];
  north: GroupProgress[];
  northeast: GroupProgress[];
  central: GroupProgress[];
  south: GroupProgress[];
}

const AGE_COLUMNS: { key: AgeKey; label: string }[] = [
  { key: "total", label: "รวมทั้งหมด" },
];



export default function Progress() {

  const [data, setData] = useState<ProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching progress:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!data) return <div className="p-4">No data</div>;

  return (
    <div className="p-4 bg-white rounded-xl h-full space-y-10">
      <SectionTable title="แบ่งเป็น 5 ภูมิภาค" data={data.summary} />

      <SectionTable title="กรุงเทพและปริมณฑล" data={data.bkk} />

      <SectionTable title="ภาคเหนือ" data={data.north} />

      <SectionTable title="ภาคตะวันออกเฉียงเหนือ" data={data.northeast} />

      <SectionTable title="ภาคกลาง/ตะวันออก/ตะวันตก" data={data.central} />

      <SectionTable title="ภาคใต้" data={data.south} />
    </div>
  );
}

function SectionTable({ title, data }) {
  return (
    <div className="w-full">
      {/* <div className="bg-[#533D32] text-white font-semibold px-4 py-4 text-xl rounded-t-xl">
        {title}
      </div> */}

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
                <th key={col.key} colSpan={2} className="px-4 py-3 text-center bg-[#533D32] text-white">
                  {col.label}
                </th>
              ))}
            </tr>

            <tr className="bg-gray-50 text-gray-500">
              {AGE_COLUMNS.map((col) => (
                <React.Fragment key={col.key}>
                  <th className="px-4 py-2 text-center bg-[#b43900] text-white">โควต้า</th>
                  <th className="px-4 py-2 text-center bg-[#fe5000] text-white">สำเร็จ</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((group : any) => (
              <tr key={group.name} className="border-b hover:bg-[#2563EB]/10">
                <td className="px-4 py-3 font-medium whitespace-nowrap border border-l">
                  {group.name}
                </td>

                {AGE_COLUMNS.map((col) => {
                  const values = group.ageGroups[col.key];
                  return (
                    <React.Fragment key={col.key}>
                      <td className="px-4 py-3 text-center text-[#b43900] font-semibold tabular-nums ">
                        {values?.Quota ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center text-[#fe5000] bg-[#fe5000]/10 font-semibold tabular-nums">
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
