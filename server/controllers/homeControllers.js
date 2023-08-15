const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



class homeControllers {
  // 1.- Login
  // localhost:4000/login
  login = (req, res) => {
    let { email, password } = req.body;
    console.log("emaiiiiil", email);

    let sql = `SELECT * FROM user WHERE email = "${email}"`;

    connection.query(sql, (error, result) => {
      console.log(result);

      // if query is failed
      if (error) return res.status(404).json(error);

      // if there isn´t an user with this email
      if (!result || !result.length || result[0].is_deleted == 1) {
        res.status(401).json("user is not registered");
      } else {
        // Correct email
        const [user] = result;
        const hash = user.password;

        // Password checking
        bcrypt.compare(password, hash, (error, response) => {
          if (error) return res.status(404).json(error);

          // Correct password
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  user_name: user.user_name,
                  user_id: user.user_id,
                  type: user.type,
                  user_img: user.user_img,
                },
              },
              process.env.SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({ token, user: result[0] });
          } // Incorrect password
          else {
            res.status(401).json("incorrect email or password");
          }
        });
       }
    });
  };
  
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
