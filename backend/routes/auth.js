// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import multer from "multer";
import {authenticate,authorizeRole} from '../middleware/auth.js'
dotenv.config(); // Load environment variables
const profile = multer({ storage: multer.memoryStorage() });
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
router.get("/members",authenticate, async (req, res) => {
  try {
    const users = await User.find().select("-password -__v"); // remove sensitive fields

    // Convert profileImage buffer to base64 if it exists
    const transformedUsers = users.map((user) => {
      const userObj = user.toObject();

      if (userObj.profileImage && userObj.profileImage.data) {
        userObj.profileImage = {
          data: userObj.profileImage.data.toString("base64"),
          contentType: userObj.profileImage.contentType || "image/jpeg",
        };
      } else {
        userObj.profileImage = null;
      }

      return userObj;
    });

    console.log(
      transformedUsers.length
        ? `✅ Users fetched: ${transformedUsers.length}`
        : "⚠️ No users found"
    );

    res.status(200).json(transformedUsers);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong: " + error.message });
  }
});

router.delete("/members/:id",authenticate, async (req, res) => {
  try {
    const _id = req.params.id;

    const user = await User.findById(_id);
    if (!user) {
      console.log(`❌ No user found with ID: ${_id}`);
      return res.status(404).send({ message: "User not found" });
    }
    if (user.role==="superAdmin") return res.status(400).send({message:"SuperAdmin Can't be deleted by admin "})

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
  console.log("📥 LOGIN BODY Recieved")
  console.log("🔐 Password received",  "| Type:", typeof password);

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
    expiresIn: "7d",
  });

  console.log("✅ Login successful:", username);
  res.send({ token, role: user.role, username });
  // console.log(token);
});

//user put api,to upload neccessey aditional info
router.put(
  "/user/:username/profile",authenticate,
  profile.single("profileImage"),
  async (req, res) => {
    try {
      const if_not_set = await User.findOne({ username: req.params.username })
      const Profile = {
        phone: req.body.phone || if_not_set.phone,
        email: req.body.email || if_not_set.email,
        address: req.body.address || if_not_set.address,
        position: req.body.position || if_not_set.position,
        skills: req.body.skills || if_not_set.skills ,
        about: req.body.about || if_not_set.about,
      };
      if (req.file) {
        Profile.profileImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
      const user = await User.findOneAndUpdate({ username: req.params.username }, Profile, {
        new: true,
      });
      if (!user) res.status(404).send({ message: "user not found" });
      console.log("User Profile Updated with success");
      res.json(user);
    } catch (error) {
      console.log("User Profile update gone wrong with  error: " + error);
      res
        .status(404)
        .send({
          message: "User Profile update gone wrong with  error: " + error,
        });
    }
  }
);

router.put(
  "/user/:username/roleChange",
  authenticate,
  authorizeRole("superAdmin"), // Only superAdmin can use this route
  async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role === "admin") {
        return res.status(400).json({ message: "User is already an admin" });
      }

      user.role = req.body.role;
      await user.save();

      return res.status(200).json({
        message: `User ${user.username} promoted to admin`,
        role: user.role,
      });
    } catch (error) {
      console.error("Role change error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
//get user/username/profile
router.get("/user/:username/profile", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      position: user.position,
      _id:user._id,
      role:user.role,
      about:user.about,
      skills:user.skills,
      profileImage: user.profileImage?.data
        ? `data:${user.profileImage.contentType};base64,${user.profileImage.data.toString("base64")}`
        : null,
    };

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error });
  }
});


export default router;
