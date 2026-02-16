import React, { useState } from "react";
import AnalysisA from "./AnalysisA";
import AnalysisB from "./AnalysisB";
import AnalysisC from "./AnalysisC";

export default function AnalysisBranch() {
  const [active, setActive] = useState<"A" | "B" | "C">("A");

  return (
    <div className="p-4 bg-white rounded-xl space-y-4">
      <div className="flex gap-3">
        <button
          onClick={() => setActive("A")}
          className={`px-4 py-2 rounded-lg border ${
            active === "A"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          ช่องสถานีโทรทัศน์ที่นึกถึง
        </button>

        <button
          onClick={() => setActive("B")}
          className={`px-4 py-2 rounded-lg border ${
            active === "B"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          พฤติกรรมการรับชมเนื้อหา
        </button>
        <button
          onClick={() => setActive("C")}
          className={`px-4 py-2 rounded-lg border ${
            active === "C"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          การติดตามและเข้าถึงเนื้อหาช่อง Thai PBS
        </button>
      </div>

      <div>
        {active === "A" && <AnalysisA />}
        {active === "B" && <AnalysisB />}
        {active === "C" && <AnalysisC />}
      </div>
    </div>
  );
}
