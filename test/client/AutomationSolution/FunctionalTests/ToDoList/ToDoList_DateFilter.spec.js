exports.tags = ['Workflow_Settings', 'To_Do_List_Filters'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('../../pageObjects/SearchPage.js');
var irSearchPage = new SearchPage();

var tasksUtils = require('../../utils/tasksUtils.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var dateObj = new Date();

var file1 = 'FileWithTasks_N2';
var file2 = 'FileWithTasks_a8';
var taskToday = 'FilterTesting_Today';
var taskWeek = 'FilterTesting_Week';
var task30days = 'FilterTesting_30days';
var oldTask = 'FilterTesting_VeryOldTask';


function checkDescription(descriptionArray, description) {
    var ifContains = false;
    for (var i = 0; i < descriptionArray.length; i++) {
        if (descriptionArray[i].toLowerCase().indexOf(description.toLowerCase()) > -1) {
            ifContains = true;
            break;
        }
    }
    return ifContains;
}

function chooseFlow(flow, fn) {
    webdriverUtils.getItemIndex(toDoList.flows, flow, function (flowIndex) {
        expect(flowIndex).toBeGreaterThan(-1);
        webdriverUtils.clickOnElement(toDoList.flow(flowIndex));
        fn(flowIndex);
    });
}

describe("To Do List - Date filter", function () {

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            tasksUtils.rescheduleTask(file1, taskToday, "day", -1, "minute", 310);
            tasksUtils.rescheduleTask(file1, taskWeek, "day", -1, "day", 2);
            tasksUtils.rescheduleTask(file1, task30days, "day", -1, "day", 15);
            tasksUtils.rescheduleTask(file1, oldTask, "month", -18, "year", -1);
            tasksUtils.rescheduleTask(file2, taskToday, "day", -1, "minute", 310);
            tasksUtils.rescheduleTask(file2, taskWeek, "day", -1, "day", 6);
            tasksUtils.rescheduleTask(file2, task30days, "day", -1, "day", 29);
            tasksUtils.rescheduleTask(file2, oldTask, "month", -18, "year", -1);
        });

        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter);
                    });
                });
            });
        });

        it("after selecting 'TODAY' filter it should return tasks with available date Today and Prior to today ordered by priority", function (done) {
            toDoList.searchInput.sendKeys('FilterTesting_').then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    webdriverUtils.clickOnElement(toDoList.dateFilter("TODAY")).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                            //Get list of task priorities
                            toDoList.tasks.count().then(function (count) {
                                expect(count).toBeGreaterThan(0);
                                var promises1 = [];
                                for (var i = 0; i < count; i++) {
                                    promises1.push(toDoList.priorityAndDate(i).getText());
                                }
                                Q.all(promises1).done(function (resultArray) {
                                    //Verify that tasks are ordered by priority
                                    expect(webdriverUtils.ifOrderedByPriority(resultArray)).toBe(true);
                                });
                                var promises2 = [];
                                //Get list of tasks
                                for (var i = 0; i < count; i++) {
                                    promises2.push(toDoList.taskDescription(i).getText());
                                }

                                Q.all(promises2).done(function (descriptionArray) {
                                    //verify that appropriate tasks are displayed
                                    expect(checkDescription(descriptionArray, "VeryOldTask")).toBe(true);
                                    expect(checkDescription(descriptionArray, "today")).toBe(true);
                                    expect(checkDescription(descriptionArray, "week")).toBe(false);
                                    expect(checkDescription(descriptionArray, "30days")).toBe(false);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });



        it("after selecting '+ 7 DAYS' filter it should return tasks with available date started today 12AM and ended in +7 days 11:59PM ordered by priority", function (done) {
            toDoList.searchInput.sendKeys('FilterTesting_').then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    webdriverUtils.clickOnElement(toDoList.dateFilter("WEEK")).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                            //Get list of task priorities
                            toDoList.tasks.count().then(function (count) {
                                expect(count).toBeGreaterThan(0);
                                var promises1 = [];
                                for (var i = 0; i < count; i++) {
                                    promises1.push(toDoList.priorityAndDate(i).getText());
                                }
                                Q.all(promises1).done(function (resultArray) {
                                    //Verify that tasks are ordered by priority
                                    expect(webdriverUtils.ifOrderedByPriority(resultArray)).toBe(true);
                                });
                                //Get list of tasks
                                var promises2 = [];
                                for (var i = 0; i < count; i++) {
                                    promises2.push(toDoList.taskDescription(i).getText());
                                }
                                Q.all(promises2).done(function (descriptionArray) {
                                    //verify that appropriate tasks are displayed
                                    expect(checkDescription(descriptionArray, "today")).toBe(true);
                                    expect(checkDescription(descriptionArray, "week")).toBe(true);
                                    expect(checkDescription(descriptionArray, "30days")).toBe(false);
                                    expect(checkDescription(descriptionArray, "VeryOldTask")).toBe(false);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it("after selecting '+30 DAYS' filter it should return tasks with available date started at 12:00AM of the current day and ended after + next 30 days ordered by priority", function (done) {
            toDoList.searchInput.sendKeys('FilterTesting_').then(function () {
                browser.driver.wait(function () {
                    return toDoList.allFlowsCheckbox.isPresent().then(function (element) {
                        return element === true;
                    });
                }).then(function () {
                    webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                        webdriverUtils.clickOnElement(toDoList.dateFilter("+30 DAYS")).then(function () {
                            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                //Get list of task priorities
                                toDoList.tasks.count().then(function (count) {
                                    expect(count).toBeGreaterThan(0);
                                    var promises1 = [];
                                    for (var i = 0; i < count; i++) {
                                        promises1.push(toDoList.priorityAndDate(i).getText());
                                    }
                                    Q.all(promises1).done(function (resultArray) {
                                        //Verify that tasks are ordered by priority
                                        expect(webdriverUtils.ifOrderedByPriority(resultArray)).toBe(true);
                                    });
                                    //Get list of tasks
                                    var promises2 = [];
                                    for (var i = 0; i < count; i++) {
                                        promises2.push(toDoList.taskDescription(i).getText());
                                    }
                                    Q.all(promises2).done(function (descriptionArray) {
                                        //verify that appropriate tasks are displayed
                                        expect(checkDescription(descriptionArray, "today")).toBe(true);
                                        expect(checkDescription(descriptionArray, "week")).toBe(true);
                                        expect(checkDescription(descriptionArray, "30days")).toBe(true);
                                        expect(checkDescription(descriptionArray, "VeryOldTask")).toBe(false);
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it("filter 'ALL' should return all tasks with no date filter and ordered by priority", function (done) {
            toDoList.searchInput.sendKeys('FilterTesting_').then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    webdriverUtils.clickOnElement(toDoList.dateFilter("ALL")).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                            toDoList.tasks.count().then(function (count) {
                                //Get list of task priorities
                                expect(count).toBeGreaterThan(0);
                                var promises1 = [];
                                for (var i = 0; i < count; i++) {
                                    promises1.push(toDoList.priorityAndDate(i).getText());
                                }
                                Q.all(promises1).done(function (resultArray) {
                                    //Verify that tasks are ordered by priority
                                    expect(webdriverUtils.ifOrderedByPriority(resultArray)).toBe(true);
                                });
                                //Get list of tasks
                                var promises2 = [];
                                for (var i = 0; i < count; i++) {
                                    promises2.push(toDoList.taskDescription(i).getText());
                                }
                                Q.all(promises2).done(function (descriptionArray) {
                                    //verify that appropriate tasks are displayed
                                    expect(checkDescription(descriptionArray, "today")).toBe(true);
                                    expect(checkDescription(descriptionArray, "week")).toBe(true);
                                    expect(checkDescription(descriptionArray, "30days")).toBe(true);
                                    expect(checkDescription(descriptionArray, "VeryOldTask")).toBe(true);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it("should persist selected date filter after navigation away from To Do List and returning back", function (done) {
            toDoList.searchInput.sendKeys('FilterTesting_').then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    webdriverUtils.clickOnElement(toDoList.dateFilter("+30 DAYS")).then(function () {
                        expect(toDoList.dateFilterState("+30 DAYS").getAttribute('class')).not.toContain("ng-hide");
                        expect(toDoList.dateFilterState("ALL").getAttribute('class')).toContain("ng-hide");
                        expect(toDoList.dateFilterState("TODAY").getAttribute('class')).toContain("ng-hide");
                        expect(toDoList.dateFilterState("WEEK").getAttribute('class')).toContain("ng-hide");
                        webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                            toDoList.tasks.count().then(function (count1) {
                                expect(count1).toBeGreaterThan(0);
                                //Verify that filter is checked

                                //Navigate away
                                webdriverUtils.clickOnElement(navigationBar.searchIcon).then(function () { //navigate to the search view and back                    
                                    irSearchPage.fileNameSearchBox.sendKeys("blabla").then(function () {
                                        webdriverUtils.clickOnElement(navigationBar.searchIcon);
                                        webdriverUtils.clickOnElement(leftRailBar.toDoList); //close and reopen left rail
                                        webdriverUtils.clickOnElement(leftRailBar.toDoList);
                                        webdriverUtils.clickOnElement(leftRailBar.diaryList); //go to diary list and back to to do list
                                        webdriverUtils.clickOnElement(leftRailBar.toDoList).then(function () {
                                            toDoList.tasks.count().then(function (count2) {
                                                expect(count2).toBeGreaterThan(0);
                                                //Verify that task count persists
                                                expect(count2).toEqual(count1);
                                                //Verify that filter is checked
                                                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                    expect(toDoList.dateFilterState("+30 DAYS").getAttribute('class')).not.toContain("ng-hide");
                                                    expect(toDoList.dateFilterState("ALL").getAttribute('class')).toContain("ng-hide");
                                                    expect(toDoList.dateFilterState("TODAY").getAttribute('class')).toContain("ng-hide");
                                                    expect(toDoList.dateFilterState("WEEK").getAttribute('class')).toContain("ng-hide");
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
    }
});