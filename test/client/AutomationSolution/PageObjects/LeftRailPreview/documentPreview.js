var IR = require('../ir.js');

var config = {
    isPreview: true
};

var documentPreview = function () {
    var instance = new IR.view(config);

    instance.documentTitle = function(fileId)
    {
        return instance.viewer(fileId).element(by.id('document-title-'+fileId));
    };

    instance.documentType = function(fileId)
    {
        return instance.viewer(fileId).element(by.id('document-type-'+fileId));
    };

    instance.documentPages = function(fileId)
    {
        return instance.viewer(fileId).element(by.id('document-pages-'+fileId));
    };

    instance.previewContent = function(fileId)
    {
        return instance.viewer(fileId).element(by.id('document-image-preview-content-'+fileId));
    };

    instance.previewEmpty = function(fileId)
    {
        return instance.viewer(fileId).element(by.id('document-empty-preview-content-'+fileId));
    };

    instance.addNotesButton = function (fileId) {
        return new IR.Button({
            element: instance.viewer(fileId).element(by.id('add-notes-button-'+ fileId)),
            label: null
        });
    };
    return instance;
};

module.exports = documentPreview;


