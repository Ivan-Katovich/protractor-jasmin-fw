exports.tags = ['Workflow_Diary', 'File_Related_Diary_Actions'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js');
var lockedTaskView = new LockedTaskView();

var RescheduleDialog = require('./../../pageObjects/ModalDialogs/RescheduleDialog.js');
var rescheduleDialog = new RescheduleDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();
var tasksUtils = require('../../utils/tasksUtils.js');

var dataBaseHelper = require('../../utils/dataBaseHelper.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var diary = 'diary tomorrow reschedule';
var file = 'FileWithDifferentDiaries';
var dateObj = new Date();
var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var oldDate = new Date();
var day = currentDate.getDate();
if (day < 10) {
    day = '0' + day;
}
var month = currentDate.getMonth() + 1;
if (month < 10) {
    month = '0' + month;
}
var lastMonth = currentDate.getMonth();
if (lastMonth == 0) {//so this month is jan
    lastMonth = 12; //change it to december
}
else if (lastMonth < 10) {
    lastMonth = '0' + lastMonth;
}
var year = currentDate.getFullYear();
var tomorrow = month + '/' + day + '/' + year;
var monthAgo = lastMonth + '/' + day + '/' + year;

var currentDateOnly = (currentDate.getDate() < 10) ? '0' + currentDate.getDate() : currentDate.getDate();
var oldDateOnly = (oldDate.getDate() < 10) ? '0' + oldDate.getDate() : oldDate.getDate();

var dateStr = monthNames[currentDate.getMonth()] + ' ' + currentDateOnly + ', ' + currentDate.getFullYear();
var oldDateStr = monthNames[oldDate.getMonth()] + ' ' + oldDateOnly + ', ' + oldDate.getFullYear();

describe("File Related Tasks - Reschedule Diary", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            tasksUtils.rescheduleTask(file, diary, "day", 0, "minute", 310);
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            browser.waitForAngular();
        });


        it('Selecting Reschedule in the Diary Actions dropdown should open the Reschedule dialog with a textbox which currently displays the next days date', function () {
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.header.getText().then(function (elementTitle) {
                            expect(elementTitle).toBe('Reschedule Diary');
                        });
                        rescheduleDialog.textInput.getAttribute('value').then(function (defaultDate) {
                            expect(defaultDate).toBe(tomorrow);
                        });
                        rescheduleDialog.cancelButton.click(); //close reassign dialog without changes
                    });
                });
            });
        }); // end it

        it('Selecting the Reschedule button without changing the default date should move the diary to being due tomorrow', function () {
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.finalizeButton.click().then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.diaryPriorityDate(0).getText().then(function (priorityDate) {
                                    expect(priorityDate).toContain(dateStr);
                                    tasksUtils.ifDiaryLocked(diary, function (locked) {
                                        expect(locked).toBe(false);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });//end it

        it('Clicking cancel in Rescedule dialog should not change date for diary', function () {
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.cancelButton.click().then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.diaryPriorityDate(0).getText().then(function (priorityDate) {
                                    expect(priorityDate).toContain(oldDateStr);
                                });
                            });
                        });
                    });
                });
            });
        });//end it

        it('If the user enters a date before todays, the reschedule button should be disabled and the user should be notified of the error', function () {
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.textInput.clear();
                        rescheduleDialog.textInput.sendKeys(monthAgo);
                        expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    });
                });
            });
        }); //end it

        it('If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date day, the user should be informed of the error and the Reschedule button should not be clickable', function () {
            var invalidDate = '02/30/2020';
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.textInput.clear();
                        rescheduleDialog.textInput.sendKeys(invalidDate);
                        expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    });
                });
            });
        });

        it('If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date month, the user should be informed of the error and the Reschedule button should not be clickable', function () {
            var invalidDate = '13/02/2020';
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.textInput.clear();
                        rescheduleDialog.textInput.sendKeys(invalidDate);
                        expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    });
                });
            });
        });

        it('If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date year, the user should be informed of the error and the Reschedule button should not be clickable', function () {
            var invalidDate = '02/02/999999';
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.textInput.clear();
                        rescheduleDialog.textInput.sendKeys(invalidDate);
                        expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    });
                });
            });
        });

        it("when a string is entered into the date attribute the 'Reschedule' button should be disabled", function () {
            var stringDate = 'stringsAreNotDates';
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findDiary(diary, function (taskIndex) {
                fileTaskList.diaryActionsIcon(taskIndex).click();
                browser.waitForAngular().then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                        browser.waitForAngular();
                        rescheduleDialog.textInput.clear();
                        rescheduleDialog.textInput.sendKeys(stringDate);
                        expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    });
                });
            });
        });
    }// end if
});