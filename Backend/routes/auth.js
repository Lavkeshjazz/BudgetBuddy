const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controller/auth");
const { forgotPassword, resetPassword ,renderResetPassword} = require("../controller/user");
const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.post('/forgotPassword',forgotPassword)
router.get('/resetPassword/:token',renderResetPassword)
router.patch('/resetPassword/:token',resetPassword)
module.exports = router;