const user = require("./../db/user");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(403).json({ message: "all fildes are required" });
    }
    const isExistUser = await user.findOne({email})
    if(isExistUser){
         return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      name,
      email,
      password:hashedPassword,
    });
   
    await newUser.save();

    res.status(200).json({
      message: "user created",
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = register;
