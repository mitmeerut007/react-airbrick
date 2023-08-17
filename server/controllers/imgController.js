import Img from "../models/imgModel.js";
import fs from "fs";

export const addImg = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./output-final.json", "utf-8"));
    await Img.create(data);
    res.status(201).json({ message: "ii no Server error" });
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

const ITEMS_PER_PAGE = 25; // Number of items per page

export const getImagesByTags = async (req, res) => {
  try {
    const { tags, page } = req.query;

    let pageNumber = parseInt(page) || 1;
    if (pageNumber < 1) {
      pageNumber = 1;
    }

    let totalCount = 0;
    let images = [];

    if (!tags) {
      totalCount = await Img.countDocuments();
      images = await Img.find()
        .skip((pageNumber - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    } else {
      const tagsArray = tags.split(",").map((tag) => tag.trim());

      totalCount = await Img.countDocuments({ Final_tags: { $all: tagsArray } });
      images = await Img.find({ Final_tags: { $all: tagsArray } })
        .skip((pageNumber - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    }

    // Shuffle the images using Fisher-Yates shuffle algorithm
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    res.status(200).json({ images, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const allImages = await Img.find();
    const allTags = Array.from(new Set(allImages.flatMap((image) => image.Final_tags)));
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { mask } = req.query;

    if (!mask) {
      return res.status(400).json({ message: "Mask value is required." });
    }

    const projects = await Img.find({ Mask: mask });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

