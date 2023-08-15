const connection = require("../config/db");

class teacherControllers {
  enableCommentVisibility = (req, res) => {
    const { comment_id } = req.params;
    const { user_id, type } = req.body;

    if (type !== 1 && type !== 2) {
      return res.status(403).json({
        error: "No tienes permiso para habilitar o deshabilitar comentarios",
      });
    }

    let updateSql = `UPDATE comment SET comment_is_hidden = 0 WHERE comment_id = ?`;

    connection.query(updateSql, [comment_id], (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({
          message:
            "Estado de visibilidad del comentario actualizado correctamente (Hidden)",
        });
      }
    });
  };
}

disableCommentVisibility = (req, res) => {
  const { comment_id } = req.params;
  const { user_id, type } = req.body;

  if (type !== 1 && type !== 2) {
    return res.status(403).json({
      error: "No tienes permiso para habilitar o deshabilitar comentarios",
    });
  }

  let updateSql = `UPDATE comment SET comment_is_hidden = 1 WHERE comment_id = ?`;

  connection.query(updateSql, [comment_id], (error, result) => {
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(200).json({
        message:
          "Estado de visibilidad del comentario actualizado correctamente (Visible)",
      });
    }
  });
};

module.exports = new teacherControllers();
