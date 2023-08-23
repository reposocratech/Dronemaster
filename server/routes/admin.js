var express = require("express");
var router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const bcrypt = require("bcrypt");

// 1.- Create teacher or admin
// http://localhost:4000/admin/createTeacher
router.post("/createTeacherOrAdmin", adminControllers.createTeacherOrAdmin);

// 2.- View all teachers
// http://localhost:4000/admin/allTeachers
router.get("/allTeachers", adminControllers.selectAllTeachers);

// 3.- View all students
// http://localhost:4000/admin/allStudents
router.get("/allStudents", adminControllers.selectAllStudents);

// 4.- Enable comment
// http://localhost:4000/admin/enableComment/:comment_id
router.put("/enableComment/:comment_id", adminControllers.enableComment);

// 5.- Disable comment
// http://localhost:4000/admin/disableComment/:comment_id
router.post("/disableComment/:comment_id", adminControllers.disableComment);

// 6.- Enable User
// http://localhost:4000/admin/enableUser/:user_id
router.put("/enableUser/:user_id", adminControllers.enableUser);

// 7.- Disable User
// http://localhost:4000/admin/disableUser/:user_id
router.put("/disableUser/:user_id", adminControllers.disableUser);

// 8.- Passed course
// localhost:4000/admin/passedCourse/:user_id
router.put("/passedCourse/:user_id", adminControllers.passedCourse);

// 9.- Not passed course
// localhost:4000/admin/notPassedCourse/:user_id
router.put("/notPassedCourse/:user_id", adminControllers.notPassedCourse);

// 10.- Get All Courses (admin)
// http://localhost:4000/admin/getAllCourses
router.put("/notPassedCourse/:user_id", adminControllers.notPassedCourse);

module.exports = router;
