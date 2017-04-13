var IR = require('../ir.js');

var config = {
    isPreview: true
};

var objectPreview = new IR.view(config);

objectPreview.unsupportedView = function(fileId) {
    return element(by.id("object-preview-unsupported-" + fileId));
};

module.exports = objectPreview;