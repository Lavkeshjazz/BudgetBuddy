const express = require("express");
var bodyParser = require('body-parser');
const axios = require("axios");

const { defaultPage, searchResult} = require("../controller/user");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.get("/", defaultPage);
router.post("/search", searchResult);

//Authentication Part
router.get("/signup", (req,res)=>{
    return res.render("signup");
});

router.get("/login", (req,res)=>{
    return res.render("login");
});

module.exports = router;