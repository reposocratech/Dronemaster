const connection = require("../config/db");

class courseControllers {
  // 1. Create a course by admin
  // http://localhost:4000/courses/createCourse/:user_id
  createCourse = (req, res) => {
    const { user_id } = req.params;

    const {
      course_name,
      course_length,
      price,
      course_description,
      teacher_id,
      category_id,
      start_date,
    } = req.body.data;

    const tagsList = req.body.tagsList || []; // In case tagsList is not present

    // Begin a database transaction
    connection.beginTransaction((error) => {
      if (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
      }

      // Insert into course table
      let courseInsertQuery = `INSERT INTO course (course_name, course_length, price, course_description, category_id, created_by_user_id, start_date) VALUES ('${course_name}', ${course_length}, ${price}, '${course_description}', ${category_id}, ${user_id}, "${start_date}")`;

      if (start_date === "") {
        courseInsertQuery = `INSERT INTO course (course_name, course_length, price, course_description, category_id, created_by_user_id, start_date) VALUES ('${course_name}', ${course_length}, ${price}, '${course_description}', ${category_id}, ${user_id}, "1900-1-1")`;
      }

      connection.query(courseInsertQuery, (error, resultCourse) => {
        if (error) {
          connection.rollback(() => {
            console.error(error);
            res.status(500).json("Internal Server Error");
          });
        } else {
          const course_id = resultCourse.insertId;

          let dateNow = new Date();
          let formatedDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`;

          // Insert into user_course table
          const userCourseInsertQuery = `INSERT INTO user_course (user_id, course_id, start_date) VALUES (${teacher_id}, ${course_id}, "${formatedDate}")`;

          connection.query(userCourseInsertQuery, (error, resultUserCourse) => {
            if (error) {
              connection.rollback(() => {
                console.error(error);
                res.status(500).json("Internal Server Error");
              });
            } else {
              // Insert tags into tag table and tag_course table
              const tagInsertQuery = `INSERT INTO tag (tag_name) VALUES (?)`;
              const tagCourseInsertQuery = `INSERT INTO tag_course (tag_id, course_id) VALUES (?, ?)`;

              const tagInsertPromises = tagsList.map((tagName) => {
                return new Promise((resolve, reject) => {
                  connection.query(
                    tagInsertQuery,
                    [tagName],
                    (error, resultTag) => {
                      if (error) {
                        reject(error);
                      } else {
                        const tag_id = resultTag.insertId;
                        connection.query(
                          tagCourseInsertQuery,
                          [tag_id, course_id],
                          (error) => {
                            if (error) {
                              reject(error);
                            } else {
                              resolve();
                            }
                          }
                        );
                      }
                    }
                  );
                });
              });

              Promise.all(tagInsertPromises)
                .then(() => {
                  // Commit the transaction
                  connection.commit((error) => {
                    if (error) {
                      connection.rollback(() => {
                        console.error(error);
                        res.status(500).json("Internal Server Error");
                      });
                    } else {
                      res.status(200).json({ course_id });
                    }
                  });
                })
                .catch((error) => {
                  connection.rollback(() => {
                    console.error(error);
                    res.status(500).json("Internal Server Error");
                  });
                });
            }
          });
        }
      });
    });
  };

  // 2. Enable Course
  // http://localhost:4000/courses/enableCourse/:course_id
  enableCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `UPDATE course SET course_is_hidden = 0 WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      if (error) res.status(500).json(err);
      res.status(200).json({ message: "Course enable succesfully" });
    });
  };

  // 3. Disable Course
  // http://localhost:4000/courses/disableCourse/:course_id
  disableCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `UPDATE course SET course_is_hidden = 1 WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      if (error) res.status(500).json(err);
      res.status(200).json({ message: "Course disable succesfully" });
    });
  };

  // 4.- All courses
  // http://localhost:4000/courses/allCourses
  selectAllCourses = (req, res) => {
    let sql = `SELECT * FROM course WHERE course_is_hidden = 0`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 5.- Edit course
  // http://localhost:4000/courses/editCourse/:course_id
  editCourse = (req, res) => {
    const {
      course_name,
      category_id,
      course_length,
      teacher_id,
      course_description,
      price,
    } = req.body;

    const { course_id } = req.params;

    let sql = `UPDATE course SET course_name="${course_name}" ,category_id=${category_id} ,course_length=${course_length}  ,course_description="${course_description}" ,price=${price} WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      if (error) res.status(400).json({ error });
    });

    //Check if user_course relationship already exist
    let sqlGetUser_course = `Select user_id FROM user_course WHERE course_id = ${course_id}  ORDER BY start_date DESC LIMIT 1`;

    connection.query(sqlGetUser_course, (error, user_courseResult) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        let sqlTeacher = `UPDATE user_course SET user_id=${teacher_id} WHERE course_id = ${course_id} and user_id = ${user_courseResult[0].user_id}`;

        connection.query(sqlTeacher, (error, result) => {
          error
            ? res.status(404).json({ error })
            : res.status(200).json(result);
        });
      }
    });
  };

  // 6.- Create course category
  // http://localhost:4000/courses/createCategory
  createCategory = (req, res) => {
    const { category_name } = req.body;

    const existCategory = [];

    // We check if category table is empty
    let sql1 = "SELECT * FROM category";

    connection.query(sql1, (error, result) => {
      if (error) res.status(400).json(error);

      if (result.length !== 0) {
        for (let i = 0; i < result.length; i++) {
          // if there are info in category que copy that in a new array
          existCategory.push(result[i].category_name);
        }
      }

      // category verification if exist
      if (existCategory.includes(category_name)) {
        return res.status(400).json({ message: "category already exist" });
      } else {
        // Not exist category
        let sql2 = `INSERT INTO category (category_name) VALUES ("${category_name}")`;

        connection.query(sql2, (error, result) => {
          if (error) res.status(400).json(error);
          res.status(201).json({ message: "Category created successfully" });
        });
      }
    });
  };

  // 7.- Get all categories (NOT EMPTY)
  // http://localhost:4000/courses/allCategories
  selectAllCourseCategories = (req, res) => {
    const sql =
      "SELECT DISTINCT category.category_id, category.category_name FROM category  INNER JOIN course ON category.category_id = course.category_id AND course.course_is_hidden = 0 AND category_is_deleted = 0";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 8.- Get all tags of a Course (
  // http://localhost:4000/courses/courseTags/:course_id
  selectAllCourseTags = (req, res) => {
    const { course_id } = req.params;
    let sql = `SELECT tag.tag_id, tag.tag_name FROM tag_course INNER JOIN tag ON tag_course.tag_id = tag.tag_id INNER JOIN course course ON tag_course.course_id = course.course_id WHERE course.course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };


  // 9.- Suscribe into a course
  // http://localhost:4000/courses/payACourse/:user_id/:course_id
  suscribeIntoACourse = (req, res) => {
    const { user_id, course_id } = req.params;

    let dateNow = new Date();
    let formatedDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`;

    let sql = `INSERT INTO user_course (user_id, course_id, start_date) VALUES (${user_id}, ${course_id}, "${formatedDate}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });

  // 10.- Get info for course edition info
  // http://localhost:4000/courses/courseInfoEdition/:course_id
  selectCourseEditionInfo = (req, res) => {
    const { course_id } = req.params;
    
    let sql = `SELECT course.course_name, course.course_length, course.price, course.course_description,user.user_name, user.user_id AS teacher_id, course.category_id, course.start_date, course.created_by_user_id FROM course JOIN user_course ON course.course_id = user_course.course_id JOIN user ON user_course.user_id = user.user_id WHERE course.course_id = ${course_id} AND user.type != 0;`

    connection.query(sql , (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    })
  };
}

module.exports = new courseControllers();
