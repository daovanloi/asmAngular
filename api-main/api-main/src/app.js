// import http from "http";
// // const http = require("http");
// const server = http.createServer(function (req, res) {
//   // console.log("Request reveived", req);
//   const api = [
//     {
//       id: 1,
//       productName: "Duy Đẹp trai",
//     },
//     {
//       id: 2,
//       productName: "Duong",
//     },
//   ];
//   if (req.url === "/") {
//     res.end(`<h1>Welcome</h1>`);
//     res.setHeader(`Content-Type`, `text/html`);
//   }
//   if (req.url === "/api/products") {
//     res.setHeader(`Content-Type`, `application/json`);
//     res.end(JSON.stringify(api));
//   }
// });

// server.listen(8080, function () {
//   console.log("Server running on port 8080");
// });

// //   npm init -y
// //  npm install nodemon -g
// // truy cap package.json
// //

import express from "express";
import routerProduct from "./routes/product";
const app = express();
import mongoose from "mongoose";
import routerUser from "./routes/auth";
import cors from "cors";
import categoryRouter from "./routes/category";
// import { getAllCate } from "./controllers/category";
// import newSchma from "./models/product";
app.use(express.json());
// app.get("/", function (req, res) {
//   console.log("Home Page");
// });
app.use(cors());
app.use("/api", routerProduct);
app.use("/api", routerUser);
app.use("/api", categoryRouter);
// Connect to db
mongoose
  .connect("mongodb://127.0.0.1:27017/asm1")
  .then(() => {
    console.log("Ok ");
  })
  .catch((error) => {
    console.log("loi ket noi");
  });

export const viteNodeApp = app;
// app.post("/api/products", async function (req, res) {
//   const body = req.body;
//   const response = await fetch(
//     "https://63f5d86059c944921f67a58c.mockapi.io/products",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }
//   );
//   const product = await response.json();

//   res.json({
//     message: "Thêm sản phẩm thành công",
//     data: product,
//   });
// });
// app.listen(8000, function () {
//   console.log("Server runing on port 8000");
// });
