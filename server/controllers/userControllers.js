import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await User.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password and Confirm Password Not Match" });
    } else {
      const finalUser = new User({
        fname,
        email,
        password,
        cpassword,
      });

      const storeData = await finalUser.save();

      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(422).json({ error: "Fill in all the details" });

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(422).json({ status: 422, error: "Invalid details" });

    const token = await user.generateAuthToken();

    res.cookie("usercookie", token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true,
    });

    res.status(201).json({ status: 201, result: { user, token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const ValidUser = async (req, res) => {
  try {
    const ValidUserOne = await User.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("usercookie", { path: "/" });

    await req.rootUser.save();

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

// ... (other controller functions)
