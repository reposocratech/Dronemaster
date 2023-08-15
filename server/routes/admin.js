var express = require("express");
var router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const bcrypt = require("bcrypt");


/* localhost:4000/admin */

//X.- View all students
//localhost:4000/admin/allStudents
//Brings the information of all the students suscribed in the portal

router.get("/allStudents", adminControllers.viewAllStudents);

//X.- Enable resources
//localhost:4000/admin/enableResource

router.put("/enableResource/:lesson_id", adminControllers.enableReources);

//X.- Disable resources
//localhost:4000/admin/disableResource

router.put("/disableResource/:lesson_id", adminControllers.enableReources);

//X.- Enable teacher
//localhost:4000/admin/enableTeacher

router.put("/enableTeacher/:id", adminControllers.enableTeacher);

//X.- Disable teacher
//localhost:4000/admin/disableTeacher
router.put("/disableTeacher/:id", adminControllers.disableTeacher);

///REGISTRO PROFESOR
router.post("/createTeacher", adminControllers.createTeacher);

/////Mostrar todos los profesores/////
router.get("/todosProfesores", adminControllers.selectAllTeachers);

////// Mostrar Alumno/////////
router.get("/todosAlumnos", adminControllers.selectAllStudents);

router.put(
  "/comment/:comment_id/visibility",
  adminControllers.enableCommentVisibility
);

// Ruta para deshabilitar la visibilidad de un comentario
router.post(
  "/comments/disable-visibility/:comment_id",
  disableCommentVisibility
);

// ---------------------------------------------------------------------
// 1.- Disable student
// localhost:4000/admin/disableStudent/:id
router.put("/disableStudent/:id", adminControllers.disableStudent);

// ---------------------------------------------------------------------
// 2.- Enable student
// localhost:4000/admin/enableStudent/:id
router.put("/enableStudent/:id", adminControllers.enableStudent);

// ---------------------------------------------------------------------
// 3.- Passed course
// localhost:4000/admin/passedCourse/:id
router.put("/passedCourse/:id", adminControllers.passedCourse);

// ---------------------------------------------------------------------
// 4.- Not passed course
// localhost:4000/admin/notPassedCourse/:id
router.put("/notPassedCourse/:id", adminControllers.notPassedCourse);

module.exports = router;
