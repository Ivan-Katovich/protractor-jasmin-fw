var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var CreateTaskDiaryModal = function () { };

CreateTaskDiaryModal.prototype = Object.create({}, {

    createTaskContainer: { value: ".create-task-window " },

    taskDataContainer: { value: "ir-new-task " },

    diaryDataContainer: { value: "ir-new-diary " },

    attrContainer: { value: ".create-task-attr " },

    title: {
        get: function () {
            return element(by.css(this.createTaskContainer + ".vf-modal-header h3")).getText();
        }
    },

    flowDropdown: {
        get: function () {
            return element(by.css("[data-id='workflow']"));
        }
    },

    allFlows: {
        get: function () {
            return element.all(by.css("[data-id='workflow']~div li"));
        }
    },

    //param 'index' should start from 1
    flowDropdownElement: {
        value: function (index) {
            return this.allFlows.get(index);
        }
    },

    stepDropdown: {
        get: function () {
            return element(by.css("[data-id='step']"));
        }
    },

    allSteps: {
        get: function () {
            return element.all(by.css("[data-id='step']~div li"));
        }
    },
    
    //param 'index' should start from 1
    stepDropdownElement: {
        value: function (index) {
            return this.allSteps.get(index);
        }
    },

    assignToDropdown: {
        get: function () {
            return element(by.css("[id='assignTo']"));  
        }
    },

    assignToInput: {
        get: function () {
            return element(by.css("[id='assignTo'] input"));
        }
    },

    assignToAllUsers: {
        get: function () {
            return element.all(by.css("[id='assignTo'] ul li"));
        }
    },

    assignToDropdownElement: {
        value: function (index) {
            return this.assignToAllUsers.get(index);
        }
    },

    assignToValue: {
        get: function () {
            return element(by.css("[id='assignTo'] span span")).getText();
        }
    },

    priorityDropdown: {
        get: function () {
            return element(by.css("[data-id='priority']"));
        }
    },

    allPriorities: {
        get: function () {
            return element.all(by.css("[data-id='priority']~div li"));
        }
    },

    priorityDropdownElement: {
        value: function (index) {
            return this.allPriorities.get(index);
        }
    },

    availableDateInput: {
        get: function () {
            return element(by.id("availableDateId"));
        }
    },

    datepickerIcon: {
        get: function () {
            return element(by.css("#availableDateId~a"));
        }
    },

    description: {
        get: function () {
            return element(by.id("taskDescription"));
        }
    },

    cancelButton: {
        get: function () {
            return element(by.id("btnCancel"));
        }
    },

    doneButton: {
        get: function () {
            return element(by.id("btnOk"));
        }
    },

    taskAttrButton: {
        get: function () {
            return element(by.css(".create-task-attr div.task-attr-label span"));
        }
    },

    getClassOfTaskAttrButton: {
        get: function () {
            return element(by.css(".create-task-attr div.task-attr-label")).getAttribute("class");
        }
    },

    attributeGroups: {
        get: function () {
            return element.all(by.css(".attr-window-list .form-group"));
        }
    },

    resetButton: {
        get: function () {
            //return element(by.css(this.attrContainer + "ng-click='clearAttributes()'"));
            return element(by.css("[ng-click='clearAttributes()']"));
        }
    },

    getClassOfFlowDropdown: {
        get: function () {
            return element(by.xpath(".//button[@data-id='workflow']/..")).getAttribute("class");
        }
    },

    getClassOfStepDropdown: {
        get: function () {
            return element(by.xpath(".//button[@data-id='step']/..")).getAttribute("class");
        }
    },

    getClassOfPriorityDropdown: {
        get: function () {
            return element(by.xpath(".//button[@data-id='priority']/..")).getAttribute("class");
        }
    },

    getClassOfAvailableDateInput: {
        get: function () {
            return element(by.id("availableDate")).getAttribute("class");
        }
    },

    defaultFieldValue: {
        value: function (container, field) {
            switch (container) {
                case "task":
                    switch (field.toLowerCase()) {
                        case "flow":
                            return element.all(by.css('[name="taskForm"] .filter-option')).get(0).getText();
                        case "step":
                            return element.all(by.css('[name="taskForm"] .filter-option')).get(1).getText();
                        case "assigned to":
                            return element(by.css('.input-prompt')).getText();
                        case "priority":
                            return element.all(by.css('[name="taskForm"] .filter-option')).get(2).getText();
                        default:
                            return null;
                    }
                case "diary":
                    switch (field.toLowerCase()) {
                        case "assigned to":
                            return element(by.css('[id="assignTo"] span[ng-transclude]')).getText();
                        case "priority":
                            return element.all(by.css('.input-prompt')).get(1).getText();
                        case "description":
                            return element.all(by.css('.input-prompt')).get(2).getText();
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        }
    },

    chooseFlow: {
        value: function (flow, fn) {
            var self = this;
            self.flowDropdown.click();
            browser.sleep(1000);
            webdriverUtils.getItemIndex(this.allFlows, flow, function (flowIndex) {
                if (flowIndex > -1) {
                    webdriverUtils.clickOnElement(element.all(by.css("[data-id='workflow']~div li")).get(flowIndex));
                    fn(flowIndex);
                } else {
                    fn(null);
                }
            });
        }
    },

    selectFlow: {
        value: function (flow) {
            return this.flowDropdown.click().then(function () {
                return element.all(by.cssContainingText("[data-id='workflow']~div li", flow)).click();
            });
        }
    },

    selectFlowByNumber: {
        value: function (num) {
            var self = this;
            return this.flowDropdown.click()
                .then(function () {
                    return self.allFlows.get(num).click();
                });
        }
    }
});

module.exports = CreateTaskDiaryModal;

