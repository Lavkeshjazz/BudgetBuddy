//Hello
const express = require("express");
const path = require("path");
const axios = require("axios");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');    //Authentican Part
const { connectToMongoDB } = require("./connect");

const userRouter = require("./routes/user");
const userRouterauth = require("./routes/auth");      //Authentican Part
const {restrictToLoggedinUserOnly, checkAuth}= require("./middlewares/auth");  //Authentican Part

const app = express();
const port = 3000;
connectToMongoDB("mongodb://127.0.0.1:27017/BudgetBuddy").then(()=>
console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  
app.use(cookieParser());              //Authentican Part

//test 1

//app.use("/", checkAuth,userRouter);         
//app.use('*', checkUser);
app.use("/", checkAuth,userRouter);   
app.use("/search", restrictToLoggedinUserOnly,userRouter);
app.use("/user", userRouterauth);

// test 2 
// function restrictToLoggedinUserOnlyFromRoot(req, res, next) {
//   if (req.path.startsWith("/search") && !req.user) {
//     return res.redirect("/login"); // Redirect to login if user is not logged in
//   }
//   next();
// }

// Apply route-specific middleware
// app.use("/", restrictToLoggedinUserOnly, userRouter);
// app.use("/search",checkAuth,restrictToLoggedinUserOnlyFromRoot, userRouter);
// app.use("/user", userRouterauth);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  