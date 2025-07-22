import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    console.log("📥 Incoming order data:", req.body);

    const { items, totalPrice } = req.body;

    if (!items || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Items and totalPrice are required" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
    });

    console.log(" Order created:", order);
    res.status(201).json(order);
  } catch (error) {
    console.error(" Error in createOrder:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.item");
    res.status(200).json(orders);
  } catch (error) {
    console.error(" Error fetching orders:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};