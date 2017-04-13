/*
    Files_View feature. Avengers stuff: Create Task & Create Diary.
    Created: ...
    Refactored: 9/13/2016, navasaal
*/
exports.tags = ['Workflow_Tasks', 'Create_Task'];

/* IR modeling; */
var IR_SearchPage = require('./../../pageObjects/SearchPage.js'),
    IR_CreateTaskDiaryModal = require('./../../pageObjects/ModalDialogs/CreateTaskDiaryModal.js'),
    IR_TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js'),
    IR_CreateTaskDiaryDropdown = require('./../../pageObjects/DropdownLists/CreateTaskDiaryDropdown.js'),
    IR_NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js'),
    IR_LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js'),
    IR_FilesView = require('./../../pageObjects/FilesView.js'),
    IR_DatepickerPopup = require('./../../pageObjects/Containers/DatepickerPopup.js'),
    IR_SetTaskAttributesModal = require('./../../pageObjects/ModalDialogs/SetTaskAttributesModal.js'),
    IR_DatepickerPopup = require('./../../pageObjects/Containers/DatepickerPopup.js'),
    IR_RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js'),
    IR_FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js'),
    IR_ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js'),
    IR_LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_filesview = require('../../pageObjects/FilesView.js');

/* IR Objects; */
var searchPage = new IR_SearchPage(),
    createTaskDialog = new IR_CreateTaskDiaryModal(),
    taskActionsDropdown = new IR_TaskActionsDropdown(),
    createTaskDiaryDropdown = new IR_CreateTaskDiaryDropdown(),
    leftRailBar = new IR_LeftRailBar(),
    filesView = new IR_FilesView(),
    datepickerPopup = new IR_DatepickerPopup("attributes"),
    taskAttributesForm = new IR_SetTaskAttributesModal(),
    datepickerPopup = new IR_DatepickerPopup("attributes"),
    recordHeader = new IR_RecordHeader(),
    fileTaskList = new IR_FileRelatedTasksDropdown(),
    toDoList = new IR_ToDoList(),
    lockedTaskView = new IR_LockedTaskView(),
    fileTree = new IR_FileTree(),
    filesArea = new IR_filesview();

/* Helpers; */
var searchUtil = require('../../BusinessProcess/Search.js'),
    conversionUtils = require('../../utils/conversionUtils.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    tasksUtils = require('../../utils/tasksUtils.js'),
    Q = require('q');

/* Test vars; */
var flowList = ["Jamie WF", "Jamies Workflow Test",
                "Nandan'sWorkFlow", "SimpleWorkFlow1",
                "SimpleWorkFlow3",
                "SimpleWorkFlow444444444444444444444444444444444444444444444444444444444",
                "WF",
                "WFRelease",
                "WFSetTaskAttributes"],
    startStep = "Manual 1",
    defaultAssignedTo = "Unassigned",
    currentUser = "xp1_test",
    file = "FileForAutoTesting",
    folder = "File Note",
    document = "DocumentAutoTesting",
    page = "processesConsoleDebugvsInstallDesktop.jpg",
    flow1 = "SimpleWorkFlow3",
    flow2 = "WFSetTaskAttributes",
    flow3 = "SimpleWorkFlow1",
    flow4 = "Jamie WF",
    task = "CreateTaskTesting",
    invalidMinMsg_spinedit = "* Value should be greater or equal than 0",
    invalidMaxMsg_spinedit = "* Value should be less or equal than 100",
    invalidValueTypeMessage = "* Invalid value type";

function createTask(taskDescription, flowName, stepName, assignTo, fn) {
    filesView.createIcon.click()
    .then(createTaskDiaryDropdown.createTaskAction.click)
    .then(function () {
        return browser.driver.wait(function () {
            return createTaskDialog.cancelButton.isPresent().then(function (element) {
                return element === true;
            });
        });
    })
    .then(function () {
        return createTaskDialog.selectFlow(flowName);
    })
    .then(createTaskDialog.priorityDropdown.click)
    .then(function () {
        return webdriverUtils.clickOnElement(createTaskDialog.priorityDropdownElement(2));
    })
    .then(function () {
        if (assignTo != null) {
            createTaskDialog.assignToDropdown.click()
            .then(function () {
                createTaskDialog.assignToInput.sendKeys(assignTo);
            })
            .then(createTaskDialog.assignToDropdownElement(0).click)
        }
        createTaskDialog.description.sendKeys(taskDescription)
        .then(createTaskDialog.doneButton.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return fn();
        });
    });
}

