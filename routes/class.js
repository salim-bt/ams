const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const {createClass} = require("../controllers/class.controller");

router.post("/class", createClass)

module.exports = router;