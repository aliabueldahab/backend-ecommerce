const Wishlist = require("./../db/wishlist");

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params["id"];

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const wishlist = new Wishlist({
      userId,
      productId,
    });
    const isExist = await Wishlist.findOne({
      userId,
      productId,
    });
    if (isExist) {
      return res.status(409).json({
        message: "item is already in wishlist;",
      });
    }
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({
      message: "Error adding to wishlist",
      error: error.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params["id"];

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const result = await Wishlist.findOneAndDelete({
      userId,
      productId,
    });

    if (!result) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.status(200).json({ message: "Removed from wishlist", result });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

const getAllWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const allWishlist = await Wishlist.find({ userId }).populate("productId");

    if (allWishlist.length === 0) {
      return res.status(404).json({ message: "No items found in wishlist" });
    }

    res.status(200).json(allWishlist);
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({
      message: "Error fetching to wishlist",
      error: error.message,
    });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getAllWishlist };
