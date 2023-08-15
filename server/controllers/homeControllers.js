const connection = require("../config/db");

class homeControllers {
  selectAllCourses = (req, res) => {
    let sql = `SELECT * FROM course`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  };
}

module.exports = new homeControllers();
