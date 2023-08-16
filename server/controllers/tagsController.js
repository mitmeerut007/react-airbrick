import Tag from "../models/tagsModels.js";

export const addTags = async (req, res) => {
  try {
    const tagData = req.body;

    if (!tagData) {
      return res.status(400).json({ success: false, message: "values not found" });
    }

    for (const [category, tags] of Object.entries(tagData)) {
      const newTagCategory = new Tag({
        name: category,
        tags: tags,
      });

      await newTagCategory.save();
    }

    res.status(201).json({ success: true, message: "Tags added successfully" });
  } catch (error) {
    console.error("Error adding tags:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTags = async (req, res) => {
  try {
    const allTags = await Tag.find();

    const tagsByCategories = {};

    allTags.forEach((tagCategory) => {
      tagsByCategories[tagCategory.name] = tagCategory.tags;
    });

    res.status(200).json(tagsByCategories);
  } catch (error) {
    console.error("Error getting tags:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
