import mongoose from "mongoose";
import { Schema } from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publisher: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
    },
    sub_Mode: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  { timestamps: true }
);

const Course =
  mongoose.models?.Course || mongoose.model("Course", CourseSchema);

export default Course;
