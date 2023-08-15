const connection = require("../config/db");

class adminControllers {
  // 1.- Disable student
  // localhost:4000/admin/disableStudent/:id
  disableStudent = (req, res) => {
    console.log("req params (disable student): ", req.params);
    let { id } = req.params;

    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${id}"`;
    let sql2 = `SELECT * FROM user`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
    });

    connection.query(sql2, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 2.- Enable student
  // localhost:4000/admin/enableStudent/:id
  enableStudent = (req, res) => {
    console.log("req params (enable student): ", req.params);
    let { id } = req.params;

    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = "${id}"`;
    let sql2 = `SELECT * FROM user`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
    });

    connection.query(sql2, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 3.- Passed course
  // localhost:4000/admin/passedCourse/:id
  passedCourse = (req, res) => {
    console.log("req params (passed course): ", req.params);
    let { id } = req.params;

    let sql = `UPDATE user_course SET status = 4 WHERE user_id = "${id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 4.- Not passed course
  // localhost:4000/admin/notPassedCourse/:id
  notPassedCourse = (req, res) => {
    console.log("req params (not passed course): ", req.params);
    let { id } = req.params;

    let sql = `UPDATE user_course SET status = 3 WHERE user_id = "${id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new adminControllers();
