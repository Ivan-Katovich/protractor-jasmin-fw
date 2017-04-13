exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var EditTaskDialog = require('./../../pageObjects/ModalDialogs/EditTaskDialog.js');
var editTaskDialog = new EditTaskDialog();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('../../pageObjects/SearchPage.js');
var irSearchPage = new SearchPage();
var tasksUtils = require('../../utils/tasksUtils.js');

var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var dateObj = new Date();

var task = "Task_AutoTesting";
var editedTask = "Task_EditedDescription";
var taskChangePriority = 'change priority test task';
var taskIncreasingPriority = 'increasing priority test';
var currentPriority = 8;
var changedPriority = 3;



describe("To Do List - Edit Task", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            tasksUtils.changePriority(taskIncreasingPriority, 4);
            tasksUtils.changeTaskDescription(editedTask, task);
        });

        afterAll(function () {
            tasksUtils.changePriority(taskIncreasingPriority, 4);
            tasksUtils.changePriority(task, currentPriority);
        });

        afterEach(function () {
            tasksUtils.changeTaskDescription(editedTask, task);
        });

        beforeEach(function () {
            tasksUtils.changePriority(taskChangePriority, 5);
            tasksUtils.changePriority(task, currentPriority);
            tasksUtils.changePriority(editedTask, currentPriority);
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

        it('1-Selecting Edit Task in the Task Actions dropdown should open the Edit Task dialog with a dropdown only with values 0 through 9 and task description input', function () {
            toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(taskChangePriority);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(taskChangePriority);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.editTaskAction.click)
            .then(function () {
                expect(editTaskDialog.header.isDisplayed()).toBe(true);
                expect(editTaskDialog.header.getText()).toBe('Edit Task');
                expect(editTaskDialog.taskDescription.isDisplayed()).toBe(true);
                browser.waitForAngular().then(function () {
                    //open priority dropdown to select new priority value
                    webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
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
            //Select a task with a unique priority (file a8 with task description change priority test task in Jamies workflow test)
            toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(taskChangePriority);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(taskChangePriority);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.editTaskAction.click)
            .then(function () {
                webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                    var prioritiesElms = editTaskDialog.dropdownElements();
                    prioritiesElms.then(function (priorities) {
                        //select priority 3 (or some other priority different than the current one of 5)
                        webdriverUtils.clickOnElement(priorities[3]);
                        browser.waitForAngular().then(function () {
                            //press the cancel button
                            editTaskDialog.cancelButton.click().then(function () {
                                browser.waitForAngular().then(function () {
                                    //verify todolist still shows the correct task
                                    expect(toDoList.tasks.count()).toBe(1);
                                    toDoList.taskDetailsExpander(0).click();
                                    toDoList.taskDescription(0).getText().then(function (description) {
                                        expect(description).toBe(taskChangePriority);
                                    });
                                    //verfiy priority didn't change
                                    expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY 5');
                                });
                            });
                        });
                    });
                });
            });
        });

        it('If a user selects a higher priority and presses the SAVE button, the priority should update to the new value and the toDoList should update to stay in order by priority', function () {
            //select a file with a priority < 9, check the priroity and then the order of todolist
            //open change priority dialog and select a new (higher) priority and save
            //Select a task with a unique priority (file a8 with task description test task in Jamies workflow test)
            toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys(taskIncreasingPriority);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(taskIncreasingPriority);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.editTaskAction.click)
            .then(function () {
                webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                    var prioritiesElms = editTaskDialog.dropdownElements();
                    prioritiesElms.then(function (priorities) {
                        //select priority 8 (or some other priority higher than the current one of 4)
                        webdriverUtils.clickOnElement(priorities[8]);
                        browser.waitForAngular().then(function () {
                            //press the change priority button
                            editTaskDialog.finalizeButton.click().then(function () {
                                browser.waitForAngular().then(function () {
                                    //verify todolist still shows the correct task
                                    expect(toDoList.tasks.count()).toBe(1);
                                    toDoList.taskDetailsExpander(0).click();
                                    toDoList.taskDescription(0).getText().then(function (description) {
                                        expect(description).toBe(taskIncreasingPriority);
                                    });
                                    //verfiy priority increased
                                    expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY 8');
                                    browser.waitForAngular().then(function () {
                                        //check that files are ordered by priority 
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
            });
        });

        it('If a user selects a lower priority and presses the SAVE button, the priority should update to the new value and the toDoList should update to stay in order by priority', function () {
            toDoList.searchInput.sendKeys(taskIncreasingPriority).then(function () {
                expect(toDoList.tasks.count()).toBe(1);
                    //now decrease priority back to original value and check that it updates properly
                    toDoList.hoverMouseOnTask(taskIncreasingPriority)
                    .then(function () {
                        return toDoList.clickCog();
                    })
                    .then(taskActionsDropdown.editTaskAction.click)
                    .then(function () {
                        webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                            var prioritiesElms = editTaskDialog.dropdownElements();
                            prioritiesElms.then(function (priorities) {
                                //select priority 4 to lower priority
                                webdriverUtils.clickOnElement(priorities[4]);
                                browser.waitForAngular().then(function () {
                                    //press the change priority button
                                    editTaskDialog.finalizeButton.click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            //verify todolist still shows the correct task
                                            expect(toDoList.tasks.count()).toBe(1);
                                            toDoList.taskDetailsExpander(0).click();
                                            toDoList.taskDescription(0).getText().then(function (description) {
                                                expect(description).toBe(taskIncreasingPriority);
                                            });
                                            //verfiy priority decreased
                                            browser.waitForAngular();
                                            expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY 4');
                                            browser.waitForAngular().then(function () {
                                                //check that files are ordered by priority 
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
                    });
            });
        });

        it('The user should be able to choose to update the prirority to the current priority value. The tasks priority will remain unchanged and the to do list still in order', function () {
            toDoList.searchInput.sendKeys(taskIncreasingPriority)
            .then(function () {
                return expect(toDoList.tasks.count()).toBe(1);
            })
            .then(function(){
                return toDoList.priorityAndDate(0).getText()
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(taskIncreasingPriority);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(taskActionsDropdown.editTaskAction.click)
            .then(function () {
                webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                    var prioritiesElms = editTaskDialog.dropdownElements();
                    prioritiesElms.then(function (priorities) {
                        //select priority 4 again to return to original priority
                        webdriverUtils.clickOnElement(priorities[4]);
                        browser.waitForAngular().then(function () {
                            //press the change priority button
                            editTaskDialog.finalizeButton.click().then(function () {
                                browser.waitForAngular().then(function () {
                                    //verify todolist still shows the correct task
                                    expect(toDoList.tasks.count()).toBe(1);
                                    toDoList.taskDetailsExpander(0).click();
                                    toDoList.taskDescription(0).getText().then(function (description) {
                                        expect(description).toBe(taskIncreasingPriority);
                                    });
                                    //verfiy priority increased
                                    browser.waitForAngular()
                                    expect(toDoList.priorityAndDate(0).getText()).toContain('PRIORITY 4');
                                    browser.waitForAngular().then(function () {
                                        //check that files are ordered by priority 
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
            });
        });

        it('It is possible to edit a task description and priority in the Edit Task dialog', function () {
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
            .then(taskActionsDropdown.editTaskAction.click)
            .then(function () {
                expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(currentPriority.toString());
                webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                    webdriverUtils.clickOnElement(editTaskDialog.priorityDropdownElement(3)).then(function () {
                        expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(changedPriority.toString());

                        editTaskDialog.taskDescription.clear();
                        editTaskDialog.taskDescription.sendKeys(editedTask);
                        editTaskDialog.finalizeButton.click();
                        browser.waitForAngular();

                        toDoList.searchInput.clear();
                        toDoList.searchInput.sendKeys(editedTask);
                        expect(toDoList.tasks.count()).toEqual(1);
                        expect(toDoList.taskDescription(0).getText()).toEqual(editedTask);
                        toDoList.priority(0, function (priority) {
                            expect(priority).toEqual("PRIORITY " + changedPriority.toString());

                            toDoList.searchInput.clear();
                            toDoList.searchInput.sendKeys(task);
                            expect(toDoList.noTasksMessageDisplayed.getText()).toEqual("You have no items.");
                        });
                    });
                });
            });
        });

        it('When a user edits a task description and priority but clicks Cancel button the initial description and priority should be left', function () {
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
            .then(taskActionsDropdown.editTaskAction.click)
            .then(function () {
                browser.waitForAngular();
                expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(currentPriority.toString());
                webdriverUtils.clickOnElement(editTaskDialog.dropdown).then(function () {
                    webdriverUtils.clickOnElement(editTaskDialog.priorityDropdownElement(3)).then(function () {
                        expect(editTaskDialog.dropdown.getAttribute('title')).toEqual(changedPriority.toString());

                        editTaskDialog.taskDescription.clear();
                        editTaskDialog.taskDescription.sendKeys(editedTask);
                        editTaskDialog.cancelButton.click();
                        browser.waitForAngular();

                        toDoList.searchInput.clear();
                        toDoList.searchInput.sendKeys(editedTask);
                        expect(toDoList.noTasksMessageDisplayed.getText()).toEqual("You have no items.");

                        toDoList.searchInput.clear();
                        toDoList.searchInput.sendKeys(task);
                        expect(toDoList.tasks.count()).toEqual(1);
                        expect(toDoList.taskDescription(0).getText()).toEqual(task);
                        toDoList.priority(0, function (priority) {
                            expect(priority).toEqual("PRIORITY " + currentPriority.toString());
                        });
                    });
                });
            });
        });
    }
});