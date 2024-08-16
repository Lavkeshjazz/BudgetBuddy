const { getUser } = require("../service/auth");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

async function restrictToLoggedinUserOnly(req, res, next) {
  try {
    const userUid = req.cookies?.uid;
    if (!userUid) {
      throw new Error("Not logged in. Please log in to continue");
    }
    const user = await getUser(userUid); // Use await if getUser is async
    if (!user) {
      throw new Error("Not logged in. Please log in to continue");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: err.message });
  }
}


async function checkAuth(req, res, next) {
  try {
    const userUid = req.cookies?.uid;
    console.log("Request Cookies:", req.cookies);

    const user = await getUser(userUid); // Use await if getUser is async
    console.log("CheckAuth working properly=", user);

    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Please log in first" });
    }
  } catch (err) {
    console.error("Error in checkAuth:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
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