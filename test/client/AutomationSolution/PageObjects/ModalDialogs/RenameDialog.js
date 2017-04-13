var RenameDialog = function () { };

RenameDialog.prototype = Object.create({}, {

    renameContainer: {
        get: function () {
            return element(by.css('body > div.modal.fade.ng-isolate-scope.import-modal.in > div > div > div'));
        }
    },

    header: {
        get: function () {
            return element(by.css("body > div.modal.fade.ng-isolate-scope.import-modal.in > div > div > div > div.vf-modal-header > h3"));
        }
    },

    newNameInput: {
        get: function () {
            return element(by.css('#contentDescription'));
        }
    },

    cancelButton: {
        get: function () {
            return element(by.css('#btnCancel'));
        }
    },

    okButton: {
        get: function () {
            return element(by.css('#btnOk'));
        }
    }
});

module.exports = RenameDialog;
