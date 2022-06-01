import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer({ dest: "uploads/" });
import * as userController from "../controllers/user.js";

router.post("/fetch", userController.fetchUsers);
router.post("/create", userController.createUsers);
router.post("/update", userController.updateUsers);
router.get("/delete", userController.deleteUsers);
router.post("/find", userController.findUser);
router.post("/setavatar", upload.single("reqfile"), userController.setAvatar);
router.post("/setavatarurl", userController.setAvatarUrl);

export default router;
