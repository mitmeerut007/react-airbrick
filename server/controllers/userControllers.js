import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  try {
    const { username, email, contact, password, cpassword } = req.body;

    // Check if all fields are provided
    if (!username || !email || !contact || !password || !cpassword) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Check if the passwords match
    if (password !== cpassword) {
      return res.status(400).json({ error: "Please confirm passwords correctly" });
    }

    // Check if the password is short
    if (password.length < 6) {
      return res.status(400).json({ error: "Password should be at least 6 characters long" });
    }

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, email, contact, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
