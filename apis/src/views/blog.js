import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer({ dest: "uploads/" });
//const upload = multer({ storage: multer.memoryStorage() });

import * as blogController from "../controllers/blog.js";

router.get("/posts", blogController.posts);

router.post("/createpost", upload.single("reqfile"), blogController.createPost);

router.get("/tags", blogController.tags_get);

router.post("/posts", blogController.findPost);

router.post("/findpostbyfilter", blogController.findByFilter);

router.post("/updatepost", blogController.update);

router.post("/editpost", blogController.edit);

router.post("/deletepost", blogController.deleteBlog);

router.post("/poststats", blogController.postStats);
//router.post("/createpost", blogController.createPost);

export default router;
