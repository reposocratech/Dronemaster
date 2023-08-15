var express = require("express");
var router = express.Router();
const homeControllers = require("../controllers/homeControllers");

// ----------------------------------------------------------------
// 1.- login user
// localhost:4000/login
router.post("/login", homeControllers.login);

module.exports = router;
