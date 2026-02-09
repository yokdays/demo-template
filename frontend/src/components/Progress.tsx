import React from 'react'

/* =======================
   Types
======================= */
interface ProgressItem {
  label: string
  value: number
}

interface GroupProgress {
  name: string
  items: ProgressItem[]
}

/* =======================
   Mock Data (แทน API ได้)
======================= */
const data: GroupProgress[] = [
  {
    name: 'กลุ่มที่ 1 : ลูกค้าน้ำมันดิบ',
    items: [
      { label: 'Trader', value: 70 },
      { label: 'Operation', value: 70 },
      { label: 'Contract', value: 50 },
    ],
  },
  {
    name: 'กลุ่มที่ 2 : ลูกค้าน้ำมันสำเร็จรูป',
    items: [
      { label: 'Trader', value: 70 },
      { label: 'Operation', value: 70 },
      { label: 'Contract', value: 50 },
    ],
  },
  {
    name: 'กลุ่มที่ 3 : ลูกค้าผลิตภัณฑ์ปิโตรเคมี',
    items: [
      { label: 'Trader', value: 70 },
      { label: 'Operation', value: 70 },
      { label: 'Contract', value: 50 },
    ],
  },
  {
    name: 'กลุ่มที่ 4 : ลูกค้า LNG & ผลิตภัณฑ์ทางเลือก',
    items: [
      { label: 'Trader', value: 70 },
      { label: 'Operation', value: 70 },
      { label: 'Contract', value: 50 },
    ],
  },
  {
    name: 'กลุ่มที่ 5 : ลูกค้าอนุพันธ์',
    items: [
      { label: 'Trader', value: 70 },
      { label: 'Operation', value: 0 },
      { label: 'Contract', value: 50 },
    ],
  },
  {
    name: 'กลุ่มที่ 6 : ลูกค้าเรือขนส่ง',
    items: [
      { label: 'Trader', value: 70 },
      { label: 'Operation', value: 70 },
      { label: 'Contract', value: 0 },
    ],
  },
  {
    name: 'กลุ่มที่ 7 : ลูกค้าที่ขึ้นทะเบียนใหม่',
    items: [
      { label: 'Trader', value: 70 },
      { label: 'Operation', value: 70 },
      { label: 'Contract', value: 50 },
    ],
  },
]

/* =======================
   Helper
======================= */
const PROGRESS_COLORS: Record<string, string> = {
  Trader: 'bg-blue-500',
  Operation: 'bg-red-500',
  Contract: 'bg-green-500',
}
const getProgressColorByLabel = (label: string) => {
  return PROGRESS_COLORS[label] ?? 'bg-gray-400'
}


/* =======================
   Progress Card
======================= */
function ProgressCard({ group }: { group: GroupProgress }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold">{group.name}</h3>

      <div className="space-y-4">
        {group.items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1 text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium">{item.value}%</span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded">
              <div
                className={`h-3 rounded transition-all duration-500 ${getProgressColorByLabel(
                  item.label
                )}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


/* =======================
   Main Component
======================= */
export default function Progress() {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="mb-6 text-xl font-bold">ความคืบหน้ากลุ่มงาน</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 p-4 rounded-lg">
        {data.map((group) => (
          <ProgressCard key={group.name} group={group} />
        ))}
      </div>
    </div>
  )
}
