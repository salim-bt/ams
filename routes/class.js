const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const {createClass, getClass, getAllClasses, updateClass, deleteClass} = require("../controllers/class.controller");

router.post("/create-class", createClass)
router.get('/get-class/:classId',getClass)
router.get('/get-all-classes',getAllClasses)
router.put('/update-class',updateClass)
router.delete('/delete-class',deleteClass)
module.exports = router;