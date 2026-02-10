import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "../src/components/LoginForm";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* fallback กัน url มั่ว */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
