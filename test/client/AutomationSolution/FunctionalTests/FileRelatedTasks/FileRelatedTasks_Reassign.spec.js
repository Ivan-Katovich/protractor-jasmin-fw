exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];

var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js');
var lockedTaskView = new LockedTaskView();

var ReassignDialog = require('./../../pageObjects/ModalDialogs/ReassignDialog.js');
var reassignDialog = new ReassignDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();
var tasksUtils = require('../../utils/tasksUtils.js');

var dataBaseHelper = require('../../utils/dataBaseHelper.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var searchUtil = require('../../BusinessProcess/Search.js');
var dateObj = new Date();

var assignment;
var currentAssignment;

var file = "FileWithTasks_N2";
var taskJamieReassignTest = 'jamie reassign test';
var taskReassignToSelf = 'jamie no permission';
var taskJamieNoPermissions = 'jamie no permission';


describe("File Related Tasks - Reassign", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            tasksUtils.unassignTask(taskJamieReassignTest);
            tasksUtils.changePriority(taskJamieReassignTest, 2);
            tasksUtils.unassignTask(taskReassignToSelf);
            tasksUtils.changePriority(taskReassignToSelf, 8);
            currentAssignment = browser.params.defaultFullName;

            if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
                assignment = 'Jamie 1 Barnwell 1';
            } else if (browser.params.authentication == 'vsso') {
                assignment = 'xp2 xp2';
            } else {
                assignment = 'jbarnwell1';
            }

            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
        });

        it('1-Selecting Reassign from File Related Tasks task action dropdown should open the Reassign dialog with an Assign To dropdown only with users with permissions to the tasks workflow as well as a dropdown with values 0 - 9 to change the priority', function () {
            //first select a task from simple workflow 1 which gives permission to user Jamie 1 Barnwell 1 and check for user in Assign To list
            searchUtil.openFile(file);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(taskJamieReassignTest, function (taskIndex) {
                fileTaskList.priorityAndDate(0).getText().then(function (currentPriority) {
                    expect(currentPriority).toContain('PRIORITY 2');
                    fileTaskList.taskActionsIcon(0).click()
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                        reassignDialog.header.getText().then(function (elementTitle) {
                            expect(elementTitle).toBe('Reassign Task');
                            webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                if (browser.browserName != 'firefox') {
                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                }
                                browser.actions().sendKeys(assignment).perform().then(function () {
                                    reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                        browser.waitForAngular().then(function () {
                                            expect(assignToNames).toContain(assignment);
                                            webdriverUtils.clickOnElement(reassignDialog.header).then(function () { //close assign to dropdown by clicking header area
                                                browser.waitForAngular().then(function () {
                                                    webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                                        reassignDialog.priorityElements().getText().then(function (priorities) {
                                                            browser.waitForAngular().then(function () {
                                                                expect(priorities.length).toBe(11);
                                                                expect(priorities).toContain(''); //makes a space for the current priority?
                                                                expect(priorities).toContain('0');
                                                                expect(priorities).toContain('1');
                                                                expect(priorities).toContain('2');
                                                                expect(priorities).toContain('3');
                                                                expect(priorities).toContain('4');
                                                                expect(priorities).toContain('5');
                                                                expect(priorities).toContain('6');
                                                                expect(priorities).toContain('7');
                                                                expect(priorities).toContain('8');
                                                                expect(priorities).toContain('9');
                                                            });
                                                            webdriverUtils.clickOnElement(reassignDialog.priorityDropdown); //close priority dropdown
                                                            webdriverUtils.clickOnElement(reassignDialog.cancelButton).then(function () { //close reassign dialog without changes
                                                                browser.waitForAngular().then(function () {
                                                                    recordHeader.fileTaskListBadge.click().then(function () {
                                                                        fileTaskList.findTask(taskJamieNoPermissions, function (taskIndex2) {
                                                                            fileTaskList.taskActionsIcon(taskIndex2).click();
                                                                            taskActionsDropdown.container = fileTaskList.container;
                                                                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(taskIndex2)).then(function () {
                                                                                browser.waitForAngular().then(function () {
                                                                                    reassignDialog.header.getText().then(function (elementTitle) {
                                                                                        expect(elementTitle).toBe('Reassign Task');
                                                                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                                                            reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                                                                                expect(assignToNames).not.toContain(assignment); //check that user is not in dropdown list as does not have permission to flow
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

        it('2-If a task is unassigned and the currently signed in user reassigns it to himself with a different priority, the task should update with the new assigned to and priority values', function () {
            var currentPriority;
            searchUtil.openFile(file);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(taskReassignToSelf, function (taskIndex) {
                fileTaskList.priorityAndDate(taskIndex).getText().then(function (currPriority) {
                    expect(currPriority).toContain('PRIORITY 8');
                    currentPriority = currPriority;
                    fileTaskList.taskActionsIcon(taskIndex).click();
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(taskIndex)).then(function () {
                        browser.waitForAngular().then(function () {
                            reassignDialog.assignToDropdown.getText().then(function (currentlyAssigned) {
                                expect(currentlyAssigned).toBe('Unassigned'); //check that user is currently unassigned before reassigning it
                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                    if (browser.browserName != 'firefox') {
                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                    }
                                    browser.actions().sendKeys(currentAssignment).perform().then(function () {
                                        webdriverUtils.pressTab().then(function () { //select the xp1 user
                                            webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                                var priorities = reassignDialog.priorityElements();
                                                priorities.then(function (priorityList) {
                                                    webdriverUtils.clickOnElement(priorityList[1]); //change priority to 0
                                                    webdriverUtils.clickOnElement(reassignDialog.finalizeButton).then(function () {
                                                        browser.waitForAngular().then(function () {
                                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                                //check that tasks are still ordered by priority
                                                                fileTaskList.tasks.count().then(function (count) {
                                                                    expect(count).toBeGreaterThan(0);
                                                                    var promises1 = [];
                                                                    for (var i = 0; i < count; i++) {
                                                                        promises1.push(fileTaskList.priorityAndDate(i).getText());
                                                                    }
                                                                    Q.all(promises1).done(function (priorityArray) {
                                                                        //Verify that tasks are ordered by priority
                                                                        expect(webdriverUtils.ifOrderedByPriority(priorityArray)).toBe(true);
                                                                    });
                                                                    fileTaskList.findTask(taskReassignToSelf, function (newIndex) {
                                                                        //now check the file task list to see that the task priority updated
                                                                        fileTaskList.priorityAndDate(newIndex).getText().then(function (newPriority) {
                                                                            expect(newPriority).toContain('PRIORITY 0');
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

        it('3-If a user changes the assigned to value as well as the priority value but then presses the cancel button, the assigned to and priority values should remain the same as before the dialog was opened', function () {
            var currentlyAssigned;
            var currentPriority;
            searchUtil.openFile(file);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(taskJamieReassignTest, function (newIndex) {
                fileTaskList.priorityAndDate(0).getText().then(function (currPriority) {
                    expect(currPriority).toContain('PRIORITY 2');
                    currentPriority = currPriority;
                    fileTaskList.taskActionsIcon(0).click();
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                        browser.waitForAngular().then(function () {
                            reassignDialog.assignToDropdown.getText().then(function (currAssigned) {
                                expect(currAssigned).toBe('Unassigned');
                                currentlyAssigned = currAssigned;
                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                    if (browser.browserName != 'firefox') {
                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                    }
                                    browser.actions().sendKeys(currentAssignment).perform().then(function () {
                                        webdriverUtils.pressTab().then(function () { //select the xp1 user
                                            webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                                var priorities = reassignDialog.priorityElements();
                                                priorities.then(function (priorityList) {
                                                    webdriverUtils.clickOnElement(priorityList[6]); //change priority to 5
                                                    webdriverUtils.clickOnElement(reassignDialog.cancelButton).then(function () {
                                                        browser.waitForAngular().then(function () {
                                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                                fileTaskList.priorityAndDate(0).getText().then(function (newPriority) {
                                                                    expect(newPriority).toContain(currentPriority); //check priorities did not change
                                                                    fileTaskList.taskActionsIcon(0).click().then(function () {
                                                                        webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                                                            browser.waitForAngular().then(function () {
                                                                                reassignDialog.assignToDropdown.getText().then(function (newAssigned) {
                                                                                    expect(newAssigned).toBe(currentlyAssigned);
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

        it('4-If a user changes the priority within the reassign dialog but does not change the assigned to value, the task should remain assigned the same but with the updated priority value and the todo list should still be in order by priority', function (done) {
            var currentlyAssigned;
            var currentPriority;
            searchUtil.openFile(file);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(taskJamieReassignTest, function (taskIndex) {
                fileTaskList.priorityAndDate(0).getText().then(function (currPriority) {
                    expect(currPriority).toContain('PRIORITY 2');
                    currentPriority = currPriority;
                    fileTaskList.taskActionsIcon(0).click();
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                        browser.waitForAngular().then(function () {
                            reassignDialog.assignToDropdown.getText().then(function (currAssigned) {
                                expect(currAssigned).toBe('Unassigned');
                                currentlyAssigned = currAssigned;
                                webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                    //now change the priority and check that priority is different, assigned to is the same, and todolist is still in order by priority
                                    var priorities = reassignDialog.priorityElements();
                                    priorities.then(function (priorityList) {
                                        webdriverUtils.clickOnElement(priorityList[4]); //change priority to 3
                                        webdriverUtils.clickOnElement(reassignDialog.finalizeButton).then(function () {
                                            browser.waitForAngular().then(function () {
                                                recordHeader.fileTaskListBadge.click();
                                                fileTaskList.findTask(taskJamieReassignTest, function (newIndex) {
                                                    fileTaskList.priorityAndDate(0).getText().then(function (newPriority) {
                                                        expect(newPriority).toContain('3'); //check priority changed
                                                        fileTaskList.taskActionsIcon(0).click();
                                                        webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                                            browser.waitForAngular().then(function () {
                                                                reassignDialog.assignToDropdown.getText().then(function (newAssigned) {
                                                                    expect(newAssigned).toBe(currentlyAssigned); //check that assigned to did not change
                                                                    webdriverUtils.clickOnElement(reassignDialog.cancelButton).then(function () {
                                                                        browser.waitForAngular().then(function () {
                                                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                                                //check that tasks are still ordered by priority
                                                                                fileTaskList.tasks.count().then(function (count) {
                                                                                    expect(count).toBeGreaterThan(0);
                                                                                    var promises1 = [];
                                                                                    for (var i = 0; i < count; i++) {
                                                                                        promises1.push(fileTaskList.priorityAndDate(i).getText());
                                                                                    }
                                                                                    Q.all(promises1).done(function (priorityArray) {
                                                                                        //Verify that tasks are ordered by priority
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

        it('5-If the currently signed in user reassigns a task to another user but keeps the priority the same, the task should disappear from his to do list and only show in the filr related tasks list with the same priority', function () {
            var currentPriority; //first check the task is in todolist to show current user has permission
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                webdriverUtils.clickOnElement(toDoList.dateFilter('ALL')).then(function () {
                    webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                            browser.waitForAngular().then(function () {
                                toDoList.searchInput.sendKeys(taskJamieReassignTest).then(function () {
                                    expect(toDoList.tasks.count()).toBe(1); //just showing that task shows up in current user's list

                                    //now reassign the task using the file task list to someone not signed in
                                    searchUtil.openFile(file);
                                    recordHeader.fileTaskListBadge.click();
                                    fileTaskList.findTask(taskJamieReassignTest, function (taskIndex) {
                                        fileTaskList.priorityAndDate(taskIndex).getText().then(function (currPriority) {
                                            expect(currPriority).toContain('PRIORITY 2');
                                            currentPriority = currPriority;
                                            fileTaskList.taskActionsIcon(taskIndex).click();
                                            taskActionsDropdown.container = fileTaskList.container;
                                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                                browser.waitForAngular().then(function () {
                                                    reassignDialog.assignToDropdown.getText().then(function (currentlyAssigned) {
                                                        expect(currentlyAssigned).toBe('Unassigned'); //check the current assigned user
                                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                            if (browser.browserName != 'firefox') {
                                                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                                            }
                                                            browser.actions().sendKeys(assignment).perform().then(function () {
                                                                webdriverUtils.pressTab().then(function () { //select the new user
                                                                    webdriverUtils.clickOnElement(reassignDialog.header);
                                                                    webdriverUtils.clickOnElement(reassignDialog.finalizeButton).then(function () {
                                                                        browser.sleep(2000).then(function () {
                                                                            webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () { //open todo list again
                                                                                //Now check current user xp1)'s tasks to be sure he no longer has jamie reassign test in his todolist
                                                                                expect(toDoList.tasks.count()).toBe(0);
                                                                                recordHeader.fileTaskListBadge.click().then(function () {
                                                                                    fileTaskList.taskDetailsExpander(0).click().then(function () {
                                                                                        fileTaskList.priorityAndDate(0).getText().then(function (currentPriority) {
                                                                                            expect(currentPriority).toContain('PRIORITY 2');
                                                                                            fileTaskList.taskActionsIcon(0).click();
                                                                                            taskActionsDropdown.container = fileTaskList.container;
                                                                                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                                                                                browser.waitForAngular().then(function () {
                                                                                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                                                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                                                                            browser.actions().sendKeys(assignment).perform().then(function () {
                                                                                                                reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                                                                                                    browser.waitForAngular().then(function () {
                                                                                                                        expect(assignToNames).toContain(assignment);
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
    }
});