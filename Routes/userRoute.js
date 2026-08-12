const express = require(`express`);
const router = express.Router();//

const usercontroller = require(`../Controller/usercontroller`);

//define the Routes
router.post("/createuser", usercontroller.createuser);
router.post("/loginuser", usercontroller.loginuser);
//export the router to be used in other filed
module.exports = router;
