import Blog from "../models/blog.js";
import { uploadFile } from "../utils/s3.js";

import mongoose from "mongoose";
export const createPost = async (req, res) => {
  const file = req.file;

  const uploadResult = await uploadFile(file);
  console.log(uploadResult);
  const userData = JSON.parse(req.body.userData);
  const blogSave = new Blog({
    title: userData.title,
    content: userData.content,
    tags: userData.tags,
    creator: userData.creator,
    image: uploadResult.Location.toString(),
    creator_avatar: userData.creator_avatar,
    creationDate: Date.now(),
    category: userData.category,
  });
  blogSave.save().then((result) => {
    res.status(200).json({ success: "true", result: result });
  });
};

export const posts = (req, res) => {
  Blog.find(req.body?.filter)
    .sort({ date: -1 })
    .limit(req.query.sliceSize[1])
    .then((result) => {
      res.status(200).json({ success: "true", result: result });
    });
};
export const findPost = (req, res) => {
  console.log("postenas");
  try {
    Blog.find({
      creator: req.body.creator,

      _id: mongoose.Types.ObjectId(req.body.id),
    }).then((result) => {
      console.log(result);
      if (result[0] == undefined) {
        res.status(400).json({ success: "not found", result: undefined });
      } else {
        console.log(result);
        res.status(200).json({ success: "ok", result: result });
      }
    });
  } catch {
    res.status(400).json({ success: "not found", result: [] });
  }
};

export const tags_get = (req, res) => {
  res.status(200).json({
    success: true,
    result: {
      tags: [
        "Edebiyat",
        "Sözlü Dönem",
        "Divan Edebiyatı",
        "Şiir",
        "Yazarlar",
        "Türk Edebiyat Tarihi",
      ],
    },
  });
};

export const findByFilter = (req, res) => {
  Blog.find(req.body.filter).then((result) => {
    res.status(200).json({ status: "success", result: result });
  });
};

export const update = (req, res) => {
  Blog.findByIdAndUpdate(req.body._id, {
    $push: { comments: req.body.update },
  }).then((result) => {
    res.status(200).json({ status: "success", result: result });
    console.log("post updated: ", result);
  });
};

export const postStats = (req, res) => {
  Blog.findByIdAndUpdate(
    req.body._id,
    { $inc: req.body.updaten },
    { new: true }
  ).then((result) => {
    res.status(200).json({ status: "success", result: result });
    console.log("post has been updaten", result);
  });
};
export const edit = async (req, res) => {
  const userData = JSON.parse(req.body.userData);
  const file = req.file;
  if (!file == null) {
    const uploadResult = await uploadFile(file);
    const blogSave = new Blog({
      title: userData.title,
      content: userData.content,
      tags: userData.tags,
      creator: userData.creator,
      image: uploadResult.Location.toString(),
      creator_avatar: userData.creator_avatar,
      creationDate: Date.now(),
    });
    Blog.findByIdAndUpdate(userData._id, blogSave).then((result) => {
      res.status(200).json({ status: "success", result: result });
      console.log("post updated: ", result);
    });
  } else {
    const blogSave = new Blog({
      title: userData.title,
      content: userData.content,
      tags: userData.tags,
      creator: userData.creator,
      creator_avatar: userData.creator_avatar,
      creationDate: Date.now(),
    });
    Blog.findByIdAndUpdate(userData._id, blogSave).then((result) => {
      res.status(200).json({ status: "success", result: result });
      console.log("post updated: ", result);
    });
  }
};

export const deleteBlog = (req, res) => {
  Blog.findByIdAndDelete(req.body._id).then((result) => {
    console.log("deleted", result);
  });
};
