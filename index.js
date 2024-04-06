//Hello
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');    //Authentican Part
const { connectToMongoDB } = require("./connect");

const userRouter = require("./routes/user");
const userRouterauth = require("./routes/auth");  
const trader = require("./routes/trader")    //Authentican Part
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
app.use(cookieParser());       


// VERIFY PACKAGE
const nodemailer = require("nodemailer");

const session = require('express-session');


// Set up body parser middleware to parse URL-encoded data


// Set up session middleware
app.use(session({
    secret: 'secret', // Secret key to sign the session ID cookie
    resave: false,
    saveUninitialized: true
}));



//Authentican Part

app.use("/", checkAuth,userRouter);   
app.use("/search", restrictToLoggedinUserOnly,userRouter);// user hai
app.use("/user", userRouterauth);// auth
app.use("/trader",trader)
app.use("/forget-password", userRouter);



 // NODEMAILER

// Route to handle OTP verification























app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  