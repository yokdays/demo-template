import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
/* =======================
   Types
======================= */
interface ProgressItem {
  label: string;
  value: number;
}

interface GroupProgress {
  name: string;
  items: ProgressItem[];
}

/* =======================
   Mock Data
======================= */
const data: GroupProgress[] = [
  {
    name: "กลุ่มที่ 1 : ลูกค้าน้ำมันดิบ",
    items: [
      { label: "Trader", value: 70 },
      { label: "Operation", value: 70 },
      { label: "Contract", value: 50 },
    ],
  },
  {
    name: "กลุ่มที่ 2 : ลูกค้าน้ำมันสำเร็จรูป",
    items: [
      { label: "Trader", value: 70 },
      { label: "Operation", value: 70 },
      { label: "Contract", value: 50 },
    ],
  },
  {
    name: "กลุ่มที่ 3 : ลูกค้าผลิตภัณฑ์ปิโตรเคมี",
    items: [
      { label: "Trader", value: 70 },
      { label: "Operation", value: 70 },
      { label: "Contract", value: 50 },
    ],
  },
  {
    name: "กลุ่มที่ 4 : ลูกค้า LNG & ผลิตภัณฑ์ทางเลือก",
    items: [
      { label: "Trader", value: 70 },
      { label: "Operation", value: 70 },
      { label: "Contract", value: 50 },
    ],
  },
  {
    name: "กลุ่มที่ 5 : ลูกค้าอนุพันธ์",
    items: [
      { label: "Trader", value: 70 },
      { label: "Operation", value: 0 },
      { label: "Contract", value: 50 },
    ],
  },
  {
    name: "กลุ่มที่ 6 : ลูกค้าเรือขนส่ง",
    items: [
      { label: "Trader", value: 70 },
      { label: "Operation", value: 70 },
      { label: "Contract", value: 0 },
    ],
  },
  {
    name: "กลุ่มที่ 7 : ลูกค้าที่ขึ้นทะเบียนใหม่",
    items: [
      { label: "Trader", value: 70 },
      { label: "Operation", value: 70 },
      { label: "Contract", value: 50 },
    ],
  },
];

/* =======================
   Helpers
======================= */
const COLORS: Record<string, string> = {
  Trader: "bg-[#005689] text-[#005689]",
  Operation: "bg-blue-500 text-blue-600",
  Contract: "bg-green-500 text-green-600",
};

const getValue = (items: ProgressItem[], label: string) =>
  items.find((i) => i.label === label)?.value ?? 0;

/* =======================
   Main Component
======================= */
export default function Progress() {
  return (
    <div className="p-4 bg-white rounded-xl h-full">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl font-bold">ความคืบหน้ากลุ่มงาน</h2>
        <div className="relative text-gray-400 mr-4 hover:text-gray-900 cursor-pointer">
          <h3>ผลวิเคราะห์</h3>
          <ArrowUpRightIcon size={14} className="absolute top-1.5 -right-4"/>
        </div>
      </div>
      {/* Header */}
      <div className="grid grid-cols-[3fr_2fr] px-4 py-2 text-lg font-semibold text-gray-500">
        <div>กลุ่มงาน</div>
        <div className="grid grid-cols-4">
          <div className="text-center">Trader</div>
          <div className="text-center">Operation</div>
          <div className="text-center">Contract</div>
          <div className="text-center">Progress</div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {data.map((group) => {
          const trader = getValue(group.items, "Trader");
          const operation = getValue(group.items, "Operation");
          const contract = getValue(group.items, "Contract");

          return (
            <div
              key={group.name}
              className="grid grid-cols-[3fr_2fr] items-center px-4 py-3 bg-gray-50 rounded-lg"
            >
              {/* Name */}
              <div className="text-md font-medium">{group.name}</div>

              <div className="grid grid-cols-4 gap-4">
                <div
                  className={`text-center text-md font-medium ${
                    COLORS.Trader.split(" ")[1]
                  }`}
                >
                  {trader}%
                </div>
                <div
                  className={`text-center text-md font-medium ${
                    COLORS.Operation.split(" ")[1]
                  }`}
                >
                  {operation}%
                </div>
                <div
                  className={`text-center text-md font-medium ${
                    COLORS.Contract.split(" ")[1]
                  }`}
                >
                  {contract}%
                </div>

                {/* Mini Vertical Bars */}
                <div className="flex items-end justify-center gap-2 h-10">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="w-3 bg-gray-200 rounded-sm flex items-end"
                      style={{ height: "100%" }}
                    >
                      <div
                        className={`w-full rounded-sm ${
                          COLORS[item.label].split(" ")[0]
                        }`}
                        style={{ height: `${item.value}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
