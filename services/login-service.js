const user = require("./../db/user");
const bcrypt = require("bcryptjs");

const VerifyUser = async ( password, email) => {
  const User = await user.findOne({ email });
  if (!User) {
    return false;
  }

  if (email != User.email) {
    return false;
  }



  const isMatchPassword = await bcrypt.compare(password, User.password);
  if (!isMatchPassword) {
    return false;
  }

    return User; 
};


module.exports =  VerifyUser