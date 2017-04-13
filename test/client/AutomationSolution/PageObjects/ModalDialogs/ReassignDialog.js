var ReassignDialog = function () { };

ReassignDialog.prototype = Object.create({}, {

    reassignContainer: {
        get: function () {
            return element(by.css('body > div.modal.fade.ng-isolate-scope.in > div > div > div'));
        }
    },

    header: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header"));
        }
    },

    assignToInput: {
        get: function () {
            return element(by.css('#assignedTo input'));
       
        }
    },

    assignToDropdown: {
        get: function () {
            return element(by.css('#assignedTo'));
        }
    },

    assignToElements: {
        value: function () {
            return element(by.css('#assignedTo > ul')).all(by.tagName('a'));
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
    },

    priorityDropdown: {
        get: function () {
            return element(by.css('#priority~div'));
        }
    },

    priorityElements: {
        value: function () {
            return element(by.css('#priority~div ul')).all(by.tagName('a'));
        }
    }
});

module.exports = ReassignDialog;
