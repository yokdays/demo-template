import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./components/LoginForm";
import Province from "./Province";
import Navbar from "./components/Navbar";
import bg from "../src/images/bg.png";
import axios from "axios";
import Menubar from "./components/menubar";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        setUser(response.data.user);
        setToken(storedToken);
      } catch (error) {
        console.error("Token invalid:", error);
        localStorage.removeItem("token");
        setToken(null);
      }

      setLoading(false);
    };

    initAuth();
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
        className="fixed inset-0 bg-cover bg-center brightness-125"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      <div className="relative z-10 min-h-screen">
        {token && <Navbar user={user} setToken={setToken} />}
        <Menubar />

        <Routes>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setToken={setToken} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/bangkok"
            element={token ? <Province /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}
