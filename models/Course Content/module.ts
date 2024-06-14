import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },

  order: {
    type: Number,
    required: true,
  },
});

const Module =
  mongoose.models?.Module || mongoose.model("Module", ModuleSchema);

export default Module;
