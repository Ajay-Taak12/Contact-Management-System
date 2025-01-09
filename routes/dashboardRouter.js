const express = require("express");
const { dashboard, logout } = require("../controller/dashboardController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);
router.route("/").get(dashboard);
router.route("/logout").get(logout);

module.exports = router;
