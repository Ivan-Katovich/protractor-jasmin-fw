var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var ToDoList = function () { };

ToDoList.prototype = Object.create({}, {

    container: { value: ".todo-container " },

    searchInput: {
        get: function () {
            return element.all(by.css('.searchbox input')).get(0);
        }
    },

    noTasksMessageDisplayed: {
        get: function () {
            return element.all(by.css('.todo-notodos')).get(0);
        }
    },

    flowFilter: {
        get: function () {
            return element.all(by.css('.todo-filter')).get(0);
        }
    },

    isFlowFilterSet: {
        get: function () {
            return element.all(by.xpath(".//i[@class='fa fa-filter']/..")).get(0).getAttribute('class');
        }
    },

    allFlowsCheckbox: {
        get: function () {
            return element(by.css('label.fa[for="all_flows"]'));
        }
    },

    isAllFlowsCheckboxChecked: {
        get: function () {
            return element(by.id("all_flows")).getAttribute('checked');
        }
    },

    flows: {
        get: function () {
            return element.all(by.css('li[ng-repeat="flow in flows"] i~div'));
        }
    },

    flow: {
        value: function (index) {
            return this.flows.get(index);
        }
    },

    flowCheckbox: {
        value: function (index) {
            return element.all(by.model('flow.checked')).get(index);
        }
    },

    expandFlow: {
        value: function (index) {
            element(by.css('.filter-list-item i')).getAttribute("class").then(function (value) {
                if (value === "fa fa-caret-right") {
                    element.all(by.repeater('flow in flows')).get(index).element(by.css('i')).click();
                }
            });
        }
    },

    collapseFlow: {
        value: function (index) {
            element(by.css('.filter-list-item i')).getAttribute("class").then(function (value) {
                if (value === "fa fa-caret-down") {
                    element.all(by.repeater('flow in flows')).get(index).element(by.css('i')).click();
                }
            });
        }
    },

    allStepsInFlow: {
        value: function (index) {
            return element.all(by.css(".steps-list")).get(index).all(by.repeater("step in flow.children"));
        }
    },

    stepInFlow: {
        value: function (flowIndex, stepIndex) {
            return this.allStepsInFlow(flowIndex).get(stepIndex).element(by.css("div.todo-checkbox"));
        }
    },

    settingsFilter: {
        get: function () {
            return element(by.css('.todo-settings'));
        }
    },

    allTasksCheckbox: {
        get: function () {
            return element(by.css('div[ng-click="checkAllChanged()"] span'));
        }
    },

    allTasksCheckboxState: {
        get: function () {
            return element(by.css('div[ng-click="checkAllChanged()"] i'));
        }
    },

    toMeTasksCheckbox: {
        get: function () {
            return element(by.css('div#Assigned span'));
        }
    },

    toMeTasksCheckboxState: {
        get: function () {
            return element(by.css('div#Assigned i'));
        }
    },

    toGroupTasksCheckbox: {
        get: function () {
            return element(by.xpath('//*[@id="Group"]/span'));
        }
    },

    toGroupTasksCheckboxState: {
        get: function () {
            return element(by.xpath('//*[@id="Group"]//i'));
        }
    },

    unassignedTasksCheckbox: {
        get: function () {
            return element(by.css('div#Unassigned span'));
        }
    },

    unassignedTasksCheckboxState: {
        get: function () {
            return element(by.css('div#Unassigned i'));
        }
    },

    buddyExpander: {
        get: function () {
            return element(by.css('.buddy-toggle'));
        }
    },

    buddies: {
        get: function () {
            return element.all(by.repeater('buddy in possibleBuddies'));
        }
    },

    buddyCheckbox: {
        value: function (buddyID) {
            return element(by.css(".fa[for=\"buddy" + buddyID + "\"]"));
        }
    },

    buddyCheckboxState: {
        value: function (buddyID) {
            return element(by.css("[id=\"buddy" + buddyID + "\"]"));
        }
    },

    buddyName: {
        value: function (buddyID) {
            return element(by.css(".fa[for=\"buddy" + buddyID + "\"] ~ label")).getText();
        }
    },

    dateFilter: {
        value: function (value) {
            switch (value) {
                case "TODAY":
                    return element(by.css("div[ng-click=\"changeDateFilter('Today')\"] span"));
                case "WEEK":
                    return element(by.css("div[ng-click=\"changeDateFilter('Week')\"] span"));
                case "+30 DAYS":
                    return element(by.css("div[ng-click=\"changeDateFilter('Month')\"] span"));
                case "ALL":
                    return element(by.css("div[ng-click=\"changeDateFilter('All')\"] span"));
                default:
                    return null;
            }
        }
    },

    dateFilterState: {
        value: function (value) {
            switch (value) {
                case "TODAY":
                    return element(by.css("div[ng-click=\"changeDateFilter('Today')\"] i"));
                case "WEEK":
                    return element(by.css("div[ng-click=\"changeDateFilter('Week')\"] i"));
                case "+30 DAYS":
                    return element(by.css("div[ng-click=\"changeDateFilter('Month')\"] i"));
                case "ALL":
                    return element(by.css("div[ng-click=\"changeDateFilter('All')\"] i"));
                default:
                    return null;
            }
        }
    },

    tasks: {
        get: function () {
            return element.all(by.css('.todo-container ul.todo-list-items li[ng-repeat]'));
        }
    },

    taskFileName: {
        value: function (index) {
            return element.all(by.css('ir-task-item .todo-item h3')).get(index);
        }
    },

    priorityAndDate: {
        value: function (index) {
            return element.all(by.css('ir-task-item .task-priority')).get(index);
        }
    },

    priority: {
        value: function (index, fn) {
            this.priorityAndDate(index).getText().then(function (text) {
                var outgoingArray = text.split("|");
                fn(outgoingArray[0].trim());
            });
        }
    },

    availableDate: {
        value: function (index, fn) {
            this.priorityAndDate(index).getText().then(function (text) {
                var outgoingArray = text.split("|");
                fn(outgoingArray[1].trim());
            });
        }
    },

    allTaskDescriptions: {
        get: function () {
            return element.all(by.css('ir-task-item .todo-item-description'));
        }
    },

    taskDescription: {
        value: function (index) {
            return this.allTaskDescriptions.get(index);
        }
    },

    taskDetailsExpander: {
        value: function (index) {
            return element.all(by.css('ir-task-item .show-task-description')).get(index);
        }
    },

    expandAllTasks: {
        value: function () {
            this.tasks.count().then(function (count) {
                for (var i = 0; i < count; i++) {
                    element.all(by.css('ir-task-item .show-task-description')).get(i).click();
                    browser.sleep(500);
                    browser.actions().sendKeys(protractor.Key.DOWN).perform();
                    browser.sleep(200);
                }
            });
        }
    },

    getTaskDetails: {
        value: function (index, value) {
            switch (value) {
                case "Flow":
                    return element.all(by.css('ir-task-item .todo-item-title')).get(index).all(by.css('.todo-detail-row [title]')).get(0);
                case "Step":
                    return element.all(by.css('ir-task-item .todo-item-title')).get(index).all(by.css('.todo-detail-row [title]')).get(1);
                case "Assigned to":
                    return element.all(by.css('ir-task-item .todo-item-title')).get(index).all(by.css('.todo-detail-row [title]')).get(2);
                case "FileNumber":
                    return element.all(by.css('ir-task-item .todo-item-title')).get(index).all(by.css('h4')).get(0);
                case "Sent by":
                    return element.all(by.css('.todo-item-details')).get(index).all(by.css('.value')).get(0);
                case "Sent on":
                    return element.all(by.css('.todo-item-details')).get(index).all(by.css('.value')).get(1);
                default:
                    return null;
            }
        }
    },

    taskBody: {
        value: function (index) {
            return this.allTaskDescriptions.get(index);
        }
    },

    task: {
        value: function (task) {
            switch (typeof (task)) {
                case 'number':
                    return this.tasks.get(task);
                case 'string':
                    return element(by.cssContainingText(this.container + '.ir-list-item .todo-item-description', task));
            };
        }
    },

    hoverMouseOnTask: {
        value: function (task) {
            return browser.actions()
                    .mouseMove(this.task(task), { x: 5, y: 5 })
                    .mouseDown()
                    .perform();
        }
    },

    clickCog: {
        value: function () {
            return element.all(by.css(this.container + 'ir-task-item .fa.fa-cog')).filter(function (elem) {
                return elem.isDisplayed();
            }).first().click()
            .then(function () {
                return browser.sleep(2000);
            })
        }
    },

    isEyeVisible: {
        value: function () {
            return element.all(by.css(this.container + 'ir-task-item .fa.fa-eye')).filter(function (elem) {
                return elem.isDisplayed();
            }).then(function (array) {
                return (array.length > 0) ? true : false;
            });
        }
    },

    isCogVisible: {
        value: function () {
            return element.all(by.css(this.container + 'ir-task-item .fa.fa-cog')).filter(function (elem) {
                return elem.isDisplayed();
            }).then(function (array) {
                return (array.length > 0) ? true : false;
            });
        }
    },

    taskPreviewIcon: {
        value: function (index) {
            browser.actions().mouseMove(this.taskDescription(index)).perform();
            return this.taskPreviewIconNotHovered(index);
        }
    },

    taskPreviewIconNotHovered: {
        value: function (index) {
            return element.all(by.css('.todo-container ir-task-item .task-item-actions div i')).get(index);
        }
    },

    taskPreviewEye: {
        value: function (index) {
            return element.all(by.css('.todo-container ir-task-item .task-item-actions .preview-action')).get(index);
        }
    },

    footer: {
        get: function () {
            return element(by.css('.todo-footer'));
        }
    },

    tasksInFooter: {
        get: function () {
            return element(by.css('.todo-task-value'));
        }
    },

    getTaskCount: {
        value: function (fn) {
            var footer = this.footer.getText().then(function (f) {
                return f.split(" ");
            });
            footer.then(function (footerCount) {
                fn(parseInt(footerCount[4]));
            });
        }
    },

    chooseFlow: {
        value: function (flow, fn) {
            var _flows = this.flows;
            var _flowFilter = this.flowFilter;
            return webdriverUtils.clickOnElement(_flowFilter).then(function () {
                element(by.css('label.fa[for="all_flows"]')).click().then(function () { //uncheck All Flows checkbox
                    webdriverUtils.getItemIndex(_flows, flow, function (flowIndex) {
                        _flows.get(flowIndex).click();
                        _flowFilter.click();
                        fn();
                    });
                });
            });
        }
    },

    findTask: {
        value: function (taskDescription, fn) {
            element.all(by.css('.searchbox input')).get(0).clear()
            .then(function () {
                return element.all(by.css('.searchbox input')).get(0).sendKeys(taskDescription);
            })
            .then(function () {
                fn();
            })
        }
    },

    findTask: {
        value: function (flow, taskDescription, fn) {
            element.all(by.css('.searchbox input')).get(0).clear()
            .then(function () {
                return element.all(by.css('.searchbox input')).get(0).sendKeys(taskDescription);
            })
            .then(function () {
                fn();
            })
        }
    }
});

module.exports = ToDoList;
