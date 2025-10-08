const express = require("express");
const categories = require("./../db/category");
const { addCategory, updateCategory, deleteCategory, getalldata, getOneCategoryByID } = require("../handlers/handel-category");
const catRouter = express.Router();

catRouter.get('/' , getalldata)
catRouter.get('/:id' , getOneCategoryByID)
catRouter.post("/addcategory",addCategory);
catRouter.put("/:id", updateCategory );
catRouter.delete('/:id' , deleteCategory)

module.exports = catRouter;
