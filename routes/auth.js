const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {v4: uuidV4} = require('uuid');

const {login,register} = require("../controllers/auth.controller");
const {emailEndsWithCSTRubEduBt, isValidGender, isValidDepartment, isValidSemester} = require("../utils/validators");


router.post("/login",
    [
        body('studentId').isNumeric().isLength({min: 8, max: 8}),
        body('password').isLength({min: 5}),
    ], login)

router.post(
    "/register",
    [
        body('studentId').isNumeric().isLength({min: 8, max: 8}),
        body('email').isEmail().custom(emailEndsWithCSTRubEduBt),
        body('gender').custom(isValidGender),
        body('programme').custom(isValidDepartment),
        body('semester').custom(isValidSemester),
        body('password').isLength({min: 5}),
        body('name').isAlpha()
    ], register)

module.exports = router;
