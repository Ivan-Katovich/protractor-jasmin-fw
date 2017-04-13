exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var DatepickerPopup = require('./../../pageObjects/Containers/DatepickerPopup.js');
var datepickerPopup = new DatepickerPopup("attributes");

var SetTaskAttributesModal = require('./../../pageObjects/ModalDialogs/SetTaskAttributesModal.js');
var taskAttributesModal = new SetTaskAttributesModal();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');

var noAttributesMessage = "NO ATTRIBUTES ARE ASSOCIATED WITH THIS STEP";
var file = "FileWithTasks_A8";
var invalidMinFloatMsg_spinedit = "* Value should be greater or equal than 0";
var invalidMaxFloatMsg_spinedit = "* Value should be less or equal than 100";
var invalidMinFloatMsg_textbox = "* Value should be greater or equal than -1000000000";
var invalidMaxFloatMsg_textbox = "* Value should be less or equal than 1000000000";

var task_WorkflowFilterTest_a8_M1 = 'Task_WorkflowFilterTest_a8_M1';
var task_WorkflowFilterTest_a8_M4 = 'Task_WorkflowFilterTest_a8_M4';
var task_SetAttributesTest_a8_M1 = 'Task_SetAttributesTest_a8_M1';
var simpleWorkFlow1 = 'SimpleWorkFlow1';
var stepManual1 = 'Manual 1';
var stepManual2 = 'Manual 2';
var stepManual4 = 'Manual 4';

function openSetTaskAttributesModal(task, fn) {
    recordHeader.fileTaskListBadge.click();
    fileTaskList.findTask(task, function (taskIndex) {
        fileTaskList.taskActionsIcon(taskIndex).click();
        taskActionsDropdown.container = fileTaskList.container;
        taskActionsDropdown.setAttributesAction(taskIndex).click();
        taskAttributesModal.taskDescription.then(function (description) {
            expect(description).toEqual(task);
            fn(taskIndex);
        });
    });
}

function setTaskAttributes(userNameIndex, custNo, billAmount, dateOfBill, custNameIndex, formAttr, customerNo, homeType, location, billingCode) {
    taskAttributesModal.userNameAttr.click();
    webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(userNameIndex));
    taskAttributesModal.custNoAttr.clear();
    taskAttributesModal.custNoAttr.sendKeys(custNo);
    taskAttributesModal.customerBillAmountAttr.clear();
    taskAttributesModal.customerBillAmountAttr.sendKeys(billAmount);
    taskAttributesModal.dateOfBillAttr_Input.clear();
    taskAttributesModal.dateOfBillAttr_Input.sendKeys(dateOfBill);
    taskAttributesModal.custNameAttr.click();
    webdriverUtils.clickOnElement(taskAttributesModal.custNameDropdownElement(custNameIndex));
    taskAttributesModal.formAttr.clear();
    taskAttributesModal.formAttr.sendKeys(formAttr);
    taskAttributesModal.customerNoAttr.clear();
    taskAttributesModal.customerNoAttr.sendKeys(customerNo);
    taskAttributesModal.homeTypeAttr.clear();
    taskAttributesModal.homeTypeAttr.sendKeys(homeType);
    taskAttributesModal.locationAttr.clear();
    taskAttributesModal.locationAttr.sendKeys(location);
    taskAttributesModal.billingCodeAttr.clear();
    taskAttributesModal.billingCodeAttr.sendKeys(billingCode);
}

