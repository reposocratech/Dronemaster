var express = require("express");
var router = express.Router();
const teacherControllers = require("../controllers/teacherControllers");

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

module.exports = router;
