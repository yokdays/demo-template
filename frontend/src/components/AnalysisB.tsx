import React from "react";
import Anabar from "./anabar";
export default function AnalysisB() {
  const data1 = [
    {
      id: 1,
      name: "ช่อง Thai PBS (เลขช่อง 3)",
      total: 665,
      score: 31.324,
      score_weight: 31.342,
    },
    {
      id: 2,
      name: "ช่อง WorkPoint TV (เลขช่อง 23)",
      total: 403,
      score: 18.983,
      score_weight: 19.001,
    },
    {
      id: 3,
      name: "ช่อง 7HD (เลขช่อง 35)",
      total: 398,
      score: 31.324,
      score_weight: 31.342,
    },
    {
      id: 4,
      name: "ช่อง 3HD (เลขช่อง 33)",
      total: 258,
      score: 31.324,
      score_weight: 31.342,
    },
    {
      id: 5,
      name: "ช่อง One31 (เลขช่อง 31)",
      total: 62,
      score: 2.92,
      score_weight: 2.948,
    },
    {
      id: 6,
      name: "ช่อง Thairath TV (เลขช่อง 32)",
      total: 55,
      score: 2.591,
      score_weight: 2.579,
    },
    {
      id: 7,
      name: "ช่อง 5 (เลขช่อง 1)",
      total: 50,
      score: 2.355,
      score_weight: 2.344,
    },
    {
      id: 8,
      name: "ช่อง Amarin TV (เลขช่อง 34)",
      total: 41,
      score: 2.92,
      score_weight: 2.948,
    },
    {
      id: 9,
      name: "ช่อง MCOT HD (เลขช่อง 30)",
      total: 37,
      score: 2.92,
      score_weight: 2.948,
    },
    {
      id: 10,
      name: "ช่อง PPTV HD 36 (เลขช่อง 36)",
      total: 28,
      score: 2.92,
      score_weight: 2.948,
    },
    {
      id: 11,
      name: "ช่อง GMM 25 (เลขช่อง 25)",
      total: 27,
      score: 1.272,
      score_weight: 1.264,
    },
    {
      id: 12,
      name: "ช่อง NBT (เลขช่อง 2)",
      total: 25,
      score: 1.178,
      score_weight: 1.175,
    },
    {
      id: 13,
      name: "ช่อง Nation TV (เลขช่อง 22)",
      total: 21,
      score: 0.989,
      score_weight: 0.991,
    },
  ];
  const leftData = data1.slice(0, 10);
  const rightData = data1.slice(10);

  const allData = [...leftData, ...rightData];

  return (
    <div>
      <h1
        className="
              inline-block
              bg-[#533d32]
              text-white
              p-4
              mb-4
              [clip-path:polygon(0_0,95%_0,90%_100%,0_100%)]
              w-[70vw]
              text-3xl
              font-bold
            "
      >
        พฤติกรรมการรับชมเนื้อหา
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <Anabar
              heading="ช่องสถานโทรทัศน์ที่นึกถึง (Top of Mind)"
              heading2="ผู้ชมสายสังคม"
              labels={[
                "สังคม",
                "การเมือง",
                "เศรษฐกิจ",
                "อาชญากรรม",
                "ท้องถิ่น/ภูมิภาค",
                "สิ่งแวดล้อม",
                "กีฬา",
                "วิทยาศาสตร์และเทคโนโลยี",
                "ต่างประเทศ",
                "ภาษาต่างประเทศ",
              ]}
              datasets={[
                {
                  key: "B",
                  label: "ไม่มีค่าถ่วงน้ำหนัก",
                  data: [
                    61.386, 28.395, 6.94, 5.27, 8.42, 3.12, 7.73, 4.64, 5.61,
                    4.72,
                  ],
                  color: "#fe5000",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <Anabar
              heading="ช่องสถานโทรทัศน์ที่นึกถึง (Top of Mind)"
              heading2="ผู้ชมสายสารคดี"
              labels={[
                "สังคม",
                "การเมือง",
                "เศรษฐกิจ",
                "อาชญากรรม",
                "ท้องถิ่น/ภูมิภาค",
                "สิ่งแวดล้อม",
                "กีฬา",
                "วิทยาศาสตร์และเทคโนโลยี",
                "ต่างประเทศ",
                "ภาษาต่างประเทศ",
              ]}
              datasets={[
                {
                  key: "B",
                  label: "ไม่มีค่าถ่วงน้ำหนัก",
                  data: [
                    61.386, 28.395, 6.94, 5.27, 8.42, 3.12, 7.73, 4.64, 5.61,
                    4.72,
                  ],
                  color: "#fe5000",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex justify-center lg:col-span-2">
          <div className="w-full max-w-2xl">
            <Anabar
              heading="ช่องสถานโทรทัศน์ที่นึกถึง (Top of Mind)"
              heading2="ผู้ชมสายบันเทิง"
              labels={[
                "สังคม",
                "การเมือง",
                "เศรษฐกิจ",
                "อาชญากรรม",
                "ท้องถิ่น/ภูมิภาค",
                "สิ่งแวดล้อม",
                "กีฬา",
                "วิทยาศาสตร์และเทคโนโลยี",
                "ต่างประเทศ",
                "ภาษาต่างประเทศ",
              ]}
              datasets={[
                {
                  key: "B",
                  label: "ไม่มีค่าถ่วงน้ำหนัก",
                  data: [
                    61.386, 28.395, 6.94, 5.27, 8.42, 3.12, 7.73, 4.64, 5.61,
                    4.72,
                  ],
                  color: "#fe5000",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h1
          className="
          inline-block
          bg-[#533d32]
          text-white
          p-4
          mb-4
          [clip-path:polygon(0_0,95%_0,90%_100%,0_100%)]
          w-[70vw]
          text-3xl
          font-bold
        "
        >
          ผู้ชมสายสังคม
        </h1>

        <p>สถานีโทรทัศน์ที่รับชมเนื้อหาเกี่ยวกับสังคมมากที่สุด 3 อันดับแรก</p>
        <div className="w-full mt-4">
          <div className="block lg:hidden overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-[#006941] text-white text-left">
                  <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                  <th className="px-4 py-3 text-center">จำนวน</th>
                  <th className="px-4 py-3 text-center">ไม่มีค่าถ่วงน้ำหนัก</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      <span className="font-bold text-[#006941] mr-2">
                        {index + 1}.
                      </span>
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-center">{item.total}</td>
                    <td className="px-4 py-3 text-center">
                      {item.score.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-[#006941] text-white text-left">
                    <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                    <th className="px-4 py-3 text-center">จำนวน</th>
                    <th className="px-4 py-3 text-center">
                      ไม่มีค่าถ่วงน้ำหนัก
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leftData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        <span className="font-bold text-[#006941] mr-2">
                          {index + 1}.
                        </span>
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center">{item.total}</td>
                      <td className="px-4 py-3 text-center">
                        {item.score.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-[#006941] text-white text-left">
                    <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                    <th className="px-4 py-3 text-center">จำนวน</th>
                    <th className="px-4 py-3 text-center">
                      ไม่มีค่าถ่วงน้ำหนัก
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rightData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        <span className="font-bold text-[#006941] mr-2">
                          {index + leftData.length + 1}.
                        </span>
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center">{item.total}</td>
                      <td className="px-4 py-3 text-center">
                        {item.score.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h1
          className="
          inline-block
          bg-[#533d32]
          text-white
          p-4
          mb-4
          [clip-path:polygon(0_0,95%_0,90%_100%,0_100%)]
          w-[70vw]
          text-3xl
          font-bold
        "
        >
          ผู้ชมสายสารคดี
        </h1>

        <p>สถานีโทรทัศน์ที่รับชมเนื้อหาเกี่ยวกับสังคมมากที่สุด 3 อันดับแรก</p>
        <div className="w-full mt-4">
          <div className="block lg:hidden overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-[#006941] text-white text-left">
                  <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                  <th className="px-4 py-3 text-center">จำนวน</th>
                  <th className="px-4 py-3 text-center">ไม่มีค่าถ่วงน้ำหนัก</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      <span className="font-bold text-[#006941] mr-2">
                        {index + 1}.
                      </span>
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-center">{item.total}</td>
                    <td className="px-4 py-3 text-center">
                      {item.score.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-[#006941] text-white text-left">
                    <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                    <th className="px-4 py-3 text-center">จำนวน</th>
                    <th className="px-4 py-3 text-center">
                      ไม่มีค่าถ่วงน้ำหนัก
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leftData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        <span className="font-bold text-[#006941] mr-2">
                          {index + 1}.
                        </span>
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center">{item.total}</td>
                      <td className="px-4 py-3 text-center">
                        {item.score.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-[#006941] text-white text-left">
                    <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                    <th className="px-4 py-3 text-center">จำนวน</th>
                    <th className="px-4 py-3 text-center">
                      ไม่มีค่าถ่วงน้ำหนัก
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rightData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        <span className="font-bold text-[#006941] mr-2">
                          {index + leftData.length + 1}.
                        </span>
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center">{item.total}</td>
                      <td className="px-4 py-3 text-center">
                        {item.score.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h1
          className="
          inline-block
          bg-[#533d32]
          text-white
          p-4
          mb-4
          [clip-path:polygon(0_0,95%_0,90%_100%,0_100%)]
          w-[70vw]
          text-3xl
          font-bold
        "
        >
          ผู้ชมสายบันเทิง
        </h1>

        <p>สถานีโทรทัศน์ที่รับชมเนื้อหาเกี่ยวกับสังคมมากที่สุด 3 อันดับแรก</p>
        <div className="w-full mt-4">
          <div className="block lg:hidden overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-[#006941] text-white text-left">
                  <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                  <th className="px-4 py-3 text-center">จำนวน</th>
                  <th className="px-4 py-3 text-center">ไม่มีค่าถ่วงน้ำหนัก</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      <span className="font-bold text-[#006941] mr-2">
                        {index + 1}.
                      </span>
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-center">{item.total}</td>
                    <td className="px-4 py-3 text-center">
                      {item.score.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-[#006941] text-white text-left">
                    <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                    <th className="px-4 py-3 text-center">จำนวน</th>
                    <th className="px-4 py-3 text-center">
                      ไม่มีค่าถ่วงน้ำหนัก
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leftData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        <span className="font-bold text-[#006941] mr-2">
                          {index + 1}.
                        </span>
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center">{item.total}</td>
                      <td className="px-4 py-3 text-center">
                        {item.score.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-[#006941] text-white text-left">
                    <th className="px-4 py-3">ช่องสถานีโทรทัศน์</th>
                    <th className="px-4 py-3 text-center">จำนวน</th>
                    <th className="px-4 py-3 text-center">
                      ไม่มีค่าถ่วงน้ำหนัก
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rightData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        <span className="font-bold text-[#006941] mr-2">
                          {index + leftData.length + 1}.
                        </span>
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center">{item.total}</td>
                      <td className="px-4 py-3 text-center">
                        {item.score.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
