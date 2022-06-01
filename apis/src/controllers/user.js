import User from "../models/user.js";
import { uploadFile } from "../utils/s3.js";

export const fetchUsers = (req, res) => {
  console.log(req.body.filter);
  User.find(req.body.filter)
    .select("-password")
    .then((result) => {
      console.log(result);
      res.status(200).json({ success: "true", result: result });
    });
};

export const createUsers = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    posts: [],
    createdVia: req.body.createdVia,
  });
  user.save().then((result) => {
    res.status(200).json({
      success: true,
      result: result,
    });
  });
};

export const updateUsers = (req, res) => {
  User.findOneAndUpdate(req.body.filter, (err, result) => {
    if (err) console.log(err);
    res.status(201).json(result);
  });
};

export const deleteUsers = (req, res) => {
  User.findOneAndDelete({ email: req.body.email }, (err, result) => {
    res.status(201).json(result);
  });
};

export const findUser = (req, res) => {
  User.find({ email: req.body.email }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, err: err });
    } else {
      if (typeof result[0] === "undefined") {
        res.status(404).json({ success: false, result: "undefined" });
      } else {
        res.status(200).json({ success: true, result: result });
      }
    }
  });
};
export const setAvatar = async (req, res) => {
  const file = req.file;

  const uploadResult = await uploadFile(file);
  const userData = JSON.parse(req.body.userData);
  User.findByIdAndUpdate(userData._id, { avatar: uploadResult.Location }).then(
    (result) => {
      res.status(200).json({
        success: true,
        result: result,
      });
    }
  );
};
export const setAvatarUrl = (req, res) => {
  User.findByIdAndUpdate(req.body._id, { avatar: req.body.avatar }).then(
    (result) => {
      res.status(200).json({
        success: true,
        result: result,
      });
    }
  );
};
