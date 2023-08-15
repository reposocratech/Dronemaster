var express = require("express");
var router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const bcrypt = require("bcrypt");

/* GET home page. */

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

module.exports = router;
