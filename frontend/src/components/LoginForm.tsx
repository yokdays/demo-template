import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModernInput from "./input";
import egatcustom from "../images/egat_custom.png"
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

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);

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
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <img
              src={egatcustom}
              alt="thaipbs"
              className="w-[400px] object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-center p-4 min-w-xl max-w-3xl">
            โครงการสำรวจความผูกพันผู้มีส่วนได้ส่วนเสีย กฟผ. ปี 2569
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
