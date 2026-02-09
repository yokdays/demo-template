import { useEffect, useState } from "react";
import axios from "axios";
import StatsChart from "./components/statChart";
import Recruit from "./components/Recruit";
import Progress from "./components/Progress";
import Navbar from "./components/Navbar";
import StatsChartInsight from "./components/StatChartInsight"
import StatsChartOutsight from "./components/StatChartOutsight"
import Progress2 from "./components/Progress2";
export default function App() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    axios
      .get("/api/health")
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center py-4 bg-gray-200">
        <div className="grid grid-cols-[1fr_3fr] gap-4">
          <div className="grid gap-4">
            <StatsChart />
            <StatsChartInsight />
            <StatsChartOutsight />
          </div>
          <div className="flex flex-col gap-4">
            <Recruit />
            <Progress2 />
          </div>
        </div>
      </div>
    </>
  );
}
