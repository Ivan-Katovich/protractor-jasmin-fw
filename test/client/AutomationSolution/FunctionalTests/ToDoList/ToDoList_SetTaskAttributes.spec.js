exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var DatepickerPopup = require('./../../pageObjects/Containers/DatepickerPopup.js');
var datepickerPopup = new DatepickerPopup("attributes");

var SetTaskAttributesModal = require('./../../pageObjects/ModalDialogs/SetTaskAttributesModal.js');
var taskAttributesModal = new SetTaskAttributesModal();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');

var noAttributesMessage = "NO ATTRIBUTES ARE ASSOCIATED WITH THIS STEP";
var maxStringValue = 'longstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlong!';
var invalidMaxIntMessage = "* Value should be less or equal than 2147483647";
var invalidMinIntMessage = "* Value should be greater or equal than -2147483648";
var invalidValueTypeMessage = "* Invalid value type";
var invalidMinFloatMsg_spinedit = "* Value should be greater or equal than 0";
var invalidMinFloatMsg_textbox = "* Value should be greater or equal than -1000000000";
var invalidMaxFloatMsg_spinedit = "* Value should be less or equal than 100";
var invalidMaxFloatMsg_textbox = "* Value should be less or equal than 1000000000";
var monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

var task_WorkflowFilterTest_a8_M1 = 'Task_WorkflowFilterTest_a8_M1';
var task_WorkflowFilterTest_a8_M4 = 'Task_WorkflowFilterTest_a8_M4';
var task_SetAttributesTest_a8_M1 = 'Task_SetAttributesTest_a8_M1';
var task_SetReleaseOnMultiStep = 'Task_SetReleaseOnMultiStep';
var simpleWorkFlow1 = 'SimpleWorkFlow1';
var stepManual1 = 'Manual 1';
var stepManual2 = 'Manual 2';
var stepManual4 = 'Manual 4';
var wfSetTaskAttributes = 'WFSetTaskAttributes';

function openSetTaskAttributesModal(flow, step, task, ifAllFlowsCheckboxShouldBeChecked, fn) {
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
    .then(taskActionsDropdown.setAttributesAction.click)
    .then(function () {
        taskAttributesModal.taskDescription.then(function (description) {
            fn(0);
        });
    });
}

function setTaskAttributes(userNameIndex, custNo, billAmount, dateOfBill, custNameIndex, formAttr, customerNo, homeType, location, billingCode) {
    webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
    webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(userNameIndex));
    taskAttributesModal.custNoAttr.clear();
    taskAttributesModal.custNoAttr.sendKeys(custNo);
    taskAttributesModal.customerBillAmountAttr.clear();
    taskAttributesModal.customerBillAmountAttr.sendKeys(billAmount);
    taskAttributesModal.dateOfBillAttr_Input.clear();
    taskAttributesModal.dateOfBillAttr_Input.sendKeys(dateOfBill);
    webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
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

function setRequiredAttributes(userNameIndex, custNo) {
    webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
    webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(userNameIndex));
    taskAttributesModal.custNoAttr.clear();
    taskAttributesModal.custNoAttr.sendKeys(custNo);
}

