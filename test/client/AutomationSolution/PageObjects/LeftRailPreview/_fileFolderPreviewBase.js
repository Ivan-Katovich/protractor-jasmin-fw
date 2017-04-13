var IR = require('../ir.js');

var config = {
    isPreview: true
};

var fileFolderPreviewBase = function () {
    var instance = new IR.view(config);

     instance.defaultNotesTitle = function(fileId)
    {
        return instance.viewingArea(fileId).element(by.id('notes-title-default-notes-'+fileId));
    };

    instance.defaultNotesData = function(fileId) {
        return instance.viewingArea(fileId).element(by.id('notes-data-default-notes-'+ fileId));
    };

    instance.defaultNotesFirstNote = function(fileId) {
        return instance.viewingArea(fileId).all(by.id('notes-data-first-default-note-'+ fileId)).first();
    };

    instance.defaultNotesFirstNoteTimeStamp = function(fileId) {
        return instance.viewingArea(fileId).all(by.id('notes-data-first-default-note-time-stamp-'+ fileId)).first();
    };

    instance.historicalNotesData =function(fileId)
    {
        return instance.viewingArea(fileId).element(by.id('notes-data-historical-view-'+fileId));
    };

    instance.addNotesButton = function(fileId) {
        return new IR.Button({
            element: instance.viewer(fileId).element(by.id('add-notes-button-'+ fileId)),
            label: null
        });
    };
    return instance;
};

module.exports = fileFolderPreviewBase;