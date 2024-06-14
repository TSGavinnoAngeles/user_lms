import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["MCQ", "TF", "ENUMS"],
        required: true,
      },
    },
  ],
  order: {
    type: Number,
    required: true,
  },
});

const Quiz = mongoose.models?.Quiz || mongoose.model("Quiz", QuizSchema);

export default Quiz;
