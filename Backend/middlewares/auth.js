const { getUser } = require("../service/auth");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function restrictToLoggedinUserOnly(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new Error("Not logged in. Please log in to continue");
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      throw new Error("Not logged in. Please log in to continue");
    }

    const user = getUser(token); // Make sure getUser verifies token
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const user = await getUser(token); // Replace with token verification logic
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
