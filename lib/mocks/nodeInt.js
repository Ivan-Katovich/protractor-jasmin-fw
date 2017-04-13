/**
 * Created by wangjo on 6/6/2016.
 */

// Module dependencies.
var path = require('path'),
    mime = require('mime'),
    fs = require('fs');

exports.config = {
    media: {
        type: 'video',
        success: false
    }
};

exports.setConfig = function (req, res, bool) {

    var throwError = bool ? bool : false;

    if (throwError) {
        setTimeout(function(){
            var file = __dirname + '/data/download/400.html';
            var mimetype = mime.lookup(file);
            res.setHeader('Content-type', mimetype);
            res.status(200);

        }, 0);
    } else {
        //Set a timeout when responding so protractor has time for the browser to load the angular app
        //todo: find solution to not need a timeout
        setTimeout(function () {

            console.log("set the config for node internals");

            // todo: actually read these params from the request body (need a post)
            if (req.body.media) {
                exports.config.media = {
                    type: req.body.media.type == 'video' ? 'video' : 'audio',
                    success: req.body.media.success === true
                };
            }

            res.send(JSON.stringify(exports.config));
            res.status(200);

        }, 5000);
    }

};