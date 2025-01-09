const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/usersModels");
const path = require("path");

// Fetching Register Page
const registerPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/register.html"));
};

// User Register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const checkingUser = await User.findOne({ email });

  if (checkingUser) {
    res.status(400);
    throw new Error("User all ready register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Hashed Password", hashedPassword);

  const createUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json(createUser);
});

// Fetching Login Page

const loginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/login.html"));
};
// User Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password is Mandatory");
  }
  const userData = await User.findOne({ email });

  if (userData && (await bcrypt.compare(password, userData.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userData.username,
          email: userData.email,
          id: userData.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    req.session.user = {
      username: userData.username,
      email: userData.email,
      id: userData.id,
    };

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    });
    res.redirect("/api/dashboard");
  } else {
    res.status(401);
    throw new Error("Email or Password not valid");
  }
});

// Current User
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  loginPage,
  registerPage,
};
