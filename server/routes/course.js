var express = require("express");
var router = express.Router();
const multer = require("../middleware/multer");
const courseControllers = require("../controllers/courseControllers");
const verify = require("../middleware/verify");

// 1. Create a course by admin
// http://localhost:4000/courses/createCourse/:user_id
router.post("/createCourse/:user_id", courseControllers.createCourse);

// 2. Enable Course
// http://localhost:4000/courses/enableCourse/:course_id
router.put("/enableCourse/:course_id", courseControllers.enableCourse);

// 3. Disable Course
// http://localhost:4000/courses/disableCourse/:course_id
router.put(
  "/disableCourse/:course_id",
  /* verify, */ courseControllers.disableCourse
);

// 4.- All courses
// http://localhost:4000/courses/allCourses
router.get("/allCourses", courseControllers.selectAllCourses);

// 5.- Edit course
// http://localhost:4000/courses/editCourse/:course_id
router.put("/editCourse/:course_id", courseControllers.editCourse);

// 6.- Create course category
// http://localhost:4000/courses/createCategory
router.post("/createCategory/", courseControllers.createCategory);

module.exports = router;
