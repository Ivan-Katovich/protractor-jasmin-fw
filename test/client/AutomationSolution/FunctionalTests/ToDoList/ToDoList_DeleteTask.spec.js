/*
    unit: ToDoList_DeleteTask.spec.js;
    created: ...
    refactored: 9/16/2016, navasaal
*/
exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
/* IR modeling; */
var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js'),
    DeleteTaskDialog = require('./../../pageObjects/ModalDialogs/DeleteTaskDialog.js'),
    TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js'),
    NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js'),
    CreateTaskDiaryDropdown = require('./../../pageObjects/DropdownLists/CreateTaskDiaryDropdown.js'),
    LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js'),
    RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js'),
    CreateTaskDiaryModal = require('./../../pageObjects/ModalDialogs/CreateTaskDiaryModal.js'),
    DeleteTaskDialog = require('./../../pageObjects/ModalDialogs/DeleteTaskDialog.js'),
    FilesView = require('./../../pageObjects/FilesView.js');

/* IR objects; */
var toDoList = new ToDoList(),
    deleteTaskDialog = new DeleteTaskDialog(),
    taskActionsDropdown = new TaskActionsDropdown(),
    navigationBar = new NavigationBar(),
    leftRailBar = new LeftRailBar(),
    recordHeader = new RecordHeader(),
    deleteTaskDialog = new DeleteTaskDialog(),
    createTaskDialog = new CreateTaskDiaryModal(),
    createTaskDiaryDropdown = new CreateTaskDiaryDropdown(),
    filesView = new FilesView();

/* helpers; */
var tasksUtils = require('../../utils/tasksUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    searchUtil = require('../../BusinessProcess/Search.js');

/* vars; */
var confirmationMessage = "Are you sure you would like to delete this task? This action cannot be undone.",
    task = "TaskCancelTesting",
    file = "FileForAutoTesting",
    flow = "WFSetTaskAttributes",
    step = "Manual 1",
    defaultAssignedTo = "Unassigned";

describe("To Do List - Delete task", function () {

    if (browser.params.siteBase == 'iis') {

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
                return tasksUtils.reassignTask(taskDescription, 'XP1');
            })
            .then(function () {
                fn();
            })
        }

        beforeAll(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function(){
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(toDoList.settingsFilter.click)
            .then(toDoList.dateFilter('ALL').click)
            .then(toDoList.allTasksCheckbox.click)
            .then(toDoList.settingsFilter.click)
            .then(function () {
                return browser.waitForAngular();
            })
        })

        beforeEach(function () {
            return tasksUtils.deleteTaskByDescription(task)
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            });
        });

        it("1-when a user deletes a task the 'Delete task' modal with the conformation message should be displayed", function (done) {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                createTask(task, flow, step, null, function () {
                    toDoList.searchInput.clear()
                    .then(function () {
                        return toDoList.searchInput.sendKeys(task);
                    })
                    .then(function () {
                        return toDoList.hoverMouseOnTask(task);
                    })
                    .then(function () {
                        return toDoList.clickCog();
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
                            done(expect(message).toEqual(confirmationMessage));
                        });
                    });
                });
            });
        });

        it("2-when a user deletes a task and clicks the 'Keep task' button in the 'Delete task' modal this task should exist in the ToDo List and in the database", function (done) {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                createTask(task, flow, step, null, function () {
                    toDoList.searchInput.clear()
                    .then(function () {
                        return toDoList.searchInput.sendKeys(task);
                    })
                    .then(function () {
                        return toDoList.hoverMouseOnTask(task);
                    })
                    .then(function () {
                        return toDoList.clickCog();
                    })
                    .then(taskActionsDropdown.deleteAction.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(deleteTaskDialog.keepTaskButton.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return toDoList.searchInput.clear();
                    })
                    .then(function () {
                        return toDoList.searchInput.sendKeys(task);
                    })
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return expect(toDoList.tasks.count()).toEqual(1);
                    })
                    .then(toDoList.taskDetailsExpander(0).click)
                    .then(function () {
                        return toDoList.taskDescription(0).getText();
                    })
                    .then(function (sometext) {
                        done(expect(sometext).toEqual(task));
                    });
                });
            });
        });

        it("3-when a user deletes a task it should disapear from the ToDo List and from the database", function (done) {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                createTask(task, flow, step, null, function () {
                    toDoList.searchInput.clear()
                    .then(function () {
                        return toDoList.searchInput.sendKeys(task);
                    })
                    .then(function () {
                        return toDoList.hoverMouseOnTask(task);
                    })
                    .then(function () {
                        return toDoList.clickCog();
                    })
                    .then(taskActionsDropdown.deleteAction.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(deleteTaskDialog.deleteTaskButton.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        done(expect(toDoList.tasks.length).not.toBeDefined());
                    });
                });
            });
        });
    }
});