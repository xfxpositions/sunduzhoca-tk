import mongoose from "mongoose";
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        //required: true,
        type: String,
      },
      email: {
        //required: true,
        type: String,
      },
      password: {
        //required: true,
        type: String,
      },
      avatar: {
        required: false,
      },
      creationDate: {
        type: String,
        required: false,
      },
      posts: {
        type: Array,
        required: false,
      },
      createdVia: {
        type: String,
        required: false,
      },
      googleImg: {
        required: false,
      },
    },
    { timestamps: true }
  )
);
export default User;
