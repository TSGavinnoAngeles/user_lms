import mongoose from "mongoose";
import { map } from "zod";

const SubSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stripeCustomerId: {
      type: String,
      mapTo: "stripe_customer_id",
    },
    stripePriceId: {
      type: String,
      mapTo: "stripe_price_id",
    },
    stripeSubscriptionId: {
      type: String,
      mapTo: "stripe_subscription_id",
    },
    amount: {
      type: String,
    },
    paidFor: {
      type: String,
    },
  },
  { timestamps: true }
);
const Subscriptions =
  mongoose.models?.Subscriptions || mongoose.model("Subscriptions", SubSchema);
export default Subscriptions;
