const express = require("express");
const multer = require("multer");
const {singleFile, arrayFile, multipleFile} = require("../Controller/file.controller");


const fileRoute = express.Router();
const upload = multer({desc: "upload/"});

const moreField = upload.fields([
    {name: "previewpix", maxCount: 1},
    {name: "detailedpix", maxCount: 1},
    {name: "video", maxCount: 1},
])

fileRoute.post("/single", upload.single("dp"), singleFile);
fileRoute.post("/array", upload.array("dp", 3), arrayFile);
fileRoute.post("/multiple", moreField, multipleFile)

module.exports = fileRoute;






