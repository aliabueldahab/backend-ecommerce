const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  shotDescription: String,
  description: String,
  images: Array(String),
  price: Number,
  discount: Number,
  isfeatured: Boolean,
  isnew: Boolean,
  categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
});

const product = mongoose.model("products", productSchema);
module.exports = product;
