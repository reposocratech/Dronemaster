var express = require("express");
var router = express.Router();
const multer = require("../middleware/multer");
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

// 3.- Get course material
// http://localhost:4000/students/courseMaterial/:course_id
router.get("/courseMaterial/:course_id", studentControllers.getCourseMaterial);

// 3.- REGISTER all lessons viewed by student
// http://localhost:4000/students/registerLessonViewed/:user_id/:lesson_id/:course_id
router.post(
  "/registerLessonViewed/:user_id/:lesson_id/:course_id",
  studentControllers.registerLessonViewedByStudent
);

// 3.- Get all lessons viewed by student
// http://localhost:4000/students/lessonViewed/:user_id/:course_id
router.get(
  "/lessonViewed/:user_id/:course_id",
  studentControllers.selectLessonViewedByStudent
);

// 3.- Get count all lessons viewed by student per course
// http://localhost:4000/students/countLessonsViewed/:user_id/:course_id
router.get(
  "/countLessonsViewed/:user_id/:course_id",
  studentControllers.selectCountLessonViewedByCourse
);

// 3.- Get count all lessons course
// http://localhost:4000/students/countLessonscourse/:user_id/:course_id
router.get(
  "/countLessonscourse/:course_id",
  studentControllers.selectCountLessonCourse
);

// 4.- Upload student exam and change the student status
// http://localhost:4000/students/uploadExam/:user_id/:course_id
router.post(
  "/uploadExam/:user_id/:course_id",
  multer("exams"),
  studentControllers.uploadStudentExam
);

// 5.- Get student status
// http://localhost:4000/students/studentStatus/:user_id/:course_id
router.get(
  "/studentStatus/:user_id/:course_id",
  studentControllers.getStudentStatus
);

// 6.- get course score and counter rating
// http://localhost:4000/students/scoreCounterRating/:course_id
router.get(
  "/scoreCounterRating/:course_id",
  studentControllers.getScoreAndCounterRating
);

// 7.- Update score and counter rating
// http://localhost:4000/students/updateScoreRating/:course_id/:score/:counter_rating
router.put(
  "/updateScoreRating/:course_id",
  studentControllers.updateScoreAndCounterRating
);
module.exports = router;
