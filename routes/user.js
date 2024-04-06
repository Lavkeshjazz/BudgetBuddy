const express = require("express");
var bodyParser = require('body-parser');
const axios = require("axios");

const { defaultPage, searchResult,checkforemail,resetPassword,forgotPassword,renderResetPassword, addUrlinDatabase,deleteDatabase,add_new_data_in_existing_database,open_detailed_page} = require("../controller/user");
const { restrictToSearchRoute, checkAuth, restrictToLoggedinUserOnly} = require("../middlewares/auth");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.get("/", defaultPage);
router.post("/search", restrictToLoggedinUserOnly,addUrlinDatabase,searchResult);
router.post("/delete", deleteDatabase);
router.post("/add", add_new_data_in_existing_database);
router.post("/details",open_detailed_page);


router.get("/search",(req,res)=>{
    return res.render("searchpage");
})

//Authentication Part   
router.get("/signup", (req,res)=>{
    return res.render("signup");
});

//Signout
router.get("/logout",(req,res)=>{
    res.cookie("uid",'',{maxAge : 1});
    return res.redirect('/');     
});

router.get("/login", (req,res)=>{
    return res.render("login");
});

router.get("/forget-password",(req,res)=>{
   return res.render("forget.ejs");
})

router.get("/mail",(req,res)=>{
    return res.render("verifyemail");
})
router.get("/verify",(req,res)=>{
    console.log("hello i m verify from user");
    return res.render("forget.ejs")
})


const { mailT, verify } = require("../controller/trader"); // Import the functions from the trader controller

router.post("/mail2", mailT); // Route to handle mail POST requests
router.post("/verify2", verify); // Route to handle verify POST requests

``
module.exports = router;