//Hello
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');    //Authentican Part
const { connectToMongoDB } = require("./connect");
const cron = require('./utils/scheduler.js')
const userRouter = require("./routes/user");
const userRouterauth = require("./routes/auth");
const trader = require("./routes/trader")    //Authentican Part
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");  //Authentican Part
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const port = 5000;

const corsOptions = {
  origin: 'https://budget-buddy-one-beta.vercel.app',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// connectToMongoDB("mongodb://127.0.0.1:27017/BudgetBuddy").then(() =>
//   console.log("Mongodb connected")
// );

// Use an environment variable for the MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

connectToMongoDB(MONGODB_URI)
  .then(() => {
    console.log("Server started and connected to MongoDB");
    // Start your Express app or other server logic here
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// VERIFY PACKAGE
const nodemailer = require("nodemailer");

const session = require('express-session');


// Set up body parser middleware to parse URL-encoded data


app.use(session({
  secret: process.env.SESSION_SECRET || 'Lavkesh@123',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'none', // Required for cross-site cookie in production
    //maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


//Authentican Part

// app.use("/search", restrictToLoggedinUserOnly, userRouter);// user hai
// app.use("/search", userRouter);// user hai
app.use("/user", userRouterauth);// auth
app.use("/trader", trader)
app.use("/forget-password", userRouter);
app.use("/", checkAuth, userRouter);

// NODEMAILER

// Route to handle OTP verification
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//Start scheduled task of fetching price and sending email  
cron.start();


// comment
// app.get('/authorized', (req, res) => {
//   const uid = req.cookies.uid;
//   if(uid) {
//     return res.status(200).json({
//       status: 'success',
//       message: 'Authorizeddddddd',
//       uid: uid
//     });
//   }
//   else {
//     return res.status(401);
//   }
// })
