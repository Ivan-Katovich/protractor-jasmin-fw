exports.tags = ['Workflow_Tasks', 'To_Do_List_Tree_Navigation'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var IR_ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new IR_ToDoList();

var Q = require('q');
var tasksUtils = require('../../utils/tasksUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var conversionUtils = require('../../utils/conversionUtils.js');

var task = 'TaskDetailsTest';
var searchKeyword = 'TaskDetailsTest';
var fileName = 'FileWithDifferentTasks';
var priority = 'PRIORITY 1';
var flow = 'SimpleWorkFlow1';
var step = 'Manual 3';
var fileNumber = 'FileWithDifferentTasks';
var sendBy = 'XP1';
var sendOn = '12/22/2015';
var assignedTo = 'Unassigned';
var actionsInOrder = "Open Task\n[Enter]\nSet Attributes\nRelease\nReassign. . .\nReschedule. . .\nRoute. . .\nEdit Task . . .\nDelete";

describe("To Do List - Task Details", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function(){
                webdriverUtils.clickOnElement(toDoList.dateFilter('ALL'));
            })
            .then(function(){
                return webdriverUtils.clickOnElement(toDoList.allTasksCheckbox);
            })
            .then(function(){
                return webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function(){
                return browser.waitForAngular();
            })
        });

        it("1-should display File name, File Number, Description, Flow, Step and Priority when task is collapsed", function () {
            return toDoList.searchInput.sendKeys(searchKeyword)
            .then(function () {
                return toDoList.tasks.count()
            })
            .then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                expect(toDoList.taskFileName(0).getText()).toContain(fileName);
                expect(toDoList.taskDescription(0).getText()).toContain(searchKeyword);
                expect(toDoList.priorityAndDate(0).getText()).toContain(priority);
                expect(toDoList.getTaskDetails(0, 'FileNumber').getText()).toContain(fileNumber.toUpperCase());
                expect(toDoList.getTaskDetails(0, 'Flow').getText()).toContain(flow);
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                expect(toDoList.getTaskDetails(0, 'Assigned to').getText()).toContain(assignedTo);
            });
        });

        it("2-should show 'sent by' and 'sent on' after expanding of the task and hide after collapsing", function () {
            return toDoList.searchInput.sendKeys(searchKeyword)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return toDoList.tasks.count();
            })
            .then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                expect(toDoList.getTaskDetails(0, 'Sent by').isDisplayed()).toBe(false);
                expect(toDoList.getTaskDetails(0, 'Sent on').isDisplayed()).toBe(false);
                toDoList.taskDetailsExpander(0).click();
                expect(toDoList.getTaskDetails(0, 'Sent by').isDisplayed()).toBe(true);
                expect(toDoList.getTaskDetails(0, 'Sent on').isDisplayed()).toBe(true);
                expect(toDoList.getTaskDetails(0, 'Sent by').getText()).toEqual(sendBy);
                expect(toDoList.getTaskDetails(0, 'Sent on').getText()).toEqual(sendOn);
            });
        });

        xit("3-should display tasks ordered by priority and ordered by available date within identical priority", function (done) {
            var priority = "PRIORITY 0";
            var priorityArray = [];
            var dateArray = [];
            toDoList.tasks.count()
            .then(function (count) {
                var promises = [];
                for (var i = 0; i < count; i++) {
                    promises.push(toDoList.priorityAndDate(i).getText());
                }
                Q.all(promises).done(function (resultArray) {
                    for (var i = 0; i < resultArray.length; i++) {
                        var outgoingArray = resultArray[i].split("|");
                        priorityArray.push(outgoingArray[0].trim());
                    }
                    if (outgoingArray[0].trim() === priority) {
                        dateArray.push(new Date(outgoingArray[1].trim()));
                    }
                    expect(webdriverUtils.ifOrderedByPriority(priorityArray)).toBe(true)
                    expect(conversionUtils.isArraySortedAscending(dateArray)).toBe(true);
                    toDoList.searchInput.sendKeys(searchKeyword)
                    .then(function () {
                        return browser.sleep(5000);
                    })
                    .then(function () {
                        toDoList.availableDate(0, function (UIdate) {
                            tasksUtils.getAvailableDate(searchKeyword, function (DBdate) {
                                done(function () {
                                    if (!DBdate) {
                                        expect(true).toBe(false);
                                    } else {
                                        expect(DBdate.getMonth()).toEqual(new Date(UIdate).getMonth());
                                        expect(DBdate.getDate()).toEqual(new Date(UIdate).getDate());
                                        expect(DBdate.getFullYear()).toEqual(new Date(UIdate).getFullYear());
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });

        it("4-it should display all possible task actions in actions list in correct order", function () {
            return toDoList.searchInput.sendKeys(task)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function(){
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function(){
                return toDoList.clickCog();
            })
            .then(function(){
                return taskActionsDropdown.actionsText.getText();
            })
            .then(function (text) {
                expect(text).toEqual(actionsInOrder);
            });
        });

        it("5-User should see Preview and Task Actions icons only after hovering the mouse over the task", function () {
            return toDoList.searchInput.sendKeys(task)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return toDoList.isCogVisible();
            })
            .then(function (visible) {
                return expect(visible).toBe(false);
            })
            .then(function () {
                return toDoList.isEyeVisible();
            })
            .then(function (visible) {
                return expect(visible).toBe(false);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.isCogVisible();
            })
            .then(function (visible) {
                return expect(visible).toBe(true);
            })
            .then(function () {
                return toDoList.isEyeVisible();
            })
            .then(function (visible) {
                return expect(visible).toBe(true);
            });
        });
    }
});