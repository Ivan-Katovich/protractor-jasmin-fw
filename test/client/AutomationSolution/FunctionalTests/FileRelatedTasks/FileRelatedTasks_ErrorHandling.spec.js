exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js');
var errorMessage = new ErrorMessage();

var SetTaskAttributesModal = require('./../../pageObjects/ModalDialogs/SetTaskAttributesModal.js');
var taskAttributesModal = new SetTaskAttributesModal();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');

var searchUtil = require('../../BusinessProcess/Search.js');

var FilesView = require('./../../pageObjects/FilesView.js');
var filesView = new FilesView();

var file1 = 'FileWithTasks_N2';
var file2 = 'FileWithTasks_N2';
var releaseToEnd = 'ReleaseToEnd';
var releaseToNextStep = 'ReleaseToNextStep';
var releaseOnSplitStep = 'ReleaseOnSplitStep';
var releaseOnRendezvousStep = 'ReleaseOnRendezvousStep';
var lockedByAnotherUserTask = 'LockedByAnotherUser';
var step = 'Manual 1';
var releaseStep = 'Manual 4';
var lockedByAnotherUserMessage = "This task or diary is locked by another person. Please try again later.";
var taskOnAnotherStepMessage = "The task or diary is not available on this step.";
var taskOnSplitStepMessage = "Releasing a task to a Split step is currently not supported. Please use the ImageRight Desktop to process this task.";
var taskOnRendezvousStepMessage = "Releasing a task to a Rendezvous step is currently not supported. Please use the ImageRight Desktop to process this task.";

function openFile(file) {
    return navigationBar.searchIcon.click()
    .then(function () {
        return searchPage.fileNameSearchBox.sendKeys(file);
    })
    .then(searchPage.searchButton.click)
    .then(function () {
        return browser.waitForAngular();
    });
}

