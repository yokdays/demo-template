import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username !== "demo" || password !== "demo") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: 1, username: "demo", name: "Admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: 1,
        username: "demo",
        name: "Admin",
      },
    });
  } catch (err) {
    next(err);
  }
};

// ✅ ต้อง export ชื่อนี้ตรงกับ routes
export const profile = (req, res) => {
  res.json({
    user: req.user,
  });
};
