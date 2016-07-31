'use strict';

var express = require('express');
var app = express();
var multer = require('multer');
var fs = require('fs');

var FILES_FOLDER = './uploads';

if (!fs.existsSync(FILES_FOLDER)){
    fs.mkdirSync(FILES_FOLDER);
}

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, FILES_FOLDER);
    },
    filename: function (req, file, callback) {
        // file name = fieldname + datetime
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var uploader = multer({ storage : storage }).single('stlFile');

app.use(express.static('public'));
app.use(express.static('uploads'));

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/save',function(req,res){
    console.log(req);
});

app.post('/upload/stl',function(req,res){
    uploader(req, res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.json(req.file);
    });
});

var port = process.env.PORT || 9527;

app.listen(port,function(){
    console.log("Listening on port", port);
});