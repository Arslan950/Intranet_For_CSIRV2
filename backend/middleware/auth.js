// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config(); // Load all env variables


const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send({ error: "Invalid token" });
  }
}

export function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role === role|| req.user?.role==="superAdmin") {
      next();
    }
    else {

      return res.status(403).send({ error: "Forbidden" });
    }
  };
}
