import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./components/LoginForm";
import bg from "./images/bg.png";

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="
          fixed inset-0
          bg-cover bg-center
          filter
          brightness-110
          contrast-110
          saturate-110
        "
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen">
        <Routes>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setToken={setToken} />
              )
            }
          />

          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}
