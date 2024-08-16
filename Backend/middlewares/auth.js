const { getUser } = require("../service/auth");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

async function restrictToLoggedinUserOnly(req, res, next) {
  try {
    const userUid = req.cookies?.uid;
    if (!userUid) {
      throw Error("Not logged in. Please log in to continue");
    }
    const user = getUser(userUid);
    if (!user) {
      throw Error("Not logged in. Please log in to continue");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: err.message });
  }
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log("req cokkies=")
  console.log(req.cookies);
  //if (userUid) {
  const user = getUser(userUid);
  console.log("CheckAuth working properly=");
  console.log(user);
  if (user) {
    // console.log(req.user);
    req.user = user;
    return next();
  }
  // }
  return res.redirect('/login');
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