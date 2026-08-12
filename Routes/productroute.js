const express = require(`express`);
const router = express.Router();//

//import the controller
const productcontroller = require(`../Controller/productcontroller`);

//define the routes
router.post(`/createproduct`,productcontroller.createproduct);
router.put(`/updateproduct/:id`, productcontroller.updateproduct);

module.exports = router;