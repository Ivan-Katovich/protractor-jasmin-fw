var RouteDialog = function () { };

RouteDialog.prototype = Object.create({}, {

    header: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header"));
        }
    },

    cancelButton: {
        get: function () {
            return element(by.css('#btnCancel'));
        }
    },

    routeButton: {
        get: function () {
            return element(by.css('#btnOk'));
        }
    },
    
    workflowDropdown: {
        get: function () {
            return element(by.css('[data-id="workflow"]'));
        }
    },
    
    workflowDropdownElements: {
        get: function () {
            return element.all(by.css('[data-id="workflow"] ~ div a'));
        }
    },
    
    stepDropdown: {
        get: function () {
            return element(by.css('[data-id="workstep"]'));
        }
    },
    
    stepDropdownElements: {
        get: function () {
            return element.all(by.css('[data-id="workstep"] ~ div a'));
        }
    },

    assignDropdown: {
        get: function () {
            return element(by.css('#assignTo'));
        }
    },
    
    assignDropdownInput: {
        get: function () {
            return element(by.css('#assignTo input.form-control'));
        }
    },
    
    assignDropdownValue: {
        get: function () {
            return element(by.css('#assignTo span span'));
        }
    },
    
    assignDropdownElements: {
        get: function () {
            return element.all(by.css('#assignTo li a'));
        }
    },
    
    priorityDropdown: {
        get: function () {
            return element(by.css('[data-id="priority"]'));
        }
    },
    
    priorityDropdownElements: {
    get: function () {
        return element.all(by.css('[data-id="priority"] ~ div a'));
    }
}
});

module.exports = RouteDialog;
