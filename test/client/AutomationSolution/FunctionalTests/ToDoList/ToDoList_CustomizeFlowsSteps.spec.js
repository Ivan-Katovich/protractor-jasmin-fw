exports.tags = ['Workflow_Settings', 'To_Do_List_Filters'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('../../pageObjects/SearchPage.js');
var irSearchPage = new SearchPage();

var Q = require('q');
var tasksUtils = require('../../utils/tasksUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var noTasksInFooter = '';
var noTasksMessage = 'You have no items.';

var simpleFlow1 = 'SimpleWorkFlow1';
var simpleFlow3 = 'SimpleWorkFlow3';
var stepMan1 = 'Manual 1';
var stepMan2 = 'Manual 2';
var stepMan3 = 'Manual 3';
var stepMan4 = 'Manual 4';
var stepMan5 = 'Manual 5';


function checkWorkflow(workflowArray, workflowName) {
    var index = -1;
    for (var i = 0; i < workflowArray.length; i++) {
        if (workflowArray[i].toLowerCase().indexOf(workflowName.toLowerCase()) > -1) {
            index = i;
            break;
        }
    }
    return index;
}

function checkTask(taskDescription) {
    toDoList.searchInput.clear().then(function () {
        toDoList.searchInput.sendKeys(taskDescription).then(function () {
            expect(toDoList.taskDescription(0).getText()).toEqual(taskDescription);
        });
    });
}


describe("To Do List - Customize flow / steps: ", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    webdriverUtils.clickOnElement(toDoList.dateFilter('ALL')).then(function () {
                        webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                            webdriverUtils.clickOnElement(toDoList.settingsFilter);
                        });
                    });
                });
            });
        });

        it("1-filter icon should change when filters are set", function (done) {
            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () { //Open flowFilter
                expect(toDoList.isFlowFilterSet).not.toEqual("dropdown-toggle has-checked");
                webdriverUtils.clickOnElement(toDoList.allFlowsCheckbox).then(function () { //uncheck All Flows checkbox
                    expect(toDoList.isFlowFilterSet).not.toEqual("dropdown-toggle has-checked");
                    webdriverUtils.clickOnElement(toDoList.flow(0)).then(function () {
                        expect(toDoList.flowCheckbox(0).getAttribute('checked')).toEqual('true');
                        expect(toDoList.isFlowFilterSet).toEqual("dropdown-toggle has-checked");
                        done();
                    });
                });
            });
        });


        it("2-filter icon should open a list of workflows and steps available to the user", function (done) {
            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                toDoList.flows.count().then(function (count1) {
                    expect(count1).toEqual(9);

                    //Get list of workflows 
                    var promises1 = [];
                    for (var i = 0; i < count1; i++) {
                        promises1.push(toDoList.flow(i).getText());
                    }
                    Q.all(promises1).done(function (workflowArray) {
                        //verify that all workflows are displayed
                        var flowIndex = checkWorkflow(workflowArray, 'SimpleWorkFlow1');
                        expect(flowIndex).toBeGreaterThan(-1);
                        expect(checkWorkflow(workflowArray, "Nandan'sWorkFlow")).toBeGreaterThan(-1);
                        expect(checkWorkflow(workflowArray, 'SimpleWorkFlow3')).toBeGreaterThan(-1);
                        expect(checkWorkflow(workflowArray, 'SimpleWorkFlow444444444444444444444444444444444444444444444444444444444')).toBeGreaterThan(-1);
                        expect(checkWorkflow(workflowArray, 'WF')).toBeGreaterThan(-1);
                        expect(checkWorkflow(workflowArray, 'WFRelease')).toBeGreaterThan(-1);
                        expect(checkWorkflow(workflowArray, 'WFSetTaskAttributes')).toBeGreaterThan(-1);
                        expect(checkWorkflow(workflowArray, 'Jamies Workflow Test')).toBeGreaterThan(-1);

                        toDoList.expandFlow(flowIndex);
                        toDoList.allStepsInFlow(flowIndex).count().then(function (count2) {
                            expect(count2).toEqual(5);
                            //Get list of steps in the workflow
                            var promises2 = [];
                            for (var i = 0; i < count2; i++) {
                                promises2.push(toDoList.stepInFlow(flowIndex, i).getText());
                            }
                            Q.all(promises2).done(function (stepsArray) {
                                //verify that all steps are displayed
                                expect(checkWorkflow(stepsArray, stepMan1)).toBeGreaterThan(-1);
                                expect(checkWorkflow(stepsArray, stepMan2)).toBeGreaterThan(-1);
                                expect(checkWorkflow(stepsArray, stepMan3)).toBeGreaterThan(-1);
                                expect(checkWorkflow(stepsArray, stepMan4)).toBeGreaterThan(-1);
                                expect(checkWorkflow(stepsArray, stepMan5)).toBeGreaterThan(-1);
                                done();
                            });
                        });
                    });
                });
            });
        });

        it("3-By default 'All Flows' filter is checked and all checkboxes in the dropdown are checked and tasks from all flows/Steps available to the user are displayed", function (done) {
            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {        //Open flowFilter
                expect(toDoList.isAllFlowsCheckboxChecked).toBe('true');

                //verify that all checkboxes of the workflows are checked
                toDoList.flows.count().then(function (count1) {
                    for (var i = 0; i < count1; i++) {
                        expect(toDoList.flowCheckbox(i).getAttribute('checked')).toEqual('true');
                    }
                });
                webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Close flowFilter
                    //verify that all tasks from the all workflows are displayed
                    toDoList.searchInput.sendKeys('FilterTest').then(function () {
                        checkTask("Task_WorkflowFilterTest_N2_M1");
                        checkTask("Task_WorkflowFilterTest_a8_M1");
                        checkTask("Task_WorkflowFilterTest_N2_M3");
                        checkTask("Task_WorkflowFilterTest_a8_M4");
                        checkTask("Task_WorkflowFilterTest_anotherFlow");
                        checkTask("FilterTesting_Today");
                        done();
                    });
                });
            });
        });

        it("4-should return 'no tasks message' in To Do List when nothing is checked in the filter list dropdown", function (done) {
            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                webdriverUtils.clickOnElement(toDoList.allFlowsCheckbox).then(function () { //uncheck All Flows checkbox
                    //verify that all checkboxes of the workflows are unchecked
                    toDoList.flows.count().then(function (count) {
                        for (var i = 0; i < count; i++) {
                            expect(toDoList.flowCheckbox(i).getAttribute('checked')).toBe(null);
                        }
                    });
                    webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Close flowFilter
                        expect(toDoList.tasks.length).not.toBeDefined();
                        expect(toDoList.noTasksMessageDisplayed.getText()).toEqual(noTasksMessage);
                        done();
                    });
                });
            });
        });

        it("5-filter by a flow and all steps should display all tasks from all steps of the selected flow available to the user", function (done) {
            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                webdriverUtils.clickOnElement(toDoList.allFlowsCheckbox).then(function () { //uncheck All Flows checkbox
                    toDoList.flows.count().then(function (count1) {
                        //Get list of workflows 
                        var promises1 = [];
                        for (var i = 0; i < count1; i++) {
                            promises1.push(toDoList.flow(i).getText());
                        }
                        Q.all(promises1).done(function (workflowArray) {
                            var flowIndex = checkWorkflow(workflowArray, simpleFlow1);
                            expect(flowIndex).toBeGreaterThan(-1);
                            webdriverUtils.clickOnElement(toDoList.flow(flowIndex)).then(function () {
                                webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Close flowFilter

                                    //Get list of tasks
                                    toDoList.searchInput.sendKeys('Task_WorkflowFilterTest').then(function () {
                                        toDoList.tasks.count().then(function (count2) {
                                            expect(count2).toBeGreaterThan(0);
                                            var promises3 = [];
                                            for (var i = 0; i < count2; i++) {
                                                promises3.push(toDoList.taskDescription(i).getText());
                                            }
                                            //verify that appropriate tasks are displayed
                                            Q.all(promises3).done(function (descriptionArray) {
                                                expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_N2_M1")).toBeGreaterThan(-1);
                                                expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_a8_M1")).toBeGreaterThan(-1);
                                                expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_N2_M3")).toBeGreaterThan(-1);
                                                expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_a8_M4")).toBeGreaterThan(-1);
                                                expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_anotherFlow")).toEqual(-1);
                                                done();
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

        it("6-filter by a flow and selected several steps should display all tasks from these steps of the selected flow available to the user", function (done) {
            var taskCountFromDB;

            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                webdriverUtils.clickOnElement(toDoList.allFlowsCheckbox).then(function () { //uncheck All Flows checkbox
                    //Get list of workflows 
                    toDoList.flows.count().then(function (count1) {
                        var promises1 = [];
                        for (var i = 0; i < count1; i++) {
                            promises1.push(toDoList.flow(i).getText());
                        }
                        Q.all(promises1).done(function (workflowArray) {
                            var flowIndex = checkWorkflow(workflowArray, simpleFlow1);
                            expect(flowIndex).toBeGreaterThan(-1);
                            toDoList.expandFlow(flowIndex);

                            //Get list of steps 
                            toDoList.allStepsInFlow(flowIndex).count().then(function (count2) {
                                expect(count2).toEqual(5);
                                var promises2 = [];
                                for (var i = 0; i < count2; i++) {
                                    promises2.push(toDoList.stepInFlow(flowIndex, i).getText());
                                }
                                Q.all(promises2).done(function (stepsArray) {
                                    //Check step
                                    var stepIndex1 = checkWorkflow(stepsArray, stepMan1);
                                    expect(stepIndex1).toBeGreaterThan(-1);
                                    webdriverUtils.clickOnElement(toDoList.stepInFlow(flowIndex, stepIndex1)).then(function () {
                                        //Check step
                                        var stepIndex2 = checkWorkflow(stepsArray, stepMan3);
                                        expect(stepIndex2).toBeGreaterThan(-1);
                                        webdriverUtils.clickOnElement(toDoList.stepInFlow(flowIndex, stepIndex2)).then(function () {

                                            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {     //Close flowFilter
                                                //Get list of tasks
                                                toDoList.searchInput.sendKeys('Task_WorkflowFilterTest').then(function () {
                                                    toDoList.tasks.count().then(function (count3) {
                                                        expect(count3).toBeGreaterThan(0);
                                                        var promises3 = [];
                                                        for (var i = 0; i < count3; i++) {
                                                            promises3.push(toDoList.taskDescription(i).getText());
                                                        }
                                                        //verify that appropriate tasks are displayed
                                                        Q.all(promises3).done(function (descriptionArray) {
                                                            expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_N2_M1")).toBeGreaterThan(-1);
                                                            expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_a8_M1")).toBeGreaterThan(-1);
                                                            expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_a8_M4")).toEqual(-1);
                                                            expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_anotherFlow")).toEqual(-1);
                                                        });
                                                        done();
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

        it("7-should display all tasks from all steps of the selected flows in the flow filter available to the user", function (done) {
            var taskCountFromDB;

            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                webdriverUtils.clickOnElement(toDoList.allFlowsCheckbox).then(function () { //uncheck All Flows checkbox
                    //Get list of workflows 
                    toDoList.flows.count().then(function (count1) {
                        var promises1 = [];
                        for (var i = 0; i < count1; i++) {
                            promises1.push(toDoList.flow(i).getText());
                        }
                        Q.all(promises1).done(function (workflowArray) {
                            //Check workflow
                            var flowIndex1 = checkWorkflow(workflowArray, simpleFlow1);
                            browser.waitForAngular().then(function () {
                                expect(flowIndex1).toBeGreaterThan(-1);
                                webdriverUtils.clickOnElement(toDoList.flow(flowIndex1)).then(function () {
                                    //Check workflow
                                    var flowIndex2 = checkWorkflow(workflowArray, simpleFlow3);
                                    expect(flowIndex2).toBeGreaterThan(-1);
                                    webdriverUtils.clickOnElement(toDoList.flow(flowIndex2)).then(function () {

                                        webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Close flowFilter
                                            //Get list of tasks
                                            toDoList.searchInput.sendKeys('Task_WorkflowFilterTest').then(function () {
                                                browser.waitForAngular().then(function () {
                                                    toDoList.tasks.count().then(function (count2) {
                                                        browser.waitForAngular().then(function () {
                                                            expect(count2).toBeGreaterThan(0);
                                                            var promises3 = [];
                                                            for (var i = 0; i < count2; i++) {
                                                                toDoList.taskDescription(i).getText().then(function (taskDesc) {
                                                                    promises3.push(taskDesc);
                                                                });
                                                            }
                                                            browser.sleep(1000).then(function () {
                                                                //verify that appropriate tasks are displayed
                                                                Q.all(promises3).done(function (descriptionArray) {
                                                                    expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_N2_M1")).toBeGreaterThan(-1);
                                                                    expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_a8_M1")).toBeGreaterThan(-1);
                                                                    expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_N2_M3")).toBeGreaterThan(-1);
                                                                    expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_a8_M4")).toBeGreaterThan(-1);
                                                                    expect(checkWorkflow(descriptionArray, "Task_WorkflowFilterTest_anotherFlow")).toBeGreaterThan(-1);
                                                                });
                                                                done();
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
            });
        });

        it("8-should persist previously selected options for flow filter in dropdown after navigation away from To Do List and returning back", function (done) {
            //persistance when nothing is selected
            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                webdriverUtils.clickOnElement(toDoList.allFlowsCheckbox).then(function () { //uncheck All Flows checkbox                    
                    webdriverUtils.clickOnElement(navigationBar.searchIcon).then(function () { //navigate to the search view and back                    
                        irSearchPage.fileNameSearchBox.sendKeys("blabla").then(function () {
                            webdriverUtils.clickOnElement(navigationBar.searchIcon);
                            webdriverUtils.clickOnElement(leftRailBar.toDoList); //close and reopen left rail
                            webdriverUtils.clickOnElement(leftRailBar.toDoList);
                            webdriverUtils.clickOnElement(leftRailBar.diaryList); //go to diary list and back to to do list
                            webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () {
                                webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                                    //verify that certain workflows are unchecked
                                    expect(toDoList.allFlowsCheckbox.getAttribute('checked')).toEqual(null);
                                    expect(toDoList.tasks.length).not.toBeDefined();
                                    expect(toDoList.noTasksMessageDisplayed.getText()).toEqual(noTasksMessage);
                                    //persistance when some options are selected
                                    //Check workflows
                                    webdriverUtils.clickOnElement(toDoList.flow(0)).then(function () {
                                        webdriverUtils.clickOnElement(toDoList.flow(1)).then(function () {
                                            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Close flowFilter
                                                webdriverUtils.clickOnElement(navigationBar.searchIcon).then(function () { //navigate to the search view and back     
                                                    browser.waitForAngular();
                                                    irSearchPage.fileNameSearchBox.clear();
                                                    irSearchPage.fileNameSearchBox.sendKeys("blabla").then(function () {
                                                        webdriverUtils.clickOnElement(navigationBar.searchIcon);
                                                        webdriverUtils.clickOnElement(leftRailBar.toDoList); //close and reopen left rail
                                                        webdriverUtils.clickOnElement(leftRailBar.toDoList);
                                                        webdriverUtils.clickOnElement(leftRailBar.diaryList); //go to diary list and back to to do list
                                                        webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () {
                                                            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {    //Open flowFilter
                                                                //verify that certain workflows are checked
                                                                expect(toDoList.flowCheckbox(0).getAttribute('checked')).toEqual('true');
                                                                expect(toDoList.flowCheckbox(1).getAttribute('checked')).toEqual('true');
                                                                expect(toDoList.isFlowFilterSet).toEqual("dropdown-toggle has-checked");
                                                                toDoList.tasks.count().then(function (count) {
                                                                    expect(count).toBeGreaterThan(0);
                                                                    done();
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
                });
            });
        });
    }
});