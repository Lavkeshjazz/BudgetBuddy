const express = require("express");
const router = express.Router();
const { mailT, verify, handleUserSignup2 } = require("../controller/trader"); // Import the functions from the trader controller
const {products_by_demand,products_by_demand_least} = require("../controller/user");
router.post("/mail", handleUserSignup2,mailT); // Route to handle mail POST requests
router.post("/verify", verify); // Route to handle verify POST requests
router.get("/products_by_demand", products_by_demand)
router.get("/products_by_demand_least",products_by_demand_least)

// Route to render the verifyemail view
router.get("/mail", (req, res) => {
    return res.render("verifyemail");
});

// Route to render the verify view

module.exports = router;