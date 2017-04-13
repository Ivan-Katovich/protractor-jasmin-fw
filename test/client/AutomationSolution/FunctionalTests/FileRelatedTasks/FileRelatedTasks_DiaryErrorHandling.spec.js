/*
    FileRelatedTasks: Diary Error Handling;
    Created: ...
    Refactored: 9/28/2016, navasaal
*/

exports.tags = ['Workflow_Diary', 'File_Related_Diary_Actions'];

/* modeling; */
var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js');
var SearchPage = require('./../../pageObjects/SearchPage.js');

/* objects; */
var taskActionsDropdown = new TaskActionsDropdown();
var navigationBar = new NavigationBar();
var searchPage = new SearchPage();
var fileTaskList = new FileRelatedTasksDropdown();
var recordHeader = new RecordHeader();
var errorMessage = new ErrorMessage();

/* helpers; */
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');
var dataBaseHelper = require('../../utils/dataBaseHelper.js');

/* vars; */
var lockedByAnotherUserMessage = "This task or diary is locked by another person. Please try again later.";
var diary = "LockedDiary";
var file = "FileWithDifferentDiaries";

describe("File Related Tasks - Diary Error handling", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            return tasksUtils.lockTaskByDescription(diary, 'ezhovakr');
        });

        afterAll(function () {
            return tasksUtils.unlockTaskByDescription(diary);
        });

        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(navigationBar.searchIcon.click)
            .then(function () {
                return searchPage.fileNameSearchBox.sendKeys(file);
            })
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            });
        });

        it("1-when a user from file related task list tries to click diary action for a diary which is locked by another user it should display an error message", function () {
            recordHeader.fileTaskListBadge.click()
            .then(function () {
                return fileTaskList.diaries.count();
            })
            .then(function (diariesCount) {
                fileTaskList.findDiary(diary, function (diaryIndex) {
                    fileTaskList.hoverMouseOnDiary(diary)
                    fileTaskList.clickCog();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain(lockedByAnotherUserMessage);
                    });
                });
            });
        });

        it("2-When a user from file task list tries to lock and open diary which is locked by another user it should display an error message", function () {
            recordHeader.fileTaskListBadge.click()
            .then(function () {
                fileTaskList.findDiary(diary, function (diaryIndex) {
                    fileTaskList.diaryDescription(diaryIndex).click();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain(lockedByAnotherUserMessage);
                    });
                });
            });
        });
    }
});