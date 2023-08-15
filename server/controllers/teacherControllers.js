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


 //X.- Enable resources included in a lesson
  //localhost:4000/teachers/enableResource

  enableReources = (req, res) => {
    let { id } = req.params;
    console.log(id);

    let sql = `UPDATE resource SET resource_is_hidden = 0 WHERE resource_id = "${id}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //X.- Disable resources included in a lesson
  //localhost:4000/teachers/enableResource

  disableReources = (req, res) => {
    let { id } = req.params;
    console.log(id);

    let sql = `UPDATE resource SET resource_is_hidden = 1 WHERE resource_id = "${id}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };
}

module.exports = new teacherControllers();
