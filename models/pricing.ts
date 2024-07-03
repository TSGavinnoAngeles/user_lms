import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  tier: { type: String, required: true },
  price: { type: String, required: true },
  correspondingTier: { type: String, required: true },
});
const Price = mongoose.models?.Price || mongoose.model("Price", PriceSchema);
export default Price;
