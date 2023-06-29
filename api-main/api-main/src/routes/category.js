import express from "express";
import axios from "axios";

import { checkPermission } from "../middlewares/checkPermission.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryId,
  updateCategory,
} from "../controllers/category";
const router = express.Router();
// const API_URI = "http://localhost:3000/products";
router.get("/categories", getAllCategory);
router.get("/categories/:id", getCategoryId);
router.post("/categories/add", checkPermission, createCategory);
router.patch("/categories/update/:id", checkPermission, updateCategory);
router.delete("/categories/:id", checkPermission, deleteCategory);
export default router;
