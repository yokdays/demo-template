import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import Login from "./components/LoginForm";
import Province from "./Province";
import Navbar from "./components/Navbar";
import Menubar from "./components/menubar";
import Analysis from "./Analysis";

import bg from "../src/images/bg.png";
import api from "./api/api";

api.get("/profile")

export default function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);

  // ✅ validate token แบบปลอดภัย
  useEffect(() => {
    let mounted = true;

    const validateToken = async () => {
      if (!token) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const res = await api.get("/profile");

        if (!mounted) return;

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.error("Token invalid:", err);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (mounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    validateToken();

    return () => {
      mounted = false;
    };
  }, [token]);

  // ⏳ loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-110 transform scale-105"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange/120 to-black/20" />
      </div>

      <div className="relative z-10 min-h-screen">
        {token && <Navbar user={user} setToken={setToken} />}
        {token && <Menubar setToken={setToken} />}

        <Routes>
          {/* LOGIN */}
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setToken={setToken} setUser={setUser} />
              )
            }
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/branch"
            element={token ? <Province /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/analysis"
            element={token ? <Analysis /> : <Navigate to="/login" replace />}
          />

          {/* FALLBACK */}
          <Route
            path="*"
            element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}
