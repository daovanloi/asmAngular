import express from "express";
import {
  signin,
  signup,
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getAllUser);
router.get("/users/:id", getUser);
router.patch("/users/update/:id", updateUser);
router.delete("/users/:id", deleteUser);
export default router;
