const jwt = require("jsonwebtoken");
// Import the User model to interact with the user collection in the database
const User = require("../models/user");
// Middleware function to authenticate the token
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
// Retrieve the token from the cookies
  if (!token) {
    return res.status(401).send("Access Denied");
  }
// Verify the token using the secret key
  try {
    const verified = jwt.verify(token, "very_secret");
    req.user = await User.findById(verified.userId).lean(); // Find the user by ID from the verified token payload and add the user data to the request object
    next();
  } catch (error) {
    console.log("Authentication Error: ", error);
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticateToken;
