exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();

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

var UserSettingsDropdown = require('./../../pageObjects/DropdownLists/UserSettingsDropdown.js');
var irUserSettingsDropdown = new UserSettingsDropdown();
var LoginPage = require('./../../pageObjects/LoginPage.js');
var irLoginPage = new LoginPage();

var dataBaseHelper = require('../../utils/dataBaseHelper.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var dateObj = new Date();

var taskNextWeekReschedule = 'next week reschedule';
var taskTomorrowReschedule = 'tomorrorw reschedule';
var file = 'FileWithTasks_N2';

function focusedElementNameObj() {
    return browser.driver.switchTo().activeElement();
}


describe("File Related Tasks - Reschedule", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    webdriverUtils.clickOnElement(toDoList.dateFilter('ALL')).then(function () {
                        webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                            webdriverUtils.clickOnElement(toDoList.settingsFilter);
                            browser.waitForAngular();
                        });
                    });
                });
            });
        });


        it('1-Selecting Reschedule in the Task Actions dropdown should open the Reschedule dialog with a textbox which currently displays the next days date', function () {
            var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var tomorrow = month + '/' + day + '/' + year;

            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskTomorrowReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.sleep(500).then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                //browser.waitForAngular();
                                                rescheduleDialog.header.getText().then(function (elementTitle) {
                                                    expect(elementTitle).toBe('Reschedule Task');
                                                });
                                                rescheduleDialog.textInput.getAttribute('value').then(function (defaultDate) {
                                                    expect(defaultDate).toBe(tomorrow);
                                                });
                                                rescheduleDialog.cancelButton.click(); //close reassign dialog without changes
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

        it('2-Selecting the Reschedule button without changing the default date should move the task to being due tomorrow, and the task should not show up in today search.', function () {
            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskTomorrowReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                browser.waitForAngular().then(function () {
                                                    webdriverUtils.clickOnElement(rescheduleDialog.finalizeButton).then(function () { //.click().then(function () {
                                                        webdriverUtils.waitTillElementVisible(leftRailBar.toDoList).then(function () {
                                                            webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () { //open todo list again
                                                                webdriverUtils.waitTillElementVisible(toDoList.searchInput).then(function () {
                                                                    toDoList.searchInput.sendKeys(taskTomorrowReschedule).then(function () {
                                                                        browser.waitForAngular().then(function () {
                                                                            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                                webdriverUtils.clickOnElement(toDoList.dateFilter('TODAY')).then(function () { //look at Today tasks and see that the task is not marked to be due today
                                                                                    webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                                        expect(toDoList.tasks.count()).toBe(0); //should not exist in today tasks    
                                                                                        tasksUtils.ifTaskLocked(taskTomorrowReschedule, function (locked) {
                                                                                            expect(locked).toBe(false);
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
        });

        it('3-If the user enters a date before todays, the reschedule button should be disabled and the user should be notified of the error', function () {
            var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var lastMonth = currentDate.getMonth();
            if (lastMonth == 0) {//so this month is jan
                lastMonth = 12; //change it to december
            }
            else if (lastMonth < 10) {
                lastMonth = '0' + lastMonth;
            }
            var year = currentDate.getFullYear();
            var monthAgo = lastMonth + '/' + day + '/' + year;
            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskTomorrowReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                browser.waitForAngular().then(function () {
                                                    rescheduleDialog.textInput.clear().then(function () {
                                                        rescheduleDialog.textInput.sendKeys(monthAgo).then(function () {
                                                            expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
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
                });
            });
        });

        it('4-If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date day, the user should be informed of the error and the Reschedule button should not be clickable', function () {
            var invalidDate = '02/30/2020';
            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskTomorrowReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                browser.waitForAngular().then(function () {
                                                    rescheduleDialog.textInput.clear().then(function () {
                                                        rescheduleDialog.textInput.sendKeys(invalidDate).then(function () {
                                                            expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
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
                });
            });
        });

        it('5-If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date month, the user should be informed of the error and the Reschedule button should not be clickable', function () {
            var invalidDate = '13/02/2020';
            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskTomorrowReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                browser.waitForAngular().then(function () {
                                                    rescheduleDialog.textInput.clear().then(function () {
                                                        rescheduleDialog.textInput.sendKeys(invalidDate).then(function () {
                                                            expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
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
                });
            });
        });

        it('6-If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date year, the user should be informed of the error and the Reschedule button should not be clickable', function () {
            var invalidDate = '02/02/999999';
            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskTomorrowReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                browser.waitForAngular().then(function () {
                                                    rescheduleDialog.textInput.clear().then(function () {
                                                        rescheduleDialog.textInput.sendKeys(invalidDate).then(function () {
                                                            expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
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
                });
            });
        });

        it("7-when a string is entered into the date attribute the 'Reschedule' button should be disabled", function () {
            var stringDate = 'stringsAreNotDates';
            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskTomorrowReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                browser.waitForAngular().then(function () {
                                                    rescheduleDialog.textInput.clear().then(function () {
                                                        rescheduleDialog.textInput.sendKeys(stringDate).then(function () {
                                                            expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
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
                });
            });
        });

        it('8-If a user selects to reschedule a task but then presses Cancel, the task should not be rescheduled', function () {
            //first schedule a task for today
            var currentDate = new Date;
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var today = month + '/' + day + '/' + year;
            navigationBar.searchIcon.click().then(function () {
                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                fileTaskList.findTask(taskNextWeekReschedule, function (taskIndex) {
                                    fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                        browser.sleep(500).then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                webdriverUtils.waitTillElementVisible(rescheduleDialog.textInput).then(function () {
                                                    rescheduleDialog.textInput.clear().then(function () {
                                                        rescheduleDialog.textInput.sendKeys(today).then(function () {
                                                            webdriverUtils.clickOnElement(rescheduleDialog.header).then(function () { //move focus off textbox to allow validation
                                                                webdriverUtils.clickOnElement(rescheduleDialog.finalizeButton).then(function () { //save assigned to today
                                                                    webdriverUtils.waitTillElementVisible(leftRailBar.toDoList).then(function () {
                                                                        //check that the task shows up in today's tasks
                                                                        webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () { //open todo list 
                                                                            toDoList.findTask('JAMIES WORKFLOW TEST', taskNextWeekReschedule, function () {
                                                                                browser.sleep(500).then(function () {
                                                                                    webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                                        webdriverUtils.clickOnElement(toDoList.dateFilter('TODAY')).then(function () { //look at Today tasks and see that the task is marked to be due today
                                                                                            expect(toDoList.tasks.count()).toBe(1); //should exist in today tasks 
                                                                                            webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () { //close todolist, open resched through filerelatedtasks again
                                                                                                recordHeader.fileTaskListBadge.click().then(function () {
                                                                                                    //now open reschedule again, choose to reschedule it for 20 years from now but then cancel. if The cancel properly worked, should still be marked due today
                                                                                                    browser.sleep(500).then(function () {
                                                                                                        fileTaskList.findTask(taskNextWeekReschedule, function (taskIndex) {
                                                                                                            fileTaskList.taskActionsIcon(taskIndex).click().then(function () {
                                                                                                                browser.sleep(500).then(function () {
                                                                                                                    taskActionsDropdown.container = fileTaskList.container;
                                                                                                                    taskActionsDropdown.rescheduleAction(taskIndex).click().then(function () {
                                                                                                                        webdriverUtils.waitTillElementVisible(rescheduleDialog.textInput).then(function () {
                                                                                                                            rescheduleDialog.textInput.clear().then(function () {
                                                                                                                                rescheduleDialog.textInput.sendKeys('12/25/2035').then(function () {
                                                                                                                                    webdriverUtils.clickOnElement(rescheduleDialog.cancelButton).then(function () {
                                                                                                                                        webdriverUtils.waitTillElementVisible(leftRailBar.toDoList).then(function () {
                                                                                                                                            webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () { //open todo list again
                                                                                                                                                webdriverUtils.waitTillElementVisible(toDoList.settingsFilter).then(function () {
                                                                                                                                                    webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                                                                                                        webdriverUtils.clickOnElement(toDoList.dateFilter('TODAY')).then(function () { //look at Today tasks and see that the task is marked to be due today
                                                                                                                                                            expect(toDoList.tasks.count()).toBe(1); //should still exist in today's tasks
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
                                });
                            });
                        });
                    });
                });
            });
        });

    }// end if
});