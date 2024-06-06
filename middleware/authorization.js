const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, "very_secret");
    req.user = await User.findById(verified.userId).lean();
    next();
  } catch (error) {
    console.log("Authentication Error: ", error);
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticateToken;
