const express = require('express');
const catRouter = require('./routes/categories');
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");

// *** الخطوة 1: تحميل المتغيرات أولاً وبشكل قاطع ***
dotenv.config({ path: "./config.env" }); 

// *** الخطوة 2: استدعاء Passport بعد التأكد من تحميل المتغيرات ***
const passport = require("./config/passport");
const googrouter = require("./routes/google")
const cors = require('cors');

const brandRout = require('./routes/brands');
const productRout = require('./routes/products');
const regRouter = require('./routes/register');
const Loginroute = require('./routes/login');
const wishrouter = require('./routes/wishlist');
const cartRoute = require('./routes/cart');

const app = express(); 
// استخدم المنفذ الذي يوفره Railway أو 3000 للتطوير المحلي
const port = process.env.PORT || 3000; 

app.use(cors())
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully.");
  })
  .catch((err) => console.error("Error connecting to database:", err));

const test =(req , res)=>{
    res.json({
        Message:'hello from test'
    })
}

// *** الخطوة 3: تهيئة Passport و Session في الترتيب الصحيح ***
app.use(
  session({
    secret: process.env.JWT_SECRET || "yourSecretKey", // يفضل استخدام JWT_SECRET كسر
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // تأمين الكوكيز في الإنتاج
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use('/category' , catRouter)
app.use('/brands' , brandRout)
app.use('/products' , productRout)
app.use('/Users' , regRouter)
app.use('/Users' , Loginroute )
app.use('/wishlist' , wishrouter)
app.use('/cart', cartRoute)
app.get('/', test);
app.use('/auth' , googrouter)

app.listen(port , ()=> {
    console.log(`Server running on port ${port}`);
})
