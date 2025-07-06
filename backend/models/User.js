// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },

  //optaional fields
  phone: { type: String, unique: true , sparse: true },
  email: { type: String, unique: true , sparse: true },
  address: { type: String },
  position: { type: String },
  skills: { type: [String], default:[] },
  about:{type:String},
  profileImage: { data: Buffer, contentType: String },
});

export default mongoose.model("User", userSchema);
