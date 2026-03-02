import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";

const progressData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

dotenv.config();

const app = express();

app.use(express.json());


app.use(cors())
// app.use(
//   cors({
//     origin: ["https://demo-ptt.custom-asia.com", "http://localhost:5173"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

const users = [
  {
    id: 1,
    username: "demo",
    name: "Demo",
    password: bcrypt.hashSync("demo", 10),
  },
];

const REGION_DATA = {
  bkk: { inArea: 450, outArea: 280 },
  north: { inArea: 410, outArea: 142 },
  northeast: { inArea: 450, outArea: 255 },
  central: { inArea: 338, outArea: 238 },
  south: { inArea: 213, outArea: 170 },
};
const REGION_DATA2 = {
  bkk: { inArea: 370, outArea: 360 },
  north: { inArea: 223, outArea: 329 },
  northeast: { inArea: 405, outArea: 300 },
  central: { inArea: 290, outArea: 286 },
  south: { inArea: 253, outArea: 130 },
};

const Summary = {
  summary: [
    {
      name: "กรุงเทพและปริมณฑล",
      ageGroups: {
        total: {
          Quota: 1200,
          Success: 730,
          male: { Quota: 575, Success: 348 },
          female: { Quota: 625, Success: 382 },
        },
      },
    },
    {
      name: "ภาคเหนือ",
      ageGroups: {
        total: {
          Quota: 900,
          Success: 546,
          male: { Quota: 432, Success: 262 },
          female: { Quota: 468, Success: 284 },
        },
      },
    },
    {
      name: "ภาคตะวันออกเฉียงเหนือ",
      ageGroups: {
        total: {
          Quota: 1100,
          Success: 667,
          male: { Quota: 528, Success: 320 },
          female: { Quota: 572, Success: 347 },
        },
      },
    },
    {
      name: "ภาคกลาง/ตะวันออก/ตะวันตก",
      ageGroups: {
        total: {
          Quota: 950,
          Success: 576,
          male: { Quota: 456, Success: 276 },
          female: { Quota: 494, Success: 300 },
        },
      },
    },
    {
      name: "ภาคใต้",
      ageGroups: {
        total: {
          Quota: 633,
          Success: 383,
          male: { Quota: 303, Success: 183 },
          female: { Quota: 330, Success: 200 },
        },
      },
    },
  ],
};

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
      { expiresIn: "1d" },
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

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend connected" });
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user,
  });
});

app.get("/api/summary-report", (req, res) => {
  let grandQuota = 0;
  let grandSuccess = 0;
  let grandMaleQuota = 0;
  let grandMaleSuccess = 0;
  let grandFemaleQuota = 0;
  let grandFemaleSuccess = 0;

  const regionData = Summary.summary.map((region) => {
    const data = region.ageGroups.total;

    const remaining = data.Quota - data.Success;
    const percent = ((data.Success / data.Quota) * 100).toFixed(2);

    grandQuota += data.Quota;
    grandSuccess += data.Success;
    grandMaleQuota += data.male.Quota;
    grandMaleSuccess += data.male.Success;
    grandFemaleQuota += data.female.Quota;
    grandFemaleSuccess += data.female.Success;

    return {
      region: region.name,
      quota: data.Quota,
      success: data.Success,
      remaining,
      percent: Number(percent),
      male: data.male,
      female: data.female,
    };
  });

  const grandRemaining = grandQuota - grandSuccess;
  const grandPercent = ((grandSuccess / grandQuota) * 100).toFixed(2);

  res.json({
    regions: regionData,
    grandTotal: {
      quota: grandQuota,
      success: grandSuccess,
      remaining: grandRemaining,
      percent: Number(grandPercent),
      male: {
        quota: grandMaleQuota,
        success: grandMaleSuccess,
      },
      female: {
        quota: grandFemaleQuota,
        success: grandFemaleSuccess,
      },
    },
  });
});

app.get("/api/inout", (req, res) => {
  const { region } = req.query;

  if (!region) {
    return res.json(Object.values(REGION_DATA));
  }

  const regionKey = region.toLowerCase();

  if (!REGION_DATA[regionKey]) {
    return res.status(404).json({
      error: "Region not found",
    });
  }

  res.json(REGION_DATA[regionKey]);
});

app.get("/api/inout2", (req, res) => {
  const { region } = req.query;

  if (!region) {
    return res.json(Object.values(REGION_DATA2));
  }

  const regionKey = region.toLowerCase();

  if (!REGION_DATA2[regionKey]) {
    return res.status(404).json({
      error: "Region not found",
    });
  }

  res.json(REGION_DATA2[regionKey]);
});

app.get("/api/progress", (req, res) => {

  const { region } = req.query;

  const calculateTotals = (regionArray) => {
    return regionArray.map((province) => {
      let totalQuota = 0;
      let totalSuccess = 0;
      let maleQuota = 0;
      let maleSuccess = 0;
      let femaleQuota = 0;
      let femaleSuccess = 0;

      Object.keys(province.ageGroups).forEach((ageKey) => {
        const age = province.ageGroups[ageKey];

        totalQuota += age.Quota;
        totalSuccess += age.Success;

        maleQuota += age.male.Quota;
        maleSuccess += age.male.Success;

        femaleQuota += age.female.Quota;
        femaleSuccess += age.female.Success;
      });

      return {
        ...province,
        ageGroups: {
          ...province.ageGroups,
          total: {
            Quota: totalQuota,
            Success: totalSuccess,
            male: {
              Quota: maleQuota,
              Success: maleSuccess,
            },
            female: {
              Quota: femaleQuota,
              Success: femaleSuccess,
            },
          },
        },
      };
    });
  };

  if (!region) {
    const result = {};
    Object.keys(progressData).forEach((key) => {
      result[key] = calculateTotals(progressData[key]);
    });
    return res.json(result);
  }

  if (!progressData[region]) {
    return res.status(404).json({
      error: "Region not found",
    });
  }

  res.json(calculateTotals(progressData[region]));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Backend running");
  console.log(`   http://localhost:${PORT}`);
  console.log("JWT_SECRET:", process.env.JWT_SECRET ? "LOADED" : "MISSING");
});