exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];


var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var EditTaskDialog = require('./../../pageObjects/ModalDialogs/EditTaskDialog.js');
var editTaskDialog = new EditTaskDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();
var tasksUtils = require('../../utils/tasksUtils.js');

var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var dateObj = new Date();

var file = "FileWithDifferentTasks";
var taskDescription = "Task_AutoTesting";
var editedTask = "Task_EditedDescription";
var currentPriority = 8;
var changedPriority = 3;


function openFile(fileName) {
    navigationBar.searchIcon.click();
    searchPage.fileNameSearchBox.sendKeys(fileName);
    searchPage.searchButton.click();
}

describe("File Related Tasks - Edit Task", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            tasksUtils.changeTaskDescription(editedTask, taskDescription);
        });

        afterEach(function () {
            tasksUtils.changeTaskDescription(editedTask, taskDescription);
        });

        beforeEach(function () {
            tasksUtils.changePriority(taskDescription, currentPriority);
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
        });

        it('Selecting Edit Task in the Task Actions dropdown from File Task List should open the Edit Task dialog with a dropdown only with values 0 through 9 and task description input', function () {
            //open file related tasks list
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();

            fileTaskList.hoverMouseOnTask(0);
            fileTaskList.clickCog();
            taskActionsDropdown.container = fileTaskList.container;
            webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction)
            .then(function () {
                expect(editTaskDialog.header.isDisplayed()).toBe(true);
                expect(editTaskDialog.header.getText()).toBe('Edit Task');
                expect(editTaskDialog.taskDescription.isDisplayed()).toBe(true);
                browser.waitForAngular().then(function () {
                    //open priority dropdown to select new priority value
                    editTaskDialog.dropdown.click().then(function () {
                        browser.waitForAngular().then(function () {
                            var priorityElms = editTaskDialog.dropdownElements();
                            priorityElms.getText().then(function (priorities) {
                                expect(priorities.length).toBe(10);
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
                        });
                    });
                });
            });
        });

        it('If the user selects a priority from the dropdown and then presses Cancel, the task priority should go unchanged', function () {
            var task = 'change priority test task';
            //open file related tasks list
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            //Select a task with a unique priority (file a8 with task description test task in Jamies workflow test)
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.priorityAndDate(taskIndex).getText()
                .then(function (currentPriority) {
                    expect(currentPriority).toContain('PRIORITY 5');
                    fileTaskList.hoverMouseOnTask(0);
                    fileTaskList.clickCog();
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction)
                    .then(function () {
                        editTaskDialog.dropdown.click().then(function () {
                            var prioritiesElms = editTaskDialog.dropdownElements();
                            prioritiesElms.then(function (priorities) {
                                //select priority 3 (or some other priority different than the current one of 5)
                                priorities[3].click();
                                browser.waitForAngular().then(function () {
                                    //press the cancel button
                                    editTaskDialog.cancelButton.click().then(function () {
                                        browser.waitForAngular();
                                        //open file related tasks list
                                        recordHeader.fileTaskListBadge.click().then(function () {
                                            //verfiy priority didn't change
                                            fileTaskList.findTask(task, function (taskIndex1) {
                                                fileTaskList.priorityAndDate(taskIndex1).getText().then(function (currentPriority1) {
                                                    expect(currentPriority1).toContain('PRIORITY 5');
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

        it('If a user selects a higher priority and presses the SAVE button, the priority should update to the new value and File Task List should update to stay in order by priority', function () {
            //select a file with a priority < 9, check the priroity and then the order of todolist
            //open change priority dialog and select a new (higher) priority and save
            //Select a task with a unique priority (file a8 with task description test task in Jamies workflow test)
            var task = 'increasing priority test';
            //open file related tasks list
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.priorityAndDate(taskIndex).getText().then(function (currentPriority) {
                    expect(currentPriority).toContain('PRIORITY 4');
                    fileTaskList.hoverMouseOnTask(0);
                    fileTaskList.clickCog();
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                            editTaskDialog.dropdown.click().then(function () {
                                var prioritiesElms = editTaskDialog.dropdownElements();
                                prioritiesElms.then(function (priorities) {
                                    //select priority 8 (or some other priority higher than the current one of 4)
                                    priorities[8].click();
                                    browser.waitForAngular().then(function () {
                                        //press the change priority button
                                        editTaskDialog.finalizeButton.click().then(function () {
                                            browser.waitForAngular();
                                            //open file related tasks list
                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                //verfiy priority increased
                                                fileTaskList.findTask(task, function (taskIndex1) {
                                                    fileTaskList.priorityAndDate(taskIndex1).getText().then(function (currentPriority1) {
                                                        expect(currentPriority1).toContain('PRIORITY 8');
                                                    });
                                                });
                                                browser.waitForAngular().then(function () {
                                                    //check that files are ordered by priority 
                                                    fileTaskList.tasks.count().then(function (count) {
                                                        expect(count).toBeGreaterThan(0);
                                                        var promises1 = [];
                                                        for (var i = 0; i < count; i++) {
                                                            promises1.push(fileTaskList.priorityAndDate(i).getText());
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
                });
            });
        });

        it('If a user selects a lower priority and presses the SAVE button, the priority should update to the new value and the File Task List should update to stay in order by priority', function () {
            var task = 'increasing priority test';
            //open file related tasks list
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.priorityAndDate(taskIndex).getText().then(function (currentPriority) {
                    expect(currentPriority).toContain('PRIORITY 8');
                    //now decrease priority back to original value and check that it updates properly
                    fileTaskList.hoverMouseOnTask(0);
                    fileTaskList.clickCog();
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                            editTaskDialog.dropdown.click().then(function () {
                                var prioritiesElms = editTaskDialog.dropdownElements();
                                prioritiesElms.then(function (priorities) {
                                    //select priority 4 again to return to original priority
                                    priorities[4].click();
                                    browser.waitForAngular().then(function () {
                                        //press the change priority button
                                        editTaskDialog.finalizeButton.click().then(function () {
                                            browser.waitForAngular();
                                            //open file related tasks list
                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                //verfiy priority decreased
                                                fileTaskList.findTask(task, function (taskIndex1) {
                                                    fileTaskList.priorityAndDate(taskIndex1).getText().then(function (currentPriority1) {
                                                        expect(currentPriority1).toContain('PRIORITY 4');
                                                    });
                                                });
                                                //check that files are ordered by priority 
                                                browser.waitForAngular().then(function () {
                                                    fileTaskList.tasks.count().then(function (count) {
                                                        expect(count).toBeGreaterThan(0);
                                                        var promises1 = [];
                                                        for (var i = 0; i < count; i++) {
                                                            promises1.push(fileTaskList.priorityAndDate(i).getText());
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
                });
            });
        });

        it('The user should be able to choose to update the prirority to the current priority value. The tasks priority will remain unchanged and File Task List still in order', function () {
            var task = 'increasing priority test';
            //open file related tasks list
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.priorityAndDate(taskIndex).getText().then(function (currentPriority) {
                    expect(currentPriority).toContain('PRIORITY 4');
                    //now decrease priority back to original value and check that it updates properly
                    fileTaskList.hoverMouseOnTask(0);
                    fileTaskList.clickCog();
                    taskActionsDropdown.container = fileTaskList.container;
                    webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction).then(function () {
                            editTaskDialog.dropdown.click().then(function () {
                                var prioritiesElms = editTaskDialog.dropdownElements();
                                prioritiesElms.then(function (priorities) {
                                    //select priority 4 again to return to original priority
                                    priorities[4].click();
                                    browser.waitForAngular().then(function () {
                                        //press the change priority button
                                        editTaskDialog.finalizeButton.click().then(function () {
                                            browser.waitForAngular();
                                            //open file related tasks list
                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                //verfiy priority = 4
                                                fileTaskList.findTask(task, function (taskIndex1) {
                                                    fileTaskList.priorityAndDate(taskIndex1).getText().then(function (currentPriority1) {
                                                        expect(currentPriority1).toContain('PRIORITY 4');
                                                    });
                                                });
                                                browser.waitForAngular().then(function () {
                                                    //check that files are ordered by priority 
                                                    browser.waitForAngular().then(function () {
                                                        fileTaskList.tasks.count().then(function (count) {
                                                            expect(count).toBeGreaterThan(0);
                                                            var promises1 = [];
                                                            for (var i = 0; i < count; i++) {
                                                                promises1.push(fileTaskList.priorityAndDate(i).getText());
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
                    });
                });
            });
        });

        it('It is possible to edit a task description and priority in the Edit Task dialog', function () {
            openFile(file);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(taskDescription, function (taskIndex) {

                fileTaskList.hoverMouseOnTask(0);
                fileTaskList.clickCog();
                taskActionsDropdown.container = fileTaskList.container;
                webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction)

                expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(currentPriority.toString());
                webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                    webdriverUtils.clickOnElement(editTaskDialog.priorityDropdownElement(3)).then(function () {
                        expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(changedPriority.toString());

                        editTaskDialog.taskDescription.clear();
                        editTaskDialog.taskDescription.sendKeys(editedTask);
                        editTaskDialog.finalizeButton.click();
                        browser.waitForAngular();

                        recordHeader.fileTaskListBadge.click();
                        fileTaskList.findTask(editedTask, function (taskIndex) {
                            expect(fileTaskList.tasks.count()).toEqual(1);
                            expect(fileTaskList.taskDescription(0)).toEqual(editedTask);
                            fileTaskList.priority(0, function (priority) {
                                expect(priority).toEqual("PRIORITY " + changedPriority.toString());

                                fileTaskList.searchInput.clear();
                                fileTaskList.searchInput.sendKeys(taskDescription);
                                expect(fileTaskList.noTasksMessageDisplayed).toEqual("You have no items.");
                            });
                        });
                    });
                });
            });
        });

        it('When a user edits a task description and priority but clicks Cancel button the initial description and priority should be left', function () {
            openFile(file);
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(taskDescription, function (taskIndex) {

                fileTaskList.hoverMouseOnTask(0);
                fileTaskList.clickCog();
                taskActionsDropdown.container = fileTaskList.container;
                webdriverUtils.clickOnElement(taskActionsDropdown.editTaskAction)

                expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(currentPriority.toString());
                webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                    webdriverUtils.clickOnElement(editTaskDialog.priorityDropdownElement(3)).then(function () {
                        expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(changedPriority.toString());

                        editTaskDialog.taskDescription.clear();
                        editTaskDialog.taskDescription.sendKeys(editedTask);
                        editTaskDialog.cancelButton.click();
                        browser.waitForAngular();

                        recordHeader.fileTaskListBadge.click();
                        fileTaskList.findTask(taskDescription, function (taskIndex) {
                            expect(fileTaskList.tasks.count()).toEqual(1);
                            expect(fileTaskList.taskDescription(0)).toEqual(taskDescription);
                            fileTaskList.priority(0, function (priority) {
                                expect(priority).toEqual("PRIORITY " + currentPriority.toString());
                            });

                            fileTaskList.searchInput.clear();
                            fileTaskList.searchInput.sendKeys(editedTask);
                            expect(fileTaskList.noTasksMessageDisplayed).toEqual("You have no items.");
                        });
                    });
                });
            });
        });

    }
});