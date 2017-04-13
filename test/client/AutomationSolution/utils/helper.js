var fs = require('fs'),
    i=0;

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

var helper = {
    getScreen: function(name){
        var folder = process.cwd() + '/test/client/AutomationSolution/screenshots/';
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        return browser.takeScreenshot()
            .then(function (stream) {
                var path = folder + process.env.BROWSER + '_' + i++ + '_' + name + '.png';
                console.log('\nSaving screenshot @ ' + path);
                return writeScreenShot(stream,path);
            });
    }
};

module.exports = helper;