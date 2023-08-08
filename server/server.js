import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db.js";
import userRoutes from "./routes/userRoutes.js"; // Import the user routes module

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;
const router = express.Router();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    // Use the user routes
    router.use("/user", userRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
