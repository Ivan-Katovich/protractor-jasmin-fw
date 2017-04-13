exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

searchUtil = require('../../BusinessProcess/Search.js');

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var DeleteTaskDialog = require('./../../pageObjects/ModalDialogs/DeleteTaskDialog.js');
var deleteTaskDialog = new DeleteTaskDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var DeleteTaskDialog = require('./../../pageObjects/ModalDialogs/DeleteTaskDialog.js');
var deleteTaskDialog = new DeleteTaskDialog();

var CreateTaskDiaryModal = require('./../../pageObjects/ModalDialogs/CreateTaskDiaryModal.js');
var createTaskDialog = new CreateTaskDiaryModal();

var CreateTaskDiaryDropdown = require('./../../pageObjects/DropdownLists/CreateTaskDiaryDropdown.js');
var createTaskDiaryDropdown = new CreateTaskDiaryDropdown();

var FilesView = require('./../../pageObjects/FilesView.js');
var filesView = new FilesView();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js');
var lockedTaskView = new LockedTaskView();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');
var dataBaseHelper = require('../../utils/dataBaseHelper.js');

var confirmationMessage = "Are you sure you would like to delete this task? This action cannot be undone.";
var task = "Task_CancelTesting";
var file = "FileForAutoTesting";
var flow = "WFSetTaskAttributes";
var step = "Manual 1";
var defaultAssignedTo = "Unassigned";
var taskData;

function createTask(taskDescription, flowName, stepName, assignTo, fn) {
    filesView.createIcon.click()
    .then(createTaskDiaryDropdown.createTaskAction.click)
    .then(function () {
        return browser.waitForAngular();
    })
    .then(function () {
        return createTaskDialog.selectFlow(flowName);
    })
    .then(createTaskDialog.priorityDropdown.click)
    .then(createTaskDialog.priorityDropdownElement(2).click)
    .then(function () {
        return createTaskDialog.description.sendKeys(taskDescription);
    })
    .then(createTaskDialog.doneButton.click)
    .then(function () {
        return browser.waitForAngular();
    })
    .then(function () {
        fn();
    });
}

describe("File Related Tasks - Delete task", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function (done) {
            tasksUtils.deleteTaskByDescription(task)
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            })
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                createTask(task, flow, step, null, function () {
                    done();
                });
            });
        });

        it("when a user deletes a task the 'Delete task' modal with the conformation message should be displayed", function () {
            taskActionsDropdown.container = fileTaskList.container;
            recordHeader.fileTaskListBadge.waitReady()
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.hoverMouseOnTask(task)
                    .then(function(){
                        return fileTaskList.clickCog();
                    })
                    .then(taskActionsDropdown.deleteAction.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return expect(deleteTaskDialog.title).toEqual("Delete Task");
                    })
                    .then(function () {
                        deleteTaskDialog.deleteTaskMessage(function (message) {
                            expect(message).toEqual(confirmationMessage);
                        });
                    });
                });
            });
        });

        it("when a user deletes a task and clicks the 'Keep task' button in the 'Delete task' modal this task should exist in the 'File Related Tasks' dropdown and in the database", function () {
            taskActionsDropdown.container = fileTaskList.container;
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.hoverMouseOnTask(task)
                    .then(function () {
                        return fileTaskList.clickCog();
                    })
                    .then(taskActionsDropdown.deleteAction.click)
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(deleteTaskDialog.keepTaskButton);
                    })
                    .then(deleteTaskDialog.keepTaskButton.click)
                    .then(recordHeader.fileTaskListBadge.click)
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(fileTaskList.taskActionsIcon(taskIndex));
                    })
                    .then(function () {
                        return expect(fileTaskList.taskDescription(taskIndex)).toEqual(task);
                    })
                    .then(function () {
                        tasksUtils.ifTaskExistInDB(task, function (exist) {
                            expect(exist).toBe(true);
                        });
                    });
                });
            });
        });

        it("when a user deletes a task it should disapear from the 'File Related Tasks' dropdown and from the database", function () {
            taskActionsDropdown.container = fileTaskList.container;
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.hoverMouseOnTask(task)
                    .then(function () {
                        return fileTaskList.clickCog();
                    })
                    .then(taskActionsDropdown.deleteAction.click)
                    .then(deleteTaskDialog.deleteTaskButton.click)
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge);
                    })
                    .then(recordHeader.fileTaskListBadge.click)
                    .then(function () {
                        fileTaskList.expandAllTasks();
                        webdriverUtils.getItemIndex(fileTaskList.allTaskDescriptions, task, function (taskIndex1) {
                            tasksUtils.ifTaskExistInDB(task, function (exist) {
                                expect(exist).toBe(false);
                            });
                        });
                    });
                });
            });
        });

        xit("when a user deletes a task from 'File Related Tasks' dropdown it should disapear from locked Task view", function (done) {
            taskActionsDropdown.container = fileTaskList.container;
            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {              
                fileTaskList.findTask(task, function (taskIndex) {
                    recordHeader.fileTaskListBadge.click()
                    .then(fileTaskList.taskActionsIcon(taskIndex).click)
                    .then(taskActionsDropdown.deleteAction(taskIndex).click)
                    .then(deleteTaskDialog.deleteTaskButton.click)
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(lockedTaskView.taskDescription);
                    })
                    .then(function () {
                        return browser.waitForAngular()
                    })
                    .then(function () {
                        done(expect(lockedTaskView.taskDescription.isDisplayed()).toBeFalsy())
                    });
                });
            });
        });
    };
});