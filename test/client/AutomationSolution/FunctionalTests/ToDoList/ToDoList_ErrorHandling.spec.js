exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

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


var releaseToNextStep = 'ReleaseToNextStep';
var releaseOnSplitStep = 'ReleaseOnSplitStep';
var releaseOnRendezvousStep = 'ReleaseOnRendezvousStep';
var noAttributesTask = 'TaskWithoutAttributes';
var lockedByAnotherUserTask = 'LockedByAnotherUser';
var step = 'Manual 1';
var releaseStep = 'Manual 4';
var lockedByAnotherUserMessage = "This task or diary is locked by another person. Please try again later.";
var taskOnAnotherStepMessage = "The task or diary is not available on this step.";
var attributesNotSetMessage = "This task cannot be released because some of its attribute values are not set";
var taskOnSplitStepMessage = "Releasing a task to a Split step is currently not supported. Please use the ImageRight Desktop to process this task.";
var taskOnRendezvousStepMessage = "Releasing a task to a Rendezvous step is currently not supported. Please use the ImageRight Desktop to process this task.";


describe("To Do List - Error Handling", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function (done) {
            tasksUtils.lockTaskByDescription(lockedByAnotherUserTask, 'navasaal')
            .then(function () {
                done(tasksUtils.unlockTaskByDescription(releaseToNextStep))
            });
        });

        afterAll(function (done) {
            done(tasksUtils.unlockTaskByDescription(lockedByAnotherUserTask));
        });

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.dateFilter('ALL'))
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.allTasksCheckbox);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function () {
                return browser.waitForAngular();
            });
        });

        afterEach(function (done) {
            done(tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 4'));
        });

        it("1-When user attempts to lock and open a task which is locked by another user it should display an error message", function () {
            //Find the task
            toDoList.searchInput.sendKeys(lockedByAnotherUserTask);
            webdriverUtils.getItemIndex(toDoList.allTaskDescriptions, lockedByAnotherUserTask, function (descriptionIndex) {
                expect(descriptionIndex).toBeGreaterThan(-1);
                //Click file name to open task
                toDoList.taskFileName(descriptionIndex).click();
                //Verify that appropriate error message is displayed
                errorMessage.growlNotificationText.then(function (message) {
                    expect(message).toContain(lockedByAnotherUserMessage);
                });
            });
        });

        it("2-When user clicks task actions button for task which is locked by another user it should display an error message", function () {
            return toDoList.searchInput.sendKeys(lockedByAnotherUserTask)
            .then(toDoList.taskFileName(0).click)
            .then(function () {
                errorMessage.growlNotificationText.then(function (message) {
                    expect(message).toContain(lockedByAnotherUserMessage);
                });
            });
        }); 

        it("3-When user attempt to lock and open task which has been released it should display appropriate error message", function (done) {
            toDoList.searchInput.sendKeys(releaseToNextStep)
            expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(releaseStep);
            tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
            toDoList.taskFileName(0).click();
            browser.sleep(1000);
            errorMessage.growlNotificationRow.then(function (message) {
                done(expect(message).toContain(taskOnAnotherStepMessage));
            });
        });

        it("4-When user attempt to release task which has been released it should display appropriate error message", function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(releaseToNextStep);
            })
            .then(function () {
                return tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
            })
            .then(function () {
                return browser.sleep(5000);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(releaseToNextStep);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.releaseAction.click)
            .then(function(){
                errorMessage.errorMessageText.then(function (message) {
                    expect(message).toContain(taskOnAnotherStepMessage);
                    errorMessage.okButton.click();
                    tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                        expect(locked).toBe(false);
                    });
                });
            });
        });
              
        it("5-When user attempt to delete task which has been released it should display appropriate error message", function () {
            return toDoList.searchInput.sendKeys(releaseToNextStep)
            .then(function () {
                return expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(releaseStep);
            })
            .then(function () {
                return tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(releaseToNextStep);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.deleteAction.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                errorMessage.errorMessageText.then(function (message) {
                    expect(message).toContain(taskOnAnotherStepMessage);
                    errorMessage.okButton.click();
                    tasksUtils.ifTaskLocked(releaseToNextStep, function (locked) {
                        expect(locked).toBe(false);
                    });
                });
            });
        });

        it("6-When user attempt to change priority of task which has been released it should display appropriate error message", function () {
            toDoList.searchInput.sendKeys(releaseToNextStep).then(function () {
                //Verify step
                expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain(releaseStep);
                //Move task to the next step in the DB
                tasksUtils.routeTask(releaseToNextStep, 'WFRelease', 'Manual 5');
                toDoList.hoverMouseOnTask(releaseToNextStep);
                toDoList.clickCog();
                taskActionsDropdown.editTaskAction.click();
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

        it("7-When user attempt to release task on Split it should display appropriate error message", function () {
            toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(releaseOnSplitStep);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(releaseOnSplitStep);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.releaseAction.click)
            .then(function(){
                errorMessage.errorMessageText.then(function (message) {
                    expect(message).toContain(taskOnSplitStepMessage);
                    errorMessage.okButton.click();
                    tasksUtils.ifTaskLocked(releaseOnSplitStep, function (locked) {
                        expect(locked).toBe(false);
                    });
                    browser.waitForAngular().then(function () {
                        expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain('Split 1');
                    });
                });
            });
        });

        it("8-When user attempt to release task on Rendezvous it should display appropriate error message", function () {
            toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(releaseOnRendezvousStep);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(releaseOnRendezvousStep);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.releaseAction.click)
            .then(function () {
                errorMessage.errorMessageText.then(function (message) {
                    expect(message).toContain(taskOnRendezvousStepMessage);
                    errorMessage.okButton.click();
                    browser.waitForAngular().then(function () {
                        expect(toDoList.getTaskDetails(0, 'Step').getText()).toContain('Rendezvous 1');
                    });
                });
            });
        });
    }
});