var express = require("express");
var router = express.Router();
const multer = require("../middleware/multer");

const commonControllers = require("../controllers/commonControllers");

// 1.- login user
// http://localhost:4000/login
router.post("/login", commonControllers.login);

//3.- Counter which includes total of teachers, courses and students
//http://localhost:4000/counter
router.get("/counter", commonControllers.viewCounter);

// 4.- Edit user info
// http://localhost:4000/editMyProfile/:user_id
router.put(
  "/editMyProfile/:user_id",
  multer("users"),
  commonControllers.editMyProfile
);

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
router.put("/disableResource/:resource_id", commonControllers.disableResources);

// 9.- Enable lessons
// http://localhost:4000/enableLessons/:lesson_id
router.put("/enableLessons/:lesson_id", commonControllers.enableLessons);

// 10.- Disable lessons
// http://localhost:4000/disableLessons/:lesson_id
router.put("/disableLessons/:lesson_id", commonControllers.disableLessons);

// 11.- Get 4 top courses (
// http://localhost:4000/topCourses
router.get("/topCourses", commonControllers.selectTopCourses);

// 12.- Get 4 best rated (
// http://localhost:4000/bestRatedCourses
router.get("/bestRatedCourses", commonControllers.selectBestRatedCourses);

// 13.- Delete profile image of a user
// http://localhost:4000/myProfile/deleteImage/:user_id
router.put(
  "/myProfile/deleteImage/:user_id",
  commonControllers.deleteProfileImage
);

// 14.- Download exam
// http://localhost:4000/downloadExam/:course_id
router.get("/downloadExam/:course_id", commonControllers.downloadExam);

// 15.- Gets info from a user at user_course
// http://localhost:4000/myProfile/myCourse/:user_id/:course_id
router.get(
  "/myProfile/myCourse/:user_id/:course_id",
  commonControllers.getUserCourseInfo
);

// 16.- Get resource name to download resource
// http://localhost:4000/resourceName/:lesson_id
router.get("/resourceName/:lesson_id", commonControllers.getResourceName);

// 17.- Upload resource into a lesson
// http://localhost:4000/uploadResource/:user_id/:course_id/:unit_id/:lesson_id
router.post(
  "/uploadResource/:user_id/:course_id/:unit_id/:lesson_id",
  multer("resources"),
  commonControllers.uploadResource
);

// 18- Gets original comments and rsponses of a lesson
// http://localhost:4000/myCourse/myLesson/comments/:course_id/unit_id/:lesson_id
router.get(
  "/myCourse/myLesson/comments/:course_id/:unit_id/:lesson_id",
  commonControllers.getAllComments
);

// 19- Post a new response to a comment
// http://localhost:4000/myCourse/myLesson/response/:course_id/:unit_id/:lesson_id/:user_id/:comment_id
router.post(
  "/myCourse/myLesson/response/:course_id/:unit_id/:lesson_id/:user_id/:comment_id",
  commonControllers.setResponseComment
);

// 20-Gets information of one User
// http://localhost:4000/userInformation/:user_id

router.get("/userInformation/:user_id", commonControllers.viewOneUserInfo);

//21.- Enable units
//http://localhost:4000/enableUnit/:unit_id
router.put("/disableUnits/:unit_id", commonControllers.enableUnits);

//22.- Disable units
//localhost:4000/disableUnit/:unit_id
router.put("/disableUnits/:unit_id", commonControllers.disableUnits);

module.exports = router;
