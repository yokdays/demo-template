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
      <div className="overflow-x-auto rounded-xl border shadow-sm">
        <table className="w-full table-fixed text-sm border-collapse">
          
          <colgroup>
            <col className="w-[220px]" />
            {AGE_COLUMNS.map((_, i) => (
              <React.Fragment key={i}>
                <col className="w-[140px]" />
                <col className="w-[140px]" />
              </React.Fragment>
            ))}
          </colgroup>

          <thead className="text-xs md:text-sm">
            <tr>
              <th
                rowSpan={2}
                className="px-4 py-3 text-left font-semibold bg-gray-100 border-b"
              >
                {title}
              </th>

              {AGE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  colSpan={2}
                  className="px-4 py-3 text-center bg-[#533D32] text-white"
                >
                  {col.label}
                </th>
              ))}
            </tr>

            <tr>
              {AGE_COLUMNS.map((col) => (
                <React.Fragment key={col.key}>
                  <th className="px-3 py-2 text-center bg-[#0c5ca4] text-white">
                    โควต้า
                  </th>
                  <th className="px-3 py-2 text-center bg-[#fe5000] text-white">
                    สำเร็จ
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((group: any) => (
              <tr key={group.name} className="hover:bg-[#0c5ca4]/5 transition border-collapse">
                <td className="px-4 py-3 font-medium truncate border border-r">
                  {group.name}
                </td>

                {AGE_COLUMNS.map((col) => {
                  const values = group.ageGroups[col.key];
                  return (
                    <React.Fragment key={col.key}>
                      <td className="px-3 py-3 text-center text-[#0c5ca4] font-semibold tabular-nums">
                        {values?.Quota ?? 0}
                      </td>
                      <td className="px-3 py-3 text-center text-[#fe5000] bg-[#fe5000]/10 font-semibold tabular-nums">
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


