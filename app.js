require('dotenv').config();

var express = require("express");
const mustacheExpress = require("mustache-express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));


app.use(express.json());

app.use((req, res, next) => {
  const originalRender = res.render;
  res.render = function (viewName, options = {}, callback) {
    // Render the view first
    originalRender.call(this, viewName, options, (err, html) => {
      if (err) {
        return callback(err);
      }
      // Then, render the layout with the view's HTML
      originalRender.call(this, "layout", { ...options, body: html }, callback);
    });
  };
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);


app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

module.exports = app;
