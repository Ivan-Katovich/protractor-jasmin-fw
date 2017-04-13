exports.tags = ['Workflow_Diary', 'File_Related_Diary_Actions'];

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var CreateTaskDiaryModal = require('./../../pageObjects/ModalDialogs/CreateTaskDiaryModal.js');
var createDiaryDialog = new CreateTaskDiaryModal();

var CreateTaskDiaryDropdown = require('./../../pageObjects/DropdownLists/CreateTaskDiaryDropdown.js');
var createTaskDiaryDropdown = new CreateTaskDiaryDropdown();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var FilesView = require('./../../pageObjects/FilesView.js');
var filesView = new FilesView();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();;

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');
var dataBaseHelper = require('../../utils/dataBaseHelper.js');


var confirmationMessage = "Are you sure you would like to cancel this diary? This action cannot be undone.";
var diary = "ForDeleteRelease";
var file = "FileWithDifferentDiaries";
var noDiariesMessage = 'You have no items.';

describe("File Related Tasks - Release Diary", function () {

    function openFile(file) {
        navigationBar.searchIcon.click();
        searchPage.fileNameSearchBox.sendKeys(file);
        searchPage.searchButton.click();
    }

    function createDiary(diaryDescription, fn) {
        filesView.createIcon.click();
        createTaskDiaryDropdown.createDiaryAction.click();
        webdriverUtils.waitTillElementPresent(createDiaryDialog.cancelButton).then(function () {
            browser.waitForAngular();
            createDiaryDialog.priorityDropdown.click();
            createDiaryDialog.priorityDropdownElement(2).click();
            createDiaryDialog.description.sendKeys(diaryDescription);
            createDiaryDialog.doneButton.click();
            fn();

        });
    }

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            tasksUtils.deleteDiaryByDescription(diary);
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            openFile(file);
            webdriverUtils.waitTillElementVisible(filesView.createIcon);
            createDiary(diary, function () {
                browser.waitForAngular();
            });
        });

        beforeEach(function () {
            if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
                tasksUtils.reassignTask(diary, 'xp1');
            } else {
                tasksUtils.reassignTask(diary, browser.params.defaultUserName);
            }
        });

        it("when a user releases a diary it should disapear from the file related task list and from the database", function () {
            browser.waitForAngular()
            .then(recordHeader.fileTaskListBadge.click)
            fileTaskList.findDiary(diary, function (diaryIndex) {
                fileTaskList.diaryActionsIcon(diaryIndex).click()
                .then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    return taskActionsDropdown.releaseAction(diaryIndex).click();
                })
                .then(function () {
                   return browser.waitForAngular();
                })
                .then(recordHeader.fileTaskListBadge.click)
                .then(function () {
                    return fileTaskList.searchInput.clear();
                })
                .then(function () {
                    return fileTaskList.searchInput.sendKeys(diary);
                })

                .then(function () {
                    return expect(fileTaskList.diaries.length).not.toBeDefined();
                })
                .then(function () {
                    return expect(fileTaskList.noDiariesMessageDisplayed.getText()).toContain(noDiariesMessage);
                })
                .then(function () {
                    tasksUtils.ifTaskExistInDB(diary, function (exist) {
                        expect(exist).toBe(false);
                    });
                });
            });
        });
    }
});