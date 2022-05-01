var fileUpload = require('../routes/fileUpload');
var express   =   require('express');
var route = express.Router();
route.use('/upload', fileUpload);
module.exports = route;