import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    username: "admin",
    name: "Admin",
    password: bcrypt.hashSync("123456", 10),
  },
];


/* ---------------- AUTH MIDDLEWARE ---------------- */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};


/* ---------------- LOGIN ---------------- */
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "username or password incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "username or password incorrect" });
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
        name: user.name,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ---------------- PROTECTED EXAMPLE ---------------- */
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user,
  });
});

app.get("/api/health",  (req, res) => {
  res.json({ status: "Connect from Backend" });
});

app.get("/api/stats", authMiddleware, (req, res) => {
  res.json({
    labels: ["ตอบแบบสอบถามครบถ้วน", "กำลังอยู่ในขั้นตอนตอบแบบสอบถาม"],
    values: [60, 131],
  });
});

app.get("/api/insight", (req, res) => {
  res.json({
    labels: ["ตอบแบบสอบถามครบถ้วน", "กำลังอยู่ในขั้นตอนตอบแบบสอบถาม"],
    values: [41, 122],
  });
});

app.get("/api/outsight", (req, res) => {
  res.json({
    labels: ["ตอบแบบสอบถามครบถ้วน", "กำลังอยู่ในขั้นตอนตอบแบบสอบถาม"],
    values: [19, 9],
  });
});

app.get("/api/recruit", (req, res) => {
  res.json({
    labels: ["นัดหมายสำเร็จ", "อยู่ในขั้นตอนการนัดหมาย", "ปฎิเสธที่จะเข้าร่วม"],
    values: [60, 19, 12],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running`);
  console.log(`   http://localhost:${PORT}`);
});
