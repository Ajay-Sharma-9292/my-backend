import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const razorpayWebhookHandler = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const rawBody = req.body.toString("utf8");

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    console.error("❌ Signature mismatch");
    return res.status(400).send("Invalid signature");
  }

  const eventBody = JSON.parse(rawBody);
  const event = eventBody.event;
  const payment = eventBody.payload?.payment?.entity;

  console.log("✅ Webhook verified:", event);

  if (event === "payment.captured") {
    console.log("💰 Payment Captured:", payment.id);
    // Save to DB if needed
  }

  if (event === "payment.failed") {
    console.log("❌ Payment Failed:", payment.id);
  }

  if (event === "payment.authorized") {
    console.log("⚠️ Payment Authorized (not captured yet):", payment.id);
  }

  return res.status(200).json({ status: "ok" });
};
