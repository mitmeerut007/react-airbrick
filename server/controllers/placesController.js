import Place from "../models/placesModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Import the fileURLToPath function
import { dirname } from "path"; // Import the dirname function

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadPath = path.join(__dirname, "../uploads");

export const addPlace = async (req, res) => {
  try {
    const { title, owner, releaseYear } = req.body;
    const newPlace = new Place({ title, owner, releaseYear });
    if (!title || !owner || !releaseYear) {
      return res.status(500).json({ error: "values not found" });
    }
    if (req.files) {
      const placeImgs = [];
      req.files.forEach((file) => {
        const filename = `${Date.now()}_${file.originalname}`;
        const filepath = path.join(uploadPath, filename);
        fs.writeFileSync(filepath, file.buffer); // Save the file
        placeImgs.push(filename);
      });
      newPlace.placeImgs = placeImgs;
    }

    const savedPlace = await newPlace.save();
    res.json(savedPlace);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
