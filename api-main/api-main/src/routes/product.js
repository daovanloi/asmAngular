import express from "express";
import axios from "axios";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductId,
  updateProduct,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();
// const API_URI = "http://localhost:3000/products";
router.get("/products", getAllProducts);
router.get("/products/:id", getProductId);
router.post("/products/add", checkPermission, addProduct);
router.patch("/products/update/:id", checkPermission, updateProduct);
router.delete("/products/:id", checkPermission, deleteProduct);
export default router;
