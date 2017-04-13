
var IR = require('../ir.js');

var config = {
    isPreview: true
};

var historicalNotePreview = function () {
    var instance = new IR.view(config);

    instance.historicalNotesTitle = function(fileId)
    {
        return instance.viewingArea(fileId).element(by.id('notes-title-historical-view-'+fileId));
    };

    instance.historicalNotesData = function(fileId)
    {
        return instance.viewingArea(fileId).element(by.id('notes-data-historical-view-'+fileId));
    };

    instance.historicalNotesFirstNote = function(fileId)
    {
        return instance.viewingArea(fileId).all(by.id('notes-data-first-historical-note-'+fileId)).first();
    };

    instance.historicalNotesFirstNoteTimeStamp = function(fileId)
    {
        return instance.viewingArea(fileId).all(by.id('notes-data-first-historical-note-time-stamp-'+fileId)).first();
    };

    instance.defaultNotesData =function(fileId)
    {
        return instance.viewingArea(fileId).element(by.id('notes-data-default-notes-'+ fileId));
    };

    instance.addNotesButton = function(fileId) {
        return new IR.Button({
            element: instance.viewer(fileId).element(by.id('add-notes-button-'+ fileId)),
            label: null
        });
    };
    return instance;
};

module.exports = historicalNotePreview;