import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "./progress-bar";
import Inout from "./inout";
import Inout2 from "./Inout2";
import ProvinceProgressChart from "./ProvinceProgressChart";
import Heading from "./heading";

// --- Interfaces ---
interface GenderData {
  Quota: number;
  Success: number;
}

interface AgeGroup {
  Quota: number;
  Success: number;
  male: GenderData;
  female: GenderData;
}

interface Region {
  name: string;
  ageGroups: {
    total: AgeGroup; // Backend ส่ง total มาให้ในแต่ละจังหวัด
    [key: string]: AgeGroup;
  };
}

interface ApiResponse {
  bkk: Region[];
  north: Region[];
  northeast: Region[];
  central: Region[];
  south: Region[];
  summary: any[];
}

// --- Constants ---
const REGION_KEYS: (keyof Omit<ApiResponse, "summary">)[] = [
  "bkk",
  "north",
  "northeast",
  "central",
  "south",
];

const REGION_LABELS: Record<string, string> = {
  bkk: "กรุงเทพและปริมณฑล",
  north: "ภาคเหนือ",
  northeast: "ภาคตะวันออกเฉียงเหนือ",
  central: "ภาคกลาง",
  south: "ภาคใต้",
};

const AGE_COLUMNS = [
  { key: "15-24", label: "15-24" },
  { key: "25-34", label: "25-34" },
  { key: "35-44", label: "35-44" },
  { key: "45-54", label: "45-54" },
  { key: "55-64", label: "55-64" },
  { key: "65+", label: "65+" },
];

