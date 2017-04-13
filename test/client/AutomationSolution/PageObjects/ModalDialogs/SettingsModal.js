var SettingsModal = function () { };

SettingsModal.prototype = Object.create({}, {

    header: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header"));
        }
    },

    okButton: {
        get: function () {
            return element(by.id('btnOk'));
        }
    },

    okButtonOnError: {
        get: function () {
            return element.all(by.id('btnOk')).get(1);
        }
    },

    cancelButton: {
        get: function () {
            return element(by.id('btnCancel'));
        }
    },

    irConnectPort: {
        get: function () {
            return element(by.css('.change-settings-dialog input'));
        }
    }
});

module.exports = SettingsModal;

