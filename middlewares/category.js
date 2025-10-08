const Category = require('./../db/category')

const checkCatId = async (categoryName) => {
  const cat = await Category.findOne({ 
   name: { $regex: new RegExp(`^${categoryName.trim()}$`, "i") } 
  });
  return cat || false;
};
module.exports = checkCatId
