exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];


var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var ReleaseDialog = require('./../../pageObjects/ModalDialogs/ReleaseDialog.js');
var releaseDialog = new ReleaseDialog();

var FilesView = require('./../../pageObjects/FilesView.js');
var filesView = new FilesView();

var SetTaskAttributesModal = require('./../../pageObjects/ModalDialogs/SetTaskAttributesModal.js');
var taskAttributesModal = new SetTaskAttributesModal();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js');
var lockedTaskView = new LockedTaskView();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var tasksUtils = require('../../utils/tasksUtils.js');
var searchUtil = require('../../BusinessProcess/Search.js');
var file = 'FileWithTasks_N2';
var file2 = 'FileWithTasks_A8';
var releaseToNextStep = 'ReleaseToNextStep';
var releaseToEnd = 'ReleaseToEnd';
var releaseWithDialog = 'ReleaseWithDialog';
var noAttributesTask = 'TaskWithoutAttributes';
var noAttributesTaskMultilink = 'Task_SetReleaseOnMultiStep';
var noAttributesTaskForRelease = 'TaskNoAttributesForRelease';
var setAttrBeforeReleaseMessage = 'You must set required attributes before releasing this task.';

describe("File Related Tasks - Release", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            return tasksUtils.deleteAllTaskAttributes(noAttributesTask)
            .then(function () {
                return tasksUtils.deleteAllTaskAttributes(noAttributesTaskForRelease);
            })
            .then(function () {
                return tasksUtils.deleteAllTaskAttributes(noAttributesTaskMultilink);
            })
            .then(function () {
                return tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 4')
            })
            .then(function () {
                return tasksUtils.routeTask(releaseToEnd, 'WFRelease', 'Manual 5');
            })
            .then(function () {
                return tasksUtils.routeTask(releaseWithDialog, 'WFRelease', 'Manual 1');
            })
            .then(function () {
                return tasksUtils.routeTask(noAttributesTaskMultilink, 'WFSetTaskAttributes', 'Manual 1');
            })
            .then(function () {
                return tasksUtils.routeTask(noAttributesTaskForRelease, 'SimpleWorkFlow1', 'Manual 1');
            })
            .then(function () {
                return tasksUtils.routeTask(noAttributesTask, 'SimpleWorkFlow1', 'Manual 1');
            });
        });

        beforeEach(function () {
            return tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 4')
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            })
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
        });

        afterEach(function () {
            return tasksUtils.routeTask(releaseToEnd, 'WFRelease', 'Manual 5');
        });

        it("1-should release a task to the next step when user clicks Release from 'File Related Tasks' dropdown", function () {
            var step = 'Manual 4';
            var nextStep = 'Manual 5';
            
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click()
                    })
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(fileTaskList.taskActionsIcon(taskIndex));
                    })
                    .then(recordHeader.fileTaskListBadge.click)
                    .then(function () {
                        fileTaskList.findTask(releaseToNextStep, function (taskIndex2) {
                            return expect(fileTaskList.getTaskDetails(taskIndex2, 'Step')).toEqual(nextStep);
                        });
                    });
                });
            });
        });

        it("2-should release a task to the Indexing step when user clicks Release and this task should be displayed in the 'File Related Tasks' dropdown", function () {
            var step = 'Manual 5';

            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseToEnd, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click();
                    })
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(fileTaskList.taskActionsIcon(taskIndex));
                    })
                    .then(recordHeader.fileTaskListBadge.click)
                    .then(function () {
                        fileTaskList.findTask(releaseToEnd, function (taskIndex2) {
                            expect(fileTaskList.taskDescription(taskIndex2)).toBe(releaseToEnd);
                            expect(fileTaskList.getTaskDetails(taskIndex2, 'Step')).toEqual("Indexing 1");
                            tasksUtils.ifTaskLocked(releaseToEnd, function (locked) {
                                expect(locked).toBe(false);
                            });
                        });
                    });
                });
            });
        });

        it("3-should cancel Release when user clicks Cancel button in Release dialog in case of multilink steps and task should remain in the 'File Related Tasks' dropdown", function () {
            var step = 'Manual 1';
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseWithDialog, function (taskIndex) {
                    expect(fileTaskList.getTaskDetails(taskIndex, 'Step')).toContain(step);

                    fileTaskList.taskActionsIcon(taskIndex).click();
                    taskActionsDropdown.container = fileTaskList.container;
                    taskActionsDropdown.releaseAction(taskIndex).click();
                    webdriverUtils.waitTillElementPresent(releaseDialog.nextStepDropdown).then(function () {
                        releaseDialog.nextStepDropdown.click().then(function () {
                            webdriverUtils.clickOnElement(releaseDialog.nextStepDropdownElement(1));
                            //releaseDialog.nextStepDropdownElement(1).click();
                        });
                        releaseDialog.cancelButton.click();
                        webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge).then(function () {
                            recordHeader.fileTaskListBadge.click();
                            expect(fileTaskList.getTaskDetails(taskIndex, 'Step')).toContain(step);
                        });
                    });
                });
            });
        });

        it("4-should release to selected in dialog step when user clicks OK button in Release dialog in case of multilink steps", function () {
            var step = 'Manual 1';
            var nextStep = 'Manual 2';
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseWithDialog, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click();
                    })
                    .then(function () {
                        return releaseDialog.nextStepDropdown.waitReady();
                    })
                    .then(releaseDialog.nextStepDropdown.click)
                    .then(function () {
                        return webdriverUtils.clickOnElement(releaseDialog.nextStepDropdownElement(1));
                    })
                    .then(releaseDialog.okButton.click)
                    .then(function () {
                        return recordHeader.fileTaskListBadge.waitReady();
                    })
                    .then(recordHeader.fileTaskListBadge.click)
                    .then(function () {
                        fileTaskList.findTask(releaseWithDialog, function (taskIndex2) {
                            expect(fileTaskList.taskDescription(taskIndex2)).toBe(releaseWithDialog);
                            expect(fileTaskList.getTaskDetails(taskIndex2, 'Step')).toContain(nextStep);
                        });
                    });
                });
            });
        });

        it("5-When user attempt to release task without setting required attributes it should display modal window for setting attributes " +
               "with appropriate error message", function () {
            var step = 'Manual 1';
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(noAttributesTask, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click();
                    })
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(taskAttributesModal.nextStepDropdown);
                    })
                    .then(function () {
                        return taskAttributesModal.title;
                    })
                    .then(function (title) {
                        return expect(title).toEqual("Release task");
                    })
                    .then(function () {
                        return taskAttributesModal.youMustSetAttrMessage;
                    })
                    .then(function (message) {
                        expect(message).toEqual(setAttrBeforeReleaseMessage);
                        expect(taskAttributesModal.buttonRelease.isEnabled()).toBe(false);
                    });
                });
            });
        });

        it("6-When user attempt to release task from the 'File Related Tasks' dropdown on multilink step without setting required attributes it should display modal window " +
            "for setting attributes with appropriate error message and with a dropdown for selecting next step", function () {
                var step = 'Manual 1';
                searchUtil.openFile(file2)
                .then(function () {
                    return filesView.createIcon.waitReady();
                })
                .then(recordHeader.fileTaskListBadge.click)
                .then(function () {
                    fileTaskList.findTask(noAttributesTaskMultilink, function (taskIndex) {
                        fileTaskList.taskActionsIcon(taskIndex).click()
                        .then(function () {
                            return taskActionsDropdown.container = fileTaskList.container;
                        })
                        .then(function () {
                            return taskActionsDropdown.releaseAction(taskIndex).click();
                        })
                        .then(function () {
                            return webdriverUtils.waitTillElementPresent(taskAttributesModal.nextStepDropdown);
                        })
                        .then(function () {
                            return taskAttributesModal.title;
                        })
                        .then(function (title) {
                            return expect(title).toEqual("Release task");
                        })
                        .then(function () {
                            return taskAttributesModal.youMustSetAttrMessage;
                        })
                        .then(function (message) {
                            expect(message).toEqual(setAttrBeforeReleaseMessage);
                            expect(taskAttributesModal.buttonRelease.isEnabled()).toBe(false);
                            expect(taskAttributesModal.nextStepDropdown.isDisplayed()).toBe(true);
                        });
                    });
                });
            });

        it("7-When user attempt to release task from the 'File Related Tasks' dropdown without setting required attributes but clicks Cancel in modal window " +
            "then task should not be released and should remain in the 'File Related Tasks' dropdown", function () {
                var step = 'Manual 1';
                searchUtil.openFile(file)
                .then(function () {
                    return filesView.createIcon.waitReady();
                })
                .then(recordHeader.fileTaskListBadge.click)
                .then(function () {
                    fileTaskList.findTask(noAttributesTask, function (taskIndex) {
                        fileTaskList.taskActionsIcon(taskIndex).click()
                        .then(function () {
                            return taskActionsDropdown.container = fileTaskList.container;
                        })
                        .then(function () {
                            return taskActionsDropdown.releaseAction(taskIndex).click();
                        })
                        .then(function () {
                            return webdriverUtils.waitTillElementPresent(taskAttributesModal.nextStepDropdown);
                        })
                        .then(function () {
                            return taskAttributesModal.title;
                        })
                        .then(function (title) {
                            return expect(title).toEqual("Release task");
                        })
                        .then(taskAttributesModal.buttonCancel.click)
                        .then(function () {
                            return webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge);
                        })
                        .then(recordHeader.fileTaskListBadge.click)
                        .then(function () {
                            fileTaskList.findTask(noAttributesTask, function (taskIndex1) {
                                expect(fileTaskList.taskDescription(taskIndex1)).toBe(noAttributesTask);
                                expect(fileTaskList.getTaskDetails(taskIndex1, 'Step')).toContain(step);
                            });
                        });
                    });
                });
            });

        it("8-When user attempt to release task from the 'File Related Tasks' dropdown with setting required attributes and clicks Release in modal window " +
            "then task should be released", function () {
                var step = 'Manual 1';
                var nextStep = 'Manual 2';
                searchUtil.openFile(file)
                .then(function () {
                    return filesView.createIcon.waitReady();
                })
                .then(recordHeader.fileTaskListBadge.click)
                .then(function () {
                    fileTaskList.findTask(noAttributesTaskForRelease, function (taskIndex) {
                        fileTaskList.taskActionsIcon(taskIndex).click()
                        .then(function () {
                            return taskActionsDropdown.container = fileTaskList.container;
                        })
                        .then(taskActionsDropdown.releaseAction(taskIndex).click)
                        .then(function () {
                            return webdriverUtils.waitTillElementPresent(taskAttributesModal.nextStepDropdown);
                        })
                        .then(function () {
                            return taskAttributesModal.title;
                        })
                        .then(function (title) {
                            return expect(title).toEqual("Release task");
                        })
                        .then(taskAttributesModal.userNameAttr.click)
                        .then(function () {
                            return webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(1));
                        })
                        .then(function () {
                            return taskAttributesModal.custNoAttr.sendKeys("3");
                        })
                        //if (browser.browserName === 'internet explorer') {
                        //    taskAttributesModal.custNoAttr.sendKeys(protractor.Key.TAB);
                        //}
                        .then(function () {
                            return expect(taskAttributesModal.buttonRelease.isEnabled()).toBe(true);
                        })
                        .then(taskAttributesModal.buttonRelease.click)
                        .then(function () {
                            return webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge);
                        })
                        .then(recordHeader.fileTaskListBadge.click)
                        .then(function () {
                            fileTaskList.findTask(noAttributesTaskForRelease, function (taskIndex2) {
                                expect(fileTaskList.taskDescription(taskIndex2)).toBe(noAttributesTaskForRelease);
                                expect(fileTaskList.getTaskDetails(taskIndex2, 'Step')).toContain(nextStep);
                            });
                        });
                    });
                });
            });

        it("9-should update Locked Task View when user releases a task from the 'File Related Tasks' dropdown", function () {
            var step = 'Manual 4';
            var nextStep = 'Manual 5';
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(releaseToNextStep, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.releaseAction(taskIndex).click();
                    })
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return webdriverUtils.waitTillElementPresent(lockedTaskView.taskDescription)
                    })
                    .then(function () {
                        return expect(lockedTaskView.taskDescription.isDisplayed()).toBeFalsy();
                    })
                    .then(recordHeader.fileTaskListBadge.click)
                    .then(function () {
                        fileTaskList.findTask(releaseToNextStep, function (taskIndex2) {
                            fileTaskList.taskFileName(taskIndex2).click()
                            .then(function () {
                                return browser.waitForAngular();
                            })
                            .then(function () {
                                expect(lockedTaskView.taskDescription.getText()).toBe(releaseToNextStep);
                                expect(lockedTaskView.getTaskDetails('Step').getText()).toContain(nextStep);
                            })
                        });
                    });
                });
            });
        });
    };
});