var pagePreviewBase = require('./_pagePreviewBase.js');
var test = {
    utils: {
        webdriver: require('../../utils/webdriverExtentionUtils.js')
    }
};

function lazyImgSelector(fileId, frameIndex) {
    return "lazy-img-" + fileId + "-" + (frameIndex + 1);
}

var scrollIntoView = function () {
    arguments[0].scrollIntoView();
};

var multiFramePagePreview = new pagePreviewBase();

// frameIndex starts from 0
multiFramePagePreview.lazyImg = function(fileId, frameIndex) {
    return multiFramePagePreview.viewingArea(fileId).element(by.id(lazyImgSelector(fileId, frameIndex)));
};

multiFramePagePreview.lazyImgWhenVisible = function(fileId, frameIndex) {
    var def = protractor.promise.defer();
    def.promise.data = null;

    var elem = multiFramePagePreview.lazyImg(fileId, frameIndex);
    test.utils.webdriver.waitTillElementVisible(elem).then(function () {
        def.promise.data = elem;
        def.fulfill(elem);
    });

    return def.promise;
};

multiFramePagePreview.scrollToLazyImg = function(fileId, frameIndex) {
    var elem = multiFramePagePreview.lazyImg(fileId, frameIndex);
    browser.executeScript(scrollIntoView, elem.getWebElement());
};

module.exports = multiFramePagePreview;