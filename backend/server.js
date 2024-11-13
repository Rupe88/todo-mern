import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./src/helpers/errorhandler.js";
import authRoutes from "./src/routes/userRoutes.js";
import path from "path";
import fs from "fs";
import taskRoutes from "./src/routes/tasksRoutes.js";
import { fileURLToPath } from 'url';

dotenv.config();

const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();



// Middleware setup
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handler middleware
app.use(errorHandler);

// Serve uploads folder statically
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));




// Auth and task routes
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

// Start the server
const server = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server...", error.message);
    process.exit(1);
  }
};

server();
