const express = require("express");
var bodyParser = require('body-parser');
const axios = require("axios");

const { addUrlinDatabase,deleteDatabase,add_new_data_in_existing_database,get_products,open_detailed_page,fetchPrice,get_curItem, products_by_demand} = require("../controller/user");
const { checkAuth, restrictToLoggedinUserOnly} = require("../middlewares/auth");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
// router.get("/", defaultPage);
// router.post("/search", restrictToLoggedinUserOnly,addUrlinDatabase);
router.post("/addUrlinDatabase", restrictToLoggedinUserOnly,addUrlinDatabase);
router.post("/delete", deleteDatabase);
router.post("/add", add_new_data_in_existing_database);
router.post("/details",open_detailed_page);
router.get("/getallproducts",checkAuth,get_products);
router.post("/getcurItem",checkAuth,get_curItem);
router.get("/demandItems", checkAuth , products_by_demand);
router.post("/searchproduct", restrictToLoggedinUserOnly, async(req,res,next)=> {
    try{
    const product = await fetchPrice(req.body.ProductURL);
    return res.json(product);
    }catch(error){
        console.error("Error in /searchproduct route:", error);
        if (error instanceof AppError || error instanceof FetchError) {
            return res.status(error.statusCode).json(error.serialize());
        } else {
            return res.status(500).json({ statusCode: 500, message: error.message });
        }
    }
});

router.get("/search",(req,res)=>{
    return res.render("searchpage");
})

//Authentication Part   
router.get("/signup", (req,res)=>{
    return res.render("signup");
});

//Signout
router.get("/logout", (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("uid", {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        // If you're using express-session
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    console.error("Session destruction error:", err);
                }
            });
        }

        // Send a response to clear client-side state
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Error during logout" });
    }
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
router.get("/verify",restrictToLoggedinUserOnly,(req,res)=>{
    console.log("hello i m verify from user");
    return res.json({status:true, message: "authorized"})
    // return res.render("forget.ejs")
})


const { mailT, verify } = require("../controller/trader"); // Import the functions from the trader controller
const AppError = require("../errors/AppError");
const FetchError = require("../errors/FetchError");

router.post("/mail2", mailT); // Route to handle mail POST requests
router.post("/verify2", verify); // Route to handle verify POST requests

``
module.exports = router;
