var ReleaseDialog = function () { };

ReleaseDialog.prototype = Object.create({}, {

    cancelButton: {
        get: function () {
            return element(by.id('btnCancel'));
        }
    },

    okButton: {
        get: function () {
            return element(by.id('btnRelease'));
        }
    },
    
    nextStepDropdown: {
        get: function () {
            return element(by.css("button[data-id='releaseSteps']"));
        }
    },
    
    nextStepDropdownElement: {
        value: function (index) {
            return element.all(by.css('select#releaseSteps~div li')).get(index);
        }
    }
});

module.exports = ReleaseDialog;

