var AppendPageModal = function () { };

var activeFile = $('.vf-tab-pane.active');

AppendPageModal.prototype = Object.create({}, {

    addPagesToEmptyDocButton: {
        get: function () {
            return element(by.css('#file_415 > div.viewer-box > div.grid-wrapper > div.grid-right > div > div > div > div > div.file-level-buttons > span > ir-add-add-existing-document > button'));
        }
    },

    appendPageModal: {
        get: function () {
            return $('form[name="appendForms"]');
        }
    },

    appendModalHeader: {
        get: function () {
            return $('.modal-content').$('.vf-modal-title');
        }
    },

    // 'choose files' button in append page. Can sendKeys(filepath) in order to select file from os
    appendPageChooseFiles: {
        get: function () {
            return $('input[title="Choose Files"]');
        }
    },

    appendPageDragNDropIcon: {
        get: function () {
            return element(by.css('div.upload-table-nofiles'));
        }
    },

    //returns the indexed file from the append page dialog
    appendPageDocsToImport: {
        value: function (index) {
            return element(by.css('.table')).all(by.css('tr')).get(index).element(by.css('input'));
        }
    },

    appendCancelElement: {
        value: function(index) {
            return element(by.css('.table')).all(by.css('tr')).get(index).all(by.css('.upload-cancel'));
        }
    },

    appendUploadScroll: {
        get: function () {
            return $('.upload-table');
        }
    },

    //returns the cancel (x) element that appears when renaming a file in append to doc modal
    appendCancelEdit: {
        value: function (index) {
            return element(by.css('body > div.modal.fade.ng-isolate-scope.import-modal.modal-upload.in > div > div > div > div.modal-body > ng-include > form > div > ir-file-upload > div.upload-table > div > table > tbody > tr:nth-child(' + index + ') > td.upload-file-name.form-inline.upload-filename-readonly > div > ir-editable-text-box > div > button'));        //body > div.modal.fade.ng-isolate-scope.import-modal.modal-upload.in > div > div > div > div.modal-body > ng-include > form > div > div:nth-child(2) > div.upload-table > div > table > tbody > tr:nth-child(' + index + ') > td.upload-file-name.form-inline.upload-filename-readonly > div > ir-editable-text-box > div > button'));
        }
    },

    addToBeginning: {
        get: function () {
            return element(by.id('inputPositionAddToBeginning'));
        }
    },

    addToBeginningLabel: {
        get: function () {
            return element(by.id('inputPositionAddToBeginning')).element(by.xpath('./../label'));
        }
    },

    addToEnd: {
        get: function () {
            return element(by.id('inputPositionAddToEnd'));
        }
    },

    addToEndLabel: {
        get: function () {
            return element(by.id('inputPositionAddToEnd')).element(by.xpath('./../label'));
        }
    },

    appendDone: {
        get: function () {
            return element(by.buttonText('Add Pages'));
        }
    },

    appendCancel: {
        get: function () {
            return element(by.buttonText('Cancel'));
        }
    }
});

module.exports = AppendPageModal;
