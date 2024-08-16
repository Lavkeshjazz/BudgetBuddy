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
  console.log("CheckAuth - Request headers:", req.headers);
  console.log("CheckAuth - Cookies:", req.cookies);

  const userUid = req.cookies?.uid;
  console.log("CheckAuth - userUid:", userUid);

  if (!userUid) {
      console.log("CheckAuth - No UID cookie found");
      return res.status(401).json({ message: "Please log in first" });
  }

  try {
      const user = getUser(userUid);
      console.log("CheckAuth - Decoded user:", user);

      if (user) {
          req.user = user;
          return next();
      } else {
          console.log("CheckAuth - Invalid token");
          return res.status(401).json({ message: "Invalid session" });
      }
  } catch (err) {
      console.error("CheckAuth - Error:", err);
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