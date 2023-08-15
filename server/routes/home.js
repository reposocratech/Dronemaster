var express = require("express");
var router = express.Router();



const courseControllers = require("../controllers/homeControllers");

/* GET courses listing. */
router.get("/todosCursos", courseControllers.selectAllCourses);


module.exports = router;
