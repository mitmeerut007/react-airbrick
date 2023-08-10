import { mongoose } from "mongoose";

const ImgSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [String],
  imgPath: { type: String, required: true },
  office: { type: String, required: true },
  year: { type: Number, required: true },
});

const Img = mongoose.model("images", ImgSchema);

export default Img;
