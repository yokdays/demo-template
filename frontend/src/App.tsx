import { useEffect, useState } from "react";
import axios from "axios";
import StatsChart from "./components/statChart";
import Recruit from "./components/Recruit";

export default function App() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    axios
      .get("/api/health")
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="grid grid-cols-[1fr_3fr] gap-8 p-8">
        <div className="grid gap-4">
          <StatsChart />
          <StatsChart />
          <StatsChart />
        </div>
        <div>
          <Recruit />
        </div>
      </div>
    </div>
  );
}
