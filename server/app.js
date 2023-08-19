var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors")
const router = express.Router();
var cors = require('cors')

var adminRouter = require("./routes/admin");
var teacherRouter = require("./routes/teacher");
var studentRouter = require("./routes/student");
var courseRouter = require("./routes/course");
var commonRouter = require("./routes/common");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/admin", adminRouter);
app.use("/teachers", teacherRouter);
app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/", commonRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
