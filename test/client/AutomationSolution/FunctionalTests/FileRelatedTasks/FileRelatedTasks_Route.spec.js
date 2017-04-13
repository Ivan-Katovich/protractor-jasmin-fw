/*
    name: FileRelatedTasks_Route.spec.js;
    created: ...;
    refactored: 9/22/2016, navasaal;
*/

exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];

/* IR modeling; */
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js'),
    TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js'),
    RouteDialog = require('./../../pageObjects/ModalDialogs/RouteDialog.js'),
    ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js'),
    SearchPage = require('./../../pageObjects/SearchPage.js'),
    NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js'),
    FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js'),
    RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');

/* IR objects; */
var navigationBar = new NavigationBar(),
    taskActionsDropdown = new TaskActionsDropdown(),
    routeDialog = new RouteDialog(),
    toDoList = new ToDoList(),
    searchPage = new SearchPage(),
    navigationBar = new NavigationBar(),
    fileTaskList = new FileRelatedTasksDropdown(),
    recordHeader = new RecordHeader();

/* helpers; */
var Q = require('q');
    tasksUtils = require('../../utils/tasksUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    conversionUtils = require('../../utils/conversionUtils.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

/* vars; */
var dateObj = new Date(),
    file = 'FileWithTasks_A8',
    task = 'RouteTest',
    currentFlow = 'WFRelease',
    currentStep = 'Manual 2',
    currentAssignment = 'XP1',
    currentPriority = '2',
    unassigned = 'Unassigned';

describe("File Related Tasks - Route", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            tasksUtils.routeTask(task, currentFlow, currentStep);
            currentAssignment = browser.params.defaultFullName;
            if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
                tasksUtils.reassignTask(task, 'xp1');
            } else {
                tasksUtils.reassignTask(task, browser.params.defaultUserName);
            }
            tasksUtils.changePriority(task, parseInt(currentPriority));

            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            navigationBar.searchIcon.click();
            searchPage.fileNameSearchBox.sendKeys(file);
            searchPage.searchButton.click();
        });

        it('1-Selecting Route in the Task Actions dropdown should open the route dialog with Workflow, Step, Assign to and Priority dropdowns selected to current values by default', function () {
            return recordHeader.fileTaskListBadge.click()
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.routeAction(taskIndex).click();
                    })
                    .then(function () {
                        return expect(routeDialog.header.isDisplayed()).toBe(true);
                    })
                    .then(function () {
                        return routeDialog.header.getText();
                    })
                    .then(function (text) {
                        return expect(text).toBe('Route Task');
                    })
                    .then(function () {
                        expect(routeDialog.workflowDropdown.getAttribute('title')).toBe(currentFlow);
                        expect(routeDialog.stepDropdown.getAttribute('title')).toBe(currentStep);
                        expect(routeDialog.assignDropdownValue.getText()).toBe(currentAssignment);
                        expect(routeDialog.priorityDropdown.getAttribute('title')).toBe(currentPriority);
                    });
                });
            });
        });

        it('2-should display Unassigned in the Assigned to dialog when task is unassigned and user opens the Route Dialog for it', function () {
            return tasksUtils.unassignTask(task)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.routeAction(taskIndex).click();
                    })
                    .then(function () {
                        return expect(routeDialog.header.isDisplayed()).toBe(true);
                    })
                    .then(function () {
                        return routeDialog.header.getText();
                    })
                    .then(function (text) {
                        return expect(text).toBe('Route Task');
                    })
                    .then(function () {
                        expect(routeDialog.workflowDropdown.getAttribute('title')).toBe(currentFlow);
                        expect(routeDialog.stepDropdown.getAttribute('title')).toBe(currentStep);
                        expect(routeDialog.assignDropdownValue.getText()).toBe("Unassigned");
                        expect(routeDialog.priorityDropdown.getAttribute('title')).toBe(currentPriority);
                    });
                });
            });
        });

        it('3-should display in workflow dropdown all available workflows that the user has permission to route to, ordered by ascending Workflow Name.', function () {
            return recordHeader.fileTaskListBadge.click()
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.routeAction(taskIndex).click();
                    })
                    .then(function () {
                        return expect(routeDialog.header.isDisplayed()).toBe(true);
                    })
                    .then(function () {
                        return routeDialog.header.getText();
                    })
                    .then(function (text) {
                        return expect(text).toBe('Route Task');
                    })
                    .then(routeDialog.workflowDropdown.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return routeDialog.workflowDropdownElements.getText();
                    })
                    .then(function (workflows) {
                        expect(conversionUtils.isArraySortedAscending(workflows)).toBe(true);
                    });
                });
            });
        });

        it('4-should display in step dropdown available steps for the selected workflow that the user has permissions to route to, ordered by ascending Step Name.' +
            'ordered Unassigned and then by ascending Name..', function () {
                return recordHeader.fileTaskListBadge.click()
                .then(function () {
                    fileTaskList.findTask(task, function (taskIndex) {
                        fileTaskList.taskActionsIcon(taskIndex).click()
                        .then(function () {
                            taskActionsDropdown.container = fileTaskList.container;
                            return taskActionsDropdown.routeAction(taskIndex).click();
                        })
                        .then(function () {
                            return expect(routeDialog.header.isDisplayed()).toBe(true);
                        })
                        .then(function () {
                            return routeDialog.header.getText();
                        })
                        .then(function (text) {
                            return expect(text).toBe('Route Task');
                        })
                        .then(routeDialog.stepDropdown.click)
                        .then(function () {
                            return browser.waitForAngular();
                        })
                        .then(function () {
                            return routeDialog.stepDropdownElements.getText();
                        })
                        .then(function (steps) {
                            expect(conversionUtils.isArraySortedAscending(steps)).toBe(true);
                        });
                    });
                });
            });

        it('5-should display in Assign to dropdown Unassigned and all available usernames/groups/roles that have permissions to be routed to, for the selected Flow and Step, ', function () {
            return recordHeader.fileTaskListBadge.click()
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.routeAction(taskIndex).click();
                    })
                    .then(function () {
                        return expect(routeDialog.header.isDisplayed()).toBe(true);
                    })
                    .then(function () {
                        return routeDialog.header.getText();
                    })
                    .then(function (text) {
                        return expect(text).toBe('Route Task');
                    })
                    .then(routeDialog.assignDropdown.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return routeDialog.assignDropdownElements.getText();
                    })
                    .then(function (assigns) {
                        expect(assigns).toContain('Unassigned');
                        expect(assigns).toContain(currentAssignment);
                        expect(assigns).not.toContain('XP2');
                    });
                });
            });
        });

        it('6-should display in Priority dropdown a list of priorities are listed in ascending order (0 - 9)', function () {
            return recordHeader.fileTaskListBadge.click()
            .then(function () {
                fileTaskList.findTask(task, function (taskIndex) {
                    fileTaskList.taskActionsIcon(taskIndex).click()
                    .then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        return taskActionsDropdown.routeAction(taskIndex).click();
                    })
                    .then(function () {
                        return expect(routeDialog.header.isDisplayed()).toBe(true);
                    })
                    .then(function () {
                        return routeDialog.header.getText();
                    })
                    .then(function (text) {
                        return expect(text).toBe('Route Task');
                    })
                    .then(routeDialog.priorityDropdown.click)
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return routeDialog.priorityDropdownElements.getText();
                    })
                    .then(function (priorities) {
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
                        expect(conversionUtils.isArraySortedAscending(priorities)).toBe(true);
                    });
                });
            });
        });

        it('7-should update Priority but save Flow, Step and Assigned to values the same as they were before if only Priority has been changed for task in Route dialog', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.priorityDropdown);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.priorityDropdownElements;
                })
                .then(function (priorities) {
                    return webdriverUtils.clickOnElement(priorities[8]);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(routeDialog.routeButton.click)
                .then(leftRailBar.toDoList.click)
                .then(toDoList.taskDetailsExpander(0).click)
                .then(function () {
                    return toDoList.priorityAndDate(0).getText();
                })
                .then(function (priorityAndTime) {
                    return expect(priorityAndTime).toContain('PRIORITY 7');
                })
                .then(function () {
                    return toDoList.getTaskDetails(0, 'Flow').getText()
                })
                .then(function (flowDetails) {
                    return expect(flowDetails).toBe(currentFlow);
                })
                .then(function () {
                    return toDoList.getTaskDetails(0, 'Step').getText()
                })
                .then(function (stepDetails) {
                    return expect(stepDetails).toBe(currentStep);
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe(currentAssignment.toLowerCase());
                    });
                });
            });
        });

        it('8-should update Assignement to Unassigned but save Priority, Flow, Step values the same as they were before ' +
            'if only Assign to has been changed to Unassigned for task in Route dialog', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    taskActionsDropdown.container = lockedTaskView.container;
                    return taskActionsDropdown.routeAction(0).click();
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return expect(routeDialog.header.isDisplayed()).toBe(true);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.assignDropdown);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.assignDropdownInput.sendKeys('Unassigned');
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(routeDialog.routeButton.click)
                .then(leftRailBar.toDoList.click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return expect(toDoList.tasks.length).not.toBeDefined();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(toDoList.settingsFilter);
                })
                .then(toDoList.toMeTasksCheckbox.click)
                .then(toDoList.unassignedTasksCheckbox.click)
                .then(function () {
                    return expect(toDoList.tasks.count()).toBe(1);
                })
                .then(toDoList.taskDetailsExpander(0).click)
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Flow').getText()).toBe(currentFlow);
                })
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Step').getText()).toBe(currentStep);
                })
                .then(function () {
                    return expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY ' + currentPriority);
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe(unassigned);
                    });
                });
            });
        });

        it('9-should update Assignement to other user but save Priority, Flow, Step values the same as they were before ' +
            'if only Assign to has been changed to to other user for task in Route dialog', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    taskActionsDropdown.container = lockedTaskView.container;
                    return taskActionsDropdown.routeAction(0).click();
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    webdriverUtils.clickOnElement(routeDialog.assignDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.assignDropdownInput.sendKeys('bk1');
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(routeDialog.routeButton.click)
                .then(leftRailBar.toDoList.click)
                .then(function () {
                    return webdriverUtils.clickOnElement(toDoList.settingsFilter);
                })
                .then(toDoList.allTasksCheckbox.click)
                .then(function () {
                    return webdriverUtils.clickOnElement(toDoList.settingsFilter);
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe('bk1 bk1');
                    });
                });
            });
        });

        it('10-should update Priority and assignement but save Flow and Step values the same as they were before if Priority and Assignement have been changed for task in Route dialog', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return expect(routeDialog.header.isDisplayed()).toBe(true);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.priorityDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.priorityDropdownElements;
                })
                .then(function (priorities) {
                    return webdriverUtils.clickOnElement(priorities[8]);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.assignDropdown);
                })
                .then(function () {
                    return routeDialog.assignDropdownInput.sendKeys('Unassigned');
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(routeDialog.routeButton.click)
                .then(function () {
                    return expect(toDoList.tasks.length).not.toBeDefined();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(toDoList.settingsFilter);
                })
                .then(toDoList.toMeTasksCheckbox.click)
                .then(toDoList.unassignedTasksCheckbox.click)
                .then(function () {
                    return webdriverUtils.clickOnElement(toDoList.settingsFilter);
                })
                .then(function () {
                    return expect(toDoList.tasks.count()).toBe(1);
                })
                .then(toDoList.taskDetailsExpander(0).click)
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Flow').getText()).toBe(currentFlow);
                })
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Step').getText()).toBe(currentStep);
                })
                .then(function () {
                    return expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY 7');
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe(unassigned);
                    });
                });
            });
        });

        it('11-should update Step but save Flow, Priority and Assigned to values the same as they were before if only Step has been changed for task in Route dialog', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    webdriverUtils.clickOnElement(routeDialog.stepDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.stepDropdownElements;
                })
                .then(function (steps) {
                    return webdriverUtils.clickOnElement(steps[2])
                })
                .then(routeDialog.routeButton.click)
                .then(toDoList.taskDetailsExpander(0).click)
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Step').getText()).toBe('Manual 1');
                })
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Flow').getText()).toBe(currentFlow);
                })
                .then(function () {
                    return expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY ' + currentPriority);
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe(currentAssignment.toLowerCase());
                    });
                });
            });
        });

        it('12-should update Flow and Step but save Priority and Assigned to values the same as they were before if only Step and flow have been changed for task in Route dialog', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return expect(routeDialog.header.isDisplayed()).toBe(true);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.workflowDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.workflowDropdownElements;
                })
                .then(function (workflows) {
                    return webdriverUtils.clickOnElement(workflows[2]);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.stepDropdown);
                })
                .then(function () {
                    return routeDialog.stepDropdownElements;
                })
                .then(function (steps) {
                    return webdriverUtils.clickOnElement(steps[1]);
                })
                .then(routeDialog.routeButton.click)
                .then(toDoList.taskDetailsExpander(0).click)
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Flow').getText()).toBe("Jamies Workflow Test");
                })
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Step').getText()).toBe('Manual 1');
                })
                .then(function () {
                    return expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY ' + currentPriority);
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe(currentAssignment.toLowerCase());
                    });
                });
            });
        });

        it('13-should update all values if Flow, Step, Assigned To and Priority have been changed for task in Route dialog and Route button was clicked', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return expect(routeDialog.header.isDisplayed()).toBe(true);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.workflowDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.workflowDropdownElements;
                })
                .then(function (workflows) {
                    return webdriverUtils.clickOnElement(workflows[9]);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.stepDropdown);
                })
                .then(function () {
                    return routeDialog.stepDropdownElements;
                })
                .then(function (steps) {
                    return webdriverUtils.clickOnElement(steps[2]);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.priorityDropdown);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.priorityDropdownElements;
                })
                .then(function (priorities) {
                    return webdriverUtils.clickOnElement(priorities[8]);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    webdriverUtils.clickOnElement(routeDialog.assignDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.assignDropdownInput.sendKeys('Unassigned');
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(routeDialog.cancelButton.click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(toDoList.searchInput.clear)
                .then(function () {
                    return toDoList.searchInput.sendKeys(task);
                })
                .then(toDoList.taskDetailsExpander(0).click)
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Flow').getText()).toBe(currentFlow);
                })
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Step').getText()).toBe(currentStep);
                })
                .then(function () {
                    return expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY ' + currentPriority);
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe(currentAssignment.toLowerCase());
                    });
                });
            });
        });

        it('14-should NOT update all values if Flow, Step, Assigned To and Priority have been changed for task in Route dialog but user clicks Cancel button', function () {
            return recordHeader.fileTaskListBadge.click();
            fileTaskList.findTask(task, function (taskIndex) {
                fileTaskList.taskActionsIcon(taskIndex).click();
                taskActionsDropdown.container = fileTaskList.container;
                taskActionsDropdown.routeAction(taskIndex).click()
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return expect(routeDialog.header.isDisplayed()).toBe(true);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.workflowDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.workflowDropdownElements;
                })
                .then(function (workflows) {
                    return webdriverUtils.clickOnElement(workflows[9]);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.stepDropdown);
                })
                .then(function () {
                    return routeDialog.stepDropdownElements;
                })
                .then(function (steps) {
                    return webdriverUtils.clickOnElement(steps[2]);
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(routeDialog.priorityDropdown);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.priorityDropdownElements;
                })
                .then(function (priorities) {
                    return webdriverUtils.clickOnElement(priorities[8]);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    webdriverUtils.clickOnElement(routeDialog.assignDropdown);
                })
                .then(function () {
                    browser.waitForAngular();
                })
                .then(function () {
                    return routeDialog.assignDropdownInput.sendKeys('Unassigned');
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(routeDialog.routeButton.click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(toDoList.settingsFilter);
                })
                .then(toDoList.toMeTasksCheckbox.click)
                .then(toDoList.unassignedTasksCheckbox.click)
                .then(toDoList.taskDetailsExpander(0).click)
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Flow').getText()).toBe("WFSetTaskAttributes");
                })
                .then(function () {
                    return expect(toDoList.getTaskDetails(0, 'Step').getText()).toBe("Manual 1");
                })
                .then(function () {
                    return expect(toDoList.priorityAndDate(0).getText()).toContain("PRIORITY 7");
                })
                .then(function () {
                    tasksUtils.getAssignment(task, function (result) {
                        expect(result).toBe(unassigned);
                    });
                });
            });
        });
    }
});