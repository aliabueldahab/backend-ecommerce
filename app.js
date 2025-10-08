const express = require('express');
const catRouter = require('./routes/categories');
const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("./config/passport");
const googrouter = require("./routes/google")
const cors = require('cors');
const dotenv = require("dotenv");
const brandRout = require('./routes/brands');
const productRout = require('./routes/products');
const regRouter = require('./routes/register');
const Loginroute = require('./routes/login');
const wishrouter = require('./routes/wishlist');
const cartRoute = require('./routes/cart');
dotenv.config({ path: "./config.env" });
const app = express(); 
const port = 3000;
app.use(cors())
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => console.error("err", err));

const test =(req , res)=>{
    res.json({
        Message:'hello from test'
    })
}


// app.use(
//   session({
//     secret: "yourSecretKey",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json())
app.use('/category' , catRouter)
app.use('/brands' , brandRout)
app.use('/products' , productRout)
app.use('/Users' , regRouter)
app.use('/Users' , Loginroute )
app.use('/wishlist' , wishrouter)
app.use('/cart', cartRoute)
app.get('/', test);
// app.use('/auth' , googrouter)

app.listen(port , ()=> {
    console.log('server running');
})
