const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
connectDb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/ usersRouter"));
app.use("/api/dashboard", require("./routes/dashboardRouter"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`I am inside the server with port number ${port}`);
});
