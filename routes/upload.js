const express = require('express');
const {upload} = require("../controllers/uploadhandler");
const router = express.Router();
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname) //Appending extension
    }
})

var uploads = multer({ storage: storage });
router.post("/upload",uploads.single('file'),upload)

module.exports = router;