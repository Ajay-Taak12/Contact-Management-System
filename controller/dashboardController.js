const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const { errorHtml } = require("../constant");

const dashboard = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(401).send(errorHtml.UNAUTHORIZED.html);
    return;
  }
  res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
};

const logout = (req, res) => {
  delete req.cookies['accessToken']

  res.redirect("/api/users/login");
};
module.exports = { dashboard, logout };
