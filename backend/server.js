import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./src/helpers/errorhandler.js";
import authROutes from "./src/routes/userRoutes.js";
import path from "path";
import fs from "fs"
import taskROutes from "./src/routes/tasksRoutes.js";
import { fileURLToPath } from 'url';
dotenv.config();

const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// error handler middleware

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorHandler);

//routes
app.use("/auth", authROutes)
app.use("/task", taskROutes)

const server = async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to strt server.....", error.message);
    process.exit(1);
  }
};

server();