describe("To Do List - Set Task Attributes", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function (done) {
            tasksUtils.deleteAllTaskAttributes(task_WorkflowFilterTest_a8_M1);
            tasksUtils.deleteAllTaskAttributes(task_SetReleaseOnMultiStep);
            tasksUtils.routeTask(task_WorkflowFilterTest_a8_M1, simpleWorkFlow1, stepManual1);
            tasksUtils.routeTask(task_WorkflowFilterTest_a8_M4, simpleWorkFlow1, stepManual4);
            tasksUtils.routeTask(task_SetAttributesTest_a8_M1, simpleWorkFlow1, stepManual1);
            tasksUtils.routeTask(task_SetReleaseOnMultiStep, wfSetTaskAttributes, stepManual1);
            done();
        });

        beforeEach(function (done) {
            tasksUtils.deleteAllTaskAttributes(task_SetAttributesTest_a8_M1);
            tasksUtils.routeTask(task_SetAttributesTest_a8_M1, simpleWorkFlow1, stepManual1);
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                webdriverUtils.clickOnElement(toDoList.dateFilter('ALL')).then(function () {
                    webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter);
                        browser.waitForAngular();
                        done();
                    });
                });
            });
        });

        it("1-integer attribute field should ignore any non-numeric characters (other than initial dash)", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
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

        it("2-integer attribute field should allow up to 10 digits to be entered and ignore keystrokes after", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.customerNoAttr.sendKeys("001100110022222");
                expect(taskAttributesModal.customerNoAttr.getAttribute('value')).toEqual("0011001100");

                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.customerNoAttr.sendKeys("-11001100112222");
                expect(taskAttributesModal.customerNoAttr.getAttribute('value')).toEqual("-1100110011");
            });
        });

        it("3-when data entered into the Int attribute greater than max value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

                taskAttributesModal.customerBillAmountAttr.sendKeys("0"); //set req field
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys("100");
                taskAttributesModal.billingCodeAttr.click(); //workaround for IE
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys('101');
                taskAttributesModal.billingCodeAttr.click(); //workaround for IE
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                //expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMaxFloatMsg_spinedit);
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.locationAttr.sendKeys("0");

            });
        });

        it("4-when data entered into the Int attribute less than min value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

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

        it("5-when data entered into the Float attribute less than minimum value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

                taskAttributesModal.customerBillAmountAttr.sendKeys("0");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys('-0.01');
                taskAttributesModal.billingCodeAttr.click(); //workaround for IE
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
                taskAttributesModal.billingCodeAttr.click(); //workaround for IE
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMinFloatMsg_textbox);

            });
        });

        it("6-when data entered into the Float attribute greater than max value the 'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

                taskAttributesModal.customerBillAmountAttr.sendKeys("100.00");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys('100.01');
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
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');
                //expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMaxFloatMsg_textbox);

            });
        });

        it("7-float attribute fields should ignore any characters past the first 14", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);
                taskAttributesModal.customerBillAmountAttr.sendKeys("0000000000000.01");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("0000000000000.0");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);
            });
        });

        it("8-Float attribute field should only allow one dash in the field and it must be the first character", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {

                taskAttributesModal.customerBillAmountAttr.clear();
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

        it("9-Float attribute field should ignore any non-numeric characters (other than initial dash and one decimal)", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                taskAttributesModal.customerBillAmountAttr.clear();
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

        it("10-When only a dash (-) is entered into an integer or float attribute field, only after defocusing the field should the user see a validation error", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {

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

        it("11-when a user opens the 'Set task attributes' modal for task with empty attributes all attributes should be displayed " +
        " the buttons 'Set&Release' and 'Set Attribute' should be disabled task should be locked", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
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

        it("12-when a user opens the 'Set task attributes' modal attributes should be ordered by required attributes, then alphabetical by display name", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
                //Get lists of required attributes and not required attributes
                taskAttributesModal.attributeGroups.then(function (items) {
                    var promisesReq = [];
                    var promises = [];
                    for (var i = 0; i < items.length; i++) {
                        if (i < 2) {
                            promisesReq.push(items[i].getText());
                            expect(items[i].element(by.css("[id^='attr']")).getAttribute("required")).toBe('true');
                        } else {
                            promises.push(items[i].getText());
                            expect(items[i].element(by.css("[id^='attr']")).getAttribute("required")).toBe(null);
                        }
                    }
                    Q.all(promises).done(function (attrArray) {
                        expect(conversionUtils.isArraySortedAscending(attrArray)).toBe(true); //verify if required attributes are sorted
                    });
                    Q.all(promisesReq).done(function (attrArray) {
                        expect(conversionUtils.isArraySortedAscending(attrArray)).toBe(true); //verify if not required attributes are sorted
                    });
                });
            });
        });

        it("13-'Set Attributes' and 'Set&Release' buttons should be disabled and the appropriate error message should be displayed when a user enters data of incorrect type" +
           " in the mandatory fields of the 'Set task attributes' modal", function () {

               openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
                   //Verify that 'Set Attributes' and 'Set&Release' buttons are disabled
                   expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                   expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
                   //Fill in  required attributes by correct value
                   webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                   webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(1));
                   taskAttributesModal.custNoAttr.sendKeys("3").then(function () {

                       taskAttributesModal.billingCodeAttr.click(); //workaround for IE

                       //Verify that 'Set Attributes' and 'Set&Release' buttons are enabled
                       expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual(null);
                       expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                       //Fill in  required attribute by incorrect value
                       taskAttributesModal.custNoAttr.clear().then(function () {
                           taskAttributesModal.custNoAttr.sendKeys(".").then(function () {
                               //Verify that 'Set Attributes' and 'Set&Release' buttons are disabled
                               expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                               expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
                               //Verify that appropriate error message is disabled
                               //commented because behavior has been changed
                               //expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidValueTypeMessage);
                           });
                       });
                   });
               });
           });

        it("14-'Set Attributes' and 'Set&Release' buttons should be disabled if all or some mandatory fields are not filled in", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
                taskAttributesModal.getClassOfUserNameAttr.then(function (classAttr) {
                    //Verify required attributes
                    expect(classAttr).toContain("field-required");
                    expect(taskAttributesModal.custNoAttr.getAttribute('class')).toContain("field-required");
                    //Verify that 'Set Attributes' and 'Set&Release' buttons are disabled
                    expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                    expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
                    //Fill in one of the required attributes 
                    webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                    webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(1));
                    //Verify that 'Set Attributes' and 'Set&Release' buttons are disabled
                    expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
                    expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                    //Fill in the last required attribute 
                    taskAttributesModal.custNoAttr.sendKeys("4");
                    taskAttributesModal.billingCodeAttr.click(); //workaround for IE
                    //Verify that 'Set Attributes' and 'Set&Release' buttons are enabled
                    expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                    expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual(null);
                });
            });
        });

        it("15-when a user enters string into the mandatory Intager attribute and then moves focus the entered string should disappear the 'Set Attributes' and 'Set&Release' buttons should be disabled", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {

                webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(1));
                expect(taskAttributesModal.custNoAttr.getAttribute('class')).toContain("field-required");
                taskAttributesModal.custNoAttr.sendKeys("just string");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');

                taskAttributesModal.formAttr.click();
                expect(taskAttributesModal.custNoAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
            });
        });

        it("16-'Set task attributes' modal should display a message when no attributes are associated with workflow step for task", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual4, task_WorkflowFilterTest_a8_M4, true, function (descriptionIndex) {
                taskAttributesModal.noAttrMessage.then(function (message) {
                    expect(message).toEqual(noAttributesMessage);
                });
            });
        });

        it("17-When a user sets attributes for task in the 'Set task attributes' modal and press 'Cancel' and opens 'Set task attributes' modal again" +
        " all the attributes should be empty", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
                setTaskAttributes(2, "5", "8.9", "01/02/2015", 1, "895", "70", "blabla", "33", "blublu");
                taskAttributesModal.buttonCancel.click();

                browser.waitForAngular();
                toDoList.hoverMouseOnTask(task_WorkflowFilterTest_a8_M1);
                toDoList.clickCog();
                taskActionsDropdown.setAttributesAction.click()

                expect(taskAttributesModal.userNameAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.custNoAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.custNameAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.formAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.homeTypeAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.locationAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.billingCodeAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');
            });
        });

        it("18-When a user sets attributes for task in the 'Set task attributes' modal and don't click 'Set&Release' button and press 'Set Attributes' " +
           "the task should be left on the same step of workflow", function () {
               openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                   setTaskAttributes(2, "99", "4.5", "01/02/2015", 1, "555", "707", "blabla", "33", "blublu");
                   taskAttributesModal.buttonSetAttributes.click();

                   browser.waitForAngular();
                   toDoList.taskDetailsExpander(descriptionIndex).click();
                   browser.waitForAngular();
                   toDoList.taskDescription(descriptionIndex).getText().then(function (description) {
                       expect(description).toEqual(task_SetAttributesTest_a8_M1);
                       toDoList.getTaskDetails(descriptionIndex, "Flow").getText().then(function (flow) {
                           expect(flow).toEqual(simpleWorkFlow1);
                       });
                       toDoList.getTaskDetails(descriptionIndex, "Step").getText().then(function (step) {
                           expect(step).toEqual(stepManual1);
                       });
                   });
               });
           });

        it("19-When a user sets attributes for task in the 'Set task attributes' modal and press 'Set Attributes' and opens 'Set task attributes' modal for the same task again" +
      " all the attributes should persist", function () {
          var isChecboxCheched_isAgency;
          var isChecboxCheched_NewAttr;

          openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
              setTaskAttributes(3, "8", "9.9", "09/09/2015", 2, "456", "80", "Hello", "33", "blabla");
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

                      browser.waitForAngular();
                      toDoList.hoverMouseOnTask(task_SetAttributesTest_a8_M1);
                      toDoList.clickCog();
                      taskActionsDropdown.setAttributesAction.click()
                      browser.waitForAngular();
                      webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                      expect(taskAttributesModal.userNameDropdownElement(3).getAttribute("class")).toEqual("selected");
                      webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                      browser.waitForAngular();
                      expect(taskAttributesModal.custNoAttr.getAttribute("value")).toEqual("8");
                      expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("9.9");
                      expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute("value")).toEqual("09/09/2015");
                      webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                      expect(taskAttributesModal.custNameDropdownElement(2).getAttribute("class")).toEqual("selected");
                      webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
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


        it("20-'Set task attributes' modal should have attributes of Integer type and integer values are increased and decreased within the maximum and minimum values", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.customerNoAttr.sendKeys("4545");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);

                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.customerNoAttr.sendKeys("1");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);

                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.customerNoAttr.sendKeys("2147483647");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
            });
        });


        it("21-When a user attempts to enter a value which increases the maximum or decreases the minimum for attribute of Integer type the 'Set Attributes' and 'Set&Release' buttons should be disabled" +
           " and the appropriate error message should be displayed", function () {
               openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                   setRequiredAttributes(2, 5);

                   taskAttributesModal.customerNoAttr.clear();
                   taskAttributesModal.customerNoAttr.sendKeys("0");
                   expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                   expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual(null);

                   taskAttributesModal.customerNoAttr.clear();
                   taskAttributesModal.customerNoAttr.sendKeys("2147483647");
                   expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                   expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual(null);

                   taskAttributesModal.customerNoAttr.clear();
                   taskAttributesModal.customerNoAttr.sendKeys("2147483648");
                   expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                   expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                   expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMaxIntMessage);

                   taskAttributesModal.customerNoAttr.clear();
                   taskAttributesModal.customerNoAttr.sendKeys("-2147483648");
                   expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                   expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual(null);

                   taskAttributesModal.customerNoAttr.clear();
                   taskAttributesModal.customerNoAttr.sendKeys("-2147483649");
                   taskAttributesModal.billingCodeAttr.click(); //workaround for IE
                   expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                   expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                   expect(taskAttributesModal.invalidTypeMessage).toEqual(invalidMinIntMessage);
               });
           });
        it("25-when a user tries to enter data of float type for attributes of Integer type it should allow to enter only numbers without signs (as integer value)", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

                taskAttributesModal.formAttr.sendKeys("5.3");
                expect(taskAttributesModal.formAttr.getAttribute("value")).toEqual('53');
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);
            });
        });

        it("26-when a user changes correct attribute of Integer type as a spineditor to a string and press 'Set Attributes' then opens 'Set task attributes' modal for the same task again" +
       " the Integer attribute should be empty", function () {

           openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
               setRequiredAttributes(2, 5);

               taskAttributesModal.locationAttr.sendKeys("45");
               taskAttributesModal.buttonSetAttributes.click();

               browser.waitForAngular();

               toDoList.hoverMouseOnTask(task_SetAttributesTest_a8_M1);
               toDoList.clickCog();
               taskActionsDropdown.setAttributesAction.click();

               expect(taskAttributesModal.locationAttr.getAttribute('value')).toEqual("45");

               taskAttributesModal.locationAttr.clear();
               taskAttributesModal.locationAttr.sendKeys("string string");
               taskAttributesModal.buttonSetAttributes.click();

               browser.waitForAngular();

               toDoList.hoverMouseOnTask(task_SetAttributesTest_a8_M1);
               toDoList.clickCog();
               taskActionsDropdown.setAttributesAction.click();

               expect(taskAttributesModal.locationAttr.getAttribute('value')).toEqual("");
           });
       });


        it("27-When a user sets attributes for task with a single link step and clicks 'Set&Release' button " +
        "the task should be moved on the next step of workflow and attributes should persist", function () {

            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setTaskAttributes(2, "77", "4.8", "01/05/2015", 2, "549", "70", "blublu", "37", "blabla");

                taskAttributesModal.buttonSetAndRelease.click();

                browser.waitForAngular();
                toDoList.taskDescription(descriptionIndex).getText().then(function (description) {
                    expect(description).toEqual(task_SetAttributesTest_a8_M1);
                    toDoList.getTaskDetails(descriptionIndex, "Flow").getText().then(function (flow) {
                        expect(flow).toEqual(simpleWorkFlow1);
                    });
                    toDoList.getTaskDetails(descriptionIndex, "Step").getText().then(function (step) {
                        expect(step).toEqual(stepManual2);

                        toDoList.hoverMouseOnTask(task_SetAttributesTest_a8_M1);
                        toDoList.clickCog();
                        taskActionsDropdown.setAttributesAction.click();

                        webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                        expect(taskAttributesModal.custNameDropdownElement(2).getAttribute("class")).toEqual("selected");
                        webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                        expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("70");
                        expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("4.8");
                    });
                });
            });
        });

        it("28-When a user sets attributes for a task with a multi link step the 'Next step' dropdown with selectable values should be displayed", function () {
            openSetTaskAttributesModal(wfSetTaskAttributes, stepManual1, task_SetReleaseOnMultiStep, true, function (descriptionIndex) {
                expect(taskAttributesModal.nextStepDropdown.isPresent()).toBe(true);
                webdriverUtils.clickOnElement(taskAttributesModal.nextStepDropdown);

                taskAttributesModal.nextStepDropdownElement(1).getText().then(function (dropdownText1) {
                    webdriverUtils.clickOnElement(taskAttributesModal.nextStepDropdownElement(1));
                    taskAttributesModal.nextStepDropdown.getAttribute('title').then(function (stepName1) {
                        expect(stepName1).toEqual(dropdownText1);

                        webdriverUtils.clickOnElement(taskAttributesModal.nextStepDropdown);
                        taskAttributesModal.nextStepDropdownElement(2).getText().then(function (dropdownText2) {
                            webdriverUtils.clickOnElement(taskAttributesModal.nextStepDropdownElement(2));
                            taskAttributesModal.nextStepDropdown.getAttribute('title').then(function (stepName2) {
                                expect(stepName2).toEqual(dropdownText2);
                            });
                        });
                    });
                });
            });
        });


        it("29-When a user sets attributes choses a step for a task with a multi link step and clicks 'Set&Release' button " +
          "the task should be moved on this step of workflow and the attributes should persist", function () {
              openSetTaskAttributesModal(wfSetTaskAttributes, stepManual1, task_SetReleaseOnMultiStep, true, function (descriptionIndex) {
                  expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');
                  expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toEqual('true');

                  taskAttributesModal.getClassOfUserNameAttr.then(function (classAttr) {
                      expect(classAttr).toContain("field-required");
                      webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                      webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(1));
                      taskAttributesModal.homeTypeAttr.sendKeys("attr attr");

                      expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                      expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toEqual('true');

                      webdriverUtils.clickOnElement(taskAttributesModal.nextStepDropdown);
                      webdriverUtils.clickOnElement(taskAttributesModal.nextStepDropdownElement(1));
                      expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);
                      expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);

                      taskAttributesModal.buttonSetAndRelease.click();

                      browser.waitForAngular();
                      toDoList.taskDescription(descriptionIndex).getText().then(function (description) {
                          expect(description).toEqual(task_SetReleaseOnMultiStep);
                          toDoList.getTaskDetails(descriptionIndex, "Flow").getText().then(function (flow) {
                              expect(flow).toEqual(wfSetTaskAttributes);
                          });
                          toDoList.getTaskDetails(descriptionIndex, "Step").getText().then(function (step) {
                              expect(step).toEqual(stepManual2);

                              toDoList.hoverMouseOnTask(task_SetReleaseOnMultiStep);
                              toDoList.clickCog();
                              taskActionsDropdown.setAttributesAction.click();

                              webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                              expect(taskAttributesModal.userNameDropdownElement(1).getAttribute("class")).toEqual("selected");
                              webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                              expect(taskAttributesModal.homeTypeAttr.getAttribute("value")).toEqual("attr attr");
                          });
                      });
                  });
              });
          });

        it("30-should have a string attribute as a dropdown with selectable values", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                taskAttributesModal.userNameDropdownElement(2).getText().then(function (dropdownText1) {
                    webdriverUtils.clickOnElement(taskAttributesModal.userNameDropdownElement(2));
                    taskAttributesModal.userNameAttr.getAttribute('title').then(function (fieldText1) {
                        expect(dropdownText1).toEqual(fieldText1);
                    });
                });

                webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                taskAttributesModal.custNameDropdownElement(3).getText().then(function (dropdownText2) {
                    webdriverUtils.clickOnElement(taskAttributesModal.custNameDropdownElement(3));
                    taskAttributesModal.custNameAttr.getAttribute('title').then(function (fieldText2) {
                        expect(dropdownText2).toEqual(fieldText2);
                    });
                });
            });
        });

        it("31-string attribute as a TextBox should allow to contain not more than 255 characters", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                taskAttributesModal.homeTypeAttr.clear();
                taskAttributesModal.homeTypeAttr.sendKeys(maxStringValue);
                taskAttributesModal.homeTypeAttr.sendKeys("additional_string");
                expect(taskAttributesModal.homeTypeAttr.getAttribute('value')).toEqual(maxStringValue);
            });
        });

        /* todo; */
        xit("32-after date selection should display a correct date in mm/dd/yyyy", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 2);
                taskAttributesModal.datepicker_Icon.click();

                var dateObj = new Date();
                dateObj.setDate(dateObj.getDate() + 1);
                var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();

                // To avoid test failing in the end of month
                if (new Date().getDate() >= 29) {
                    dateObj.setDate(15);
                    date = 15;
                    datepickerPopup.rightRowButton.click();
                }

                //var date = (new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate();
                datepickerPopup.clickDateButton(date.toString(), browser);
                browser.driver.wait(function () {
                    return datepickerPopup.datepickerContainer.isPresent().then(function (element) {
                        return element === false;
                    });
                }).then(function () {
                    expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                });
            });
        });

        /* todo; */
        xit("33-after month selection in the datepicker the date attribute should display a correct date in mm/dd/yyyy format", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                taskAttributesModal.datepicker_Icon.click();
                datepickerPopup.leftRowButton.click();

                var dateObj = new Date();
                var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();

                // To avoid test failing in February or when date equal 31
                if (dateObj.getDate() > 27) {
                    dateObj.setDate(15);
                    date = 15;
                }
                // To avoid test failing in January 
                if (dateObj.getMonth() == 0) {
                    dateObj.setYear(new Date().getFullYear() - 1);
                }
                dateObj.setMonth(new Date().getMonth() - 1);

                datepickerPopup.clickDateButton(date.toString(), browser);
                browser.driver.wait(function () {
                    return datepickerPopup.datepickerContainer.isPresent().then(function (element) {
                        return element === false;
                    });
                }).then(function () {
                    expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                    taskAttributesModal.datepicker_Icon.click();
                    datepickerPopup.rightRowButton.click();
                    datepickerPopup.rightRowButton.click();
                    dateObj.setMonth(new Date().getMonth() + 1);
                    datepickerPopup.clickDateButton(date.toString(), browser);
                    browser.driver.wait(function () {
                        return datepickerPopup.datepickerContainer.isPresent().then(function (element) {
                            return element === false;
                        });
                    }).then(function () {
                        expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                    });
                });
            });
        });

        it("34-after date typing and new date selection in the datepicker the date attribute should display a correct date in mm/dd/yyyy format", function (done) {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                var dateObj = new Date();
                var todayDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();

                dateObj.setYear(2001);
                dateObj.setDate(17);

                taskAttributesModal.dateOfBillAttr_Input.sendKeys(conversionUtils.getDate(dateObj));
                taskAttributesModal.datepicker_Icon.click();

                dateObj.setDate(todayDate.toString());
                // To avoid test failing in the end of month
                if (dateObj.getDate() >= 25) {
                    dateObj.setDate(15);
                    todayDate = 15;
                }
                datepickerPopup.clickDateButton(todayDate.toString(), browser);


                browser.driver.wait(function () {
                    return datepickerPopup.datepickerContainer.isPresent().then(function (element) {
                        return element === false;
                    });
                }).then(function () {
                    expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                    done();
                });
            });
        });

        it("35-when a string is entered into the date attribute the 'Set Attributes' and 'Set&Release' buttons should be disabled", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

                taskAttributesModal.dateOfBillAttr_Input.sendKeys("blablabla");
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe('true');
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe('true');

                taskAttributesModal.dateOfBillAttr_Input.clear();
                expect(taskAttributesModal.buttonSetAttributes.getAttribute('disabled')).toBe(null);
                expect(taskAttributesModal.buttonSetAndRelease.getAttribute('disabled')).toBe(null);
            });
        });

        it("36-the datepicker should display a correct month and year inside of Month/Year button after date typing in the date attribute", function (done) {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setRequiredAttributes(2, 5);

                var dateObj = new Date();
                dateObj.setYear(2008);
                dateObj.setMonth(new Date().getMonth() - 1);
                dateObj.setDate(10);

                taskAttributesModal.dateOfBillAttr_Input.sendKeys(conversionUtils.getDate(dateObj));
                taskAttributesModal.datepicker_Icon.click();
                datepickerPopup.getMonth.then(function (month) {
                    expect(month.toLowerCase()).toEqual(monthNames[dateObj.getMonth()] + " 2008");
                    done();
                });
            });
        });

        it("44-float attribute rounds entered value as 2 digits in a decimal part", function () {
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.customerBillAmountAttr.sendKeys("45.456");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute('value')).toEqual("45.46");

                taskAttributesModal.vehicleNameAttr.clear();
                taskAttributesModal.vehicleNameAttr.sendKeys("12.123");
                expect(taskAttributesModal.vehicleNameAttr.getAttribute('value')).toEqual("12.12");
            });
        });

        it("45-When a user sets attributes for task in the 'Set task attributes' modal and then clears them all the attributes should be empty", function () {
            tasksUtils.deleteAllTaskAttributes(task_WorkflowFilterTest_a8_M1);
            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_WorkflowFilterTest_a8_M1, true, function (descriptionIndex) {
                setTaskAttributes(3, "8", "9.9", "09/09/2015", 2, "456", "80", "Hello", "33", "blabla");
                taskAttributesModal.buttonSetAttributes.click();
                browser.waitForAngular();
                toDoList.hoverMouseOnTask(task_WorkflowFilterTest_a8_M1);
                toDoList.clickCog();
                taskActionsDropdown.setAttributesAction.click();

                webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                expect(taskAttributesModal.userNameDropdownElement(3).getAttribute("class")).toEqual("selected");
                webdriverUtils.clickOnElement(taskAttributesModal.userNameAttr);
                browser.waitForAngular();
                expect(taskAttributesModal.custNoAttr.getAttribute("value")).toEqual("8");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("9.9");
                expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute("value")).toEqual("09/09/2015");
                webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                expect(taskAttributesModal.custNameDropdownElement(2).getAttribute("class")).toEqual("selected");
                webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                expect(taskAttributesModal.formAttr.getAttribute("value")).toEqual("456");
                expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("80");
                expect(taskAttributesModal.homeTypeAttr.getAttribute("value")).toEqual("Hello");
                expect(taskAttributesModal.locationAttr.getAttribute("value")).toEqual("33");
                expect(taskAttributesModal.billingCodeAttr.getAttribute("value")).toEqual("blabla");

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.dateOfBillAttr_Input.clear();
                taskAttributesModal.formAttr.clear();
                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.homeTypeAttr.clear();
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.billingCodeAttr.clear();
                taskAttributesModal.buttonSetAttributes.click();
                browser.waitForAngular();

                browser.waitForAngular();
                toDoList.hoverMouseOnTask(task_WorkflowFilterTest_a8_M1);
                toDoList.clickCog();
                taskActionsDropdown.setAttributesAction.click();

                expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.dateOfBillAttr_Input.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.formAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.homeTypeAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.locationAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.billingCodeAttr.getAttribute("value")).toEqual("");
            });
        });

        it("46-When a user sets attributes for task with a single link step then clears them and clicks 'Set&Release' button " +
        "the task should be moved on the next step and attributes should be empty", function () {

            openSetTaskAttributesModal(simpleWorkFlow1, stepManual1, task_SetAttributesTest_a8_M1, true, function (descriptionIndex) {
                setTaskAttributes(2, "77", "4.8", "09/09/2015", 2, "549", "70", "blublu", "37", "blabla");
                taskAttributesModal.buttonSetAttributes.click();

                browser.waitForAngular();
                toDoList.hoverMouseOnTask(task_SetAttributesTest_a8_M1);
                toDoList.clickCog();
                taskActionsDropdown.setAttributesAction.click();

                taskAttributesModal.customerBillAmountAttr.clear();
                taskAttributesModal.dateOfBillAttr_Input.clear();
                taskAttributesModal.formAttr.clear();
                taskAttributesModal.customerNoAttr.clear();
                taskAttributesModal.homeTypeAttr.clear();
                taskAttributesModal.locationAttr.clear();
                taskAttributesModal.billingCodeAttr.clear();
                taskAttributesModal.buttonSetAndRelease.click();
                browser.waitForAngular();
                expect(toDoList.taskDescription(descriptionIndex).getText()).toEqual(task_SetAttributesTest_a8_M1);
                expect(toDoList.getTaskDetails(descriptionIndex, "Flow").getText()).toEqual(simpleWorkFlow1);
                expect(toDoList.getTaskDetails(descriptionIndex, "Step").getText()).toEqual(stepManual2);

                toDoList.hoverMouseOnTask(task_SetAttributesTest_a8_M1);
                toDoList.clickCog();
                taskActionsDropdown.setAttributesAction.click();

                webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                expect(taskAttributesModal.custNameDropdownElement(2).getAttribute("class")).toEqual("selected");
                webdriverUtils.clickOnElement(taskAttributesModal.custNameAttr);
                expect(taskAttributesModal.customerNoAttr.getAttribute("value")).toEqual("");
                expect(taskAttributesModal.customerBillAmountAttr.getAttribute("value")).toEqual("");
            });
        });
    }
});