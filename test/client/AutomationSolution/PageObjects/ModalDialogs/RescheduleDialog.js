var RescheduleDialog = function () { };

RescheduleDialog.prototype = Object.create({}, {

    rescheduleContainer: {
        get: function () {
            return element(by.css('body > div.modal.fade.ng-isolate-scope.in > div > div > div'));
        }
    },

    header: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header"));
        }
    },

    datePickerIcon: {
        get: function() {
            return element(by.css(".reschedule-dialog .input-group i.fa-calendar"));
        }
    },

    textInput: {
        get: function () {
            return element(by.css('.reschedule-dialog .input-group input'));
        }
    },

    cancelButton: {
        get: function () {
            return element(by.css('#btnCancel'));
        }
    },

    finalizeButton: {
        get: function () {
            return element(by.css('#btnOk'));
        }
    }
});

module.exports = RescheduleDialog;
