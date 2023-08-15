var express = require("express");
var router = express.Router();
const teacherControllers = require("../controllers/teacherControllers");


// ---------------------------------------------------------------------
// 1.- Show teacher course (profile)
// localhost:4000/teachers/oneTeacher/showCourses/:id
router.get("/oneTeacher/showCourses/:id", teacherControllers.showCourses);

/* localhost:4000/teachers */





////activar comentario///
router.put(
  "/comment/:comment_id/visibility",
  teacherControllers.enableCommentVisibility
);

// Ruta para deshabilitar la visibilidad de un comentario
router.post(
  "/comments/disable-visibility/:comment_id",
  disableCommentVisibility
);


//X.- Enable resources
//localhost:4000/teachers/enableResource

router.put("/enableResource/:lesson_id", teacherControllers.enableReources);

//X.- Disable resources
//localhost:4000/teachers/disableResource

router.put("/disableResource/:lesson_id", teacherControllers.disableReources);


module.exports = router;
