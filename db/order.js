const mongoose  = require('mongoose')
const orderSchema = new mongoose.Schema({
    date:Date,
    items:Array(any),
    status:number, 
})

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;