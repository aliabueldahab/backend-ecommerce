const express = require("express");
const {
  addToCart,
  removeFromCart,
  getAllCartProducts,
} = require("../handlers/handel-cart");
const authMiddleware = require("../middlwares/auth");
const cartRoute = express.Router();
cartRoute.post("/addtocart/:productId/:quantity", authMiddleware, addToCart);
cartRoute.delete("/removefromcart/:id", authMiddleware, removeFromCart);
cartRoute.get("/getallcartproducts", authMiddleware, getAllCartProducts);

module.exports = cartRoute;
