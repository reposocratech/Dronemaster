const connection = require("../config/db");

class adminControllers {
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
