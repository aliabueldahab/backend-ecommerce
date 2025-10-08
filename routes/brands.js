const express = require('express')
const brandRout = express.Router()
const {  addBrand,  getAllBrands, updateBrand, deleteBrand,   getOneBrandByID  } = require("../handlers/handel-brand");

brandRout.route('/getallbrands').get(getAllBrands)
brandRout.route('/getonebrand/:id').get(getAllBrands)
brandRout.route('/addbrands').post(addBrand)
brandRout.route('/editbrands/:id').put(updateBrand)
brandRout.route('/deletebrands/:id').delete(deleteBrand)

module.exports = brandRout;