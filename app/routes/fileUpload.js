var express = require('express');
var multer = require('multer');
var route = express.Router();
let csvToJson = require('convert-csv-to-json');
const { csvparse } = require('../actions/fileUpload');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

route.post('/', upload.single('avatar'), function(req,res){

  var parsed_data = csvToJson.fieldDelimiter(',').getJsonFromCsv(req.file.originalname);
  csvparse(parsed_data).then(data => {
    res.send({ success: true, data: data })
  }).catch(error => {
    res.send({ success: false, errors: [error] })
  })
});

 module.exports = route;