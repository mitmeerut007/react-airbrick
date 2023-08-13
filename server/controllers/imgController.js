import Img from "../models/imgModel.js";

export const addImg = async (req, res) => {
  try {
    const { ID, Mask, Folder_Name, Final_tags } = req.body;

    // Create a new Img instance using the provided data
    const newImg = new Img({ ID, Mask, Folder_Name, Final_tags });

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

const ITEMS_PER_PAGE = 15; // Number of items per page

export const getImagesByTags = async (req, res) => {
  try {
    const { tags, page } = req.query;

    let pageNumber = parseInt(page) || 1;
    if (pageNumber < 1) {
      pageNumber = 1;
    }

    if (!tags) {
      const totalCount = await Img.countDocuments();
      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

      const allImages = await Img.find()
        .skip((pageNumber - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);

      res.status(200).json({ images: allImages, totalPages });
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const totalCount = await Img.countDocuments({ Final_tags: { $all: tagsArray } });
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const imagesWithTags = await Img.find({ Final_tags: { $all: tagsArray } })
      .skip((pageNumber - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.status(200).json({ images: imagesWithTags, totalPages });
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
