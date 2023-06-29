import joi from "joi";
export const signupSchema = joi.object({
  name: joi.string(),

  email: joi.string().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
    "string.required": "Email bắt buộc nhập",
  }),
  password: joi.string().required().min(6).messages({
    "string.empty": "Password không được để trống",
    "any.required": "Password bắt buộc nhập",
    "string.min": "Password phải có ít nhất {#limit} kí tự",
  }),
  image: joi.string(),
  confirmPass: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Password không khớp",
    "string.empty": "Confirm Password không được để trống",
    "any.required": "Confirm Password bắt buộc nhập",
  }),
});
export const updateSignupSchema = joi.object({
  name: joi.string(),

  email: joi.string().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
    "string.required": "Email bắt buộc nhập",
  }),
  password: joi.string().required().min(6).messages({
    "string.empty": "Password không được để trống",
    "any.required": "Password bắt buộc nhập",
    "string.min": "Password phải có ít nhất {#limit} kí tự",
  }),
  image: joi.string(),
  confirmPass: joi.string().valid(joi.ref("password")).messages({
    "any.only": "Password không khớp",
    "string.empty": "Confirm Password không được để trống",
    "any.required": "Confirm Password bắt buộc nhập",
  }),
});
export const signinSchema = joi.object({
  email: joi.string().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
    "any.required": "Email bắt buộc nhập",
  }),
  password: joi.string().required().min(6).messages({
    "string.empty": "Password không được để trống",
    "any.required": "Password bắt buộc nhập",
    "string.min": "Password phải có ít nhất {#limit} kí tự",
  }),
});
