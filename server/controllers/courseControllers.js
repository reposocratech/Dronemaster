const connection = require("../config/db");

class courseControllers {
  // 1. Create a course by admin
  // http://localhost:4000/courses/createCourse/:user_id
  createCourse = (req, res) => {
    const { user_id } = req.params;

    //Teacher id, comes from a Select option at the creation form.
    const {
      course_name,
      course_length,
      price,
      course_description,
      teacher_id,
      category_id,
    } = req.body;

    // tagList is connected with FormData (Frontend)
    //const tagsList = ["232342", "lelelel"];

    //Get type form user
    let sqlGetType = `SELECT type FROM user WHERE user_id = ${user_id}`;
    connection.query(sqlGetType, (error, resultType) => {
      if (error) res.status(400).json(error);

      //Check if user is an Admin
      if (resultType[0].type === 2) {
        // Create a new Course
        let sql = `INSERT INTO course (course_name, course_length, price, course_description ,category_id, created_by_user_id) VALUES ('${course_name}',${course_length},${price},'${course_description}',${category_id}, ${user_id})`;

        connection.query(sql, (error, result) => {
          if (error) res.status(500).json(error);

          let course_id = result.insertId;

          //Set Current Date
          let dateNow = new Date();
          let formatedDate = `${dateNow.getFullYear()}/${dateNow.getMonth()}/${dateNow.getDate()}`;

          //Set teacher_id to user_course;
          let sqlTeacher = `INSERT INTO user_course (user_id, course_id, start_date) VALUES (${teacher_id}, ${course_id}, "${formatedDate}" )`;

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
      "SELECT DISTINCT category.category_id, category.category_name FROM category  INNER JOIN course ON category.category_id = course.category_id AND course.course_is_hidden = 0";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 8.- Get all tags of a Course (
  // http://localhost:4000/courses/courseTags/:course_id
  selectAllCourseTags = (req, res) => {
    const { course_id } = req.params;
    let sql = `SELECT tag.tag_id, tag.tag_name FROM tag_course INNER JOIN tag ON tag_course.tag_id = tag.tag_id INNER JOIN course course ON tag_course.course_id = course.course_id WHERE course.course_is_hidden = 0 AND course.course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new courseControllers();