export default function Branch() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [selectedKey, setSelectedKey] = useState<keyof Omit<ApiResponse, "summary">>("bkk");

  useEffect(() => {
    // แนะนำ: ใช้พุทธศักราชหรือคริสต์ศักราชให้ตรงกับที่ระบุใน Database
    axios
      .get("/api/progress?year=2025") 
      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const regions: Region[] = apiData?.[selectedKey] ?? [];

  // --- Calculations ---
  
  // คำนวณภาพรวมของภาคที่เลือก (รวมทุกจังหวัด)
  const regionTotal = regions.reduce(
    (acc, province) => {
      const t = province.ageGroups?.total;
      if (!t) return acc;
      return {
        Quota: acc.Quota + (t.Quota || 0),
        Success: acc.Success + (t.Success || 0),
        male: {
          Quota: acc.male.Quota + (t.male?.Quota || 0),
          Success: acc.male.Success + (t.male?.Success || 0),
        },
        female: {
          Quota: acc.female.Quota + (t.female?.Quota || 0),
          Success: acc.female.Success + (t.female?.Success || 0),
        },
      };
    },
    {
      Quota: 0, Success: 0,
      male: { Quota: 0, Success: 0 },
      female: { Quota: 0, Success: 0 },
    }
  );

  // คำนวณสรุปแยกตามกลุ่มอายุ (สำหรับ Footer ของตาราง)
  const ageTotals = calculateAgeTotals(regions);

  if (loading || !apiData) {
    return <div className="p-6 text-center">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">
      {/* Header & Region Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
        <Heading text="ความคืบหน้าการเก็บข้อมูล" color="#fe5000cc" />
        <div className="flex flex-wrap gap-2">
          {REGION_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedKey === key
                  ? "bg-[#fe5000] text-white"
                  : "bg-white hover:bg-[#fe5000]/10"
              }`}
            >
              {REGION_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bars (Top Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ProgressBar
          heading="ภาพรวมการเก็บข้อมูล"
          value={regionTotal.Success}
          total={regionTotal.Quota}
        />
        <ProgressBar
          heading="จำนวนการเก็บข้อมูลเพศชาย"
          value={regionTotal.male.Success}
          total={regionTotal.male.Quota}
        />
        <ProgressBar
          heading="จำนวนการเก็บข้อมูลเพศหญิง"
          value={regionTotal.female.Success}
          total={regionTotal.female.Quota}
        />
      </div>

      {/* Charts & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-w-0">
        <ProvinceProgressChart regions={regions} />
        <Inout region={selectedKey} />
        <Inout2 region={selectedKey} />
      </div>

      {/* Main Tables */}
      {renderTable("รวมทั้งหมด", regions, ageTotals, "all")}
      {renderTable("เพศชาย", regions, ageTotals, "male")}
      {renderTable("เพศหญิง", regions, ageTotals, "female")}
    </div>
  );
}

// --- Helper Components & Functions ---

function renderTable(title: string, regions: Region[], ageTotals: any, type: "all" | "male" | "female") {
  return (
    <div className="overflow-x-auto">
      <p className="font-semibold text-blue-600 mb-2">{title}</p>
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 text-left border">จังหวัด</th>
            <th colSpan={2} className="px-4 py-3 text-center border bg-[#533d32] text-white">รวมทั้งหมด</th>
            {AGE_COLUMNS.map((col) => (
              <th key={col.key} colSpan={2} className="px-4 py-3 text-center border bg-[#533d32] text-white">
                {col.label} ปี
              </th>
            ))}
          </tr>
          <tr className="bg-gray-50">
            <th className="border"></th>
            <th className="px-4 py-2 text-center border bg-[#0c5ca4] text-white">โควต้า</th>
            <th className="px-4 py-2 text-center border bg-[#fe5000] text-white">สำเร็จ</th>
            {AGE_COLUMNS.map((col) => (
              <React.Fragment key={col.key}>
                <th className="px-4 py-2 text-center border bg-[#0c5ca4] text-white">โควต้า</th>
                <th className="px-4 py-2 text-center border bg-[#fe5000] text-white">สำเร็จ</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => {
            const rowTotal = getNestedTotal(region.ageGroups?.total, type);
            return (
              <tr key={region.name} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium border">{region.name}</td>
                <td className="px-4 py-3 text-center border font-bold text-[#0c5ca4] bg-[#0c5ca4]/5">{rowTotal.quota}</td>
                <td className="px-4 py-3 text-center border font-bold text-[#fe5000] bg-[#fe5000]/5">{rowTotal.success}</td>
                {AGE_COLUMNS.map((col) => {
                  const val = getNestedTotal(region.ageGroups?.[col.key], type);
                  return (
                    <React.Fragment key={col.key}>
                      <td className="px-4 py-3 text-center border">{val.quota}</td>
                      <td className="px-4 py-3 text-center border">{val.success}</td>
                    </React.Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-blue-50 font-bold">
          <tr>
            <td className="px-4 py-3 border">รวมทั่งสิ้น</td>
            {/* คำนวณ Grand Total ของภาค */}
            {(() => {
                const totalCol = calculateGrandTotal(regions, type);
                return (
                    <>
                        <td className="px-4 py-3 text-center border text-[#0c5ca4]">{totalCol.quota}</td>
                        <td className="px-4 py-3 text-center border text-[#fe5000]">{totalCol.success}</td>
                    </>
                )
            })()}
            {AGE_COLUMNS.map((col) => {
              const val = ageTotals[col.key];
              const display = type === 'male' ? val.male : type === 'female' ? val.female : { Quota: val.Quota, Success: val.Success };
              return (
                <React.Fragment key={col.key}>
                  <td className="px-4 py-3 text-center border">{display.Quota}</td>
                  <td className="px-4 py-3 text-center border">{display.Success}</td>
                </React.Fragment>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function getNestedTotal(data: AgeGroup | undefined, type: "all" | "male" | "female") {
  if (!data) return { quota: 0, success: 0 };
  if (type === "male") return { quota: data.male?.Quota ?? 0, success: data.male?.Success ?? 0 };
  if (type === "female") return { quota: data.female?.Quota ?? 0, success: data.female?.Success ?? 0 };
  return { quota: data.Quota ?? 0, success: data.Success ?? 0 };
}

function calculateAgeTotals(regions: Region[]) {
  const ageTotals: Record<string, AgeGroup> = {};
  AGE_COLUMNS.forEach((col) => {
    ageTotals[col.key] = { Quota: 0, Success: 0, male: { Quota: 0, Success: 0 }, female: { Quota: 0, Success: 0 } };
  });

  regions.forEach((province) => {
    AGE_COLUMNS.forEach((col) => {
      const ageData = province.ageGroups?.[col.key];
      if (!ageData) return;
      ageTotals[col.key].Quota += ageData.Quota || 0;
      ageTotals[col.key].Success += ageData.Success || 0;
      ageTotals[col.key].male.Quota += ageData.male?.Quota || 0;
      ageTotals[col.key].male.Success += ageData.male?.Success || 0;
      ageTotals[col.key].female.Quota += ageData.female?.Quota || 0;
      ageTotals[col.key].female.Success += ageData.female?.Success || 0;
    });
  });
  return ageTotals;
}

function calculateGrandTotal(regions: Region[], type: string) {
    return regions.reduce((acc, curr) => {
        const t = curr.ageGroups?.total;
        if(!t) return acc;
        if(type === 'male') {
            acc.quota += t.male?.Quota ?? 0;
            acc.success += t.male?.Success ?? 0;
        } else if(type === 'female') {
            acc.quota += t.female?.Quota ?? 0;
            acc.success += t.female?.Success ?? 0;
        } else {
            acc.quota += t.Quota ?? 0;
            acc.success += t.Success ?? 0;
        }
        return acc;
    }, {quota: 0, success: 0});
}