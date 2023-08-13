import { mongoose } from "mongoose";

const ImgSchema = new mongoose.Schema({
  ID: { type: Number, required: true },
  Mask: { type: String, required: true },
  Folder_Name: { type: String, required: true },
  Final_tags: [{ type: String, required: true }],
});

const Img = mongoose.model("images", ImgSchema);

export default Img;
