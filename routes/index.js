var express = require("express");
var router = express.Router();
const { createUser } = require('../queries/users');
const { login } = require('../queries/users');
const sanitize = require("sanitize-html");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Us", layout: "layout" }); // Make sure 'layout' is the correct name of your layout file without the extension
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register", layout: "layout" }); // Make sure 'layout' is the correct name of your layout file without the extension
});

router.post("/register", createUser);

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login", layout: "layout" }); // Make sure 'layout' is the correct name of your layout file without the extension
});

router.post("/login", login);

module.exports = router;
