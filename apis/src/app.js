import express from "express";
import mongoose from "mongoose";
import cors from "cors";
//import upload from "express-fileupload";
import multer from "multer";
const app = express();
const upload = multer({ storage: multer.memoryStorage() }).any();

import user from "./views/user.js";
import blog from "./views/blog.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(upload()); // and another way to upload files

app.use(user);
app.use(blog);
mongoose.connect(
  "mongodb+srv://admin00:Nax4kAOeQcJfZGTk@cluster0.norom.mongodb.net/BlogData?retryWrites=true&w=majority",
  () => {
    var port_number = app.listen(process.env.PORT || 3000);
    app.listen(port_number);
  }
);
