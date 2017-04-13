var AddDocModal = function () { };

var addDocumentPopup = $('.import-modal');
var activeFile = $('.vf-tab-pane.active');

AddDocModal.prototype = Object.create({}, {

    //returns Add Document pop--up object's header
    addDocumentHeader: {
        get: function () {
            return addDocumentPopup.$('.vf-modal-header').$('.vf-modal-title');
        }
    },

    //returns 'Cancel' button of addDocument pop-up
    cancelAddDocument: {
        get: function () {
            return addDocumentPopup.element(by.buttonText("Cancel"));
        }
    },

    //returns add document concluding button of 'AddDocument" popup object
    finalizeAddDocument: {
        get: function () {
            return addDocumentPopup.element(by.id('btnOk'));
        }
    },

    importWithTaskButton: {
        get: function () {
            //return addDocumentPopup.element(by.buttonText("IMPORT WITH TASK"));
            return addDocumentPopup.element(by.cssContainingText('.vf-modal-footer [ng-click="ok();"]', 'Import with Task'));
        }
    },

    //returns the element object for the indexed doc being imported
    docToImport: {
        value: function (index) {
            //return element.all(by.repeater('item in uploader.queue')).get(index);//.getText()
            return $('.modal-content').all(by.css('ir-editable-text-box input')).get(index);
            //            return element.all(by.css('body > div.modal.fade.ng-isolate-scope.import-modal.in > div > div > div > div.modal-body > ng-include > div > div > form > div > div.doc-import-form > ir-add-add-document-upload > div > div > div > table > tbody > tr:nth-child(' + index + ') > td.upload-file-name.form-inline.upload-filename-readonly > div > ir-editable-text-box > div > input'));
        }
    },

    //I believe this can be removed. That cancel button to return the text back to it's original value no longer exists
    docNameCancelButton: {
        value: function (index) {
            return $('.modal-content').all(by.css('button.close')).get(index);
            //return element(by.css('body > div.modal.fade.ng-isolate-scope.import-modal.in > div > div > div > div.modal-body > ng-include > div > div > form > div > div.doc-import-form > ir-add-add-document-upload > div.upload-table > div > table > tbody > tr:nth-child(' + index + ') > td.upload-file-name.form-inline.upload-filename-readonly > div > ir-editable-text-box > div > button > i'));
        }
    },

    addDocAddTaskLink: {
        get: function () {
            return $('.modal-content').element(by.css('[ng-click="change()"]'));
        }
    },

    addDocRemoveTaskLink: {
        get: function () {
            return $('.modal-content').element(by.css('[ng-click="removeTask()"]'));
        }
    },

    addDocResetLink: {
        get: function () {
            return $('.modal-content').element(by.css('.clear-area'));
        }
    },

    //upload element
    uploadFileElement: {
        get: function () {
            return activeFile.element(by.tagName('ir-add-add-document')).element(by.tagName('button'));
        }
    },

    docTypeButton: {
        get: function () {
            return $('.modal-content').$('button[data-id="documentTypes"] span.filter-option'); //probably should be rewrote to span
        }
    },

    docTypes: {
        get: function () {
            return $('.modal-content').$('.dropdown-menu.open').all(by.className('text'));
        }
    },

    docDescription: {
        get: function () {
            return $('.modal-content').element(by.id('documentDescription'));
        }
    },

    docReceivedDate: {
        get: function () {
            return $('.modal-content').element(by.id('date-picker-received'));
        }
    },

    docDate: {
        get: function () {
            return $('.modal-content').element(by.id('date-picker'));
        }
    },

    getHours: {
        get: function () {
            return $('.modal-content').element(by.model('hours'));
        }
    },

    getMinutes: {
        get: function () {
            return $('.modal-content').element(by.model('minutes'));
        }
    },

    selectDocType: {
        value: function (typeToSelect) {
            return $('.modal-content').element(by.linkText(typeToSelect)).click();
        }
    },

    chooseFileInput: {
        get: function () {
            return $('.modal-content').element(by.css('input[type="file"]'));
        }
    },

    importModelDialogElement: {
        get: function () {
            return $('.import-modal').$('.modal-body');
        }
    },

    //returns the drag n drop cloud icon
    importDialogDragNDropCloud: {
        get: function () {
            return $('.modal-content').element(by.css('.fa-cloud-upload'));
        }
    },

    uploadedFiles: {
        get: function () {
            return $('.modal-content').all(by.css('.upload-table-inner .ir-upload-item'));
        }
    },

    uploadedFilesNames: {
        get: function () {
            return $('.modal-content').all(by.css('input[ng-attr-maxlength="{{maxLength}}"]')).getAttribute('value');////element.all(by.css("body > div.modal.fade.ng-isolate-scope.import-modal.in > div > div > div > div.modal-body > ng-include > div > div > form > div > div.doc-import-form > ir-add-add-document-upload > div > div > div > table > tbody > tr > td.upload-file-name.form-inline.upload-filename-readonly > div > input")).getAttribute('value');
        }
    },

    cancelUploadedFiles: {
        get: function () {
            return $('.modal-content').all(by.css('.upload-cancel button'));
        }
    }
});

module.exports = AddDocModal;
