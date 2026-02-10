import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

/* ---------------- BASIC CONFIG ---------------- */
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://demo-ptt.custom-asia.com",
      "http://localhost:5173",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------------- MOCK USERS ---------------- */
const users = [
  {
    id: 1,
    username: "demo",
    name: "Admin",
    password: bcrypt.hashSync("demo", 10),
  },
];

/* ---------------- AUTH MIDDLEWARE ---------------- */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* ---------------- LOGIN ---------------- */
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res
        .status(401)
        .json({ message: "username or password incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "username or password incorrect" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- HEALTH CHECK ---------------- */
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend connected" });
});

/* ---------------- PROTECTED ROUTES ---------------- */
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user,
  });
});

app.get("/api/stats", authMiddleware, (req, res) => {
  res.json({
    labels: ["ตอบแบบสอบถามครบถ้วน", "กำลังอยู่ในขั้นตอนตอบแบบสอบถาม"],
    values: [60, 131],
  });
});

app.get("/api/insight", authMiddleware, (req, res) => {
  res.json({
    labels: ["ตอบแบบสอบถามครบถ้วน", "กำลังอยู่ในขั้นตอนตอบแบบสอบถาม"],
    values: [41, 122],
  });
});

app.get("/api/outsight", authMiddleware, (req, res) => {
  res.json({
    labels: ["ตอบแบบสอบถามครบถ้วน", "กำลังอยู่ในขั้นตอนตอบแบบสอบถาม"],
    values: [19, 9],
  });
});

app.get("/api/recruit", authMiddleware, (req, res) => {
  res.json({
    labels: [
      "นัดหมายสำเร็จ",
      "อยู่ในขั้นตอนการนัดหมาย",
      "ปฏิเสธที่จะเข้าร่วม",
    ],
    values: [60, 19, 12],
  });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Backend running");
  console.log(`   http://localhost:${PORT}`);
  console.log("JWT_SECRET:", process.env.JWT_SECRET ? "LOADED" : "MISSING");
});
