import ProgressBar from "./components/progress-bar";
import Progress from "./components/Progress";
import Inout from "./components/Inout_dashboard";
import Inout2 from "./components/Inout2_dashboard";
import AgeProgressChart from "./components/AgeProgress";
import { useState } from "react";

interface SurveyRow {
  id: number;
  name: string;
  quota: number;
  success: number;
  percent: number;
}

interface SurveyDetailItem {
  description: string;
  target: string;
  success: string;
}

interface SurveyDetail {
  id: number;
  details: SurveyDetailItem[];
}

const surveyDetailData: SurveyDetail[] = [
  {
    id: 1,
    details: [
      {
        description: "กลุ่มผู้กำหนด และกำกับนโยบาย",
        target: "40",
        success: "10",
      },
      {
        description: "กลุ่มผู้อนุมัติ อนุญาต และประสานงาน",
        target: "120",
        success: "20",
      },
      {
        description: "กลุ่มผู้ถือหุ้น",
        target: "120",
        success: "30",
      },
    ],
  },
  {
    id: 2,
    details: [
      {
        description: "กลุ่มคณะกรรมการ กฟผ.​",
        target: "40",
        success: "10",
      },
    ],
  },
  {
    id: 3,
    details: [
      {
        description: "โรงไฟฟ้าพระนครเหนือ",
        target: "40",
        success: "10",
      },
      {
        description: "โรงไฟฟ้าพระนครใต้",
        target: "40",
        success: "10",
      },
      {
        description: "ชุมชนใกล้แนวสายส่ง",
        target: "40",
        success: "10",
      },
      {
        description: "โรงไฟฟ้าวังน้อย",
        target: "40",
        success: "10",
      },
      {
        description: "โรงไฟฟ้าบางปะกง",
        target: "40",
        success: "10",
      },
    ],
  },
  {
    id: 4,
    details: [
      {
        description: "Gen Z (16-28 ปี)",
        target: "10",
        success: "10",
      },
      {
        description: "Gen Y (29-44 ปี)",
        target: "70",
        success: "20",
      },
      {
        description: "Gen X (45-60 ปี)",
        target: "60",
        success: "50",
      },
    ],
  },
];

