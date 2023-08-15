const connection = require("../config/db");

class courseControllers {
  createCourse = (req, res) => {
    const { user_id } = req.params;
    //Teacher id, comes from a Select option at the creation form.
    const {
      course_name,
      course_length,
      price,
      course_description,
      teacher_id,
    } = req.body; //? Form Data --> JSON.parse()

    const tagsList = ["232342", "lelelel"];

    //Get type form user
    let sqlGetType = `SELECT type FROM user WHERE user_id = ${user_id}`;

    connection.query(sqlGetType, (err, resultType) => {
      if (err) res.status(500).json(err);

      //Check if user is an Admin
      if (resultType[0].type === 2) {
        // Create a new Course
        let sql = `INSERT INTO course (course_name, course_length, price, course_description, created_by_user_id) VALUES ('${course_name}',${course_length},${price},'${course_description}', ${user_id})`;

        connection.query(sql, (error, result) => {
          if (error) res.status(500).json(error);

          let course_id = result.insertId;
          //Set Current Date
          let dateNow = new Date();

          let formatedDate = `${dateNow.getFullYear()}/${dateNow.getMonth()}/${dateNow.getDate()}`

          //Set teacher_id to user_course;
          let sqlTeacher = `INSERT INTO user_course (user_id, course_id, start_date) VALUES (${teacher_id}, ${course_id}, "${formatedDate}" )`;

          if (!teacher_id) {
            let sqlTeacher = `INSERT INTO user_course (user_id, course_id, start_date) VALUES ( 0 , ${course_id}, "${formatedDate}" )`;
          }

          connection.query(sqlTeacher, (error, result) => {
            if (error) res.status(500).json(error);
          });

          // Initialize arrays to store new tag names and tag-course relationships
          const newTags = [];

          let sqlGetTags = `SELECT * FROM tag`;

          connection.query(sqlGetTags, (error, resultGetTags) => {
            if (error) {
              return res.status(500).json(error);
            }

            // Insert new tags and tag-course relationships
            for (const tag of tagsList) {
              let tagExists = false;
              let tagId;

              for (let j = 0; j < resultGetTags.length; j++) {
                if (tag === resultGetTags[j].tag_name) {
                  tagExists = true;
                  tagId = resultGetTags[j].tag_id;
                  break;
                }
              }

              if (!tagExists) {
                newTags.push(tag);
              }

              let sqlTagCourse = `INSERT INTO tag_course (tag_id, course_id) VALUES (${tagId}, ${course_id})`;
              connection.query(sqlTagCourse, (err, result) => {
                if (err) {
                  console.error(err);
                }
              });
            }

            // Insert new tags
            for (const newTag of newTags) {
              let sqlInsertNewTag = `INSERT INTO tag (tag_name) VALUES ('${newTag}')`;
              connection.query(sqlInsertNewTag, (error3, result2) => {
                if (error3) {
                  return res.status(500).json(error3);
                }
              });
            }

            // Sending a success response
            res.status(200).json({ message: "Course created successfully" });
          });
        });
      } else {
        res.status(403).json("Not authorized");
      }
    });
  };

  enableCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `UPDATE course SET course_is_hidden = 0 WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      if (error) res.status(500).json(err);
      res.status(200).json({ message: "Course enable succesfully" });
    });
  };

  disableCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `UPDATE course SET course_is_hidden = 1 WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      if (error) res.status(500).json(err);
      res.status(200).json({ message: "Course disable succesfully" });
    });
  };
}

module.exports = new courseControllers();
