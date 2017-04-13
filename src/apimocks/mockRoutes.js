/**
 * Created by chide on 6/10/2014.
 */


var fs = require('fs');

var mockRoutes = [];
var mocks = fs.readdirSync(__dirname + '/mocks'); // jshint ignore:line

for (var i in mocks) {
    var mock = mocks[i];

    var template = require(__dirname + '/mocks/' + mock);// jshint ignore:line

    for (var ii in template.mocks) {
        mockRoutes.push(template.mocks[ii]);
    }
}

exports.mockRoutes = mockRoutes;