describe("File Related Tasks - Set Task Attributes", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            tasksUtils.deleteAllTaskAttributes(task_WorkflowFilterTest_a8_M1);
            tasksUtils.routeTask(task_WorkflowFilterTest_a8_M1, simpleWorkFlow1, stepManual1);
            tasksUtils.routeTask(task_WorkflowFilterTest_a8_M4, simpleWorkFlow1, stepManual4);
            tasksUtils.routeTask(task_SetAttributesTest_a8_M1, simpleWorkFlow1, stepManual1);
        });

        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();').then(function () {
                browser.driver.get(browser.params.defaultUrl).then(function () {
                    //wait till the page has finished loading
                    webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                        navigationBar.searchIcon.click().then(function () {
                            searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                                searchPage.searchButton.click();
                                browser.waitForAngular();
                            });
                        });
                    });
                });
            });
        });


        it("integer attribute field should ignore any non-numeric characters (other than initial dash)", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                taskAttributesModal.formAttr.clear();//.then(function () {
                taskAttributesModal.formAttr.sendKeys("-10e-id");
                expect(taskAttributesModal.formAttr.getAttribute('value')).toEqual("-10");

                taskAttributesModal.formAttr.clear();//.then(function () {
                taskAttributesModal.formAttr.sendKeys("B1je200");
                expect(taskAttributesModal.formAttr.getAttribute('value')).toEqual("1200");

                taskAttributesModal.formAttr.clear();//.then(function () {
                taskAttributesModal.formAttr.sendKeys("kf//pp\\f");
                expect(taskAttributesModal.formAttr.getAttribute('value')).toEqual("");

                taskAttributesModal.formAttr.clear();//.then(function () {
                taskAttributesModal.formAttr.sendKeys("000dhs.ee8");
                expect(taskAttributesModal.formAttr.getAttribute('value')).toEqual("0008");
            });
        });

        it("integer attribute field should allow up to 10 digits to be entered and ignore keystrokes after", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                taskAttributesModal.customerNoAttr.clear();//.then(function () {
                taskAttributesModal.customerNoAttr.sendKeys("001100110022222");
                expect(taskAttributesModal.customerNoAttr.getAttribute('value')).toEqual("0011001100");

                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.customerNoAttr.sendKeys("-11001100112222");
                expect(taskAttributesModal.customerNoAttr.getAttribute('value')).toEqual("-1100110011");
            });
        });

        it("when data entered into the Int attribute greater than max value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                setTaskAttributes(2, "5", "8.9", "01/02/2015", 1, "895", "70", "blabla", "33", "blublu");
                taskAttributesModal.vehicleNameAttr.sendKeys('8');//still setting other attr fields 

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("0"); //set req field
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys("100");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys('101');
                //Trigger the inline validation
                if (browser.browserName === 'internet explorer') {
                    taskAttributesModal.locationAttr.sendKeys(protractor.Key.TAB);
                }
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                //expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMaxFloatMsg_spinedit);
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys("0");

            });
        });

        it("when data entered into the Int attribute less than min value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                setTaskAttributes(2, "5", "8.9", "01/02/2015", 1, "895", "70", "blabla", "33", "blublu");
                taskAttributesModal.vehicleNameAttr.sendKeys('8');//still setting other attr fields 

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("0"); //set req field
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys("0");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys('-1');
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                //expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMinFloatMsg_spinedit);
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys("0");

            });
        });

        it("when data entered into the Float attribute less than minimum value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                setTaskAttributes(2, "5", "8.9", "01/02/2015", 1, "895", "70", "blabla", "33", "blublu");
                taskAttributesModal.vehicleNameAttr.sendKeys('8');//still setting other attr fields 

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys("0");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys('-0.01');
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMinFloatMsg_spinedit);
                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys("0");

                //taskAttributesModal.customerBillAmountAttr.sendKeys(protractor.Key.ARROW_UP);
                taskAttributesModal.vehicleNameAttr.clear();
                taskAttributesModal.vehicleNameAttr.sendKeys("-1000000000");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.vehicleNameAttr.clear();
                taskAttributesModal.vehicleNameAttr.sendKeys("-1000000001");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMinFloatMsg_textbox);

            });
        });

        it("when data entered into the Float attribute greater than max value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                setTaskAttributes(2, "5", "8.9", "01/02/2015", 1, "895", "70", "blabla", "33", "blublu");
                taskAttributesModal.vehicleNameAttr.sendKeys('8');//still setting other attr fields 

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys("100.00");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys('100.01');
                //Trigger the inline validation
                if (browser.browserName === 'internet explorer') {
                    taskAttributesModal.customerBillAmountAttr.sendKeys(protractor.Key.TAB);
                }
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMaxFloatMsg_spinedit);
                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys("0");

                //taskAttributesModal.customerBillAmountAttr.sendKeys(protractor.Key.ARROW_UP);
                taskAttributesModal.vehicleNameAttr.clear();
                taskAttributesModal.vehicleNameAttr.sendKeys("1000000000");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.vehicleNameAttr.clear();
                taskAttributesModal.vehicleNameAttr.sendKeys("1000000001");
                //Trigger inline validation
                if (browser.browserName === 'internet explorer') {
                    taskAttributesModal.vehicleNameAttr.sendKeys(protractor.Key.TAB);
                }
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                //expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMaxFloatMsg_textbox);

            });
        });

        it("float attribute fields should ignore any characters past the first 14", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                setTaskAttributes(2, "5", "8.9", "01/02/2015", 1, "895", "70", "blabla", "33", "blublu");
                taskAttributesModal.vehicleNameAttr.sendKeys('8');//still setting other attr fields 

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys("0000000000000.01");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("0000000000000.0");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);
            });
        });

        it("Float attribute field should only allow one dash in the field and it must be the first character", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("-10");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("-10");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("-1-20.10");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("-120.10");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("120-10");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("12010");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("0.-200");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("0.200");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("-0.-200");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("-0.200");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("--2.00");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("-2.00");
            });
        });

        it("Float attribute field should ignore any non-numeric characters (other than initial dash and one decimal)", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("-10eid");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("-10");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("B1je2.00");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("12.00");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("kf//pp\\f");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("000dhs.ee8");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("000.8");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("000dhs.ee8.88");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("000.888");

                taskAttributesModal.customerBillAmountAttr.clear();//.then(function () {
                taskAttributesModal.customerBillAmountAttr.sendKeys("11..");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("11.");
            });
        });

        it("When only a dash (-) is entered into an integer or float attribute field, only after defocusing the field should the user see a validation error", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {

                //when float element in focus, typing a - should not invalidate the field
                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys("-");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("-");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('class')).toContain("ng-valid");

                //defocus float element and still only a - should invalidate field
                taskAttributesModal.customerBillAmountAttr.sendKeys(protractor.Key.TAB);
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('class')).toContain("ng-invalid");


                //when integer element in focus, typing a - should not invalidate the field
                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.customerNoAttr.sendKeys("-");
                expect(taskAttributesModal.customerNoAttr.getAttribute('value')).toEqual("-");
                expect(taskAttributesModal.customerNoAttr.getAttribute('class')).toContain("ng-valid");

                //defocus integer element and still only a - should invalidate field
                taskAttributesModal.customerNoAttr.sendKeys(protractor.Key.TAB);
                expect(taskAttributesModal.customerNoAttr.getAttribute('class')).toContain("ng-invalid");


            });
        });



        it("when a user opens the 'Set task attributes' modal for task with empty attributes all attributes should be displayed " +
        " the buttons 'Set&Release' and 'Set Attribute' should be disabled task should be locked", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function (taskIndex) {
                taskAttributesModal.title.then(function (title) {
                    expect(title).toEqual("Set Task Attributes");
                });

                expect(taskAttributesModal.userNameAttr).toBeDefined();
                expect(taskAttributesModal.userNameAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.custNoAttr).toBeDefined();
                expect(taskAttributesModal.custNoAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.customerBillAmountAttr).toBeDefined();
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.dateOfBillAttr_Input).toBeDefined();
                expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.custNameAttr).toBeDefined();
                expect(taskAttributesModal.custNameAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.formAttr).toBeDefined();
                expect(taskAttributesModal.formAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.customerNoAttr).toBeDefined();
                expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.homeTypeAttr).toBeDefined();
                expect(taskAttributesModal.homeTypeAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.locationAttr).toBeDefined();
                expect(taskAttributesModal.locationAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.billingCodeAttr).toBeDefined();
                expect(taskAttributesModal.billingCodeAttr.getAttribute("value")).toEqual("");

                expect(taskAttributesModal.isAgencyAttr).toBeDefined();
                expect(taskAttributesModal.newAttr).toBeDefined();

                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');

                tasksUtils.ifTaskLocked(task_WorkflowFilterTest_a8_M1, function (locked) {
                    expect(locked).toBe(true);
                });
            });
        });

        it("'Set task attributes' modal should display a message when no attributes are associated with workflow step for task", function () {
            openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M4, function (taskIndex) {
                taskAttributesModal.noAttrMessage.then(function (message) {
                    expect(message).toEqual(noAttributesMessage);
                });
            });
        });

        it("When a user sets attributes for task in the 'Set task attributes' modal and press 'Cancel' and opens 'Set task attributes' modal again" +
        " all the attributes should be empty", function () {
                openSetTaskAttributesModal(task_WorkflowFilterTest_a8_M1, function(taskIndex) {
                    setTaskAttributes(2, "5", "8.9", "01/02/2015", 1, "895", "70", "blabla", "33", "blublu");
                    taskAttributesModal.buttonCancel.click();
                    browser.waitForAngular().then(function() {
                        recordHeader.fileTaskListBadge.click();
                        fileTaskList.taskActionsIcon(taskIndex).click();
                        taskActionsDropdown.setAttributesAction(taskIndex).click();

                        expect(taskAttributesModal.userNameAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.custNoAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.custNameAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.formAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.homeTypeAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.locationAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.billingCodeAttr.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute("value")).toEqual("");
                        expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
                    });
                });
            });

        it("When a user sets attributes for task in the 'Set task attributes' modal and press 'Set Attributes' then attributes should be set and task should be on the same step", function () {
            var isChecboxCheched_isAgency;
            var isChecboxCheched_NewAttr;

            openSetTaskAttributesModal(task_SetAttributesTest_a8_M1, function (taskIndex) {
                setTaskAttributes(3, "8", "9.9", "01/03/2015", 2, "456", "80", "Hello", "33", "blabla");
                taskAttributesModal.isAgencyChecked.then(function (isChecked1) {
                    if (isChecked1 == null) {
                        taskAttributesModal.isAgencyAttr.click();
                        isChecboxCheched_isAgency = true;
                    } else {
                        taskAttributesModal.isAgencyAttr.click();
                        isChecboxCheched_isAgency = false;
                    }
                    taskAttributesModal.isNewAttrChecked.then(function (isChecked2) {
                        if (isChecked2 == null) {
                            taskAttributesModal.newAttr.click();
                            isChecboxCheched_NewAttr = true;
                        } else {
                            taskAttributesModal.newAttr.click();
                            isChecboxCheched_NewAttr = false;
                        }
                        taskAttributesModal.buttonSetAttributes.click();

                        recordHeader.fileTaskListBadge.click();
                        expect(fileTaskList.getTaskDetails(taskIndex, 'Step').getText()).toContain(stepManual1);
                        fileTaskList.taskActionsIcon(taskIndex).click();
                        taskActionsDropdown.setAttributesAction(taskIndex).click();
                        //browser.sleep(1000);
                        webdriverUtils.waitTillElementVisible(taskAttributesModal.userNameAttr);
                        taskAttributesModal.userNameAttr.click();
                        expect(taskAttributesModal.userNameDropdownElement(3).getAttribute("class")).toEqual("selected");
                        taskAttributesModal.userNameAttr.click();
                        browser.waitForAngular();
                        expect(taskAttributesModal.custNoAttr.getAttribute("value")).toEqual("8");
                        expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("9.9");
                        expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute("value")).toEqual("01/03/2015");
                        taskAttributesModal.custNameAttr.click();
                        expect(taskAttributesModal.custNameDropdownElement(2).getAttribute("class")).toEqual("selected");
                        taskAttributesModal.custNameAttr.click();
                        expect(taskAttributesModal.formAttr.getAttribute("value")).toEqual("456");
                        expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("80");
                        expect(taskAttributesModal.homeTypeAttr.getAttribute("value")).toEqual("Hello");
                        expect(taskAttributesModal.locationAttr.getAttribute("value")).toEqual("33");
                        expect(taskAttributesModal.billingCodeAttr.getAttribute("value")).toEqual("blabla");

                        if (isChecboxCheched_isAgency) {
                            expect(taskAttributesModal.isAgencyChecked).toBe('true');
                        } else {
                            expect(taskAttributesModal.isAgencyChecked).toBe(null);
                        }
                        if (isChecboxCheched_NewAttr) {
                            expect(taskAttributesModal.isNewAttrChecked).toBe('true');
                        } else {
                            expect(taskAttributesModal.isNewAttrChecked).toBe(null);
                        }
                    });
                });
            });
        });

        it("When a user sets attributes for task and clicks 'Set&Release' button then the task should be moved on the next step of workflow", function () {

            openSetTaskAttributesModal(task_SetAttributesTest_a8_M1, function (taskIndex) {
                setTaskAttributes(2, "77", "4.8", "01/05/2015", 2, "549", "70", "blublu", "37", "blabla");

                taskAttributesModal.buttonSetAndRelease.click();

                recordHeader.fileTaskListBadge.click();
                fileTaskList.findTask(task_SetAttributesTest_a8_M1, function (taskIndex1) {

                    fileTaskList.taskDescription(taskIndex1).then(function (description) {
                        expect(description).toEqual("Task_SetAttributesTest_a8_M1");
                        fileTaskList.getTaskDetails(taskIndex1, "Flow").then(function (flow) {
                            expect(flow).toEqual("SimpleWorkFlow1");
                        });
                        fileTaskList.getTaskDetails(taskIndex1, "Step").then(function (step) {
                            expect(step).toEqual(stepManual2);
                            tasksUtils.routeTask(task_SetAttributesTest_a8_M1, simpleWorkFlow1, stepManual1);
                        });
                    });
                });
            });
        });
    }
});