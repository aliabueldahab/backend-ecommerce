const categories = require('./../db/category')
const addCategory = async (req , res) => {
      try {
    const model = req.body;
    let category = new categories({
      name: model.name,
    });
    await category.save();
    res.status(201).json({ category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getalldata = async(req , res) => {
  const data = await categories.find();
  res.status(200).json({
    
      data  
  
  })
} 

const updateCategory =  async (req, res) => {
  try {
    const model = req.body;
    let id = req.params["id"];
    let category = await categories.findByIdAndUpdate({ _id: id }, model, {
      new: true,
      overwrite: true,
    });
    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteCategory =  async (req, res) => {
  try {
    let id = req.params["id"];
    let category = await categories.findByIdAndDelete({_id:id});
    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getOneCategoryByID = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: 'ID of category not found'
      });
    }

    const oneCategory = await categories.findById(id);
    if (!oneCategory) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

return res.status(200).json({
  data: oneCategory
});
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

module.exports = {
  addCategory,
  getalldata,
  updateCategory,
  deleteCategory,
  getOneCategoryByID

};