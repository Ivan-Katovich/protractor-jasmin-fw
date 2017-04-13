exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var ReleaseDialog = require('./../../pageObjects/ModalDialogs/ReleaseDialog.js');
var releaseDialog = new ReleaseDialog();

var SetTaskAttributesModal = require('./../../pageObjects/ModalDialogs/SetTaskAttributesModal.js');
var taskAttributesModal = new SetTaskAttributesModal();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var tasksUtils = require('../../utils/tasksUtils.js');
var Q = require('q');
var releaseToNextStep = 'ReleaseToNextStep';
var releaseToEnd = 'ReleaseToEnd';
var releaseWithDialog = 'ReleaseWithDialog';
var noAttributesTask = 'TaskWithoutAttributes';
var noAttributesTaskMultilink = 'Task_SetReleaseOnMultiStep';
var noAttributesTaskForRelease = 'TaskNoAttributesForRelease';
var setAttrBeforeReleaseMessage = 'You must set required attributes before releasing this task.';

describe("To Do List - Release", function () {

    //todo: add verification of task history after release

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                webdriverUtils.clickOnElement(toDoList.dateFilter('ALL')).then(function () {
                    webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter);
                        browser.waitForAngular();
                    });
                });
            });
        });

        beforeAll(function () {
            tasksUtils.deleteAllTaskAttributes(noAttributesTask);
            tasksUtils.deleteAllTaskAttributes(noAttributesTaskForRelease);
            tasksUtils.deleteAllTaskAttributes(noAttributesTaskMultilink);
            tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 4');
            tasksUtils.routeTask(releaseToEnd, 'WFRelease', 'Manual 5');
            tasksUtils.routeTask(releaseWithDialog, 'WFRelease', 'Manual 1');
            tasksUtils.routeTask(noAttributesTaskMultilink, 'WFSetTaskAttributes', 'Manual 1');
            tasksUtils.routeTask(noAttributesTaskForRelease, 'SimpleWorkFlow1', 'Manual 1');
            tasksUtils.routeTask(noAttributesTask, 'SimpleWorkFlow1', 'Manual 1');
        });

        afterAll(function () {
            tasksUtils.deleteAllTaskAttributes(noAttributesTask);
            tasksUtils.deleteAllTaskAttributes(noAttributesTaskForRelease);
            tasksUtils.deleteAllTaskAttributes(noAttributesTaskMultilink);
            tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 4');
            tasksUtils.routeTask(releaseToEnd, 'WFRelease', 'Manual 5');
            tasksUtils.routeTask(releaseWithDialog, 'WFRelease', 'Manual 1');
            tasksUtils.routeTask(noAttributesTaskMultilink, 'WFSetTaskAttributes', 'Manual 1');
            tasksUtils.routeTask(noAttributesTaskForRelease, 'SimpleWorkFlow1', 'Manual 1');
            tasksUtils.routeTask(noAttributesTask, 'SimpleWorkFlow1', 'Manual 1');
        });

        it("1-should release a task to the next step when user clicks Release button and workflow contains next step", function () {
            var step = 'Manual 4';
            var nextStep = 'Manual 5';
            toDoList.searchInput.sendKeys(releaseToNextStep)
            .then(function () {
                return expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
            })
            .then(function(){
                return toDoList.hoverMouseOnTask(releaseToNextStep);
            })
            .then(function(){
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.releaseAction.click)
            .then(function () {
                browser.waitForAngular();
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(nextStep);
                tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                    expect(locked).toBe(false);
                });
            });
        });

        it("2-should release a task to the end when user clicks Release button and current step is the last step in the workflow and task is removed from the to do list", function () {
            var step = 'Manual 5';
            toDoList.searchInput.sendKeys(releaseToEnd).then(function () {
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                toDoList.hoverMouseOnTask(releaseToEnd);
                toDoList.clickCog();
                taskActionsDropdown.releaseAction.click();
                browser.waitForAngular();
                expect(toDoList.tasks.length).not.toBeDefined();
            });
        });

        it("3-should cancel Release when user clicks Cancel button in Release dialog in case of multilink steps", function () {
            var step = 'Manual 1';
            toDoList.searchInput.sendKeys(releaseWithDialog).then(function () {
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                toDoList.hoverMouseOnTask(releaseWithDialog);
                toDoList.clickCog();
                taskActionsDropdown.releaseAction.click();
                releaseDialog.nextStepDropdown.click().then(function () {
                    releaseDialog.nextStepDropdownElement(1).click();
                });
                releaseDialog.cancelButton.click();
                browser.waitForAngular().then(function () {
                    expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                    tasksUtils.ifTaskLocked(releaseWithDialog, function (locked) {
                        expect(locked).toBe(false);
                    });
                });
            });
        });

        it("4-should release to selected in dialog step when user clicks OK button in Release dialog in case of multilink steps", function () {
            var step = 'Manual 1';
            var nextStep = 'Manual 2';
            toDoList.searchInput.sendKeys(releaseWithDialog).then(function () {
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                toDoList.hoverMouseOnTask(releaseWithDialog);
                toDoList.clickCog();
                taskActionsDropdown.releaseAction.click();
                releaseDialog.nextStepDropdown.click().then(function () {
                    webdriverUtils.clickOnElement(releaseDialog.nextStepDropdownElement(1));
                });
                releaseDialog.okButton.click();
                browser.waitForAngular().then(function () {
                    expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(nextStep);
                    tasksUtils.ifTaskLocked(releaseWithDialog, function (locked) {
                        expect(locked).toBe(false);
                    });
                });
            });
        });

        it("5-When user attempt to release task without setting required attributes it should display modal window for setting attributes " +
                "with appropriate error message", function () {
                    var step = 'Manual 1';
                    toDoList.searchInput.sendKeys(noAttributesTask).then(function () {
                        expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                        toDoList.hoverMouseOnTask(noAttributesTask);
                        toDoList.clickCog();
                        taskActionsDropdown.releaseAction.click();
                        taskAttributesModal.title.then(function (title) {
                            expect(title).toEqual("Release task");
                        });
                        taskAttributesModal.youMustSetAttrMessage.then(function (message) {
                            expect(message).toEqual(setAttrBeforeReleaseMessage);
                            expect(taskAttributesModal.buttonRelease.isEnabled()).toBe(false);
                        });
                    });
                });

        it("6-When user attempt to release task on multilink step without setting required attributes it should display modal window " +
            "for setting attributes with appropriate error message and with a dropdown for selecting next step", function () {
                var step = 'Manual 1';
                toDoList.searchInput.sendKeys(noAttributesTaskMultilink).then(function () {
                    expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                    toDoList.hoverMouseOnTask(noAttributesTaskMultilink);
                    toDoList.clickCog();
                    taskActionsDropdown.releaseAction.click();
                    taskAttributesModal.title.then(function (title) {
                        expect(title).toEqual("Release task");
                    });
                    taskAttributesModal.youMustSetAttrMessage.then(function (message) {
                        expect(message).toEqual(setAttrBeforeReleaseMessage);
                        expect(taskAttributesModal.buttonRelease.isEnabled()).toBe(false);
                        expect(taskAttributesModal.nextStepDropdown.isDisplayed()).toBe(true);
                    });
                });
            });

        it("7-When user attempt to release task without setting required attributes but clicks Cancel in modal window then task should not be released", function () {
            var step = 'Manual 1';
            toDoList.searchInput.sendKeys(noAttributesTask).then(function () {
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                toDoList.hoverMouseOnTask(noAttributesTask);
                toDoList.clickCog();
                taskActionsDropdown.releaseAction.click();
                taskAttributesModal.title.then(function (title) {
                    expect(title).toEqual("Release task");
                });
                taskAttributesModal.buttonCancel.click();
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                tasksUtils.ifTaskLocked(noAttributesTask, function (locked) {
                    expect(locked).toBe(false);
                });
            });
        });

        it("8-When user attempt to release task with setting required attributes and clicks Release in modal window then task should be released", function () {
            var step = 'Manual 1';
            var nextStep = 'Manual 2';
            toDoList.searchInput.sendKeys(noAttributesTaskForRelease).then(function () {
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(step);
                toDoList.hoverMouseOnTask(noAttributesTaskForRelease);
                toDoList.clickCog();
                taskActionsDropdown.releaseAction.click();
                taskAttributesModal.title.then(function (title) {
                    expect(title).toEqual("Release task");
                });
                taskAttributesModal.userNameAttr.click();
                webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(1));
                taskAttributesModal.custNoAttr.sendKeys("3");
                expect(taskAttributesModal.buttonRelease.isEnabled()).toBe(true);
                taskAttributesModal.buttonRelease.click();
                browser.waitForAngular();
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(nextStep);
                tasksUtils.ifTaskLocked(noAttributesTaskForRelease, function (locked) {
                    expect(locked).toBe(false);
                });
            });
        });
    }
});