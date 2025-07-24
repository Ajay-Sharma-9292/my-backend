import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/webhook/razorpay", express.raw({ type: "application/json" }), (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const payload = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  if (signature === expectedSignature) {
    console.log("✅ Webhook Verified:", JSON.parse(payload.toString()));

    // Optional: save payment or order status to DB
    return res.status(200).json({ status: "Webhook received and verified" });
  } else {
    console.log("❌ Webhook Signature Mismatch");
    return res.status(400).json({ status: "Invalid signature" });
  }
});

export default router;
