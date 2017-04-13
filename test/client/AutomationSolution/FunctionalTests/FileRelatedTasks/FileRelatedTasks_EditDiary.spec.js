exports.tags = ['Workflow_Diary', 'File_Related_Diary_Actions'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var EditTaskDialog = require('./../../pageObjects/ModalDialogs/EditTaskDialog.js');
var editDiaryDialog = new EditTaskDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();
var tasksUtils = require('../../utils/tasksUtils.js');


var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var dateObj = new Date();

var file = "FileWithDifferentDiaries";
var diary = 'EditDiaryTesting';
var editedDiary = 'DiaryEditedDescription';
var currentPriority = 8;
var changedPriority = 3;


function openFile(fileName) {
    navigationBar.searchIcon.click();
    searchPage.fileNameSearchBox.sendKeys(fileName);
    searchPage.searchButton.click();
}

describe("File Related Tasks - Edit Diary", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            tasksUtils.changeDiaryDescription(editedDiary, diary);
        });

        afterEach(function () {
            tasksUtils.changeDiaryDescription(editedDiary, diary);
            tasksUtils.changePriority(diary, currentPriority);
        });

        beforeEach(function () {
            tasksUtils.changePriority(diary, currentPriority);
            tasksUtils.changePriority(editedDiary, currentPriority);
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            browser.waitForAngular();
            recordHeader.fileTaskListBadge.click();
            browser.waitForAngular();
        });

        it('Selecting Edit Diary in the Task Actions dropdown from File Task List should open the Edit Diary dialog with a priority dropdown only with values 0 through 9 and diary description input', function () {
            fileTaskList.findDiary(diary, function (diaryIndex) {
                fileTaskList.hoverMouseOnDiary(diary);
                fileTaskList.clickCog();
                taskActionsDropdown.container = fileTaskList.container;
                webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                    browser.waitForAngular();

                    expect(editDiaryDialog.header.getText()).toBe('Edit Diary');
                    expect(editDiaryDialog.taskDescription.isDisplayed()).toBe(true);
                    expect(editDiaryDialog.dropdown.isDisplayed()).toBe(true);
                    expect(editDiaryDialog.dropdown.getAttribute('title')).toEqual(currentPriority.toString());
                    webdriverUtils.clickOnElement(editDiaryDialog.dropdown).then(function () {
                        expect(editDiaryDialog.priorityDropdownElement(0).getText()).toEqual("0");
                        expect(editDiaryDialog.priorityDropdownElement(1).getText()).toEqual("1");
                        expect(editDiaryDialog.priorityDropdownElement(2).getText()).toEqual("2");
                        expect(editDiaryDialog.priorityDropdownElement(3).getText()).toEqual("3");
                        expect(editDiaryDialog.priorityDropdownElement(4).getText()).toEqual("4");
                        expect(editDiaryDialog.priorityDropdownElement(5).getText()).toEqual("5");
                        expect(editDiaryDialog.priorityDropdownElement(6).getText()).toEqual("6");
                        expect(editDiaryDialog.priorityDropdownElement(7).getText()).toEqual("7");
                        expect(editDiaryDialog.priorityDropdownElement(8).getText()).toEqual("8");
                        expect(editDiaryDialog.priorityDropdownElement(9).getText()).toEqual("9");
                        expect(editDiaryDialog.taskDescription.isDisplayed()).toBe(true);
                    });
                });
            });
        });


        it('If a user selects a higher priority and presses the SAVE button, the priority should update to the new value and File Task List should update to stay in order by priority', function (done) {
            fileTaskList.findDiary(diary, function (diaryIndex) {
                fileTaskList.hoverMouseOnDiary(diary);
                fileTaskList.clickCog();
                taskActionsDropdown.container = fileTaskList.container;
                webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                    browser.waitForAngular();

                    editDiaryDialog.dropdown.click().then(function () {
                        var prioritiesElms = editDiaryDialog.dropdownElements();
                        prioritiesElms.then(function (priorities) {
                            priorities[9].click();
                            browser.waitForAngular().then(function () {
                                //press the change priority button
                                editDiaryDialog.finalizeButton.click().then(function () {
                                    browser.waitForAngular();
                                    //open file related tasks list
                                    recordHeader.fileTaskListBadge.click().then(function () {
                                        //verfiy priority increased
                                        fileTaskList.findDiary(diary, function (diaryIndex) {
                                            fileTaskList.diaryPriorityDate(0).getText().then(function (priority) {
                                                expect(priority).toContain('PRIORITY 9');
                                            });
                                        });
                                        //check that diaries are ordered by priority 
                                        fileTaskList.diaries.count().then(function (count) {
                                            expect(count).toBeGreaterThan(0);
                                            var promises1 = [];
                                            for (var i = 0; i < count; i++) {
                                                promises1.push(fileTaskList.diaryPriorityDate(i).getText());
                                            }
                                            Q.all(promises1).done(function (resultArray) {
                                                var priorityArray = [];
                                                for (var j = 0; j < resultArray.length; j++) {
                                                    //Split priority and date
                                                    var outgoingArray = resultArray[j].split("|");
                                                    priorityArray.push(outgoingArray[0].trim());
                                                }
                                                //Verify that diaries are ordered by priority
                                                expect(webdriverUtils.ifOrderedByPriority(priorityArray)).toBe(true);
                                                done();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });


        it('If a user selects a lower priority and presses the SAVE button, the priority should update to the new value and the File Task List should update to stay in order by priority', function (done) {
            fileTaskList.findDiary(diary, function (diaryIndex) {
                fileTaskList.hoverMouseOnDiary(diary);
                fileTaskList.clickCog();
                taskActionsDropdown.container = fileTaskList.container;
                webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                    browser.waitForAngular();
                    editDiaryDialog.dropdown.click().then(function () {
                        var prioritiesElms = editDiaryDialog.dropdownElements();
                        prioritiesElms.then(function (priorities) {
                            priorities[2].click();
                            browser.waitForAngular().then(function () {
                                //press the change priority button
                                editDiaryDialog.finalizeButton.click().then(function () {
                                    browser.waitForAngular();
                                    //open file related tasks list
                                    recordHeader.fileTaskListBadge.click().then(function () {
                                        //verfiy priority decreased
                                        fileTaskList.findDiary(diary, function (diaryIndex1) {
                                            fileTaskList.diaryPriorityDate(0).getText().then(function (priority) {
                                                expect(priority).toContain('PRIORITY 2');
                                            });
                                        });
                                        //check that diaries are ordered by priority 
                                        fileTaskList.diaries.count().then(function (count) {
                                            expect(count).toBeGreaterThan(0);
                                            var promises1 = [];
                                            for (var i = 0; i < count; i++) {
                                                promises1.push(fileTaskList.diaryPriorityDate(i).getText());
                                            }
                                            Q.all(promises1).done(function (resultArray) {
                                                var priorityArray = [];
                                                for (var j = 0; j < resultArray.length; j++) {
                                                    //Split priority and date
                                                    var outgoingArray = resultArray[j].split("|");
                                                    priorityArray.push(outgoingArray[0].trim());
                                                }
                                                //Verify that diaries are ordered by priority
                                                expect(webdriverUtils.ifOrderedByPriority(priorityArray)).toBe(true);
                                                done();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });


        it('It is possible to edit a diary description and priority in the Edit Task dialog', function () {
            fileTaskList.findDiary(diary, function (diaryIndex) {
                fileTaskList.hoverMouseOnDiary(diary);
                fileTaskList.clickCog();
                taskActionsDropdown.container = fileTaskList.container;
                webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                    browser.waitForAngular();

                    expect(editDiaryDialog.dropdown.getAttribute('title')).toEqual(currentPriority.toString());
                    webdriverUtils.clickOnElement(editDiaryDialog.dropdown).then(function () {
                        webdriverUtils.clickOnElement(editDiaryDialog.priorityDropdownElement(3)).then(function () {
                            expect(editDiaryDialog.dropdown.getAttribute('title')).toEqual(changedPriority.toString());

                            editDiaryDialog.taskDescription.clear();
                            editDiaryDialog.taskDescription.sendKeys(editedDiary);
                            editDiaryDialog.finalizeButton.click();
                            browser.waitForAngular();

                            recordHeader.fileTaskListBadge.click();
                            fileTaskList.findDiary(editedDiary, function (diaryIndex) {
                                expect(fileTaskList.diaries.count()).toEqual(1);
                                expect(fileTaskList.diaryDescription(0)).toEqual(editedDiary);
                                fileTaskList.diaryPriority(0, function (priority) {
                                    expect(priority).toEqual("PRIORITY " + changedPriority.toString());

                                    fileTaskList.searchInput.clear();
                                    fileTaskList.searchInput.sendKeys(diary);
                                    expect(fileTaskList.noDiariesMessageDisplayed).toEqual("You have no items.");
                                });
                            });
                        });
                    });
                });
            });
        });

        it('When a user edits a diary description and priority but clicks Cancel button the initial description and priority should be left', function () {
            fileTaskList.findDiary(diary, function (diaryIndex) {
                fileTaskList.hoverMouseOnDiary(diary);
                fileTaskList.clickCog();
                taskActionsDropdown.container = fileTaskList.container;
                webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                    browser.waitForAngular();

                    expect(editDiaryDialog.dropdown.getAttribute('title')).toEqual(currentPriority.toString());
                    webdriverUtils.clickOnElement(editDiaryDialog.dropdown).then(function () {
                        webdriverUtils.clickOnElement(editDiaryDialog.priorityDropdownElement(3)).then(function () {
                            expect(editDiaryDialog.dropdown.getAttribute('title')).toEqual(changedPriority.toString());

                            editDiaryDialog.taskDescription.clear();
                            editDiaryDialog.taskDescription.sendKeys(editedDiary);
                            editDiaryDialog.cancelButton.click();
                            browser.waitForAngular();

                            recordHeader.fileTaskListBadge.click();
                            fileTaskList.findDiary(diary, function (taskIndex) {
                                expect(fileTaskList.diaries.count()).toEqual(1);
                                expect(fileTaskList.diaryDescription(0)).toEqual(diary);
                                fileTaskList.diaryPriority(0, function (priority) {
                                    expect(priority).toEqual("PRIORITY " + currentPriority.toString());
                                });

                                fileTaskList.searchInput.clear();
                                fileTaskList.searchInput.sendKeys(editedDiary);
                                expect(fileTaskList.noDiariesMessageDisplayed).toEqual("You have no items.");
                            });
                        });
                    });
                });
            });
        });
    }
});