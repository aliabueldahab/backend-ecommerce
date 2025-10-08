const express = require('express'); 
const register = require('../handlers/handel-register');
const regRouter = express.Router();
regRouter.post('/UserRegister' , register)
module.exports = regRouter;