import { mongoose } from "mongoose";

const TagSchema = new mongoose.Schema({
    name: String,
    tags: [String],
});

const Tag = mongoose.model("tags", TagSchema);

export default Tag;
