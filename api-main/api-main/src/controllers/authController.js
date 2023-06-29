import userModel from "../models/userModel";
import {
  signupSchema,
  signinSchema,
  updateSignupSchema,
} from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      // console.log(error);
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      image,
      password: hashedPass,
    });
    const token = jwt.sign({ _id: user._id }, "duydeptrai", {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res.status(201).json({
      message: "User created successfully",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(401).json({
        message: errors,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Tài khoản này không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Thông tin tài khoản mật khẩu không chính xác",
      });
    }
    const token = jwt.sign({ _id: user._id }, "duydeptrai", {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res.status(201).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const getAllUser = async (req, res) => {
  // console.log(`${API_URI}/products`);
  try {
    // const { data: product } = await axios.get(`${API_URI}/products`);
    const user = await userModel.find();
    if (user.length === 0) {
      return res.json({
        message: "Không có người dùng nào",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    const { error } = updateSignupSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      // console.log(error);
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        image,
        password: hashedPass,
      },
      {
        new: true,
      }
    );
    const token = jwt.sign({ _id: user._id }, "duydeptrai", {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res.status(201).json({
      message: "User updated successfully",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa user thành công",
      user,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm nào",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
