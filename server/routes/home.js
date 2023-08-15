var express = require("express");
var router = express.Router();

const homeControllers = require("../controllers/homeControllers");

// ----------------------------------------------------------------
// 1.- login user
// localhost:4000/login
router.post("/login", homeControllers.login);




const courseControllers = require("../controllers/homeControllers");

/* GET courses listing. */
router.get("/todosCursos", courseControllers.selectAllCourses);



module.exports = router;