describe("File Related Tasks - Error Handling", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            return tasksUtils.routeTask(releaseToEnd, 'WFRelease', 'Manual 5');
        });

        beforeEach(function () {
            return tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 4')
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            })
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            });
        });

        afterEach(function () {
            return tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 4');
        });

        afterAll(function () {
            return tasksUtils.unlockTaskByDescription(lockedByAnotherUserTask);
        });

        it("1-When user attempt to lock and open a task which is locked by another user it should display an error message", function () {
            return tasksUtils.lockTaskByDescription(lockedByAnotherUserTask, 'navasaal')
            .then(function () {
                return searchUtil.openFile(file1);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(lockedByAnotherUserTask, function (taskIndex) {
                    fileTaskList.taskFileName(taskIndex).click()
                    .then(function () {
                        return errorMessage.growlNotificationText.then(function (message) {
                            return expect(message).toContain(lockedByAnotherUserMessage);
                        });
                    });
                });
            });
        });

        it("2-When user clicks task actions button for task which is locked by another user it should display an error message", function () {
            return tasksUtils.lockTaskByDescription(lockedByAnotherUserTask, 'navasaal')
            .then(function () {
                return searchUtil.openFile(file1);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(lockedByAnotherUserTask, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        return errorMessage.growlNotificationText.then(function (message) {
                            return expect(message).toContain(lockedByAnotherUserMessage);
                        });
                    });
                });
            });
        });

        it("3-When user attempt to set attributes for task which has been released it should display appropriate error message", function () {
            return searchUtil.openFile(file1)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                    expect(fileTaskList.getTaskDetails(taskIndex, 'Step')).toContain(releaseStep);
                    tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
                    fileTaskList.taskActionsIcon(taskIndex).click();
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.setAttributesAction(taskIndex).click();
                    errorMessage.errorMessageText.then(function (message) {
                        expect(message).toContain(taskOnAnotherStepMessage);
                        errorMessage.okButton.click();
                        tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                            expect(locked).toBe(false);
                        });
                    });
                });
            });
        });

        it("4-When user attempt to lock and open task which has been released it should display appropriate error message", function () {
            tasksUtils.unlockTasks(file1)
            .then(function () {
                return searchUtil.openFile(file1);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                    tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5')
                    .then(fileTaskList.taskFileName(taskIndex).click)
                    .then(function () {
                        return errorMessage.growlNotificationText.then(function (message) {
                            return expect(message).toContain(taskOnAnotherStepMessage);
                        });
                    });
                });
            });
        });

        it("5-When user attempt to release task which has been released it should display appropriate error message", function () {
            tasksUtils.unlockTasks(file1)
            .then(function () {
                return openFile(file1);
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                    expect(fileTaskList.getTaskDetails(taskIndex, 'Step')).toContain(releaseStep);
                    tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click();
                    })
                    .then(function () {
                        return errorMessage.errorMessageText;
                    })
                    .then(function (message) {
                        return expect(message).toContain(taskOnAnotherStepMessage);
                    })
                    .then(errorMessage.okButton.click)
                    .then(function () {
                        return tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                            return expect(locked).toBe(false);
                        });
                    })
                });
            });
        });

        it("6-When user attempt to delete task which has been released it should display appropriate error message", function () {
            tasksUtils.unlockTasks(file1);
            openFile(file1);
            //Find task in the 'File related tasks' dropdown
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                //Verify step
                expect(fileTaskList.getTaskDetails(taskIndex, 'Step')).toContain(releaseStep);
                //Move task to the next step in the DB
                tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
                //Click 'Delete' action
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.deleteAction(taskIndex).click();
                errorMessage.errorMessageText.then(function (message) {
                    //Verify that appropriate error message is displayed
                    expect(message).toContain(taskOnAnotherStepMessage);
                    errorMessage.okButton.click();
                    //Verify in the DB that task is unlocked
                    tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                        expect(locked).toBe(false);
                    });
                });
            });
        });

        it("7-When user attempt to change priority of task which has been released it should display appropriate error message", function () {
            tasksUtils.unlockTasks(file1);
            openFile(file1);
            //Find task in the 'File related tasks' dropdown
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                //Verify step
                expect(fileTaskList.getTaskDetails(taskIndex, 'Step')).toContain(releaseStep);
                //Move task to the next step in the DB
                tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
                //Click 'Change Priority' action
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.editTaskAction(taskIndex).click();
                errorMessage.errorMessageText.then(function (message) {
                    //Verify that appropriate error message is displayed
                    expect(message).toContain(taskOnAnotherStepMessage);
                    errorMessage.okButton.click();
                    //Verify in the DB that task is unlocked
                    tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                        expect(locked).toBe(false);
                    });
                });
            });
        });

        it("8-When user attempt to route the task which has been released it should display appropriate error message", function () {
            tasksUtils.unlockTasks(file1);
            openFile(file1);
            //Find task in the 'File related tasks' dropdown
            recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                //Verify step
                expect(fileTaskList.getTaskDetails(taskIndex, 'Step')).toContain(releaseStep);
                //Move task to the next step in the DB
                tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
                //Click 'Route' action
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click();
                errorMessage.errorMessageText.then(function (message) {
                    //Verify that appropriate error message is displayed
                    expect(message).toContain(taskOnAnotherStepMessage);
                    errorMessage.okButton.click();
                    //Verify in the DB that task is unlocked
                    tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                        expect(locked).toBe(false);
                    });
                });
            });
        });

        it("9-When user attempt to release task on Split it should display appropriate error message", function () {
            return tasksUtils.unlockTasks(file2)
            .then(function () {
                return searchUtil.openFile(file2);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseOnSplitStep, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click();
                    })
                    .then(function () {
                        errorMessage.errorMessageText.then(function (message) {
                            return expect(message).toContain(taskOnSplitStepMessage);
                        })
                        .then(errorMessage.okButton.click)
                        .then(recordHeader.fileTaskListBadge.click)
                        .then(function () {
                            return fileTaskList.findTask(releaseOnSplitStep, function (taskIndex2) {
                                return expect(fileTaskList.getTaskDetails(taskIndex2, 'Step')).toContain('Split 1');
                            });
                        });
                    });
                });
            });
        });

        it("10-When user attempt to release task on Rendezvous it should display appropriate error message", function () {
            return tasksUtils.unlockTasks(file2)
            .then(function () {
                return searchUtil.openFile(file2);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseOnRendezvousStep, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click();
                    })
                    .then(function () {
                        errorMessage.errorMessageText.then(function (message) {
                            return expect(message).toContain('Releasing a task to a Rendezvous step is currently not supported');
                        })
                        .then(errorMessage.okButton.click)
                        .then(recordHeader.fileTaskListBadge.click)
                        .then(function () {
                            return fileTaskList.findTask(releaseOnRendezvousStep, function (taskIndex2) {
                                return expect(fileTaskList.getTaskDetails(taskIndex2, 'Step')).toContain('Rendezvous 1');
                            });
                        });
                    });
                });
            });
        });
    }
});