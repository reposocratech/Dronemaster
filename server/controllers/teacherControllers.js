const connection = require("../config/db");

class teacherControllers {
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
