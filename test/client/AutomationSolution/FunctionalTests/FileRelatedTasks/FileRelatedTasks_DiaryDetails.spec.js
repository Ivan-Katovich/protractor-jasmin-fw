exports.tags = ['Workflow_Diary', 'File_Related_Diary_Actions'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var diary = 'DiaryDetailsTest';
var fileName = 'FileWithDifferentDiaries';
var fileNumber = 'FileWithDifferentDiaries';
var date = 'DEC 23, 2015';
var assignedTo;
var priority = 'PRIORITY 0';
var actionsInOrder = "Open Diary\n[Enter]\nRelease\nReassign. . .\nReschedule. . .\nEdit Diary . . .\nDelete";


describe("File Related Tasks - Diary Details", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            assignedTo = browser.params.defaultFullName;
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(fileName);
            searchPage.searchButton.click();
        });

        it("shoult display in file related task lists only diaries for the opened file", function () {
            recordHeader.fileTaskListBadge.click()
            .then(function () {
                fileTaskList.diaries.count().then(function (count) {
                    expect(count).toBeGreaterThan(0);
                    for (var i = 0; i < count; i++) {
                        fileTaskList.diaryFileName(i).getText().then(function (fileName1) {
                            expect(fileName1).toEqual(fileName);
                        });
                        fileTaskList.diaryFileNumber(i).getText().then(function (fileNumber1) {
                            expect(fileNumber1).toEqual(fileNumber.toUpperCase());
                        });
                    }
                });
            });
        });

        it("it should display File Name, File Number, Description, Assigned To, Priority and Available date for diary items in File related task list", function () {
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (diaryIndex) {
                fileTaskList.diaryFileName(diaryIndex).getText().then(function (fileName1) {
                    expect(fileName1).toEqual(fileName);
                });
                fileTaskList.diaryFileNumber(diaryIndex).getText().then(function (fileNumber1) {
                    expect(fileNumber1).toEqual(fileNumber.toUpperCase());
                });
                fileTaskList.diaryDescription(diaryIndex).getText().then(function (description) {
                    expect(description).toEqual(diary);
                });
                fileTaskList.diaryPriorityDate(diaryIndex).getText().then(function (priorityDate) {
                    expect(priorityDate).toContain(priority);
                    expect(priorityDate).toContain(date);
                });
                fileTaskList.diaryAssignedTo(diaryIndex).getText().then(function (assignedTo1) {
                    expect(assignedTo1).toEqual(assignedTo);
                });
            });
        });

        it("it should display all possible diary actions in actions list in correct order", function () {
            recordHeader.fileTaskListBadge.click()
            .then(function () {
                return fileTaskList.searchInput.sendKeys(diary);
            })
            .then(function () {
                return fileTaskList.hoverMouseOnDiary(diary);
            })
            .then(function () {
                return fileTaskList.clickCog()
            })
            .then(fileTaskList.diaryActionsIcon(0).click)
            .then(function () {
                taskActionsDropdown.actionsText.getText().then(function (text) {
                    expect(text).toEqual(actionsInOrder);
                });
            });
        });
    }
});