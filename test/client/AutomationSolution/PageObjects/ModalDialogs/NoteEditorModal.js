var NoteEditorModal = function () { };

NoteEditorModal.prototype = Object.create({}, {

    title: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header")).getText();
        }
    },
   
    buttonCancel: {
        get: function () {
            return element(by.css(".vf-modal-footer:not(.ng-hide) button[ng-click='cancel()']"));
        }
    },

    buttonAddNotes: {
        get: function () {
            return element(by.css(".vf-modal-footer:not(.ng-hide) button[ng-click='ok();']"));
        }
    },

    textEditor: {
        get: function () {
            return element(by.css("[title='Rich Text Editor, body']"));
        }
    },

    textMemo: {
        get: function(){
            return element(by.css(".cke_editable.cke_editable_themed.cke_contents_ltr p"));
        }
    }
});

module.exports = NoteEditorModal;

