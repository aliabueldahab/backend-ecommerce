const mongoose  = require('mongoose')
const userSchema = new mongoose.Schema({
    name:String ,
      email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
   googleId: { type: String },

})

const User = mongoose.model("users", userSchema);
module.exports = User;