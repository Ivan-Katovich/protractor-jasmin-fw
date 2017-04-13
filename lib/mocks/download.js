/**
 * Module dependencies.
 */
var path = require('path'),
    mime = require('mime'),
    fs = require('fs');

exports.content = function (req, res, bool) {

    var throwError = bool ? bool : false;

    if (throwError) {
        setTimeout(function(){
            var file = __dirname + '/data/download/400.html';
            var mimetype = mime.lookup(file);
            res.setHeader('Content-type', mimetype);
            res.status(200);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);

        }, 5000);
    } else {
        setTimeout(function () {
            console.log('Download Fired!');
            console.log('pageIds: ' + req.body.pageIds);
            console.log('includeAnnotations: ' + req.body.includeAnnotations);
            console.log('dpiX: ' + req.body.dpiX);
            console.log('dpiY: ' + req.body.dpiY);

            var file = __dirname + '/data/download/SamplePDF.pdf';
            var mimeType = mime.lookup(file);

            var filename = path.basename(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimeType);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);

        }, 5000);
    }

};