const jwt = require("jsonwebtoken");
const secret = "Lavkesh@123";

function setUser(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('JWT Verification failed:', error.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};