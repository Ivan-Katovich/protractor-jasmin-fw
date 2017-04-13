var MoveSelectionDialog = function () { };

MoveSelectionDialog.prototype = Object.create({}, {

    cancelButton: {
        get: function () {
            return element(by.css('#btnCancel'));
        }
    },

    continueButton: {
        get: function () {
            return element(by.css('#btnOk'));
        }
    },
    
    title: {
        value: function (titleVal) {
            return element(by.cssContainingText('.vf-modal-title', titleVal));
        }
    },
    
    entireDocumentRadiobutton: {
        get: function () {
            return element(by.id('rBtnAll'));
        }
    },
    
    specificPagesRadiobutton: {
        get: function () {
            return element(by.id('rBtnPages'));
        }
    },
    
    pagesInput: {
        get: function () {
            return element(by.model('settings.pagesList'));
        }
    },
    
    formatWarning: {
        get: function () {
            return element(by.cssContainingText('.text-danger', 'The page list format is not correct.'));
        }
    }
});

module.exports = MoveSelectionDialog;

