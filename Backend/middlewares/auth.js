const { getUser } = require("../service/auth");
const User=require("../models/user");
const jwt = require('jsonwebtoken');

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  
  //if (userUid) {
    const user = getUser(userUid);
    //if (user) {
     // console.log(req.user);
      req.user = user;
    //}
 // }

  next();
}

async function restrictToSearchRoute(req, res, next) {
  // If user is not logged in, redirect to login page
  if (!req.user) return res.redirect("/login");

  // If user is logged in, allow access to the search route
  next();
}


module.exports = {
  restrictToSearchRoute,
  restrictToLoggedinUserOnly,
  checkAuth,
  //checkUser
};