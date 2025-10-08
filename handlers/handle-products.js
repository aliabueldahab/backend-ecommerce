const products = require("./../db/product");
const checkCatId = require("./../middlewares/category");
const addProducts = async (req, res) => {
  try {
    const model = req.body;

    const isValidCat = await checkCatId(model.category);
    if (!isValidCat) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    let product = new products({
      ...model,
      categoryId: isValidCat._id,
    });

    await product.save();
    product = await product.populate("categoryId", "name");
    res.status(201).json({ message: "product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  let AllBrands = await products.find().populate("categoryId", "name");
  if (!AllBrands) {
    return res.status(404).json({ message: "no products is found" });
  }

  res.status(200).json(AllBrands);
};

const deleteProducts = async (req, res) => {
  try {
    let id = req.params["id"];
    if (!id) {
      return res.status(404).json({ message: "id not found" });
    }
    let product = await products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "item not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const model = req.body;
    let id = req.params["id"];
    if (!id) {
      return res.status(404).json({ message: "id not found" });
    }
    let product = await products.findByIdAndUpdate({ _id: id }, model, {
      new: true,
      overwrite: true,
    });
    if (!product) {
      return res.status(404).json({ message: "item not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneProductById = async (req, res) => {
  try {
    let id = req.params["id"];
    if (!id) {
      return res.status(404).json({ message: "id not found" });
    }
    let oneProduct = await products.findById(id).populate("categoryId", "name");
    if (!oneProduct) {
      return res.status(404).json({ message: "item not found" });
    }

    res.status(200).json({
      oneProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeatruredProducts = async (req, res) => {
  try {
    const Products = await products.find({
      isfeatured: true,
    });
    if (!Products) {
      return res.status(404).json({
        message: "there is no featured products",
      });
    }

    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOneFeatruredProducts = async (req, res) => {
  try {
    const id = req.params['id']
    const Product = await products.findOne({
      _id:id,
      isfeatured: true,
    });
    if (!Product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getNewProducts = async (req, res) => {
  try {
    const Products = await products.find({
      isnew: true,
    });
    if (!Products) {
      return res.status(404).json({
        message: "there is no featured products",
      });
    }

    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

module.exports = {
  addProducts,
  updateProduct,
  deleteProducts,
  getOneProductById,
  getAllProducts,
  getFeatruredProducts, 
  getNewProducts, 
  getOneFeatruredProducts
};
