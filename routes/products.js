const express = require('express');
let productRout = express.Router()
const authMiddleware = require('../middlwares/auth');
const {addProducts , updateProduct , getAllProducts , deleteProducts , getOneProductById ,  getNewProducts ,  getFeatruredProducts ,getOneFeatruredProducts} = require('./../handlers/handle-products');
productRout.post('/addproducts' , addProducts , authMiddleware)
productRout.get('/getallproducts' , getAllProducts , authMiddleware)
productRout.get('/getfeaturedproducts' , getFeatruredProducts)
productRout.get('/getOnefeaturedproduct/:id' , getOneFeatruredProducts)
productRout.get('/getnewproducts' , getNewProducts)
productRout.get('/getoneproduct/:id' , getOneProductById)
productRout.patch('/updateproduct/:id' , updateProduct , authMiddleware)
productRout.delete('/deleteproduct/:id' , deleteProducts , authMiddleware)

module.exports = productRout;
    