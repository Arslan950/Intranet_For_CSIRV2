// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Helper: hash password using callback-based bcryptjs
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) return reject(err);
      resolve(hash);
    });
  });
}

// ✅ REGISTER Route
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  console.log("📥 REGISTER BODY:", req.body);
  console.log("🔐 Raw password:", password, "| Type:", typeof password);

  try {
    const hashed = await hashPassword(password);
    const user = await User.create({ username, password: hashed, role });
    console.log("✅ User registered:", user.username);

    res.status(201).send({
      message: "User created",

      role: user.role,
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(400).send({ error: "User exists or invalid input" });
  }
});
router.get("/members", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users.length ? `Users fetched: ${users.length}` : "No users found");
    res.status(200).json(users); // ✅ Send as JSON, not string
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Something went wrong: " + error.message });
  }
});
router.delete("/members/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const user = await User.findById(_id);
    if (!user) {
      console.log(`❌ No user found with ID: ${_id}`);
      return res.status(404).send({ message: "User not found" });
    }

    await User.deleteOne({ _id });
    console.log("✅ User deleted successfully");
    res.status(200).send({ message: "User deleted successfully" });

  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).send({ message: "Something went wrong: " + error.message });
  }
});


// ✅ LOGIN Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("📥 LOGIN BODY:", req.body);
  console.log("🔐 Password received:", password, "| Type:", typeof password);

  const user = await User.findOne({ username });

  if (!user) {
    console.warn("❌ User not found:", username);
    return res.status(401).send({ error: "Invalid credentials" });
  }

  const match = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });

  if (!match) {
    console.warn("❌ Incorrect password for:", username);
    return res.status(401).send({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  console.log("✅ Login successful:", username);
  res.send({ token, role: user.role, username });
  console.log(token);
});

export default router;
