import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  cover: {
    type: String,
  },
  author: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  ratingcount: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
});
export const Books = mongoose.model("booksdata", booksSchema);
