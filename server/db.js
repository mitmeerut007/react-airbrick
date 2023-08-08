import mongoose from "mongoose";

async function connectToMongoDB() {
  try {
    // Connection URL
    const url = process.env.MONGODB_URI;

    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

export default connectToMongoDB;
