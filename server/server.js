import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import imgRoutes from "./routes/imgRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://air-brick-front.vercel.app',
  credentials: true
}));
app.use(cookieParser());

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    // Use the user routes
    app.use("/api/user", userRoutes);
    app.use("/api/image", imgRoutes); // Update this line to use the correct router

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
