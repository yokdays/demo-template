import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "./progress-bar";
import Inout from "./inout";
import Inout2 from "./Inout2";
import ProvinceProgressChart from "./ProvinceProgressChart";

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
    total: AgeGroup;
    [key: string]: AgeGroup;
  };
}

interface ApiResponse {
  bkk: Region[];
  north: Region[];
  northeast: Region[];
  central: Region[];
  south: Region[];
}

const REGION_KEYS: (keyof ApiResponse)[] = [
  "bkk",
  "north",
  "northeast",
  "central",
  "south",
];

const REGION_LABELS: Record<keyof ApiResponse, string> = {
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
  const [selectedKey, setSelectedKey] = useState<keyof ApiResponse>("bkk");

  useEffect(() => {
    axios
      .get("/api/progress")
      .then((res) => {
        setApiData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const regions: Region[] = apiData?.[selectedKey] ?? [];
  const ageTotals = calculateAgeTotals(regions);
  const total = regions.reduce(
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
    Quota: 0,
    Success: 0,
    male: { Quota: 0, Success: 0 },
    female: { Quota: 0, Success: 0 },
  }
);

  const handleRegionGroupChange = (key: keyof ApiResponse) => {
    setSelectedKey(key);
  };

  if (loading || !apiData) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex gap-3"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">
      <div className="flex gap-3 flex-wrap">
        {REGION_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => handleRegionGroupChange(key)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedKey === key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {REGION_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressBar
          heading="ภาพรวมการเก็บข้อมูล"
          value={total?.Success ?? 0}
          total={total?.Quota ?? 0}
        />
        <ProgressBar
          heading="จำนวนการเก็บข้อมูลเพศชาย"
          value={total?.male?.Success ?? 0}
          total={total?.male?.Quota ?? 0}
        />
        <ProgressBar
          heading="จำนวนการเก็บข้อมูลเพศหญิง"
          value={total?.female?.Success ?? 0}
          total={total?.female?.Quota ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
        <Inout region={selectedKey} />
        <Inout2 region={selectedKey} />
        <ProvinceProgressChart regions={regions} />
      </div>

      {/* Male Table */}
      <div className="overflow-x-auto">
        <p className="font-semibold text-blue-600 mb-2">เพศชาย</p>
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left border">จังหวัด</th>
              {AGE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  colSpan={2}
                  className="px-4 py-3 text-center border"
                >
                  {col.label}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <th className="border"></th>
              {AGE_COLUMNS.map((col) => (
                <React.Fragment key={col.key}>
                  <th className="px-4 py-2 text-center border bg-blue-600 text-white">
                    โควต้า
                  </th>
                  <th className="px-4 py-2 text-center border bg-[#fe5000] text-white">
                    สำเร็จ
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => (
              <tr
                key={region.name}
                className="border-b hover:bg-blue-50 transition"
              >
                <td className="px-4 py-3 font-medium border">{region.name}</td>
                {AGE_COLUMNS.map((col) => {
                  const values = region.ageGroups?.[col.key];
                  return (
                    <React.Fragment key={col.key}>
                      <td className="px-4 py-3 text-center border font-semibold text-blue-600">
                        {values?.male?.Quota ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center border bg-[#fe5000]/10 text-[#fe5000]">
                        {values?.male?.Success ?? 0}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
          {/* แถวรวม */}
          <tr className="bg-blue-100 font-semibold">
            <td className="px-4 py-3 border">รวมทั้งหมด</td>
            {AGE_COLUMNS.map((col) => {
              const values = ageTotals?.[col.key];
              return (
                <React.Fragment key={col.key}>
                  <td className="px-4 py-3 text-center border text-blue-700">
                    {values?.male?.Quota ?? 0}
                  </td>
                  <td className="px-4 py-3 text-center border text-orange-600">
                    {values?.male?.Success ?? 0}
                  </td>
                </React.Fragment>
              );
            })}
          </tr>
        </table>
      </div>

      {/* Female Table */}
      <div className="overflow-x-auto">
        <p className="font-semibold text-blue-600 mb-2">เพศหญิง</p>
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left border">จังหวัด</th>
              {AGE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  colSpan={2}
                  className="px-4 py-3 text-center border"
                >
                  {col.label}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <th className="border"></th>
              {AGE_COLUMNS.map((col) => (
                <React.Fragment key={col.key}>
                  <th className="px-4 py-2 text-center border bg-blue-600 text-white">
                    โควต้า
                  </th>
                  <th className="px-4 py-2 text-center border bg-[#fe5000] text-white">
                    สำเร็จ
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => (
              <tr
                key={region.name}
                className="border-b hover:bg-blue-50 transition"
              >
                <td className="px-4 py-3 font-medium border">{region.name}</td>
                {AGE_COLUMNS.map((col) => {
                  const values = region.ageGroups?.[col.key];
                  return (
                    <React.Fragment key={col.key}>
                      <td className="px-4 py-3 text-center border font-semibold text-blue-600">
                        {values?.female?.Quota ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center border bg-[#fe5000]/10 text-[#fe5000]">
                        {values?.female?.Success ?? 0}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tr className="bg-blue-100 font-semibold">
            <td className="px-4 py-3 border">รวมทั้งหมด</td>
            {AGE_COLUMNS.map((col) => {
              const values = ageTotals?.[col.key];
              return (
                <React.Fragment key={col.key}>
                  <td className="px-4 py-3 text-center border text-blue-700">
                    {values?.female?.Quota ?? 0}
                  </td>
                  <td className="px-4 py-3 text-center border text-orange-600">
                    {values?.female?.Success ?? 0}
                  </td>
                </React.Fragment>
              );
            })}
          </tr>
        </table>
      </div>
    </div>
  );
}
function calculateAgeTotals(regions: Region[]) {
  const ageTotals: Record<string, AgeGroup> = {};

  AGE_COLUMNS.forEach((col) => {
    ageTotals[col.key] = {
      Quota: 0,
      Success: 0,
      male: { Quota: 0, Success: 0 },
      female: { Quota: 0, Success: 0 },
    };
  });

  regions.forEach((province) => {
    AGE_COLUMNS.forEach((col) => {
      const ageData = province.ageGroups[col.key];
      if (!ageData) return;

      ageTotals[col.key].Quota += ageData.Quota;
      ageTotals[col.key].Success += ageData.Success;

      ageTotals[col.key].male.Quota += ageData.male.Quota;
      ageTotals[col.key].male.Success += ageData.male.Success;

      ageTotals[col.key].female.Quota += ageData.female.Quota;
      ageTotals[col.key].female.Success += ageData.female.Success;
    });
  });

  return ageTotals;
}
