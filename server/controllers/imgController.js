import Img from "../models/imgModel.js";
import path from "path";

export const addImg = async (req, res) => {
  try {
    const { title, tags, office, year } = req.body;
    const imagePath = req.file.path;
    const imgPath = `img-${Date.now()}${path.extname(req.file.originalname)}`;

    // Split the tags string into an array
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    // Create a new Img instance using the provided data
    const newImg = new Img({ title, tags: tagsArray, imgPath, office, year, imagePath });

    // Save the new image record to the database
    const savedImg = await newImg.save();

    res.status(201).json(savedImg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Img.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getImagesByTags = async (req, res) => {
  try {
    const { tags } = req.query;

    if (!tags) {
      const allImages = await Img.find();
      res.status(200).json(allImages);
      return;
    }

    const tagsArray = tags.split(',').map(tag => tag.trim());

    const imagesWithTags = await Img.find({ tags: { $all: tagsArray } });
    res.status(200).json(imagesWithTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getAllTags = async (req, res) => {
  try {
    const allImages = await Img.find();
    const allTags = Array.from(new Set(allImages.flatMap(image => image.tags)));
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
