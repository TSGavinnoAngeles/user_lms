import mongoose, { Schema } from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["ONGOING", "COMPLETED", "DROPPED"],
      required: true,
    },
  },
  { timestamps: true }
);
const Enrollment =
  mongoose.models?.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
export default Enrollment;