const surveyData: SurveyRow[] = [
  {
    id: 1,
    name: "กลุ่มที่ 1 : กลุ่มภาครัฐและผู้กำกับดูแล​",
    quota: 1200,
    success: 980,
    percent: 82,
  },
  {
    id: 2,
    name: "กลุ่มที่ 2 : กลุ่มคณะกรรมการ กฟผ.​",
    quota: 950,
    success: 870,
    percent: 92,
  },
  {
    id: 3,
    name: "กลุ่มที่ 3 : กลุ่มชุมชน​",
    quota: 800,
    success: 640,
    percent: 80,
  },
  {
    id: 4,
    name: "กลุ่มที่ 4 : กลุ่มพนักงานและสหภาพแรงงาน​",
    quota: 600,
    success: 410,
    percent: 68,
  },
  {
    id: 5,
    name: "กลุ่มที่ 5 : กลุ่มลูกค้าและผู้ใช้ไฟฟ้า​​",
    quota: 600,
    success: 410,
    percent: 68,
  },
  {
    id: 6,
    name: "กลุ่มที่ 6 : กลุ่มสื่อมวลชน",
    quota: 600,
    success: 410,
    percent: 68,
  },
  {
    id: 7,
    name: "กลุ่มที่ 7 : กลุ่มพันธมิตร",
    quota: 600,
    success: 410,
    percent: 68,
  },
  {
    id: 8,
    name: "กลุ่มที่ 8 : กลุ่มบริษัทในเครือ",
    quota: 600,
    success: 410,
    percent: 68,
  },
  {
    id: 9,
    name: "กลุ่มที่ 9 : กลุ่มนักวิชาการและประชาสังคม",
    quota: 600,
    success: 410,
    percent: 68,
  },
  {
    id: 10,
    name: "กลุ่มที่ 10 : กลุ่มคู่แข่ง",
    quota: 600,
    success: 410,
    percent: 68,
  },
  {
    id: 11,
    name: "กลุ่มที่ 11 : กลุ่มการเงิน",
    quota: 600,
    success: 410,
    percent: 68,
  },
];

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const selectedGroup = surveyData.find((item) => item.id === selectedId);
  const selectedDetail = surveyDetailData.find(
    (item) => item.id === selectedId,
  );
  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <div className="min-h-screen flex justify-center py-4">
        <div
          className="space-y-8 w-[80vw] backdrop-blur-lg
        bg-white/70 p-6 rounded-xl"
        >
          <p className="text-4xl font-semibold text-slate-800">
            โครงการสำรวจความผูกพันผู้มีส่วนได้ส่วนเสีย กฟผ. ปี 2569
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
            <div className="w-full rounded-xl  grid items-center self-start">
              <ProgressBar
                heading="ภาพรวมการเก็บข้อมูล"
                value={2936}
                total={5010}
              />
              <div className="text-sm flex justify-between items-center mt-4">
                <p className="mx-4 px-6 py-2 bg-[#f5bb01] text-white rounded-t-xl">
                  ความคืบหน้าผู้มีส่วนได้ส่วนเสีย​
                </p>
                <p className="px-6 py-2 mx-4 bg-[#144194] rounded-t-xl text-white">
                  11 กลุ่ม
                </p>
              </div>
              <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 ">
                <table className="min-w-[640px] w-full text-sm">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                    <tr>
                      {/* <th className="px-6 py-4 text-left">ID</th> */}
                      <th className="px-6 py-4 text-left">ชื่อ</th>
                      <th className="px-6 py-4 text-center">โควต้า</th>
                      <th className="px-6 py-4 text-center">สำเร็จ</th>
                      <th className="px-6 py-4 text-left">Percent</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 bg-white">
                    {surveyData.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`cursor-pointer transition ${
                          selectedId === item.id
                            ? "bg-[#f5bb01]/40"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {/* <td className="px-6 py-4 text-gray-500">{item.id}</td> */}
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.name}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {item.quota.toLocaleString()}
                        </td>

                        <td className="px-6 py-4 text-center font-semibold text-slate-700">
                          {item.success.toLocaleString()}
                        </td>

                        <td className="px-6 py-4 w-56">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-medium">
                              <span>{item.percent}%</span>
                            </div>

                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  item.percent >= 80
                                    ? "bg-emerald-500"
                                    : item.percent >= 60
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${item.percent}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="">
              <div className="bg-white border border-gray-200 rounded-xl px-6 pb-8 mb-4 shadow-sm">
                <h3 className="text-lg font-semibold my-4">รอบการเก็บข้อมูล</h3>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                          <th className="px-6 py-3 text-left">รอบที่</th>
                          <th className="px-6 py-3 text-left">ช่วงเวลา</th>
                          <th className="px-6 py-3 text-center">เป้าหมาย</th>
                          <th className="px-6 py-3 text-center">สำเร็จ</th>
                          <th className="px-6 py-3 text-left">สถานะ</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-medium text-slate-800">
                            รอบที่ 1
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            1 ม.ค. 2026 - 31 ม.ค. 2026
                          </td>
                          <td className="px-6 py-4 text-center">2,000</td>
                          <td className="px-6 py-4 text-center font-semibold text-emerald-600">
                            1,750
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-600 font-medium">
                              สำเร็จแล้ว
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-medium text-slate-800">
                            รอบที่ 2
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            1 ก.พ. 2026 - 28 ก.พ. 2026
                          </td>
                          <td className="px-6 py-4 text-center">3,000</td>
                          <td className="px-6 py-4 text-center font-semibold text-blue-600">
                            1,186
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                              กำลังดำเนินการ
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {selectedDetail ? (
                <div className="bg-white border border-gray-200 rounded-xl px-6 pb-8 shadow-sm">
                  <h3 className="text-lg font-semibold mt-8 mb-4">
                    รายละเอียดของ {selectedGroup?.name}
                  </h3>

                  <div className="space-y-4">
                    {selectedDetail.details.map((detail, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800 text-base">
                            {index + 1}. {detail.description}
                          </p>
                          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                            กลุ่มย่อย
                          </span>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <div className="text-lg">
                              <span className="text-xl text-[#144194]">
                                {detail.success.toLocaleString()}
                              </span>{" "}
                              <span className="text-xs text-[#5189BC]">
                                {" "}
                                / {detail.target.toLocaleString()}
                              </span>
                            </div>
                            <span>
                              {Math.round(
                                (detail.success / detail.target) * 100,
                              )}
                              %
                            </span>
                          </div>
                              
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#144194] rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.round(
                                  (detail.success / detail.target) * 100,
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
