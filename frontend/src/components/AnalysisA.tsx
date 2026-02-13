import Anabar from "./anabar";

export default function AnalysisA() {
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
  return (
    <>
      <h1
        className="
          inline-block
          bg-blue-600
          text-white
          p-4
          mb-4
          [clip-path:polygon(0_0,95%_0,90%_100%,0_100%)]
          w-[70vw]
          text-3xl
          font-bold
        "
      >
        ช่องสถานโทรทัศน์ที่นึกถึง (Top of Mind)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Anabar
          heading="ช่องสถานโทรทัศน์ที่นึกถึง (Top of Mind)"
          heading2="สารคดีที่มีคุณภาพ"
          labels={[
            "มีเนื้อหาเข้าใจง่าย",
            "เป็นความจริงถูกต้อง",
            "ดูได้ทุกเพศทุกวัย",
            "เพลิดเพลิน ไม่น่าเบื่อ",
            "ได้เรียนรู้สิ่งใหม่",
            "ภาษาเข้าใจง่าย",
            "สนุก ไม่เครียด",
            "เนื้อหาไม่รุนแรง",
          ]}
          datasets={[
            {
              key: "A",
              label: "ไม่มีค่าถ่วงน้ำหนัก",
              data: [61.564, 28.395, 7.42, 4.84, 9.14, 2.63, 6.32, 8.91],
              color: "#3b82f6",
            },
            {
              key: "B",
              label: "มีค่าถ่วงน้ำหนัก",
              data: [61.386, 28.395, 6.94, 5.27, 8.42, 3.12, 7.73, 4.64],
              color: "#f97316",
            },
          ]}
        />
        <Anabar
          heading="ช่องสถานโทรทัศน์ที่นึกถึง (Top of Mind)"
          heading2="เนื้อหาบันเทิงที่สร้างสรรค์"
          labels={[
            "มีเนื้อหาเข้าใจง่าย",
            "เป็นความจริงถูกต้อง",
            "ดูได้ทุกเพศทุกวัย",
            "เพลิดเพลิน ไม่น่าเบื่อ",
            "ได้เรียนรู้สิ่งใหม่",
            "ภาษาเข้าใจง่าย",
            "สนุก ไม่เครียด",
            "เนื้อหาไม่รุนแรง",
          ]}
          datasets={[
            {
              key: "A",
              label: "ไม่มีค่าถ่วงน้ำหนัก",
              data: [61.564, 28.395, 7.42, 4.84, 9.14, 2.63, 6.32, 8.91],
              color: "#3b82f6",
            },
            {
              key: "B",
              label: "มีค่าถ่วงน้ำหนัก",
              data: [61.386, 28.395, 6.94, 5.27, 8.42, 3.12, 7.73, 4.64],
              color: "#f97316",
            },
          ]}
        />
      </div>

      <div className="mb-4">
        <h1
          className="
          inline-block
          bg-blue-600
          text-white
          p-4
          mb-4
          [clip-path:polygon(0_0,95%_0,90%_100%,0_100%)]
          w-[70vw]
          text-3xl
          font-bold
        "
        >
          ประเด็นที่ 1
        </h1>

        <p>
          ประเด็นที่ 1
          หากต้องการรับชมเนื้อหาศิลปวัฒนธรรมไทยที่ถ่ายทอดให้เห็นถึงความสวยงามและช่วยยกระดับคุณค่าของความเป็นไทย
        </p>
        <div className="w-full overflow-x-auto mt-4">
          <table className="w-full border-collapse bg-white rounded-xl shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-4 py-3">
                  ช่องสถานีโทรทัศน์ที่เลือกรับชมเนื้อหาศิลปวัฒนธรรมไทยเป็นอันดับแรก
                </th>
                <th className="px-4 py-3 text-center">จำนวน</th>
                <th className="px-4 py-3 text-center">ไม่มีค่าถ่วงน้ำหนัก</th>
                <th className="px-4 py-3 text-center">มีค่าถ่วงน้ำหนัก</th>
              </tr>
            </thead>

            <tbody>
              {data1.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-center">{item.total}</td>
                  <td className="px-4 py-3 text-center">
                    {item.score.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.score_weight.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-4">
        <h1
          className="
          inline-block
          bg-blue-600
          text-white
          p-4
          mb-4
          [clip-path:polygon(0_0,95%_0,90%_100%,0_100%)]
          w-[70vw]
          text-3xl
          font-bold
        "
        >
          ประเด็นที่ 2
        </h1>

        <p>
          ประเด็นที่ 2
          หากต้องการรับชมเนื้อหาศิลปวัฒนธรรมไทยที่ถ่ายทอดให้เห็นถึงความสวยงามและช่วยยกระดับคุณค่าของความเป็นไทย
        </p>
        <div className="w-full overflow-x-auto mt-4">
          <table className="w-full border-collapse bg-white rounded-xl shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-4 py-3">
                  ช่องสถานีโทรทัศน์ที่เลือกรับชมเนื้อหาศิลปวัฒนธรรมไทยเป็นอันดับแรก
                </th>
                <th className="px-4 py-3 text-center">จำนวน</th>
                <th className="px-4 py-3 text-center">ไม่มีค่าถ่วงน้ำหนัก</th>
                <th className="px-4 py-3 text-center">มีค่าถ่วงน้ำหนัก</th>
              </tr>
            </thead>

            <tbody>
              {data1.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-center">{item.total}</td>
                  <td className="px-4 py-3 text-center">
                    {item.score.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.score_weight.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
