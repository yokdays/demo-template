import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import thaipbs from "../images/thaipbs.png";
import casia from "../images/c-asia.png";
import ModernInput from "./input";

interface LoginProps {
  setToken: (token: string) => void;
}

export default function Login({ setToken }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/login", {
        username,
        password,
      });

      const { token, user } = res.data;

      // เก็บ token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // update auth state
      setToken(token);

      // redirect แบบ React (ไม่ reload)
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div>
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-xl shadow-md max-w-* space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src={thaipbs}
              alt="PTT"
              className="h-12 sm:h-14 md:h-16 object-contain"
            />
            <img
              src={casia}
              alt="Custom Asia"
              className="h-14 sm:h-16 md:h-18 object-contain mt-6"
            />
          </div>
          <h1 className="text-xl font-bold text-center p-4 max-w-[420px]">
            โครงการติดตามความคืบหน้าของแบบสำรวจความพึงพอใจและความไม่พึงพอใจของลูกค้า
          </h1>

          <h1 className="text-md font-bold text-center">เข้าสู่ระบบ</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <ModernInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <ModernInput
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00478E] text-white py-2 rounded hover:bg-[#00478E]/90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
