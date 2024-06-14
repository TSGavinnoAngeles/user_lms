import mongoose, { Schema } from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Ensure the ref matches your User model
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    status: {
      type: String,
      enum: ["ONGOING", "COMPLETED"],
      required: true,
    },
  },
  { timestamps: true }
);
const Enrollment =
  mongoose.models?.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
export default Enrollment;
