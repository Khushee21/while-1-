import mongoose from 'mongoose';
const mongooseSchema=mongoose.Schema({
  tech: String,
  title: String,
  steps: [String],
});

export default mongoose.model("Roadmap", mongooseSchema);