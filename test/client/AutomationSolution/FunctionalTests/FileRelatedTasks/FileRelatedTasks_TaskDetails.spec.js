exports.tags = ['Workflow_Tasks', 'File_Related_Search'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var conversionUtils = require('../../utils/conversionUtils.js');
var Q = require('q');
var tasksUtils = require('../../utils/tasksUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var task = 'TaskDetailsTest';
var file = 'FileWithDifferentTasks';
var priority = 'PRIORITY 1';
var flow = 'SimpleWorkFlow1';
var step = 'Manual 3';
var fileNumber = 'FileWithDifferentTasks';
var sendBy = 'XP1';
var sendOn = '12/22/2015';
var assignedTo = 'Unassigned';
var actionsInOrder = "Open Task\n[Enter]\nSet Attributes\nRelease\nReassign. . .\nReschedule. . .\nRoute. . .\nEdit Task . . .\nDelete";


describe("File Related Tasks - Task Details", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
        });


        it("it should display File Name, File Number, Flow, Step, Priority and it is possible to expand and collapse a Task Description", function (done) {
            //Open 'File Related Tasks' dropdown 
            recordHeader.fileTaskListBadge.click();
            browser.waitForAngular();
            //Verify that all tasks have the same file name and file number
            fileTaskList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                for (var i = 0; i < tasksCount; i++) {
                    expect(fileTaskList.taskFileName(i).getText()).toEqual(file);
                    expect(fileTaskList.getTaskDetails(i, "FileNumber")).toEqual(fileNumber.toUpperCase());
                }
            });
            //Find task
            fileTaskList.findTask(task, function (taskIndex) {
                //Verify task details
                fileTaskList.priority(taskIndex, function (taskPriority) {
                    expect(taskPriority).toEqual(priority);
                });
                fileTaskList.getTaskDetails(taskIndex, "Flow").then(function (flowName) {
                    expect(flowName).toEqual(flow);
                });
                fileTaskList.getTaskDetails(taskIndex, "Step").then(function (stepName) {
                    expect(stepName).toEqual(step);
                });
                fileTaskList.taskDescription(taskIndex).then(function (taskDescription) {
                    expect(taskDescription).toEqual(task);
                });
                //Expand and collapse a Task Description
                fileTaskList.ifTaskDescriptionExpanded(taskIndex, function (ifExpanded1) {
                    expect(ifExpanded1).toBe(true);

                    expect(fileTaskList.getTaskDetails(0, 'Sent by').isDisplayed()).toBe(true);
                    expect(fileTaskList.getTaskDetails(0, 'Sent on').isDisplayed()).toBe(true);
                    expect(fileTaskList.getTaskDetails(0, 'Sent by').getText()).toEqual(sendBy);
                    expect(fileTaskList.getTaskDetails(0, 'Sent on').getText()).toEqual(sendOn);

                    fileTaskList.taskDetailsExpander(taskIndex).click();
                    fileTaskList.ifTaskDescriptionExpanded(taskIndex, function (ifExpanded2) {
                        expect(ifExpanded2).toBe(false);
                        done();
                    });
                });
            });
        });

        it("should display tasks ordered by priority and ordered by available date within identical priority", function (done) {
            var priorityArray = [];
            var dateArray = [];

            //Open 'File Related Tasks' dropdown 
            recordHeader.fileTaskListBadge.click();
            browser.waitForAngular();

            //Get list of priority string
            fileTaskList.tasks.count().then(function (count) {
                expect(count).toBeGreaterThan(0);
                var promises = [];
                for (var i = 0; i < count; i++) {
                    promises.push(fileTaskList.priorityAndDate(i).getText());
                }
                Q.all(promises).done(function (resultArray) {
                    for (var i = 0; i < resultArray.length; i++) {
                        //Split priority and date
                        var outgoingArray = resultArray[i].split("|");
                        priorityArray.push(outgoingArray[0].trim());
                        //Get dates from within certain priority
                        if (outgoingArray[0].trim() === priority) {
                            dateArray.push(new Date(outgoingArray[1].trim()));
                        }
                    }
                    //Verify that tasks are ordered by priority
                    expect(webdriverUtils.ifOrderedByPriority(priorityArray)).toBe(true);
                    //Verify that tasks are ordered by date within identical priority
                    expect(conversionUtils.isArraySortedAscending(dateArray)).toBe(true);

                    //Find task
                    fileTaskList.findTask(task, function (taskIndex) {
                        fileTaskList.availableDate(taskIndex, function (UIdate) {
                            tasksUtils.getAvailableDate(task, function (DBdate) {
                                if (!DBdate) {
                                    expect(true).toBe(false);
                                } else {
                                    expect(DBdate.getMonth()).toEqual(new Date(UIdate).getMonth());
                                    expect(DBdate.getDate()).toEqual(new Date(UIdate).getDate());
                                    expect(DBdate.getFullYear()).toEqual(new Date(UIdate).getFullYear());
                                    done();
                                }
                            });
                        });
                    });
                });
            });
        });

        it("it should display all possible task actions in actions list in correct order", function () {
            recordHeader.fileTaskListBadge.click();
            fileTaskList.searchInput.sendKeys(task).then(function () {
                browser.waitForAngular();
                fileTaskList.taskActionsIcon(0).click();
                taskActionsDropdown.actionsText.getText().then(function (text) {
                    expect(text).toEqual(actionsInOrder);
                });
            });
        });
    }
});