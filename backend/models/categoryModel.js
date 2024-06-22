import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures each category name is unique
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or path to category image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
