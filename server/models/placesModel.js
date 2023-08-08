import { mongoose } from "mongoose";

const placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  placeImgs: [{ type: String }],
});

const Place = mongoose.model("Places", placeSchema);

export default Place;
