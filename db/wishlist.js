const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true }
});

const Wishlist = mongoose.model("whishlist", wishlistSchema);
module.exports = Wishlist;
