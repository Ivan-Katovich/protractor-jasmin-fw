/*
    name: ToDoList_Route.spec.js;
    created: ...;
    refactored: 9/22/2016, navasaal;
*/

exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
/* IR modeling; */
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js'),
    TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js'),
    RouteDialog = require('./../../pageObjects/ModalDialogs/RouteDialog.js'),
    ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');

/* IR objects; */
var navigationBar = new NavigationBar(),
    taskActionsDropdown = new TaskActionsDropdown(),
    routeDialog = new RouteDialog(),
    toDoList = new ToDoList();

/* utils; */
var tasksUtils = require('../../utils/tasksUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    conversionUtils = require('../../utils/conversionUtils.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    Q = require('q');

/* vars; */
var dateObj = new Date(),
    task = 'RouteTest',
    currentFlow = 'WFRelease',
    currentStep = 'Manual 2',
    currentAssignment = 'XP1',
    currentPriority = '2',
    unassigned = 'Unassigned';

describe("To Do List - Route", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return tasksUtils.routeTask(task, currentFlow, currentStep)
            .then(function () {
                return tasksUtils.reassignTask(task, 'xp1');
            })
            .then(function () {
                return tasksUtils.changePriority(task, parseInt(currentPriority));
            })
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            })
            .then(function () {
                browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.dateFilter('ALL'));
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function () {
                return browser.waitForAngular();
            });
        });

        it('1-Selecting Route in the Task Actions dropdown should open the route dialog with Workflow, Step, Assign to and Priority dropdowns selected to current values by default', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
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

        it('2-Should display Unassigned in the Assigned to dialog when task is unassigned and user opens the Route Dialog for it', function () {
            return tasksUtils.unassignTask(task)
            .then(toDoList.settingsFilter.click)
            .then(toDoList.dateFilter('ALL').click)
            .then(toDoList.allTasksCheckbox.click)
            .then(toDoList.settingsFilter.click)
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                expect(routeDialog.header.isDisplayed()).toBe(true);
                expect(routeDialog.header.getText()).toBe('Route Task');
                expect(routeDialog.workflowDropdown.getAttribute('title')).toBe(currentFlow);
                expect(routeDialog.stepDropdown.getAttribute('title')).toBe(currentStep);
                expect(routeDialog.assignDropdownValue.getText()).toBe("Unassigned");
                expect(routeDialog.priorityDropdown.getAttribute('title')).toBe(currentPriority);
            });
        });

        it('3-Should display in workflow dropdown all available workflows that the user has permission to route to, ordered by ascending Workflow Name.', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(routeDialog.header.isDisplayed()).toBe(true);
            })
            .then(routeDialog.workflowDropdown.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return routeDialog.workflowDropdownElements.getText();
            })
            .then(function (workflows) {
                expect(workflows).toContain('Jamies Workflow Test');
                expect(workflows).toContain("Nandan'sWorkFlow");
                expect(workflows).toContain('SimpleWorkFlow1');
                expect(workflows).toContain('SimpleWorkFlow3');
                expect(workflows).toContain('SimpleWorkFlow444444444444444444444444444444444444444444444444444444444');
                expect(workflows).toContain('WF');
                expect(workflows).toContain('WFRelease');
                expect(workflows).toContain('WFSetTaskAttributes');
                expect(workflows).not.toContain('NoAccess');
                expect(conversionUtils.isArraySortedAscending(workflows)).toBe(true);
            });
        });

        it('4-Should display in step dropdown available steps for the selected workflow that the user has permissions to route to, ordered by ascending Step Name.', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
            .then(function () {
                return expect(routeDialog.header.isDisplayed()).toBe(true);
            })
            .then(routeDialog.stepDropdown.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return routeDialog.stepDropdownElements.getText();
            })
            .then(function (steps) {
                expect(steps).toContain('Indexing 1');
                expect(steps).toContain('Manual 1');
                expect(steps).toContain('Manual 2');
                expect(steps).toContain('Manual 3');
                expect(steps).toContain('Manual 4');
                expect(steps).toContain('Manual 5');
                expect(conversionUtils.isArraySortedAscending(steps)).toBe(true);
            });
        });

        it('5-Should display in Assign to dropdown Unassigned and all available usernames/groups/roles that have permissions to be routed to, for the selected Flow and Step, ', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
            .then(function () {
                return expect(routeDialog.header.isDisplayed()).toBe(true);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(routeDialog.assignDropdown)
            })
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
                expect(conversionUtils.isArraySortedAscending(assigns.splice(1, 1))).toBe(true);
            });
        });

        it('6-Should display in Priority dropdown a list of priorities are listed in ascending order (0 - 9)', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
            .then(function () {
                return expect(routeDialog.header.isDisplayed()).toBe(true);
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

        it('7-Should update Priority but save Flow, Step and Assigned to values the same as they were before if only Priority has been changed for task in Route dialog', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
            .then(function () {
                return expect(routeDialog.header.isDisplayed()).toBe(true);
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

        it('8-Should update Assignement to Unassigned but save Priority, Flow, Step values the same as they were before ' +
            'if only Assign to has been changed to Unassigned for task in Route dialog', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
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

        it('9-Should update Assignement to other user but save Priority, Flow, Step values the same as they were before ' +
            'if only Assign to has been changed to to other user for task in Route dialog', function () {
                return toDoList.searchInput.clear()
                .then(function () {
                    return toDoList.searchInput.sendKeys(task);
                })
                .then(function () {
                    return toDoList.hoverMouseOnTask(task);
                })
                .then(function () {
                    return toDoList.clickCog();
                })
                .then(taskActionsDropdown.routeAction.click)
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

        it('10-Should update Priority and assignement but save Flow and Step values the same as they were before if Priority and Assignement have been changed for task in Route dialog', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
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

        it('11-Should update Step but save Flow, Priority and Assigned to values the same as they were before if only Step has been changed for task in Route dialog', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
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

        it('12-Should update Flow and Step but save Priority and Assigned to values the same as they were before if only Step and flow have been changed for task in Route dialog', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
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

        it('13-Should NOT update all values if Flow, Step, Assigned To and Priority have been changed for task in Route dialog but user clicks Cancel button', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
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

        it('14-Should update all values if Flow, Step, Assigned To and Priority have been changed for task in Route dialog and Route button was clicked', function () {
            return toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(task);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(task);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.routeAction.click)
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
    };
});