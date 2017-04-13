var EmailDownloadPrintDialog = function () { };

EmailDownloadPrintDialog.prototype = Object.create({}, {

    cancelButton: {
        get: function () {
            //Has to be a better way to select it
            return element.all(by.css('.vf-modal-footer button')).get(1);
        }
    },

    nextButton: {
        get: function () {
            //Same situation as the cancelButton
            return element.all(by.css('.vf-modal-footer button')).get(2);
        }
    },

    title: {
        value: function (titleVal) {
            return element(by.cssContainingText('#modal-title', titleVal));
        }
    },

    entireDocumentRadiobutton: {
        get: function () {
            return element(by.id('pr1'));
        }
    },

    specificPagesRadiobutton: {
        get: function () {
            return element(by.id('pr2'));
        }
    },

    removeItemInModal: {
        get: function () {
            return element.all(by.css('button.close')).get(0);
        }
    },

    getNumberOfElementsInModal: {
        get: function () {
            return element.all(by.css('.form-control.ellipsis'));
        }
    },

    withAnnotationsCheckbox: {
        get: function () {
            return element(by.css('#withAnnotationsCheckBox'));
        }
    },

    withAnnotationsCheckboxState: {
        get: function () {
            return element(by.id('pr3'));
        }
    },

    itemByIndex: {
        value: function (index) {
            return element(by.css('.table')).all(by.css('tr')).get(index).element(by.css('input'));
        }
    },

    renameInputField: {
        get: function () {
            return element(by.css('#pr4'));
        }
    },

    formatWarning: {
        get: function () {
            return element(by.cssContainingText('.text-danger', 'The page list format is not correct.'));
        }
    }
});

module.exports = EmailDownloadPrintDialog;

