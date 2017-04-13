var IR = require('../ir.js');

var config = {
    isPreview: true
};

var htmlPreview = function () {
    var instance = new IR.view(config);

    instance.sandboxViewer = function(fileId)
    {
        return instance.viewingArea(fileId).element(by.id('sandboxViewer_' +fileId));
    };

    instance.sandboxContent = function(fileId)
    {
        return browser.switchTo().frame(element(by.tagName('iframe')).getWebElement()).then(function() {
            return browser.switchTo().frame(element(by.tagName('iframe')).getWebElement()).then(function () {
                return browser.driver.findElement(by.tagName('h2')).getText().then(
                    function (text) {
                        return browser.switchTo().defaultContent().then(function () {
                            return text.trim();
                        });

                    });
            });
        });

    };

    return instance;
};

module.exports = htmlPreview;




