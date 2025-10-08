const brands = require('./../db/brands')

const addBrand = async (req , res) => {
  try {
    const model = req.body
    let brand = new brands({
      name: model.name,
    })
    await brand.save()
    res.status(201).json({ brand })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getAllBrands = async (req , res) => {
  try {
    const data = await brands.find()
    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateBrand =  async (req, res) => {
  try {
    const model = req.body
    let id = req.params["id"]
    let brand = await brands.findByIdAndUpdate({ _id: id }, model, {
      new: true,
      overwrite: true,
    })
    res.status(200).json({ brand })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteBrand =  async (req, res) => {
  try {
    let id = req.params["id"]
    let brand = await brands.findByIdAndDelete({_id:id})
    res.status(200).json({ brand })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getOneBrandByID = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(404).json({
        message: 'ID of brand not found'
      })
    }

    const oneBrand = await brands.findById(id)
    if (!oneBrand) {
      return res.status(404).json({
        message: 'Brand not found'
      })
    }

    return res.status(200).json({
      data: oneBrand
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Server error',
      error: err.message
    })
  }
}

module.exports = {
  addBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
  getOneBrandByID
}
