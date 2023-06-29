import Category from "../models/category";
import Product from "../models/product";
import joi from "joi";
const categorytSchema = joi.object({
  name: joi.string().required(),
});
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(400).json({
        message: "Không có danh mục nào",
      });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getCategoryId = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    // console.log(req.params.id);

    if (!category) {
      return res.status(400).json({
        message: "Không tìm thấy danh mục",
      });
    }

    // const products = await Product.find({ categoryId: req.params.id });
    // console.log("products", products);
    return res.status(200).json(
      category
      //   products,
    );
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
    });
  }
};
export const createCategory = async (req, res) => {
  try {
    const { error } = categorytSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const category = await Category.create(req.body);
    if (!category) {
      return res.status(400).json({
        message: "Không thể tạo thêm danh mục",
      });
    }
    return res.status(201).json({
      message: "Tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(400).json({
        message: "Không update được",
      });
    }
    return res.status(201).json({
      message: "Update thành công",
      data: category,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Xóa thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
