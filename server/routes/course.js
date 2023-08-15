var express = require("express");
var router = express.Router();
const multer = require("../middleware/multer");
const courseControllers = require("../controllers/courseControllers");
const verify = require("../middleware/verify");


// ---------------------------------------------------------------------------
// 1.- Add commentary
// localhost:4000/courses/addCommentary/:user_id/:course_id/:unit_id/:lesson_id
router.post(
  "/addCommentary/:user_id/:course_id/:unit_id/:lesson_id",
  courseControllers.addComentary
);

// ---------------------------------------------------------------------------
// 1.- Response commentary
// localhost:4000/courses/responseCommentary/:user_id/:course_id/:unit_id/:lesson_id/:parent_comment_id
router.post(
  "/responseCommentary/:user_id/:course_id/:unit_id/:lesson_id/:parent_comment_id",
  courseControllers.responseComentary
);


//1. Create a course by student
//http://localhost:4000/courses/createCourse/:user_id
router.post("/createCourse/:user_id", courseControllers.createCourse);


//2. Enable Course
//http://localhost:4000/courses/enableCourse/:course_id
router.put("/enableCourse/:course_id", courseControllers.enableCourse);

//3. Disable Course
//http://localhost:4000/courses/disableCourse/:course_id
router.put("/disableCourse/:course_id",/* verify, */ courseControllers.disableCourse);



/* GET courses listing. */
router.get("/todosCursos", courseControllers.selectAllCourses);


module.exports = router;
