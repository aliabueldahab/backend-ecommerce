const Cart = require("./../db/cart");
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.params;
    const userId = req.user.id;


    if (!userId) {
      return res.status(404).json({ message: "user not found" });
    }

    const qty = parseInt(quantity, 10); // parseInt مع base 10
    if (!quantity || isNaN(qty) || qty <= 0) {
      console.log("INVALID QUANTITY PARAM:", quantity);
      return res.status(400).json({ message: "Invalid quantity" });
    }

    console.log("productId:", productId);
    console.log("quantity:", qty);
    console.log("userId:", userId);

    let product = await Cart.findOne({ userId, productId });

if (product) {
  product.quantity = Number(product.quantity || 0) + qty
  await product.save()
  return res.status(200).json({
    message: "Product quantity updated",
    quantity: product.quantity
  })
} else {
  const cartProduct = new Cart({
    userId,
    productId,
    quantity: qty
  })
  await cartProduct.save()
  return res.status(201).json({
    message: "Product added to cart",
    quantity: cartProduct.quantity
  })
}

  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params["id"];
    const result = await Cart.findOneAndDelete({
      userId,
      productId,
    });

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Removed from wishlist", result });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

const getAllCartProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const allCartProducts = await Cart.find({ userId }).populate("productId");

    if (allCartProducts.length === 0) {
      return res.status(404).json({ message: "No items found in cart" });
    }

    res.status(200).json(allCartProducts);
  } catch (error) {
    console.error("cart Error:", error);
    res.status(500).json({
      message: "Error fetching to cart",
      error: error.message,
    });
  }
};

module.exports = { addToCart, removeFromCart, getAllCartProducts };
