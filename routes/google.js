// const express = require("express");
// const passport = require("../config/passport"); // المسار حسب مشروعك
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// // تسجيل الدخول بجوجل
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // callback بعد تسجيل الدخول
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   (req, res) => {
//     const user = req.user;
//     if (!user)
//       return res.status(401).json({ message: "Authentication failed" });

//     try {
//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//           process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//       );
//       res.redirect(`http://localhost:4200/?token=${token}`);
//     } catch (err) {
//       console.error("JWT creation error:", err);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }
// );

// module.exports = router;
