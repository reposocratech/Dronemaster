var express = require("express");
var router = express.Router();
const teacherControllers = require("../controllers/teacherControllers");

// 1.- Get all students (not deleted) of a teacher
// http://localhost:4000/teachers/myStudents/:user_id
router.get("/myStudents/:user_id", teacherControllers.selectMySturdents);

// 1.- Count all students (not deleted) of a course
// http://localhost:4000/teachers/myCourses/studentCounter/:user_id
router.get("/myCourses/studentCounter/:user_id", teacherControllers.countMySturdentsFromCourse);



module.exports = router;
