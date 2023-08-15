var express = require("express");
var router = express.Router();
const teacherControllers = require("../controllers/teacherControllers");

// ---------------------------------------------------------------------
// 1.- Show teacher course (profile)
// localhost:4000/teachers/oneTeacher/showCourses/:id
router.get("/oneTeacher/showCourses/:id", teacherControllers.showCourses);

module.exports = router;
