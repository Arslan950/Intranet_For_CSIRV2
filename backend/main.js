// main.js
import Notice from "./models/notice.js";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { authenticate, authorizeRole } from './middleware/auth.js';

dotenv.config(); // Load environment variables



const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-production-site.com'], // ✅ allow frontend dev & production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies/auth headers
}));
app.use(express.json()); // Important for reading JSON body


//* important .envs
const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// 🔌 Connect to MongoDB with full options
mongoose.connect(mongoURI).then(() => console.log("✅ Mongoose connected"))
  .catch(err => console.error("❌ Mongoose connection error:", err.message));

let gfs;

// ✅ Create connection for GridFSBucket
const conn = mongoose.createConnection(mongoURI);

conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("✅ MongoDB & GridFSBucket connected");
});
//gridbucket for alerts
let gfs2;

const conn2=mongoose.createConnection(mongoURI);
conn2.once("open", () => {
  gfs2 = new GridFSBucket(conn2.db, {
    bucketName: "alerts",
  });
  console.log("✅ MongoDB & GridFSBucket2 connected");
});


app.get("/",(req,res)=>{
  res.send("hello world!")
})

// 🗂️ Use multer memory storage for temporary file buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });
const alerts= multer({ storage });
// ✅ Auth Routes (register/login)

app.use("/", authRoutes);

//POST for alerts 
app.post("/alerts", authenticate, authorizeRole("admin"), alerts.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No alerts uploaded");

  const stream = gfs2.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  stream.end(req.file.buffer);

  stream.on("finish", () => {
    res.status(200).send({
      message: "✅ alerts uploaded to MongoDB GridFS2",
      filename: req.file.originalname,
    });
  });

  stream.on("error", (err) => {
    console.error("Upload error:", err);
    res.status(500).send("❌ Upload failed");
  });
});

// ✅ GET /alerts (read all file metadata) — any logged-in user
app.get("/alerts", authenticate, async (req, res) => {
  try {
    const alerts = await conn2.db.collection("alerts.files").find().toArray();
    console.log("Alterts sended To frontend successfully!!")
    res.send(alerts);
    
  } catch (err) {
    res.status(500).send("❌ Failed to list alerts");
  }
});


//Get Alerts/id
app.get("/alerts/:id", authenticate, (req, res) => {
  if (!gfs2) return res.status(500).send("GridFS2 not ready");

  gfs2.openDownloadStreamByName(req.params.id)
    .on("error", () => {res.status(404).send("❌ alerts not found") 
      console.log("Error while fetching Alerts")
    })
    .pipe(res);
});

// ✅ DELETE /alerts/:filename — Admin only
app.delete("/alerts/:filename", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const alerts = await conn2.db.collection("alerts.files").findOne({ filename: req.params.filename });
    if (!alerts) return res.status(404).send("❌ alerts not found");

    await conn2.db.collection("alerts.files").deleteOne({ _id: alerts._id });
    await conn2.db.collection("alerts.chunks").deleteMany({ _id: alerts._id });

    res.send("✅ alerts deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ alerts to delete");
  }
});

// ✅ GET /file/:filename (download file) — any logged-in user
// app.get("/alerts/:alertname", authenticate, (req, res) => {
//   if (!gfs) return res.status(500).send("GridFS not ready");

//   gfs.openDownloadStreamByName(req.params.filename)
//     .on("error", () => res.status(404).send("❌ File not found"))
//     .pipe(res);
// });
// ✅ GET /file/:filename (download file) — any logged-in user
app.get("/file/:filename", authenticate, (req, res) => {
  if (!gfs) return res.status(500).send("GridFS not ready");

  gfs.openDownloadStreamByName(req.params.filename)
    .on("error", () => res.status(404).send("❌ File not found"))
    .pipe(res);
});

// ✅ POST /file (upload) - Admin only
app.post("/file", authenticate, authorizeRole("admin"), upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const stream = gfs.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  stream.end(req.file.buffer);

  stream.on("finish", () => {
    res.status(200).send({
      message: "✅ File uploaded to MongoDB GridFS",
      filename: req.file.originalname,
    });
  });

  stream.on("error", (err) => {
    console.error("Upload error:", err);
    res.status(500).send("❌ Upload failed");
  });
});

// ✅ GET /files (read all file metadata) — any logged-in user
app.get("/files", authenticate, async (req, res) => {
  try {
    const files = await conn.db.collection("uploads.files").find().toArray();
    console.log("Files Fetch Successfully!!")
    res.send(files);
  } catch (err) {
    res.status(500).send("❌ Failed to list files");
  }
});

// ✅ GET /file/:filename (download file) — any logged-in user
app.get("/file/:filename", authenticate, (req, res) => {
  if (!gfs) return res.status(500).send("GridFS not ready");

  gfs.openDownloadStreamByName(req.params.filename)
    .on("error", () => res.status(404).send("❌ File not found"))
    .pipe(res);
});

// ✅ DELETE /file/:filename — Admin only
app.delete("/file/:filename", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const file = await conn.db.collection("uploads.files").findOne({ filename: req.params.filename });
    if (!file) return res.status(404).send("❌ File not found");

    await conn.db.collection("uploads.files").deleteOne({ _id: file._id });
    await conn.db.collection("uploads.chunks").deleteMany({ files_id: file._id });

    res.send("✅ File deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to delete");
  }
});


app.post("/notice",authenticate,authorizeRole("admin"),async(req,res)=>{
     const {title,notice,adminName}=req.body;
       console.log(`📢 Notice sent by ${adminName}\n📝 Content: ${notice}`);
     try {
      const newnotice=await Notice.create({title,notice,adminName})
      console.log("Notice Uploaded to database with success")

      res.status(201).send({message:"Notice inserted successfully"})
     }catch(err){
      console.error("❌ Error inserting notice:", err);
    res.status(500).send({ message: "❌ Something went wrong" });
     }


})

app.get("/notice/:title",authenticate,async (req,res )=>{
  const title=req.params.title
  try{
  const needednotice=await Notice.findOne({title})

  if (!needednotice) {
    console.warn("❌ Notice not found:", title);
    return res.status(401).send({ error: "Invalid credentials" });}
    res.send(needednotice)

}catch(err){
   console.error("❌ Error fetching notice:", err);
    res.status(500).send({ error: "Failed to retrieve notice" });
}
  


})
app.get("/notice", authenticate, async (req, res) => {
  try {
    const allNotices = await Notice.find(); // Returns an array

    if (allNotices.length === 0) {
      return res.status(404).send({ error: "No notices found" });
    }

    res.status(200).send(allNotices);
  } catch (err) {
    console.error("❌ Error fetching notices:", err);
    res.status(500).send({ error: "Failed to retrieve notices" });
  }
});

app.delete("/notice/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;

    const file = await Notice.findById(id);
    if (!file) {
      console.log(`Notice with ID ${id} does not exist in Collection Notice`);
      return res.status(404).send({ message: `Notice not found` });
    }

    const title = file.title || "Default title";
    await Notice.deleteOne({ _id: id }); // ✅ Proper delete

    console.log(`${title}'s Notice deleted Successfully!!`);
    res.status(200).send({ message: "Notice deleted Successfully!!" });
  } catch (err) {
    console.error("Something went wrong! error:", err);
    res.status(500).send({ message: "Something went wrong: " + err.message });
  }
});



// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
