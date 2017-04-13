/**
 * Created by wangjo on 6/6/2016.
 */

// Module dependencies.
var path = require('path'),
    mime = require('mime'),
    fs = require('fs'),
    nodeConfig = require('./nodeInt');

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
            console.log('Stream Fired!');

            // todo: consider exposing it entirely to all modules (exports.mediaFiles = ...)
            var mediaFiles = {};
            mediaFiles['audio'] = {};
            mediaFiles['video'] = {};

            mediaFiles['audio'][true] = __dirname + '/data/download/ogafile.oga',
            mediaFiles['video'][true] = __dirname + '/data/download/mov_bbb.mp4',

            mediaFiles['audio'][false] = __dirname + '/data/download/OGAFile_bad.oga',
            mediaFiles['video'][false] = __dirname + '/data/download/mp4file_bad.mp4'

            // change nodeConfig.config.media to serve up either video or audio when testing manually
            var type = nodeConfig.config.media.type == 'video' ? 'video' : 'audio';
            var success = nodeConfig.config.media.success === true ? true : false;

            var file = mediaFiles[type][success];
            var mimeType = 'audio/ogg';
            if (type == 'video') {
                mimeType = 'video/mp4';
            }

            var filename = path.basename(file);

            // todo: new response for partial content? would allow for seeking on localhost...
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimeType);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);

        }, 0);

    }

};