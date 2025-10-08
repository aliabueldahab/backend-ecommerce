const VerifyUser = require("../services/login-service");
const user = require("./../db/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (( !email || !password)) {
      return res.status(404).json({
        message: "all fildes are required",
      });
    }

    const checkUser =await VerifyUser( password, email);
    if (!checkUser) {
      return res.status(404).json({
        error: "Email or password is incorrect",
      }); 
    }

    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email, isAdmin: checkUser.isAdmin },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "5h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        isAdmin:checkUser.isAdmin
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

module.exports = login;
