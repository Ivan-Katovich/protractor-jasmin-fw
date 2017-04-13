exports.tags = ['Workflow_Diaries', 'File_Related_Diary_Actions'];

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var DeleteTaskDialog = require('./../../pageObjects/ModalDialogs/DeleteTaskDialog.js');
var deleteTaskDialog = new DeleteTaskDialog();

var CreateTaskDiaryModal = require('./../../pageObjects/ModalDialogs/CreateTaskDiaryModal.js');
var createDiaryDialog = new CreateTaskDiaryModal();

var CreateTaskDiaryDropdown = require('./../../pageObjects/DropdownLists/CreateTaskDiaryDropdown.js');
var createTaskDiaryDropdown = new CreateTaskDiaryDropdown();

var FilesView = require('./../../pageObjects/FilesView.js');
var filesView = new FilesView();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');
var dataBaseHelper = require('../../utils/dataBaseHelper.js');

var searchUtil = require('../../BusinessProcess/Search.js');

var confirmationMessage = "Are you sure you would like to delete this diary? This action cannot be undone.";
var diary = "ForDeleteCancel";
var file = "FileWithDifferentDiaries";
var noDiariesMessage = 'You have no items.';

describe("File Related Tasks - Delete diary", function () {

    function createDiary(diaryDescription, fn) {
        filesView.createIcon.click()
        .then(createTaskDiaryDropdown.createDiaryAction.click)
        .then(function () {
            return createDiaryDialog.cancelButton.waitReady();
        })
        .then(function () {
            return browser.waitForAngular();
        })
        .then(createDiaryDialog.priorityDropdown.click)
        .then(createDiaryDialog.priorityDropdownElement(2).click)
        .then(function () {
            return createDiaryDialog.description.sendKeys(diaryDescription);
        })
        .then(createDiaryDialog.doneButton.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            fn();
        });
    }
    
    if (browser.params.siteBase == 'iis') {

        beforeAll(function (done) {
            tasksUtils.deleteDiaryByDescription(diary)
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            })
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                createDiary(diary, function () {
                    done(browser.waitForAngular());
                })
            });
        });

        beforeEach(function (done) {
            browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return tasksUtils.reassignTask(diary, 'xp1');
            })
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                done(function () {
                    return filesView.createIcon.waitReady();
                });
            });
        });

        it("when a user deletes a diary the 'Delete diary' modal with the conformation message should be displayed", function () {
            return recordHeader.fileTaskListBadge.click()
            .then(function () {
                return fileTaskList.searchInput.clear();
            })
            .then(function(){
                return fileTaskList.searchInput.sendKeys(diary);
            })
            .then(function(){
                return fileTaskList.hoverMouseOnDiary(diary);
            })
            .then(function(){
                return fileTaskList.clickCog();
            })
            .then(taskActionsDropdown.deleteAction.click)
            .then(function () {
                return expect(deleteTaskDialog.title).toEqual("Delete Diary");
            })
            .then(function () {
                deleteTaskDialog.deleteTaskMessage(function (message) {
                    return expect(message).toEqual(confirmationMessage);
                });
            });
        });

        it("when a user deletes a diary and clicks the 'Keep diary' button in the 'Delete diary' modal this diary should exist in the File Related tasks List and in the database", function () {
            return recordHeader.fileTaskListBadge.click()
            .then(function () {
                return fileTaskList.searchInput.clear();
            })
            .then(function(){
                return fileTaskList.searchInput.sendKeys(diary);
            })
            .then(function(){
                return fileTaskList.hoverMouseOnDiary(diary);
            })
            .then(function(){
                return fileTaskList.clickCog();
            })
            .then(taskActionsDropdown.deleteAction.click)
            .then(function () {
                return deleteTaskDialog.deleteTaskButton.waitReady();
            })
            .then(function () {
                tasksUtils.ifTaskLocked(diary, function (locked1) {
                    return expect(locked1).toBe(true);
                });
                deleteTaskDialog.keepTaskButton.click()
                .then(recordHeader.fileTaskListBadge.click)
                .then(function () {
                    return fileTaskList.searchInput.clear();
                })
                fileTaskList.findDiary(diary, function (diaryIndex1) {
                    fileTaskList.diaryDescription(diaryIndex1).getText().then(function (description) {
                        expect(description).toEqual(diary);
                    });
                    tasksUtils.ifTaskExistInDB(diary, function (exist) {
                        expect(exist).toBe(true);
                    });
                    tasksUtils.ifTaskLocked(diary, function (locked2) {
                        expect(locked2).toBe(false);
                    });
                });
            });
        });

        it("when a user deletes a diary it should disapear from the file related task list and from the database", function () {
            return recordHeader.fileTaskListBadge.click()
            .then(function () {
                return fileTaskList.searchInput.clear();
            })
            .then(function () {
                return fileTaskList.searchInput.sendKeys(diary);
            })
            .then(function () {
                return fileTaskList.hoverMouseOnDiary(diary);
            })
            .then(function () {
                return fileTaskList.clickCog();
            })
            .then(taskActionsDropdown.deleteAction.click)
            .then(function () {
                return deleteTaskDialog.deleteTaskButton.waitReady();
            })
            .then(deleteTaskDialog.deleteTaskButton.click)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return fileTaskList.searchInput.clear();
            })
            .then(function () {
                return browser.waitForAngular();
            })
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
            });
        });
    }
});