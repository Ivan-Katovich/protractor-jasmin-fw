exports.tags = ['Workflow_Tasks', 'File_Related_Search'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js');
var lockedTaskView = new LockedTaskView();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var Q = require('q');
var tasksUtils = require('../../utils/tasksUtils.js');
var noTasksMessage = 'You have no items.';
var noDiariesMessage = 'You have no items.';

var noTasksAndDiaries = 'NoTasksAndDiaries';
var threeTasksAndNoDiaries = 'ThreeTasksAndNoDiaries';
var noTasksAndTwoDiaries = 'NoTasksAndTwoDiaries';
var twoTasksAndTwoDiaries = 'TwoTasksAndTwoDiaries';

/* spec has been disabled since no more badges in File Related Tasks; */
describe("File Related Tasks - Badge", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            browser.waitForAngular();
            navigationBar.searchIcon.click();
        });

        it("should display no badge, 0 for tasks and diaries counts and appropriate messages in tasks and diaries lists if there is no tasks and diaries related to file ", function () {
            webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox);
            searchPage.fileNameSearchBox.sendKeys(noTasksAndDiaries);
            searchPage.searchButton.click();
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
            recordHeader.fileTaskListBadge.click();
            expect(fileTaskList.diaries.length).not.toBeDefined();
            expect(fileTaskList.diariesCountInBadge.getText()).toEqual('0');
            expect(fileTaskList.noDiariesMessageDisplayed).toEqual(noDiariesMessage);
            expect(fileTaskList.tasks.length).not.toBeDefined();
            expect(fileTaskList.tasksCountInBadge.getText()).toEqual('0');
            expect(fileTaskList.noTasksMessageDisplayed).toEqual(noTasksMessage);
            expect(recordHeader.fileTaskListCountInBadge.isDisplayed()).toBeFalsy();
        });

        it("should display correct count in badge if there are several tasks on file exists but there is no diaries on file", function () {
            webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox);
            searchPage.fileNameSearchBox.sendKeys(threeTasksAndNoDiaries);
            searchPage.searchButton.click();
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
            recordHeader.fileTaskListBadge.click();
            expect(fileTaskList.diaries.length).not.toBeDefined();
            expect(fileTaskList.diariesCountInBadge.getText()).toEqual('0');
            expect(fileTaskList.noDiariesMessageDisplayed).toEqual(noDiariesMessage);
            fileTaskList.tasks.count().then(function (tasksCount) {
                expect(fileTaskList.tasksCountInBadge.getText()).toEqual(tasksCount.toString());
                expect(recordHeader.fileTaskListCountInBadge.getText()).toEqual(tasksCount.toString());
            });
        });

        it("should display correct count in badge if there are several diaries on file exists but there is no tasks on file", function () {
            webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox);
            searchPage.fileNameSearchBox.sendKeys(noTasksAndTwoDiaries);
            searchPage.searchButton.click();
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
            recordHeader.fileTaskListBadge.click();
            expect(fileTaskList.tasksCountInBadge.getText()).toEqual('0');
            expect(fileTaskList.tasks.length).not.toBeDefined();
            expect(fileTaskList.noTasksMessageDisplayed).toEqual(noTasksMessage);
            fileTaskList.diaries.count().then(function (diariesCount) {
                expect(fileTaskList.diariesCountInBadge.getText()).toEqual(diariesCount.toString());
                expect(recordHeader.fileTaskListCountInBadge.getText()).toEqual(diariesCount.toString());
            });
        });

        it("should display correct count in badge if there are several tasks and diaries on file", function () {
            webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox);
            searchPage.fileNameSearchBox.sendKeys(twoTasksAndTwoDiaries);
            searchPage.searchButton.click();
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.tasks.count().then(function (tasksCount) {
                expect(fileTaskList.tasksCountInBadge.getText()).toEqual(tasksCount.toString());
                fileTaskList.diaries.count().then(function (diariesCount) {
                    expect(fileTaskList.diariesCountInBadge.getText()).toEqual(diariesCount.toString());
                    expect(recordHeader.fileTaskListCountInBadge.getText()).toEqual((diariesCount + tasksCount).toString());
                });
            });
        });

        it("should update count in badge according to tasks an diaries count on file if user navigates from file to file", function () {
            webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox);
            searchPage.fileNameSearchBox.sendKeys(twoTasksAndTwoDiaries);
            searchPage.searchButton.click();
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.tasks.count().then(function (tasksCount) {
                expect(fileTaskList.tasksCountInBadge.getText()).toEqual(tasksCount.toString());
                fileTaskList.diaries.count().then(function (diariesCount) {
                    expect(fileTaskList.diariesCountInBadge.getText()).toEqual(diariesCount.toString());
                    expect(recordHeader.fileTaskListCountInBadge.getText()).toEqual((diariesCount + tasksCount).toString());
                    navigationBar.searchIcon.click();
                    webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton);
                    searchPage.clearResultsButton.click();
                    searchPage.fileNameSearchBox.clear();
                    searchPage.fileNameSearchBox.sendKeys(noTasksAndDiaries);
                    searchPage.searchButton.click();
                    webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
                    recordHeader.fileTaskListBadge.click();
                    expect(fileTaskList.tasksCountInBadge.getText()).toEqual('0');
                    expect(fileTaskList.diariesCountInBadge.getText()).toEqual('0');
                    expect(recordHeader.fileTaskListCountInBadge.isDisplayed()).toBeFalsy();
                    navigationBar.searchIcon.click();
                    webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton);
                    searchPage.clearResultsButton.click();
                    searchPage.fileNameSearchBox.clear();
                    searchPage.fileNameSearchBox.sendKeys(noTasksAndTwoDiaries);
                    searchPage.searchButton.click();
                    webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
                    recordHeader.fileTaskListBadge.click();
                    fileTaskList.tasks.count().then(function (tasksCount2) {
                        expect(fileTaskList.tasksCountInBadge.getText()).toEqual(tasksCount2.toString());
                        fileTaskList.diaries.count().then(function (diariesCount2) {
                            expect(fileTaskList.diariesCountInBadge.getText()).toEqual(diariesCount.toString());
                            expect(recordHeader.fileTaskListCountInBadge.getText()).toEqual((diariesCount2 + tasksCount2).toString());
                        });
                    });
                });
            });
        });
    }
});