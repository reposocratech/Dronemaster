var express = require("express");
var router = express.Router();

const commonControllers = require("../controllers/commonControllers");

// 1.- login user
// http://localhost:4000/login
router.post("/login", commonControllers.login);

//3.- Counter which includes total of teachers, courses and students
//http://localhost:4000/counter
router.get("/counter", commonControllers.viewCounter);

// 4.- Edit user info
// http://localhost:4000/editMyProfile/:user_id
router.put("/editMyProfile/:user_id", commonControllers.editMyProfile);

// 5.- Add commentary
// http://localhost:4000/addCommentary/:user_id/:course_id/:unit_id/:lesson_id
router.post(
  "/addCommentary/:user_id/:course_id/:unit_id/:lesson_id",
  commonControllers.addComentary
);

// 6.- Response commentary
// http://localhost:4000/responseCommentary/:user_id/:course_id/:unit_id/:lesson_id/:parent_comment_id
router.post(
  "/responseCommentary/:user_id/:course_id/:unit_id/:lesson_id/:parent_comment_id",
  commonControllers.responseComentary
);

// 7.- Get student info
// http://localhost:4000/myProfile/:user_id
router.get("/myProfile/:user_id", commonControllers.selectMyProfile);

// 8.- Show user course
// http://localhost:4000/showMyCourses/:user_id
router.get("/showMyCourses/:user_id", commonControllers.showMyCourses);

// 9.- Enable resources
// http://localhost:4000/enableResource/:resource_id
router.put("/enableResource/:resource_id", commonControllers.enableResources);

// 10.- Disable resources
// http://localhost:4000/disableResource/:resource_id
router.put("/disableResource/:resource_id", commonControllers.enableResources);

// 11.- Get 4 top courses (
// http://localhost:4000/topCourses
router.get("/topCourses", commonControllers.selectTopCourses);

// 12.- Get 4 best rated (
// http://localhost:4000/bestRatedCourses
router.get("/bestRatedCourses", commonControllers.selectBestRatedCourses);

module.exports = router;
