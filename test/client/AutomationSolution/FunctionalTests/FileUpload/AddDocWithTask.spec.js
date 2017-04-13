exports.tags = ['File_Manipulation', 'Upload'];
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js'),
    IR_filesview = require('../../PageObjects/FilesView.js'),
    IR_AddDocModal = require('./../../PageObjects/ModalDialogs/AddDocModal.js'),
    IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    IR_ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js'),
    IR_CreateTaskDiaryModal = require('./../../PageObjects/ModalDialogs/CreateTaskDiaryModal.js'),
    IR_SetTaskAttributesModal = require('./../../PageObjects/ModalDialogs/SetTaskAttributesModal.js'),
    IR_FileRelatedTasksDropdown = require('./../../PageObjects/DropdownLists/FileRelatedTasksDropdown.js'),
    IR_TaskActionsDropdown = require('./../../PageObjects/DropdownLists/TaskActionsDropdown.js'),
    IR_FileTree = require('../../PageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    tasksUtils = require('../../utils/tasksUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    conversionUtils = require('../../utils/conversionUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    searchUtil = require('../../BusinessProcess/Search.js'),

    fileTree = new IR_FileTree(),
    taskActionsDropdown = new IR_TaskActionsDropdown(),
    recordHeader = new recordHeaderElement(),
    navigationBar = new IR_NavigationBar(),
    filesArea = new IR_filesview(),
    addDocModal = new IR_AddDocModal(),
    errorMessage = new IR_ErrorMessage(),
    taskAttributesForm = new IR_SetTaskAttributesModal(),
    taskAria = new IR_CreateTaskDiaryModal(),
    fileTaskList = new IR_FileRelatedTasksDropdown(),
    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),

    isFirst = true;


describe('Add document with tasks', function () {

    if (browser.params.siteBase == 'iis') {
        var filePath = 'c:\\moving-forward.jpg',
            multipleFiles = filePath + '\n' + "c:\\EditAnnotationIcon.JPG",
            fileRP = 'AddDocWithTask_RP',
            fileEvents = 'AddDocWithTask_Events',
            flowWithAttr = "SimpleWorkFlow1",
            flowWithoutAttr = "WFSetTaskAttributes",
            docDescription = "doc_AddDocWithTaskTesting",
            taskDescription = "task_AddDocWithTaskTesting";

        beforeEach(function () {
            if(isFirst){
                isFirst = false;
                return restoreFileStructure()
                    .then(function () {
                        return browser.executeScript('window.localStorage.clear();');
                    })
                    .then(function () {
                        return browser.driver.get(browser.params.defaultUrl);
                    })
                    .then(function () {
                        return navigationBar.vertaforeLogo.waitReady();
                    });
            }else{
                return browser.driver.get(browser.params.defaultUrl)
                    .then(function () {
                        return navigationBar.vertaforeLogo.waitReady();
                    });
            }
        });

        afterEach(function () {
            return restoreFileStructure()
                .then(function () {
                    return browser.executeScript('window.localStorage.clear();');
                });
        });



        function restoreFileStructure() {
            return fileUtils.deleteDocumentByDescription(fileRP, docDescription)
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(fileRP, 'Application');
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(fileEvents, docDescription);
                })
                .then(function () {
                    return tasksUtils.deleteTaskByDescription(taskDescription);
                });
        }

        function uploadFile(howmany) {
            return filesArea.actionsDropdownButton.click()
                .then(docPageActionsDropdown.newDocumentAction.click)
                .then(function () {
                    return addDocModal.docTypeButton.waitReady();
                })
                .then(function () {
                    switch (howmany) {
                        case 'single':
                            return addDocModal.chooseFileInput.sendKeys(filePath);
                        default:
                            return addDocModal.chooseFileInput.sendKeys(multipleFiles);
                    }
                });
        }

        function prepareForTest(fileNumberToOpen, uploadOneOrMultiple, doYouWantOpenFileTree, folderNameToNavigate, docNameToNavigate) {
            doYouWantOpenFileTree = doYouWantOpenFileTree.toLowerCase();
            folderNameToNavigate = folderNameToNavigate.toLowerCase();
            docNameToNavigate = docNameToNavigate.toLowerCase();
            return searchUtil.openFile(fileNumberToOpen)
                .then(function () {
                    if(doYouWantOpenFileTree === 'yes') {
                        if (folderNameToNavigate !== 'nofolder') {
                            return webdriverUtils.clickOnNodeInFileTree(folderNameToNavigate, 'folder')
                                .then(function () {
                                    if (docNameToNavigate !== 'nodoc') {
                                        return webdriverUtils.showNodeChildrenByText(folderNameToNavigate, 'folder')
                                            .then(function () {
                                                return webdriverUtils.clickOnNodeInFileTree(docNameToNavigate, 'document');
                                            });
                                    }
                                });
                        } else {
                            if (docNameToNavigate !== 'nodoc') {
                                return webdriverUtils.clickOnNodeInFileTree(docNameToNavigate, 'document')
                            }
                        }
                    }
                })
                .then(function () {
                    return uploadFile(uploadOneOrMultiple);
                });
        }

        function openTaskArea() {
            return addDocModal.addDocAddTaskLink.click()
                .then(function () {
                    return taskAria.description.waitReady();
                });
        }

        function removeTaskArea() {
            return addDocModal.addDocRemoveTaskLink.click()
                .then(function () {
                    return addDocModal.finalizeAddDocument.waitReady();
                });
        }
        
        //Basic Add Document modal tested in AddDocument.spec. This is an extension of that

        it('1 - When user opens add document window,he should see a link to add task', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc')
                .then(function () {
                    expect(addDocModal.addDocAddTaskLink.isDisplayed()).toBe(true);
                });
        });

        it('2 - When user clicks on add task, the text of import button should change to "Import with Task"', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                return openTaskArea().then(function () {
                    expect(addDocModal.importWithTaskButton.isDisplayed()).toBe(true);
                });
            });
        });

        //todo add API tests for tasks with attributes, without attributes, with attributes no visibility, with attributes with visibility etc.
        it('3 - When user chooses to add task to a flow with no associated attributes, the Attributes bar should be disabled', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                return openTaskArea().then(function () {
                    expect(taskAria.getClassOfTaskAttrButton).toContain("disabled");
                });

            });
        });       

        it('4 - When user clicks on add task link in add doc pop-up,remove task link should be displayed', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                return openTaskArea().then(function () {
                    expect(addDocModal.addDocRemoveTaskLink.isDisplayed()).toBe(true);
                });
            });
        });

        it('5 - If user opens task form inside add doc. and clicks on "remove task" button,the task from should not be displayed,import task button should change to import', function () {
            prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                return openTaskArea().then(function () {
                    expect(taskAria.flowDropdown.isDisplayed()).toBe(true);
                    expect(taskAria.assignToDropdown.isDisplayed()).toBe(true);
                    expect(taskAria.priorityDropdown.isDisplayed()).toBe(true);
                    expect(taskAria.availableDateInput.isDisplayed()).toBe(true);
                    expect(taskAria.description.isDisplayed()).toBe(true);
                    expect(addDocModal.importWithTaskButton.isDisplayed()).toBe(true);
                    return removeTaskArea().then(function () {
                        expect(taskAria.flowDropdown.isDisplayed()).toBe(false);
                        expect(taskAria.assignToDropdown.isDisplayed()).toBe(false);
                        expect(taskAria.priorityDropdown.isDisplayed()).toBe(false);
                        expect(taskAria.availableDateInput.isDisplayed()).toBe(false);
                        expect(taskAria.description.isDisplayed()).toBe(false);
                        expect(addDocModal.finalizeAddDocument.isDisplayed()).toBe(true);
                    });
                });
            });
        });

        it('6 - If user selects some data from task form and clicks on reset button of the task form,all the values should be cleared', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                openTaskArea().then(function () {
                    expect(taskAria.flowDropdown.getAttribute("title")).toEqual("Select Flow");
                    expect(taskAria.stepDropdown.getAttribute("title")).toEqual("Select Step");
                    expect(taskAria.priorityDropdown.getAttribute("title")).toEqual("Select Priority");
                    expect(taskAria.availableDateInput.getAttribute("value")).toEqual(conversionUtils.getDate(new Date()));

                    return taskAria.selectFlow(flowWithAttr).then(function () {
                        taskAria.priorityDropdown.click().then(function () {
                            return webdriverUtils.clickOnElement(taskAria.priorityDropdownElement(2)).then(function () {
                                browser.waitForAngular();
                                expect(taskAria.flowDropdown.getAttribute("title")).toEqual(flowWithAttr);
                                expect(taskAria.stepDropdown.getAttribute("title")).toEqual("Manual 1");
                                expect(taskAria.assignToValue).toEqual("Unassigned");
                                expect(taskAria.priorityDropdown.getAttribute("title")).toEqual("1");

                                return webdriverUtils.clickOnElement(addDocModal.addDocResetLink).then(function () {
                                    browser.waitForAngular();
                                    expect(taskAria.flowDropdown.getAttribute("title")).toEqual("Select Flow");
                                    expect(taskAria.stepDropdown.getAttribute("title")).toEqual("Select Step");
                                    expect(taskAria.priorityDropdown.getAttribute("title")).toEqual("Select Priority");
                                    expect(taskAria.availableDateInput.getAttribute("value")).toEqual(conversionUtils.getDate(new Date()));
                                });
                            });

                        });
                    });
                });

            });
        });

        it('7 - [Reset Task attributes functionality]If user selects some data from task attributes form and clicks on reset button of the task form,all the values in the task attributes form should be cleared', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                return openTaskArea().then(function () {
                    return taskAria.selectFlow(flowWithAttr).then(function () {
                        taskAria.taskAttrButton.click().then(function () {
                            taskAttributesForm.custNoAttr.sendKeys("12").then(function () {
                                expect(taskAttributesForm.custNoAttr.getAttribute('value')).toEqual("12");
                            });

                            taskAttributesForm.userNameAttr.click().then(function () {
                                webdriverUtils.clickOnElement(taskAttributesForm.userNameDropdownElement(1)).then(function () {
                                    browser.waitForAngular();
                                    if (browser.browserName === 'chrome') {
                                        expect(taskAttributesForm.userNameAttr.getAttribute("title")).toEqual("badhekna");
                                    }
                                });

                            });

                            taskAttributesForm.customerBillAmountAttr.sendKeys("22.2").then(function () {
                                expect(taskAttributesForm.customerBillAmountAttr.getAttribute('value')).toEqual("22.2");
                            });

                            taskAttributesForm.custNameAttr.click().then(function () {
                                browser.waitForAngular();
                                webdriverUtils.clickOnElement(taskAttributesForm.custNameDropdownElement(1)).then(function () {
                                    browser.waitForAngular();
                                    if (browser.browserName === 'chrome') {
                                        expect(taskAttributesForm.custNameAttr.getAttribute("title")).toEqual("Test1");
                                    }
                                });

                            });

                            taskAria.resetButton.click().then(function () {
                                browser.waitForAngular();
                                expect(taskAttributesForm.custNoAttr.getAttribute('value')).toEqual("");
                                if (browser.browserName === 'chrome') {
                                    expect(taskAttributesForm.userNameAttr.getAttribute("title")).toEqual("Select...");
                                }
                                expect(taskAttributesForm.customerBillAmountAttr.getAttribute('value')).toEqual("");
                                if (browser.browserName === 'chrome') {
                                    expect(taskAttributesForm.custNameAttr.getAttribute("title")).toEqual("Select...");
                                }
                            });
                        });
                    });
                });

            });

        });

        it('8 - [cancel button functionality] if user selects data for creating task in add doc form and clicks cancel button,new document should not be created', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                addDocModal.docDescription.clear();
                addDocModal.docDescription.sendKeys(docDescription);
                browser.waitForAngular();
                return openTaskArea().then(function () {
                    return taskAria.selectFlow(flowWithoutAttr).then(function () {
                        taskAria.priorityDropdown.click();
                        taskAria.priorityDropdownElement(2).click();
                        browser.waitForAngular();
                        taskAria.description.sendKeys(taskDescription);
                        taskAria.cancelButton.click();
                        browser.waitForAngular();
                        fileTree.fileTreeSymbol.click();
                        browser.waitForAngular();
                        webdriverUtils.getItemIndex(fileTree.documentsInFileTree, docDescription, function (docIndex) {
                            expect(docIndex).toEqual(-1);
                        });
                        recordHeader.fileTaskListBadge.click();
                        browser.waitForAngular();
                        fileTaskList.expandAllTasks();
                        browser.waitForAngular();
                        webdriverUtils.getItemIndex(fileTaskList.tasks, taskDescription, function (docIndex) {
                            expect(docIndex).toEqual(-1);
                        });
                    });
                });
            });
        });

        it('9 - User should be able to create doc with task', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc')
                .then(addDocModal.docDescription.clear)
                .then(function () {
                    return addDocModal.docDescription.sendKeys(docDescription);
                })
                .then(function () {
                    return openTaskArea();
                })
                .then(function () {
                    return taskAria.selectFlow(flowWithoutAttr)
                })
                .then(taskAria.priorityDropdown.click)
                .then(taskAria.priorityDropdownElement(2).click)
                .then(function () {
                    return taskAria.description.sendKeys(taskDescription);
                })
                .then(addDocModal.importWithTaskButton.click)
                // .then(webdriverUtils.waitForGrowl)
                // .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    return browser.sleep(5000);
                })
                .then(function () {
                    return expect(fileTree.documentByText(docDescription)).toBeDefined();
                })
                .then(recordHeader.fileTaskListBadge.click)
                .then(function () {
                    return fileTaskList.findTask(taskDescription)
                })
                .then(function (taskIndex) {
                    return expect(fileTaskList.taskDescription(taskIndex)).toEqual(taskDescription);
                });
        });

        fit("10 - [Add doc. with task with attributes]User should be able to add document with task with attributes", function () {
            var taskInd;
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc')
                .then(addDocModal.docDescription.clear)
                .then(function () {
                    return addDocModal.docDescription.sendKeys(docDescription)
                })
                .then(function () {
                    return openTaskArea();
                })
                .then(function () {
                    return taskAria.selectFlowByNumber(4);
                })
                .then(taskAria.priorityDropdown.click)
                .then(taskAria.priorityDropdownElement(2).click)
                .then(function () {
                    return taskAria.description.sendKeys(taskDescription);
                })
                .then(taskAria.taskAttrButton.click)
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
                .then(taskAttributesForm.custNameAttr.click)
                .then(taskAttributesForm.custNameDropdownElement(1).click)
                .then(addDocModal.importWithTaskButton.click)
                // .then(webdriverUtils.waitForGrowl)
                // .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    return browser.sleep(5000);
                })
                .then(function () {
                    return expect(fileTree.documentByText(docDescription)).toBeDefined();
                })
                .then(recordHeader.fileTaskListBadge.click)
                .then(function () {
                    return fileTaskList.findTask(taskDescription);
                })
                .then(function (taskIndex) {
                    taskInd = taskIndex;
                    expect(fileTaskList.taskDescription(taskIndex)).toEqual(taskDescription);
                    expect(fileTaskList.taskFileName(taskIndex).getText()).toEqual(fileRP);
                    expect(fileTaskList.getTaskDetails(taskIndex, "Flow")).toEqual(flowWithAttr);
                    expect(fileTaskList.getTaskDetails(taskIndex, "Step")).toEqual("Manual 1");
                })
                .then(function () {
                    return expect(fileTaskList.priority(taskInd)).toEqual("PRIORITY 1");
                })
                .then(function () {
                    return fileTaskList.availableDate(taskInd);
                })
                .then(function (availableDate) {
                    return expect(new Date(availableDate).getMonth()).toEqual(new Date().getMonth());
                })
                .then(function(){
                    return fileTaskList.hoverMouseOnTask(taskDescription);
                })
                .then(function () {
                    return fileTaskList.clickCog();
                })
                .then(function () {
                    taskActionsDropdown.container = fileTaskList.container;
                    return taskActionsDropdown.setAttributesAction.click();
                })
                .then(function () {
                    expect(taskAttributesForm.taskDescription).toEqual(taskDescription);
                    expect(taskAttributesForm.custNoAttr.getAttribute('value')).toEqual("88");
                    expect(taskAttributesForm.userNameAttr.getAttribute("title")).toEqual("badhekna");
                    expect(taskAttributesForm.customerBillAmountAttr.getAttribute('value')).toEqual("22.02");
                    expect(taskAttributesForm.custNameAttr.getAttribute("title")).toEqual("Test1");
                    expect(taskAttributesForm.dateOfBillAttr_Input.getAttribute("value")).toEqual("01/01/2016");
                });
        });

        fit('11 - [Growl message existence on add doc with task success]on creating a doc with task,growl message should display', function () {
            return prepareForTest(fileRP, 'single', 'no', 'noFolder', 'noDoc').then(function () {
                addDocModal.docDescription.clear();
                addDocModal.docDescription.sendKeys(docDescription);
                openTaskArea().then(function () {
                    taskAria.selectFlow(flowWithoutAttr).then(function () {
                        taskAria.priorityDropdown.click();
                        taskAria.priorityDropdownElement(2).click();
                        browser.waitForAngular();
                        taskAria.description.sendKeys(taskDescription);
                        addDocModal.importWithTaskButton.click();
                        browser.waitForAngular();
                        expect(errorMessage.growlNotification.isPresent()).toBe(true);
                    });
                });
            });
        });
        
    }
});