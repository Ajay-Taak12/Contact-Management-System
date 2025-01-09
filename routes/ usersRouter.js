const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  registerUser,
  loginUser,
  currentUser,
  loginPage,
  registerPage,
} = require("../controller/usersController");

const router = express.Router();

router.route("/register").post(registerUser).get(registerPage);
router.get("/current", validateToken, currentUser);
router.route("/login").post(loginUser).get(loginPage);

module.exports = router;
