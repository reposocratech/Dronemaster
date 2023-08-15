const connection = require("../config/db");

class adminControllers {

  createTeacher = (req, res) => {
    const {
      user_name,
      user_lastname,
      email,
      password,
      type,
      national_id,
      address,
      phone,
      user_img,
    } = req.body;
    console.log(req.body);
    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
        }

        let sql = `INSERT INTO user (user_name, user_lastname, email, password, type, national_id, address, phone, user_img) VALUES ('${user_name}', '${user_lastname}', '${email}', '${hash}', '${type}', '${national_id}', '${address}', '${phone}', '${user_img}')`;

        connection.query(sql, (error, result) => {
          console.log(error);
          error
            ? res.status(400).json({ error })
            : res.status(201).json(result);
        });
      });
    });
  };

  selectAllTeachers = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 1 AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  };

  selectAllStudents = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 0 AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  };

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


 //X.- View all students - Brings the information of all the students suscribed in the portal
  //localhost:4000/admin/allStudents

  viewAllStudents = (req, res) => {
    let sql = "SELECT * FROM user";
    connection.query(sql, (error, result) => {
      if (error) {
        //console.log(error)
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //X.- Enable resources included in a lesson
  //localhost:4000/admin/enableResource

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
  //localhost:4000/admin/enableResource

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

  enableTeacher = (req, res) => {
    let { id } = req.params;
    console.log(id);

    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = "${id}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }

      res.status(200).json(result);
    });
  };

  disableTeacher = (req, res) => {
    let { id } = req.params;
    console.log(id);

    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${id}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }

      res.status(200).json(result);
    });
  };
}

module.exports = new adminControllers();
