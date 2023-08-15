var express = require("express");
var router = express.Router();
const courseControllers = require("../controllers/courseControllers");

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

module.exports = router;
