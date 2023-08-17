var express = require("express");
var router = express.Router();
const studentControllers = require("../controllers/studentControllers");

// 1.- Register student: Gets the information from the register form and creates and new student
// http://localhost:4000/students/registerStudent
router.post("/registerStudent", studentControllers.registerStudent);

module.exports = router;
