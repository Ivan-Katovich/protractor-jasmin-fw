var EditTaskDialog = function () { };

EditTaskDialog.prototype = Object.create({}, {

    changePriorityContainer: {
        get: function() {
            return element(by.css('body > div.modal.fade.ng-isolate-scope.in > div > div > div'));
        }
    },

    header: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header"));
        }
    },

    dropdown: {
        get: function () {
            return element(by.css('.modal-dialog .bootstrap-select button'));
           // return $('.form-group.ir-input').$('.fixed-col1').$('.btn-group');
        }
    },

    dropdownElements: {
        value: function () {
            return element(by.css('.modal-dialog .bootstrap-select ul')).all(by.tagName('a'));
           // return $('.form-group.ir-input').$('.fixed-col1').$('.btn-group').$('.dropdown-menu').all(by.tagName('a'));
        }
    },

    priorityDropdownElement: {
        value: function (index) {
            return element.all(by.css(".change-priority-dialog ul li")).get(index);
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

    taskDescription: {
        get: function () {
            return element(by.css('.change-priority-dialog input'));
        }
    }
});

module.exports = EditTaskDialog;
