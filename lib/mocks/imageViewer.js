/**
 * Module dependencies.
 */
var path = require('path'),
    mime = require('mime'),
    fs = require('fs');

exports.getFrameImage = function (req, res) {

    function random (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
    var wait = random (1000, 3000);
    console.log('wait = '+wait.toString());
    setTimeout(function(){
        var number = random(1,3);
        var file;
        file = __dirname + '/data/images/IR'+number.toString()+'.jpg';
        if (number > 2) {
            file = __dirname + '/data/images/ImageServiceError.png';
        }
        var mimetype = mime.lookup(file);
        res.setHeader('Content-type', mimetype);
        res.status(200);
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    }, wait);

};