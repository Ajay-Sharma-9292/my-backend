import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body; // <-- changed here
    const image = req.file?.path;

    const item = await Item.create({
      name,
      description,
      price,
      category: categoryId, // assign correctly here
      image,
    });

    res.status(201).json({ message: "Item created", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("category");
    res.status(200).json({ items }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json({ message: "Item deleted" });
  } catch (error) {
    console.error("deleteItem error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