describe("Create Task", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            });
        });

        it("1-all fields should be displayed with default values and the 'Done' buttons should be disabled by default", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                done(function () {
                    /* flows; */
                    expect(createTaskDialog.flowDropdown).toBeDefined();
                    expect(createTaskDialog.flowDropdown.getAttribute("title")).toEqual("Select Flow");
                    expect(createTaskDialog.getClassOfFlowDropdown).toContain("field-required");

                    /* steps; */
                    expect(createTaskDialog.stepDropdown).toBeDefined();
                    expect(createTaskDialog.stepDropdown.getAttribute("title")).toEqual("Select Step");
                    expect(createTaskDialog.getClassOfStepDropdown).toContain("field-required");

                    /* assigment; */
                    expect(createTaskDialog.assignToDropdown).toBeDefined();
                    expect(createTaskDialog.defaultFieldValue("task", "assigned to")).toEqual("Assigned to");

                    /* priority;  */
                    expect(createTaskDialog.priorityDropdown).toBeDefined();
                    expect(createTaskDialog.priorityDropdown.getAttribute("title")).toEqual("Select priority");
                    expect(createTaskDialog.getClassOfPriorityDropdown).toContain("field-required");

                    /* date; */
                    expect(createTaskDialog.availableDateInput).toBeDefined();
                    expect(createTaskDialog.getClassOfAvailableDateInput).toContain("field-required");
                    expect(createTaskDialog.availableDateInput.getAttribute("value")).toEqual(conversionUtils.getDate(new Date()));

                    /* description; */
                    expect(createTaskDialog.description).toBeDefined();
                    expect(createTaskDialog.description.getAttribute("title")).toEqual("Task Description");
                    expect(createTaskDialog.getClassOfTaskAttrButton).toContain("disabled");
                    expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled');
                });
            });
        });

        it("2-workflow names in a workflow dropdown should be in a alphabetical order and with selectable values", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(createTaskDialog.flowDropdown.click)
            .then(function () {
                createTaskDialog.allFlows.count().then(function (count) {
                    expect(count - 1).toEqual(9);
                    var promises = [];
                    for (var i = 1; i < count; i++) {
                        promises.push(createTaskDialog.flowDropdownElement(i).getText());
                    }
                    Q.all(promises).done(function (flowsFromDropdown) {
                        expect(conversionUtils.isArraysEquivalent(flowsFromDropdown, flowList)).toBe(true);
                        expect(conversionUtils.isArraySortedAscending(flowsFromDropdown)).toBe(true);

                        webdriverUtils.clickOnElement(createTaskDialog.flowDropdownElement(5));
                        createTaskDialog.flowDropdown.getAttribute("title").then(function (value1) {
                            expect(value1).toEqual(flow1);

                            createTaskDialog.flowDropdown.click();
                            webdriverUtils.clickOnElement(createTaskDialog.flowDropdownElement(9));
                            createTaskDialog.flowDropdown.getAttribute("title").then(function (value2) {
                                done(expect(value2).toEqual(flow2));
                            });
                        });
                    });
                });
            });
        });

        it("3-in the 'Step' dropdown should be displayed only start step of the selectable workflow", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.selectFlow(flow4);
            })
            .then(function () {
                return expect(createTaskDialog.stepDropdown.getAttribute("title")).toEqual(startStep);
            })
            .then(createTaskDialog.stepDropdown.click)
            .then(function () {
                createTaskDialog.allSteps.count().then(function (count) {
                    expect(count - 1).toEqual(4);
                    createTaskDialog.stepDropdownElement(1).getText().then(function (stepName) {
                        done(expect(stepName).toEqual(startStep));
                    });
                });
            });
        });

        it("4-user names should be displayed in the 'Assign To' dropdown with selectable values in the order - first 'Unassigned' the rest of the users in alphabetical order", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.assignToDropdown.click)
            .then(function () {
                createTaskDialog.assignToAllUsers.count().then(function (count) {
                    expect(count).toBeGreaterThan(1);
                    var promises = [];
                    for (var i = 0; i < count; i++) {
                        promises.push(createTaskDialog.assignToDropdownElement(i).getText());
                    }
                    Q.all(promises).done(function (usersFromDropdown) {
                        if (browser.browserName === 'chrome') {
                            expect(usersFromDropdown[0]).toEqual("Unassigned");
                        }
                        var outgoingArray = usersFromDropdown.splice(0, 1);
                        expect(conversionUtils.isArraySortedAscending(outgoingArray)).toBe(true);
                        createTaskDialog.assignToDropdownElement(3).getText().then(function (userName) {
                            webdriverUtils.clickOnElement(createTaskDialog.assignToDropdownElement(3));
                            done(expect(createTaskDialog.assignToValue).toEqual(userName));
                        });
                    });
                });
            });
        });

        it("5-priority should be displayed in the 'Priority' dropdown in ascending order with selectable values", function () {

            var temp;

            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow4);
            })
            .then(createTaskDialog.priorityDropdown.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return createTaskDialog.allPriorities.count()
            })
            .then(function (count) {
                return (temp = count);
            })
            .then(function () {
                return expect(temp - 1).toEqual(10);
            })
            .then(function () {
                var promises = [];
                for (var i = 1; i < temp; i++) {
                    promises.push(createTaskDialog.priorityDropdownElement(i).getText());
                }
                Q.all(promises).done(function (priorityFromDropdown) {
                    return expect(conversionUtils.isArraySortedAscending(priorityFromDropdown)).toBe(true);
                });
            })
            .then(function () {
                return webdriverUtils.clickOnElement(createTaskDialog.priorityDropdownElement(2));
            })
            .then(function () {
                return expect(createTaskDialog.priorityDropdown.getAttribute("title")).toEqual("1");
            });
        });

        it("6-after available date selection it should display a correct date in mm/dd/yyyy", function (done) {
            datepickerPopup.container = createTaskDialog.taskDataContainer;
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                browser.waitForAngular().then(function () {
                    createTaskDialog.datepickerIcon.click().then(function () {
                        var dateObj = new Date();
                        dateObj.setDate(dateObj.getDate() + 1);
                        var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();

                        if (new Date().getDate() >= 25) {
                            dateObj.setDate(15);
                            dateObj.setMonth(new Date().getMonth() + 1);
                            date = 15;
                            datepickerPopup.rightRowButton.click();
                        }
                        datepickerPopup.clickDateButton(date.toString(), browser);
                        done(function () {
                            expect(datepickerPopup.datepickerContainer.isPresent()).toBe(false);
                            expect(createTaskDialog.availableDateInput.getAttribute("value")).toEqual(conversionUtils.getDate(dateObj));
                        });
                    });
                });
            });
        });

        it("7-after enter of date with invalid format the date picker boarder should be red and 'Done' button should be disabled", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(createTaskDialog.availableDateInput.clear)
            .then(createTaskDialog.availableDateInput.click)
            .then(function () {
                return createTaskDialog.availableDateInput.sendKeys("gyjhrtjrt")
            })
            .then(function () {
                return expect(createTaskDialog.availableDateInput.getAttribute("class")).toContain("ng-invalid-date")
            })
            .then(function () {
                var dateObj = new Date();
                var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
                if (dateObj.getDate() >= 25) {
                    dateObj.setDate(15);
                    date = 15;
                    datepickerPopup.rightRowButton.click();
                }
                datepickerPopup.clickDateButton(date.toString(), browser)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return expect(datepickerPopup.datepickerContainer.isPresent()).toBe(false)
                })
                .then(function () {
                    return expect(createTaskDialog.availableDateInput.getAttribute("class")).not.toContain("ng-invalid-date");
                })
                .then(createTaskDialog.availableDateInput.clear)
                .then(createTaskDialog.availableDateInput.click)
                .then(function () {
                    return createTaskDialog.availableDateInput.sendKeys("13/32/2015");
                })
                .then(function () {
                    done(function () {
                        expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled');
                        expect(createTaskDialog.availableDateInput.getAttribute("class")).toContain("ng-invalid-date");
                    });
                });
            });
        });

        it("8-available dates prior to today's date should be disabled", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {

                var dateObj = new Date();
                dateObj.setDate(dateObj.getDate() - 1);

                createTaskDialog.availableDateInput.clear()
                .then(createTaskDialog.availableDateInput.click)
                .then(function () {
                    return createTaskDialog.availableDateInput.sendKeys(conversionUtils.getDate(dateObj));
                })
                .then(function () {
                    return expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled');
                })
                .then(createTaskDialog.datepickerIcon.click)
                .then(function () {
                    var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
                    if (dateObj.getDate() == 1 && dateObj.getDay() == 0) {
                        datepickerPopup.leftRowButton.click()
                        .then(function () {
                            datepickerPopup.ifDateButtonDisabled(date.toString(), function (value) {
                                done(expect(value).toBe("true"));
                            });
                        });
                    }
                    else done();
                });
            });
        });

        it("9-after workflow selection the 'Step' 'Assign To' and 'Available Date' fields should be filled in by default values", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow4);
            })
            .then(function () {
                done(function () {
                    expect(createTaskDialog.flowDropdown.getAttribute("title")).toEqual(flow4);
                    expect(createTaskDialog.stepDropdown.getAttribute("title")).toEqual(startStep);
                    expect(createTaskDialog.assignToValue).toEqual(defaultAssignedTo);
                    expect(createTaskDialog.availableDateInput.getAttribute("value")).toEqual(conversionUtils.getDate(new Date()));
                });
            });
        });

        it("10-button 'Done' should be disabled if workflow is selected but priority is empty", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                createTaskDialog.chooseFlow(flow2, function (flowIndex) {
                    expect(createTaskDialog.priorityDropdown.getAttribute("title")).toEqual("Select Priority")
                    expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled');
                    createTaskDialog.priorityDropdown.click()
                    .then(function () {
                        webdriverUtils.clickOnElement(createTaskDialog.priorityDropdownElement(2))
                        .then(function () {
                            done(function () {
                                expect(createTaskDialog.priorityDropdown.getAttribute("title")).toEqual("1");
                                expect(createTaskDialog.doneButton.getAttribute("class")).not.toContain('disabled');
                            });
                        });
                    });
                });
            });
        });

        it("22-when a user creates a task on a first page of document level it should be displayed on this level", function (done) {
            tasksUtils.deleteTaskByDescription(task)
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document, 'document');
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(page, 'page');
            })
            .then(function () {
                return filesArea.fileViewHeader.getText()
            })
            .then(function (header) {
                return expect(header.toLowerCase()).toContain(page.toLowerCase())
            })
            .then(function () {
                createTask(task, flow2, startStep, null, function () {
                    toDoList.settingsFilter.click()
                    .then(toDoList.unassignedTasksCheckbox.click)
                    .then(toDoList.settingsFilter.click)
                    .then(function () {
                        toDoList.findTask(flow2, task, function () {
                            expect(toDoList.taskDescription(0).getText()).toEqual(task);
                            toDoList.taskFileName(0).click()
                            .then(function () {
                                browser.waitForAngular();
                                filesArea.fileViewHeader.getText().then(function (header) {
                                    done(expect(header.toLowerCase()).toContain(page.toLowerCase()));
                                });
                            });
                        });
                    });
                });
            });
        });

        it("11-task attribute toggle should be active when a user selects a workflow and if the step has attributes and" +
            " all task attributes should be ordered alphabetical by display name", function (done) {

                searchUtil.openFile(file)
                .then(function () {
                    return filesView.createIcon.waitReady();
                })
                .then(filesView.createIcon.click)
                .then(createTaskDiaryDropdown.createTaskAction.click)
                .then(function () {
                    return createTaskDialog.cancelButton.waitReady();
                })
                .then(function () {
                    return createTaskDialog.selectFlow(flow3);
                })
                .then(createTaskDialog.taskAttrButton.click)
                .then(function () {
                    done(function () {
                        expect(taskAttributesForm.userNameAttr).toBeDefined();
                        expect(taskAttributesForm.userNameAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesForm.custNoAttr).toBeDefined();
                        expect(taskAttributesForm.custNoAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesForm.customerBillAmountAttr).toBeDefined();
                        expect(taskAttributesForm.customerBillAmountAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesForm.dateOfBillAttr_Input).toBeDefined();
                        expect(taskAttributesForm.dateOfBillAttr_Input.getAttribute("value")).toEqual("");
                        expect(taskAttributesForm.custNameAttr).toBeDefined();
                        expect(taskAttributesForm.custNameAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesForm.isAgencyAttr).toBeDefined();
                        createTaskDialog.attributeGroups.then(function (items) {
                            var promises = [];
                            for (var i = 0; i < items.length; i++) {
                                promises.push(items[i].getText());
                                expect(items[i].element(by.css("[id^='attr']")).getAttribute("required")).toBe(null);
                            }
                            Q.all(promises).done(function (attrArray1) {
                                expect(conversionUtils.isArraySortedAscending(attrArray1)).toBe(true);
                                done();
                            });
                        });
                    });
                });
            });

        it("12-should have attributes of Integer type and integer values are increased and decreased within the maximum and minimum values " +
            "and appropriate error messages are displayed when entered values are incorrect", function (done) {
                searchUtil.openFile(file)
               .then(function () {
                   return filesView.createIcon.waitReady();
               })
               .then(filesView.createIcon.click)
               .then(createTaskDiaryDropdown.createTaskAction.click)
               .then(function () {
                   return createTaskDialog.cancelButton.waitReady();
               })
               .then(function () {
                   createTaskDialog.chooseFlow(flow3, function (flowIndex) {
                       createTaskDialog.priorityDropdown.click()
                       .then(function () {
                           return webdriverUtils.clickOnElement(createTaskDialog.priorityDropdownElement(2));
                       })
                       .then(createTaskDialog.taskAttrButton.click)
                       .then(function () {
                           return taskAttributesForm.custNoAttr.sendKeys("0");
                       })
                       .then(function () {
                           return expect(taskAttributesForm.custNoAttr.getAttribute('value')).toEqual("0");
                       })
                       .then(function () {
                           return expect(createTaskDialog.doneButton.getAttribute("class")).not.toContain('disabled');
                       })
                       .then(taskAttributesForm.custNoAttr.clear)
                       .then(function () {
                           return taskAttributesForm.custNoAttr.sendKeys("-1");
                       })
                       .then(function () {
                           return expect(taskAttributesForm.invalidTypeMessage).toEqual('* Invalid value type');
                       })
                       .then(function () {
                           return expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled');
                       })
                       .then(taskAttributesForm.custNoAttr.clear)
                       .then(function () {
                           return taskAttributesForm.custNoAttr.sendKeys("101");
                       })
                       .then(function () {
                           return expect(taskAttributesForm.invalidTypeMessage).toEqual(invalidMaxMsg_spinedit);
                       })
                       .then(function () {
                           done(expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled'));
                       });
                   });
               });
            });

        it("13-should have user attribute with selectable values", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.taskAttrButton.click)
            .then(function () {
                return browser.sleep(5000);
            })
            .then(taskAttributesForm.userNameAttr.click)
            .then(function () {
                return webdriverUtils.clickOnElement(taskAttributesForm.userNameDropdownElement(1))
            })
            .then(function () {
                return expect(taskAttributesForm.userNameAttr.getAttribute("title")).toEqual("badhekna");
            })
            .then(taskAttributesForm.userNameAttr.click)
            .then(function () {
                done(expect(taskAttributesForm.userNameDropdownElement(1).getAttribute("class")).toEqual("selected"));
            });
        });

        it("14-should have string attribute with selectable values", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.taskAttrButton.click)
            .then(function () {
                return browser.sleep(5000);
            })
            .then(taskAttributesForm.custNameAttr.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnElement(taskAttributesForm.custNameDropdownElement(1));
            })
            .then(function () {
                return expect(taskAttributesForm.custNameAttr.getAttribute("title")).toEqual("Test1");
            })
            .then(taskAttributesForm.custNameAttr.click)
            .then(function () {
                done(expect(taskAttributesForm.custNameDropdownElement(1).getAttribute("class")).toEqual("selected"));
            });
        });

        it("15-It is not allowed to enters data of string type for attributes of Float or Integer type", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.taskAttrButton.click)
            .then(function () {
                return taskAttributesForm.customerBillAmountAttr.sendKeys("ghsghfgthdgh");
            })
            .then(taskAttributesForm.custNoAttr.click)
            .then(function () {
                return expect(taskAttributesForm.customerBillAmountAttr.getAttribute('value')).toEqual("");
            })
            .then(function () {
                return taskAttributesForm.custNoAttr.sendKeys("fgjhdgyhtyh dfhetyh");
            })
            .then(taskAttributesForm.customerBillAmountAttr.click)
            .then(function () {
                done(expect(taskAttributesForm.custNoAttr.getAttribute('value')).toEqual(""));
            });
        });

        it("16-should have attributes of Float type and float values are increased and decreased within the maximum and minimum values " +
            "and appropriate error messages are displayed when entered values are incorrect", function (done) {
                searchUtil.openFile(file)
                .then(function () {
                    return filesView.createIcon.waitReady();
                })
                .then(filesView.createIcon.click)
                .then(createTaskDiaryDropdown.createTaskAction.click)
                .then(function () {
                    return createTaskDialog.cancelButton.waitReady();
                })
                .then(function () {
                    return createTaskDialog.selectFlow(flow3);
                })
                .then(createTaskDialog.priorityDropdown.click)
                .then(function () {
                    return webdriverUtils.clickOnElement(createTaskDialog.priorityDropdownElement(2));
                })
                .then(createTaskDialog.taskAttrButton.click)
                .then(function () {
                    return taskAttributesForm.customerBillAmountAttr.sendKeys("0")
                })
                .then(function () {
                    return expect(taskAttributesForm.customerBillAmountAttr.getAttribute('value')).toEqual("0");
                })
                .then(function () {
                    return expect(createTaskDialog.doneButton.getAttribute("class")).not.toContain('disabled');
                })
                .then(taskAttributesForm.customerBillAmountAttr.clear)
                .then(function () {
                    return taskAttributesForm.customerBillAmountAttr.sendKeys("-1")
                })
                .then(function () {
                    return expect(taskAttributesForm.invalidTypeMessage).toEqual(invalidMinMsg_spinedit);
                })
                .then(function () {
                    return expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled');
                })
                .then(taskAttributesForm.customerBillAmountAttr.clear)
                .then(function () {
                    return taskAttributesForm.customerBillAmountAttr.sendKeys("100")
                })
                .then(function () {
                    return expect(taskAttributesForm.customerBillAmountAttr.getAttribute('value')).toEqual("100");
                })
                .then(function () {
                    return expect(createTaskDialog.doneButton.getAttribute("class")).not.toContain('disabled');
                })
                .then(taskAttributesForm.customerBillAmountAttr.clear)
                .then(function () {
                    return taskAttributesForm.customerBillAmountAttr.sendKeys("101")
                })
                .then(function () {
                    return expect(taskAttributesForm.invalidTypeMessage).toEqual(invalidMaxMsg_spinedit);
                })
                .then(function () {
                    done(expect(createTaskDialog.doneButton.getAttribute("class")).toContain('disabled'));
                });
            });

        it("17-after date selection in the date attribute it should display a correct date in mm/dd/yyyy", function (done) {

            taskAttributesForm.container = createTaskDialog.attrContainer;
            datepickerPopup.container = createTaskDialog.attrContainer;

            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.taskAttrButton.click)
            .then(function () {
                return browser.driver.wait(function () {
                    return taskAttributesForm.datepicker_Icon.isDisplayed().then(function (element) {
                        return element === true;
                    });
                });
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(taskAttributesForm.datepicker_Icon.click)
            .then(function () {
                var dateObj = new Date();
                var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
                if (date > 25) {
                    date = 15;
                    dateObj.setDate(15);
                }

                var month = dateObj.getMonth();
                datepickerPopup.rightRowButton.click()
                .then(function () {
                    dateObj.setMonth(month + 1);
                    datepickerPopup.clickDateButton(date.toString(), browser);
                    expect(taskAttributesForm.dateOfBillAttr_Input.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                })
                .then(taskAttributesForm.datepicker_Icon.click)
                .then(datepickerPopup.leftRowButton.click)
                .then(function () {
                    if (month == 0) {
                        dateObj.setYear(new Date().getFullYear() - 1);
                        dateObj.setMonth(11);
                    }
                    else {
                        dateObj.setMonth(month);
                    }
                    datepickerPopup.clickDateButton(date.toString(), browser);
                    expect(taskAttributesForm.dateOfBillAttr_Input.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                })
                .then(taskAttributesForm.datepicker_Icon.click)
                .then(datepickerPopup.rightRowButton.click)
                .then(datepickerPopup.rightRowButton.click)
                .then(function () {
                    if (month == 0) {
                        dateObj.setYear(new Date().getFullYear() + 1);
                        dateObj.setMonth(1);
                    }
                    else {
                        dateObj.setMonth(month + 2);
                    }
                    datepickerPopup.clickDateButton(date.toString(), browser);
                    done(expect(taskAttributesForm.dateOfBillAttr_Input.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj)));
                });
            });
        });

        it("18-task attribute toggle should expand and hide task attributes", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.taskAttrButton.click)
            .then(function () {
                done(function () {
                    expect(taskAttributesForm.userNameAttr.isDisplayed()).toBe(false);
                    expect(taskAttributesForm.custNoAttr.isDisplayed()).toBe(false);
                    expect(taskAttributesForm.customerBillAmountAttr.isDisplayed()).toBe(false);
                    expect(taskAttributesForm.dateOfBillAttr_Input.isDisplayed()).toBe(false);
                    expect(taskAttributesForm.custNameAttr.isDisplayed()).toBe(false);
                    expect(taskAttributesForm.isAgencyAttr.isDisplayed()).toBe(false);
                });
            });
        });

        it("19-when click 'Reset' button all the attribute values should be cleared", function (done) {
            searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.taskAttrButton.click)
            .then(function () {
                return taskAttributesForm.custNoAttr.sendKeys("88");
            })
            .then(function () {
                return expect(taskAttributesForm.custNoAttr.getAttribute('value')).toEqual("88");
            })
            .then(taskAttributesForm.userNameAttr.click)
            .then(function () {
                return webdriverUtils.clickOnElement(taskAttributesForm.userNameDropdownElement(1));
            })
            .then(function () {
                return expect(taskAttributesForm.userNameAttr.getAttribute("title")).toEqual("badhekna");
            })
            .then(function () {
                return taskAttributesForm.customerBillAmountAttr.sendKeys("22.02");
            })
            .then(function () {
                return expect(taskAttributesForm.customerBillAmountAttr.getAttribute('value')).toEqual("22.02");;
            })
            .then(taskAttributesForm.custNameAttr.click)
            .then(function () {
                return webdriverUtils.clickOnElement(taskAttributesForm.custNameDropdownElement(1));
            })
            .then(createTaskDialog.resetButton.click)
            .then(function () {
                done(function () {
                    expect(taskAttributesForm.custNoAttr.getAttribute("value")).toEqual("");
                    expect(taskAttributesForm.userNameAttr.getAttribute("value")).toEqual("");
                    expect(taskAttributesForm.customerBillAmountAttr.getAttribute("value")).toEqual("");
                    expect(taskAttributesForm.custNameAttr.getAttribute("value")).toEqual("");
                });
            });
        });

        it("20-when a user creates an unassigned task on a file level it should be displayed in the To Do List and File Related Tasks and can be locked", function (done) {
            tasksUtils.deleteTaskByDescription(task)
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                createTask(task, flow2, startStep, null, function () {
                    webdriverUtils.clickOnElement(toDoList.settingsFilter)
                    .then(function () {
                        return webdriverUtils.clickOnElement(toDoList.unassignedTasksCheckbox)
                    })
                    .then(function () {
                        return webdriverUtils.clickOnElement(toDoList.settingsFilter)
                    })
                    .then(function () {
                        toDoList.findTask(flow2, task, function () {
                            toDoList.priority(0, function (priority2) {
                                toDoList.availableDate(0, function (availableDate2) {
                                    toDoList.taskFileName(0).click()
                                    .then(function () {
                                        browser.waitForAngular().then(function () {
                                            expect(filesArea.fileViewTitle.getText()).toEqual(file);
                                            expect(lockedTaskView.taskDescription.getText()).toBe(task);
                                            expect(lockedTaskView.getTaskDetails('Flow').getText()).toContain(flow2);
                                            expect(lockedTaskView.getTaskDetails('Step').getText()).toContain(startStep);
                                            expect(lockedTaskView.getTaskDetails('Assigned to').getText()).toContain(defaultAssignedTo);
                                        })
                                        .then(element(by.css('.record-diaries.dropdown')).click)
                                        .then(function () {
                                            fileTaskList.findTask(task, function (taskIndex) {
                                                expect(fileTaskList.taskDescription(taskIndex)).toEqual(task);
                                                expect(fileTaskList.taskFileName(taskIndex).getText()).toEqual(file);
                                                expect(fileTaskList.getTaskDetails(taskIndex, "Flow")).toEqual(flow2);
                                                expect(fileTaskList.getTaskDetails(taskIndex, "Step")).toEqual(startStep);
                                                fileTaskList.priority(taskIndex, function (priority1) {
                                                    expect(priority1).toEqual("PRIORITY 1");
                                                    fileTaskList.availableDate(taskIndex, function (availableDate1) {
                                                        done(expect(new Date(availableDate1).getMonth()).toEqual(new Date().getMonth()));
                                                    })
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

        it("21-when a user creates an assigned task on a folder level it should be displayed on this level", function (done) {
            tasksUtils.deleteTaskByDescription(task)
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(folder, 'folder');
            })
            .then(function () {
                createTask(task, flow1, startStep, currentUser, function () {
                    toDoList.settingsFilter.click()
                    .then(toDoList.allTasksCheckbox.click)
                    .then(toDoList.settingsFilter.click)
                    .then(function () {
                        toDoList.findTask(flow1, task, function () {
                            expect(toDoList.taskDescription(0).getText()).toEqual(task)
                            toDoList.taskFileName(0).click()
                            .then(function () {
                                browser.waitForAngular();
                                expect(filesArea.fileViewTitle.getText()).toEqual(folder);
                                lockedTaskView.getTaskDetails('Assigned to').getText().then(function (text) {
                                    done(expect(text).toContain(currentUser));
                                });
                            });
                        });
                    });
                });
            });

        });

        it("23-user should be able to create task with attributes", function () {
            taskActionsDropdown.container = fileTaskList.container;
            return tasksUtils.deleteTaskByDescription(task)
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createTaskAction.click)
            .then(function () {
                return createTaskDialog.cancelButton.waitReady();
            })
            .then(function () {
                return createTaskDialog.selectFlow(flow3);
            })
            .then(createTaskDialog.priorityDropdown.click)
            .then(function(){
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnElement(createTaskDialog.priorityDropdownElement(2));
            })
            .then(function () {
                return createTaskDialog.description.sendKeys(task);
            })
            .then(createTaskDialog.taskAttrButton.click)
            .then(function () {
                return taskAttributesForm.custNoAttr.sendKeys("88");
            })
            .then(function () {
                return taskAttributesForm.dateOfBillAttr_Input.sendKeys("01/01/2016");
            })
            .then(taskAttributesForm.userNameAttr.click)
            .then(taskAttributesForm.userNameDropdownElement(1).click)
            .then(function () {
                return taskAttributesForm.customerBillAmountAttr.sendKeys("22.02");
            })
            .then(createTaskDialog.doneButton.click)
            .then(recordHeader.fileTaskListBadge.click)
            .then(fileTaskList.searchInput.clear)
            .then(function () {
                return fileTaskList.searchInput.sendKeys(task);
            })
            .then(function () {
                return fileTaskList.hoverMouseOnTask(task);
            })
            .then(function () {
                return fileTaskList.clickCog();
            })
            .then(taskActionsDropdown.setAttributesAction.click)
            .then(function () {
                return taskAttributesForm.taskDescription;
            })
            .then(function (description) {
                return expect(description).toEqual(task);
            })
            .then(function () {
                return expect(taskAttributesForm.custNoAttr.getAttribute('value')).toEqual("88");
            })
            .then(function () {
                return expect(taskAttributesForm.dateOfBillAttr_Input.getAttribute("value")).toEqual("01/01/2016");
            });
        });
    };
});