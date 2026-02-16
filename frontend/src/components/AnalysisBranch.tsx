import React, { useState } from "react";
import AnalysisA from "./AnalysisA";
import AnalysisB from "./AnalysisB";
import AnalysisC from "./AnalysisC";
import Heading from "./heading";

export default function AnalysisBranch() {
  const [active, setActive] = useState<"A" | "B" | "C">("A");

  return (
    <div className="p-4 bg-white rounded-xl space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-5">
        <Heading text="ผลการวิเคราะห์เบื้องต้น" color="#fe5000cc" />

        <div className="flex gap-2">
          <button
            onClick={() => setActive("A")}
            className={`px-4 py-2 rounded-lg border ${
              active === "A"
                ? "bg-[#fe5000] text-white"
                : "bg-white hover:bg-[#fe5000]/10"
            }`}
          >
            ช่องสถานีโทรทัศน์ที่นึกถึง
          </button>

          <button
            onClick={() => setActive("B")}
            className={`px-4 py-2 rounded-lg border ${
              active === "B"
                ? "bg-[#fe5000] text-white"
                : "bg-white hover:bg-[#fe5000]/10"
            }`}
          >
            พฤติกรรมการรับชมเนื้อหา
          </button>
          <button
            onClick={() => setActive("C")}
            className={`px-4 py-2 rounded-lg border ${
              active === "C"
                ? "bg-[#fe5000] text-white"
                : "bg-white hover:bg-[#fe5000]/10"
            }`}
          >
            การติดตามและเข้าถึงเนื้อหาช่อง Thai PBS
          </button>
        </div>
      </div>
      <div>
        {active === "A" && <AnalysisA />}
        {active === "B" && <AnalysisB />}
        {active === "C" && <AnalysisC />}
      </div>
    </div>
  );
}
