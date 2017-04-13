var IR = require('../ir.js');

var config = {
    isPreview: true
};

var pagePreviewBase = function() {
    var instance = new IR.view(config);

    instance.thumbnailArea = function (fileId) {
        return instance.viewingArea(fileId).element(by.id("page-view-thumbs-" + fileId + "-preview"));
    };

    instance.framingControls = function (fileId) {
        return instance.viewingArea(fileId).element(by.id("ir-framing-" + fileId));
    };

    instance.leadToolsImage = function (fileId) {
        return instance.viewingArea(fileId).element(by.id("lead-tools-viewer-" + fileId));
    };

    instance.webDavButtons = function (fileId) {
        return instance.viewingArea(fileId).element(by.id("webdav-buttons-" + fileId));
    };

    instance.webDavIcon = function (fileId) {
        return instance.viewingArea(fileId).element(by.id("webdav-icon-" + fileId));
    };

    instance.webDavFileNameHeader = function (fileId) {
        return instance.viewingArea(fileId).element(by.id("webdav-file-name-header-" + fileId));
    };

    return instance;
};

module.exports = pagePreviewBase;