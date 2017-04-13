exports.tags = ['Workflow_Tasks', 'To_Do_List_Search'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();
var Q = require('q');

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var noTasksMessage = 'You have no items.';
var noTasksInFooter = '0 TASKS';

describe("To Do List - Find", function () {

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

        it("should return no tasks in To Do List when entered invalid search keyword", function () {
            var searchKeyword = 'Invalid%#@!';
            toDoList.searchInput.sendKeys(searchKeyword).then(function () {
                expect(toDoList.tasks.length).not.toBeDefined();
                expect(toDoList.noTasksMessageDisplayed.getText()).toContain(noTasksMessage);
                expect(toDoList.footer.getText()).toEqual(noTasksInFooter);
            });
        });

        it("should return all tasks in To Do List when nothing is entered", function () {
            var searchKeyword = '';
            toDoList.searchInput.sendKeys(searchKeyword).then(function () {
                toDoList.footer.getText().then(function (text) {
                    var footerText = text.split(' ');
                    expect(footerText[0]).toEqual(footerText[2]);
                });
            });
        });

        it("should return tasks by Description when appropriate value of Description entered as a search keyword and count in footer should be updated", function () {
            var searchKeyword = 'TaskDetailsTest';
            toDoList.searchInput.sendKeys(searchKeyword);
            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                for (var i = 0; i < tasksCount; i++) {
                    toDoList.taskDetailsExpander(i).click();
                    browser.waitForAngular();
                    expect(toDoList.taskDescription(i).getText()).toContain(searchKeyword);
                    toDoList.footer.getText().then(function (text) {
                        var footerText = text.split(' ');
                        expect(footerText[0]).toEqual(tasksCount.toString());
                    });
                }
            });
        });

        it("should return tasks by File Name when appropriate value of File Name entered as a search keyword", function () {
            var searchKeyword = 'FileWithTasks_N2';
            toDoList.searchInput.sendKeys(searchKeyword);
            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                for (var i = 0; i < tasksCount; i++) {
                    expect(toDoList.taskFileName(i).getText()).toContain(searchKeyword);
                }
            });
        });

        it("should return tasks by Flow when appropriate value of Flow entered as a search keyword", function () {
            var searchKeyword = 'SimpleWorkFlow1';
            toDoList.searchInput.sendKeys(searchKeyword);
            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                for (var i = 0; i < tasksCount; i++) {
                    expect(toDoList.getTaskDetails(i, 'Flow').getText()).toContain(searchKeyword);
                }
            });
        });

        it("should return tasks by Step when appropriate value of Step entered as a search keyword", function () {
            var searchKeyword = 'Manual 1';
            toDoList.searchInput.sendKeys(searchKeyword);
            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                for (var i = 0; i < tasksCount; i++) {
                    expect(toDoList.getTaskDetails(i, 'Step').getText()).toContain(searchKeyword);
                }
            });
        });

        it("should return tasks by File Number when appropriate value of File Number entered as a search keyword", function () {
            var searchKeyword = 'FileWithTasks_A8';
            toDoList.searchInput.sendKeys(searchKeyword);
            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                for (var i = 0; i < tasksCount; i++) {
                    expect(toDoList.getTaskDetails(i, 'FileNumber').getText()).toContain(searchKeyword.toUpperCase());
                }
            });
        });

        it("should return tasks by Priority when appropriate value of File Number entered as a search keyword", function () {
            var searchKeyword = 'PRIORITY 0';
            toDoList.searchInput.sendKeys(searchKeyword);
            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                for (var i = 0; i < tasksCount; i++) {
                    expect(toDoList.priorityAndDate(i).getText()).toContain(searchKeyword);
                }
            });
        });

        it("should return tasks found by Priority 0 and also tasks containing 'Priority 0' in other fields", function () {
            var searchKeyword = 'PRIORITY 9';
            toDoList.searchInput.sendKeys(searchKeyword);
            toDoList.tasks.count().then(function (count) {
                expect(count).toBeGreaterThan(0);
                var promises = [];
                for (var i = 0; i < count; i++) {
                    promises.push(toDoList.priorityAndDate(i).getText());
                }
                Q.all(promises).done(function (resultArray) {
                    for (var i = 0; i < resultArray.length; i++) {

                        if (resultArray[i].indexOf(searchKeyword) < 0) {
                            toDoList.taskDetailsExpander(i).click();
                            browser.waitForAngular();
                            expect(toDoList.taskDescription(i).getText()).toContain(searchKeyword);
                        }
                        else {
                            expect(resultArray[i]).toContain(searchKeyword);
                        }
                    }
                });
            });
        });

        it("should persist previously entered search criteria and results", function () {
            var searchKeyword = 'TaskDetailsTest';
            toDoList.searchInput.sendKeys(searchKeyword);

            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                navigationBar.searchIcon.click();
                navigationBar.searchIcon.click();
                expect(toDoList.searchInput.getAttribute('value')).toContain(searchKeyword);
                toDoList.tasks.count().then(function (newTasksCount) {
                    expect(newTasksCount).toEqual(tasksCount);
                });
            });
        });
    }
});