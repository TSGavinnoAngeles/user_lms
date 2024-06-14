import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Topic = mongoose.models?.Topic || mongoose.model("Module", TopicSchema);

export default Topic;
