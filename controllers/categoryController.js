import Category from "../models/Category.js";
import Item from "../models/Item.js"; // ✅ Import Item to delete associated items

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file?.path;

    const category = await Category.create({ title, image });
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a category and its associated items
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all items under this category
    await Item.deleteMany({ category: id });

    // Delete the category
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json({ message: "Category and related items deleted" });
  } catch (error) {
    console.error("deleteCategory error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
