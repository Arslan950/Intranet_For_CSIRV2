// // import express from 'express';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import Notice from '../models/notice.js';
// // import dotenv from 'dotenv';
// // import dotenv from 'dotenv';
// // import express from 'express';
// // import { authenticate } from '../middleware/auth.js';
// // dotenv.config(); // Load environment variables

// // const router = express.Router();
// // const JWT_SECRET = process.env.JWT_SECRET;


// // import {authenticate,authorizeRole} from "../middleware/auth.js"

// // router.post("/notice", async (req,res)=>{})

// // router.get("/notice", async (req,res)=>{})

// // router.delete("/notice", async (req,res)=>{})
// // ✅ POST /file (upload) - Admin only
// app.post("/file", authenticate, authorizeRole("admin"), upload.single("file"), (req, res) => {
//   if (!req.file) return res.status(400).send("No file uploaded");

//   const stream = gfs.openUploadStream(req.file.originalname, {
//     contentType: req.file.mimetype,
//   });

//   stream.end(req.file.buffer);

//   stream.on("finish", () => {
//     res.status(200).send({
//       message: "✅ File uploaded to MongoDB GridFS",
//       filename: req.file.originalname,
//     });
//   });

//   stream.on("error", (err) => {
//     console.error("Upload error:", err);
//     res.status(500).send("❌ Upload failed");
//   });
// });