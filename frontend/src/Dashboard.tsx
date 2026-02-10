import { useEffect, useState } from "react";
import axios from "axios";

import StatsChart from "./components/statChart";
import Recruit from "./components/Recruit";
import Navbar from "./components/Navbar";
import StatsChartInsight from "./components/StatChartInsight";
import StatsChartOutsight from "./components/StatChartOutsight";
import Progress2 from "./components/Progress2";

export default function App() {
  const [status, setStatus] = useState("loading...");
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      window.location.replace("/login");
      return;
    }
  
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  
    axios
      .get("/api/profile")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.replace("/login");
      })
      .finally(() => setCheckedAuth(true));
  }, []);

  if (!checkedAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen flex justify-center py-4">
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
