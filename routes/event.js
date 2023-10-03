var express = require('express');
var router = express.Router();
const {createEvent} = require("../controllers/event.controller");
/* GET users listing. */
router.post('/',createEvent );

module.exports = router;
