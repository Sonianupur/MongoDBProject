const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// =========================================================
// Sign Up New User
// =========================================================
router.post("/signup", async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // Check if the email already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email already exists." });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// =========================================================
// Log In New User
// =========================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email." });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "very_secret", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24000 * 60 * 60,
    });

    res
      .status(200)
      .json({ user: { fname: user?.fname, lname: user?.lname }, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token", {
    path: "/",
    domain: "localhost",
    expires: new Date(0),
  });
  res.status(200).json({ message: "OK" });
});

module.exports = router;
