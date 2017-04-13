exports.tags = ['Workflow_Tasks', 'To_Do_List_Tree_Navigation'];
var LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js');
var lockedTaskView = new LockedTaskView();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var IR_ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new IR_ToDoList();

var tasksUtils = require('../../utils/tasksUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var conversionUtils = require('../../utils/conversionUtils.js');


describe("To Do List - Keyboard Navigation", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);

        });

        it("1-User should be able to navigate between tasks in ToDoList by using keyboard arrows up and down", function () {
            webdriverUtils.isElementFocused(toDoList.tasks.get(0));
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            webdriverUtils.isElementFocused(toDoList.tasks.get(1));
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            webdriverUtils.isElementFocused(toDoList.tasks.get(2));
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            webdriverUtils.isElementFocused(toDoList.tasks.get(3));
            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
            webdriverUtils.isElementFocused(toDoList.tasks.get(2));
            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
            webdriverUtils.isElementFocused(toDoList.tasks.get(1));
            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
            webdriverUtils.isElementFocused(toDoList.tasks.get(0));
            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
        });

        it("2-User should be able to expand and collapse tasks in ToDoList by using keyboard arrows right and left", function () {
            expect(toDoList.getTaskDetails(0, 'Sent by').isDisplayed()).toBe(false);
            expect(toDoList.getTaskDetails(0, 'Sent on').isDisplayed()).toBe(false);
            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
            expect(toDoList.getTaskDetails(0, 'Sent by').isDisplayed()).toBe(true);
            expect(toDoList.getTaskDetails(0, 'Sent on').isDisplayed()).toBe(true);
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            expect(toDoList.getTaskDetails(1, 'Sent by').isDisplayed()).toBe(false);
            expect(toDoList.getTaskDetails(1, 'Sent on').isDisplayed()).toBe(false);
            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
            expect(toDoList.getTaskDetails(1, 'Sent by').isDisplayed()).toBe(true);
            expect(toDoList.getTaskDetails(1, 'Sent on').isDisplayed()).toBe(true);
            browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
            expect(toDoList.getTaskDetails(1, 'Sent by').isDisplayed()).toBe(false);
            expect(toDoList.getTaskDetails(1, 'Sent on').isDisplayed()).toBe(false);
            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
            browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
            expect(toDoList.getTaskDetails(0, 'Sent by').isDisplayed()).toBe(false);
            expect(toDoList.getTaskDetails(0, 'Sent on').isDisplayed()).toBe(false);
        });

        it("3-User should be able to lock and open a focuced task by pressing Enter key from To Do List", function () {
            webdriverUtils.isElementFocused(toDoList.tasks.get(0));
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            toDoList.taskDescription(1).getText().then(function (task) {
                browser.actions().sendKeys(protractor.Key.ENTER).perform();
                browser.driver.wait(function () {
                    return lockedTaskView.taskDescription.isDisplayed().then(function (element) {
                        return element === true;
                    });
                }).then(function () {
                    //Verify that tasks is open in the locked task view
                    expect(lockedTaskView.taskDescription.getText()).toBe(task);
                    //expect ToDoList is closed after opening a task
                    expect(toDoList.searchInput.isDisplayed()).toBe(false);
                    lockedTaskView.taskActionsIcon.click();
                    taskActionsDropdown.container = lockedTaskView.container;
                    taskActionsDropdown.closeAction.click();
                    browser.waitForAngular();
                });
            });
        });
    }
});