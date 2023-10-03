const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const {getStudent} = require("../controllers/student.controller");

router.get("/:studentId",getStudent)

module.exports = router;