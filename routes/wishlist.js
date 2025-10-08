const express = require('express');
const { addToWishlist, removeFromWishlist, getAllWishlist } = require('../handlers/wishlist-handler');
const authMiddleware = require('../middlwares/auth');
const wishrouter = express.Router(); 

wishrouter.post('/addtowishlist/:id' , authMiddleware , addToWishlist)
wishrouter.delete('/removefromwishlist/:id' , authMiddleware ,removeFromWishlist)
wishrouter.get('/getallwishlist' ,  authMiddleware ,getAllWishlist)


module.exports = wishrouter;