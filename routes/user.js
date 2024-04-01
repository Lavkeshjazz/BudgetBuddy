const express = require("express");
var bodyParser = require('body-parser');
const axios = require("axios");
//const { defaultPage, searchResult,checkforemail,resetPassword,forgotPassword,renderResetPassword, addUrlinDatabase} = require("../controller/user");


const { defaultPage, searchResult,checkforemail,resetPassword,forgotPassword,renderResetPassword, addUrlinDatabase,deleteDatabase,add_new_data_in_existing_database} = require("../controller/user");
const { restrictToSearchRoute, checkAuth, restrictToLoggedinUserOnly} = require("../middlewares/auth");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.get("/", defaultPage);
router.post("/search", restrictToLoggedinUserOnly,addUrlinDatabase,searchResult);
router.post("/delete", deleteDatabase);
router.post("/add", add_new_data_in_existing_database);

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
module.exports = router;