const express = require('express');
const login = require('../handlers/handel-login');
const Loginroute = express.Router(); 
Loginroute.post('/UserLogin' , login) 
module.exports = Loginroute;