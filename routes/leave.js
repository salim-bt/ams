var express = require('express');
var router = express.Router();
const {createEvent} = require("../controllers/event");
/* GET users listing. */
router.get('/',createEvent );

module.exports = router;
