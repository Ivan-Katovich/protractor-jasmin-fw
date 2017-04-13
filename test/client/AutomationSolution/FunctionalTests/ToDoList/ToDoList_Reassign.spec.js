exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ReassignDialog = require('./../../pageObjects/ModalDialogs/ReassignDialog.js');
var reassignDialog = new ReassignDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('../../pageObjects/SearchPage.js');
var irSearchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var tasksUtils = require('../../utils/tasksUtils.js');

var dataBaseHelper = require('../../utils/dataBaseHelper.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var dateObj = new Date();
var assignment;
var currentAssignment;

var file = "FileWithTasks_N2";
var taskJamieReassignTest = 'jamie reassign test';
var taskReassignToSelf = 'reassign to self';
var taskJamieNoPermissions = 'jamie no permission';

function ifOrderedByPriority(priorityArray) {
    var priorityNumberArray = [];
    for (var i = 0; i < priorityArray.length; i++) {
        priorityArray[i] = priorityArray[i].substring(0, 10);
        priorityNumberArray.push(priorityArray[i].replace('PRIORITY ', ''));
    }
    return conversionUtils.isArraySortedAscending(priorityNumberArray);
}

describe("To Do List - Reassign", function () {

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
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                webdriverUtils.clickOnElement(toDoList.dateFilter('ALL')).then(function () {
                    webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter);
                        browser.waitForAngular();
                    });
                });
            });
        });

        it('Selecting Reassign in the Task Actions dropdown should open the Reassign dialog with an Assign To dropdown only with users with permissions to the tasks workflow as well as a dropdown with values 0 - 9 to change the priority', function () {
            //first select a task from simple workflow 1 which gives permission to user Jamie 1 Barnwell 1 and check for user in Assign To list
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys(taskJamieReassignTest).then(function () {
                expect(toDoList.tasks.count()).toBe(1);
                toDoList.hoverMouseOnTask(taskJamieReassignTest);
                toDoList.clickCog();
                taskActionsDropdown.reassignAction.click().then(function () {
                    browser.waitForAngular();
                    reassignDialog.header.getText().then(function (elementTitle) {
                        expect(elementTitle).toBe('Reassign Task');
                    });
                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    if (browser.browserName != 'firefox') {
                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    }
                    browser.actions().sendKeys(assignment).perform();
                    reassignDialog.assignToElements().getText().then(function (assignToNames) {
                        browser.waitForAngular();
                        expect(assignToNames).toContain(assignment);
                    });
                    reassignDialog.header.click() //close assign to dropdown by clicking header area
                    browser.waitForAngular().then(function () {
                        webdriverUtils.clickOnElement(reassignDialog.priorityDropdown);
                        reassignDialog.priorityElements().getText().then(function (priorities) {
                            browser.waitForAngular();
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
                        reassignDialog.priorityDropdown.click(); //close priority dropdown
                        reassignDialog.cancelButton.click(); //close reassign dialog without changes
                    });
                });
            });
            //select a task from Jamie's workflow which does not give permissions to user Jamie 1 Barnwell 1
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys(taskJamieNoPermissions).then(function () {
                expect(toDoList.tasks.count()).toBe(1);
                toDoList.hoverMouseOnTask(taskJamieNoPermissions);
                toDoList.clickCog();
                taskActionsDropdown.reassignAction.click().then(function () {
                    browser.waitForAngular();
                    reassignDialog.header.getText().then(function (elementTitle) {
                        expect(elementTitle).toBe('Reassign Task');
                    });
                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    reassignDialog.assignToElements().getText().then(function (assignToNames) {
                        browser.waitForAngular();
                        expect(assignToNames).not.toContain(assignment); //check that user is not in dropdown list as does not have permission to flow
                    });
                });
            });
        }); // end it

        it('If a task is unassigned and the currently signed in user reassigns it to himself with a different priority, the task should show up in his to do list under assigned to me with the new priority value', function () {
            var currentPriority;
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys(taskReassignToSelf).then(function () {
                expect(toDoList.tasks.count()).toBe(1);
                currentPriority = toDoList.priorityAndDate(0).getText(); //take note of current priority to check that it changes later
                expect(currentPriority).toContain('PRIORITY 8');
                toDoList.hoverMouseOnTask(taskReassignToSelf);
                toDoList.clickCog();
                taskActionsDropdown.reassignAction.click().then(function () {
                    browser.waitForAngular();
                    reassignDialog.assignToDropdown.getText().then(function (currentlyAssigned) {
                        expect(currentlyAssigned).toBe('Unassigned'); //check that user is currently unassigned before reassigning it
                    });
                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    if (browser.browserName != 'firefox') {
                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    }
                    browser.actions().sendKeys(currentAssignment).perform();
                    webdriverUtils.pressTab().then(function () { //select the xp1 user
                        webdriverUtils.clickOnElement(reassignDialog.priorityDropdown);
                        var priorities = reassignDialog.priorityElements();
                        priorities.then(function (priorityList) {
                            priorityList[1].click(); //change priority to 0 
                            reassignDialog.finalizeButton.click();
                        });
                    });
                });
                browser.waitForAngular();
                toDoList.priorityAndDate(0).getText().then(function (newPriority) {
                    expect(newPriority).toContain('PRIORITY 0'); //check that priority changed
                });
            });
        }); //end it

        it('If a user changes the assigned to value as well as the priority value but then presses the cancel button, the assigned to and priority values should remain the same as before the dialog was opened', function () {
            var currentlyAssigned;
            var currentPriority;
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys(taskJamieReassignTest).then(function () {
                expect(toDoList.tasks.count()).toBe(1);
                toDoList.hoverMouseOnTask(taskJamieReassignTest);
                toDoList.clickCog();
                taskActionsDropdown.reassignAction.click().then(function () {
                    browser.waitForAngular();
                    reassignDialog.assignToDropdown.getText().then(function (currAssigned) {
                        expect(currAssigned).toBe('Unassigned');
                        currentlyAssigned = currAssigned;
                    });
                    reassignDialog.priorityDropdown.getText().then(function (currPriority) {
                        expect(currPriority.trim()).toBe('2');
                        currentPriority = currPriority.trim();
                    });
                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    if (browser.browserName != 'firefox') {
                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    }
                    browser.actions().sendKeys(currentAssignment).perform();
                    webdriverUtils.pressTab().then(function () { //select the xp1 user
                        webdriverUtils.clickOnElement(reassignDialog.priorityDropdown);
                        var priorities = reassignDialog.priorityElements();
                        priorities.then(function (priorityList) {
                            priorityList[1].click(); //change priority to 0 
                            reassignDialog.cancelButton.click().then(function () {
                                browser.waitForAngular();
                                toDoList.priorityAndDate(0).getText().then(function (newPriority) {
                                    expect(newPriority).toContain(currentPriority); //check priorities did not change
                                });
                                toDoList.hoverMouseOnTask(taskJamieReassignTest);
                                toDoList.clickCog();
                                taskActionsDropdown.reassignAction.click().then(function () {
                                    browser.waitForAngular();
                                    reassignDialog.assignToDropdown.getText().then(function (newAssigned) {
                                        expect(newAssigned).toBe(currentlyAssigned);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }); //end it

        it('If a user changes the priority within the reassign dialog but does not change the assigned to value, the task should remain assigned the same but with the updated priority value and the todo list should still be in order by priority', function () {
            var currentlyAssigned;
            var currentPriority;
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys(taskJamieReassignTest).then(function () {
                expect(toDoList.tasks.count()).toBe(1);
                toDoList.hoverMouseOnTask(taskJamieReassignTest);
                toDoList.clickCog();
                taskActionsDropdown.reassignAction.click().then(function () {
                    browser.waitForAngular();
                    //currentlyAssigned = reassignDialog.assignToDropdown.getText(); //note the current assigned to and priority values
                    reassignDialog.assignToDropdown.getText().then(function (currAssigned) {
                        currentlyAssigned = currAssigned;
                    });
                    reassignDialog.priorityDropdown.getText().then(function (currPriority) {
                        expect(currPriority.trim()).toBe('2');
                        currentPriority = currPriority.trim();
                    });
                    webdriverUtils.clickOnElement(reassignDialog.priorityDropdown);
                    //now change the priority and check that priority is different, assigned to is the same, and todolist is still in order by priority
                    var prioritiesArr = reassignDialog.priorityElements();
                    prioritiesArr.then(function (priorities) {
                        priorities[4].click(); //change to 3
                    });
                    reassignDialog.finalizeButton.click();
                    browser.waitForAngular().then(function () {
                        toDoList.priorityAndDate(0).getText().then(function (newPriority) {
                            expect(newPriority).not.toBe(currentPriority);
                        });
                        toDoList.hoverMouseOnTask(0);
                        toDoList.clickCog();
                        taskActionsDropdown.reassignAction.click().then(function () {
                            browser.waitForAngular();
                            reassignDialog.assignToDropdown.getText().then(function (newAssignTo) {
                                expect(newAssignTo).toBe(currentlyAssigned); //check that assigned to did not change
                                reassignDialog.cancelButton.click().then(function () {
                                    browser.waitForAngular();
                                    toDoList.searchInput.clear();
                                    browser.waitForAngular().then(function () {
                                        toDoList.tasks.count().then(function (count) {
                                            expect(count).toBeGreaterThan(0);
                                            var promises1 = [];
                                            for (var i = 0; i < count; i++) {
                                                promises1.push(toDoList.priorityAndDate(i).getText());
                                            }
                                            Q.all(promises1).done(function (resultArray) {
                                                var priorityArray = [];
                                                for (var j = 0; j < resultArray.length; j++) {
                                                    //Split priority and date
                                                    var outgoingArray = resultArray[j].split("|");
                                                    priorityArray.push(outgoingArray[0].trim());
                                                }
                                                //Verify that tasks are ordered by priority
                                                expect(webdriverUtils.ifOrderedByPriority(priorityArray)).toBe(true);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }); //end it

        it('If the currently signed in user reassigns a task to another user but keeps the priority the same, the task should disappear from his to do list and only show in the file related task list with the same priority', function () {
            var currentPriority;
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys(taskJamieReassignTest).then(function () {
                toDoList.priorityAndDate(0).getText().then(function (currPriority) {
                    currentPriority = currPriority.trim();
                });
                toDoList.hoverMouseOnTask(taskJamieReassignTest);
                toDoList.clickCog();
                taskActionsDropdown.reassignAction.click().then(function () {
                    browser.waitForAngular();
                    reassignDialog.priorityDropdown.getText().then(function (dialogPriority) {
                        expect(currentPriority).toContain(dialogPriority.trim()); //show that the current priority attained from todolist matches default dropdown value
                    });
                    reassignDialog.assignToDropdown.getText().then(function (dialogAssigned) {
                        expect(dialogAssigned).toBe('Unassigned');
                    });
                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    if (browser.browserName != 'firefox') {
                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                    }
                    browser.actions().sendKeys(assignment).perform();
                    webdriverUtils.pressTab().then(function () {
                        reassignDialog.finalizeButton.click();
                        browser.waitForAngular();
                        //Now check current user's tasks to be sure he no longer has jamie reassign test in his todolist            
                        expect(toDoList.tasks.count()).toBe(0);
                        webdriverUtils.clickOnElement(navigationBar.searchIcon);
                        irSearchPage.fileNameSearchBox.sendKeys(file);
                        irSearchPage.searchButton.click();
                        recordHeader.fileTaskListBadge.click();

                        fileTaskList.findTask(taskJamieReassignTest, function (taskIndex) {
                            fileTaskList.priorityAndDate(taskIndex).getText().then(function (currentPriority) {
                                expect(currentPriority).toContain('PRIORITY 2');
                                fileTaskList.hoverMouseOnTask(taskJamieReassignTest).then(function () {
                                    fileTaskList.clickCog().then(function () {
                                        browser.waitForAngular().then(function () {
                                            taskActionsDropdown.container = fileTaskList.container;
                                            taskActionsDropdown.reassignAction.click().then(function () {
                                                browser.waitForAngular();
                                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                                if (browser.browserName != 'firefox') {
                                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                                }
                                                browser.actions().sendKeys(assignment).perform();

                                                reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                                    browser.waitForAngular();
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
    }
});
