var express = require("express");
var router = express.Router();
const studentControllers = require("../controllers/studentControllers");

// 1.- Register student: Gets the information from the register form and creates and new student
// http://localhost:4000/students/registerStudent
router.post("/registerStudent", studentControllers.registerStudent);

// 2.- Get course units
// http://localhost:4000/students/units/course_id
router.get("/units/:course_id", studentControllers.getCourseUnits);

// 3.- Get course units
// http://localhost:4000/students/lessons/:course_id
router.get("/lessons/:course_id", studentControllers.getUnitLessons);

module.exports = router;
