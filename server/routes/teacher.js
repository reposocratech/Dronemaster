var express = require("express");
var router = express.Router();
const teacherControllers = require("../controllers/teacherControllers");

// 1.- Get all students (not deleted) of a teacher
// http://localhost:4000/teachers/myStudents/:user_id
router.get("/myStudents/:user_id", teacherControllers.selectMyStudents);

// 2.- Count all students (not deleted) of a course
// http://localhost:4000/teachers/myCourses/studentCounter/:user_id
router.get("/myCourses/studentCounter/:user_id", teacherControllers.countMyStudentsFromCourse);

// 3.- Select all students (not deleted and type 0), user_starting date and user status (STATS) of a course
// http://localhost:4000/teachers/myCourses/students/:course_id
router.get("/myCourses/students/:course_id", teacherControllers.selectMyStudentsFromCourse);

// 4.- Select all units, lessons and resource from a course
// http://localhost:4000/teachers/myCourses/courseInfo/:course_id
router.get("/myCourses/courseInfo/:course_id", teacherControllers.selectMyCourseInfo);

// 5.- Select all inscription Dates of a course
// http://localhost:4000/teachers/myCourses/inscriptionDates/:course_id
router.get("/myCourses/inscriptionDates/:course_id", teacherControllers.selectMyCourseInsciptions);

module.exports = router;
