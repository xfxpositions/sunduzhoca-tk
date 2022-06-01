import mongoose from "mongoose";

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema(
    {
      title: {
        type: String,
        //required: true,
      },
      content: {
        type: String,
        //required: true,
      },
      image: {
        type: String,
        required: false,
      },
      tags: {
        type: Array,
        required: false,
      },
      creator: {
        type: String,
        required: false,
      },
      creator_avatar: {
        type: String,
        required: false,
      },
      creationDate: {
        type: Number,
      },
      comments: {
        type: Array,
      },
      category: {
        type: String,
      },
      likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
      },
      read_count: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  )
);

export default Blog;
