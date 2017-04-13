var ObjectViewer = function () {};

ObjectViewer.prototype = Object.create( {}, {

    directiveAttribute: {
        value: function (directiveName, fileId) {
            return element(by.id(directiveName + '-' + fileId));
        }
    },

    fileActionsHistoricalNoteLevel: {
        value: function (fileId) {
            return element(by.id('ir-file-actions-historical-note-' + fileId));
        }
    },

    fileActionsPageLevel: {
        value: function (fileId) {
            return element(by.id('ir-file-actions-page-level-' + fileId));
        }
    },

    fileActionsFileFolderDocumentLevel: {
        value: function (fileId) {
            return element(by.id('ir-file-actions-file-and-folder-document-level-' + fileId));
        }
    }

});

module.exports = ObjectViewer;