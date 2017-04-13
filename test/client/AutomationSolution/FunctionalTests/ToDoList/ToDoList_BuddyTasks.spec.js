exports.tags = ['Workflow_Settings', 'Buddies'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();
var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();
var tasksUtils = require('../../utils/tasksUtils.js');
var Q = require('q');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var buddy1 = 'Ezhova,Kristina';
var buddy1_id = 5302;
var accountName1 = "ezhovakr";
var buddy2 = 'khvashma';
var buddy2_id = 6060;
var accountName2 = "khvashma";
var buddy3 = 'bk1 bk1';
var buddy3_id = 9483;
var accountName3 = "bk1";
var buddy4 = 'bk2 bk2';
var buddy4_id = 17478;
var accountName4 = "bk2";

var group1Account = "xp1_test";
var group2Account = "xp2_test";

var assignedToBuddy1 = 0;
var assignedToBuddy2 = 0;
var assignedToBuddy3 = 0;
var assignedToBuddy4 = 0;
var assignedToGroup1 = 0;
var assignedToGroup2 = 0;



describe("To Do List - Buddy", function () {

    function getAssignment(taskDescription) {
        var deferred = protractor.promise.defer();
        tasksUtils.getAssignment(taskDescription, function (assignment) {
            deferred.fulfill(assignment);
        });
        return deferred.promise;
    }

    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            tasksUtils.reassignTask(assignedToBuddy1, accountName1);
            tasksUtils.reassignTask(assignedToBuddy2, accountName2);
            tasksUtils.countAssignedToTasks(accountName1, function (result) {
                assignedToBuddy1 = result;     //number of tasks in DB assigned to buddy1
            });
            tasksUtils.countAssignedToTasks(accountName2, function (result) {
                assignedToBuddy2 = result;      //number of tasks in DB assigned to buddy2
            });
            tasksUtils.countAssignedToTasks(accountName3, function (result) {
                assignedToBuddy3 = result;     //number of tasks in DB assigned to buddy1
            });
            tasksUtils.countAssignedToTasks(accountName4, function (result) {
                assignedToBuddy4 = result;      //number of tasks in DB assigned to buddy2
            });
            tasksUtils.countAssignedToTasks(group1Account, function (result) {
                assignedToGroup1 = result;      //number of tasks in DB assigned to group xp1_test
            });
            tasksUtils.countAssignedToTasks(group2Account, function (result) {
                assignedToGroup2 = result;      //number of tasks in DB assigned to group xp1_test
            });
        });

        beforeEach(function (done) {
            browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.dateFilter('ALL'))
            })
            .then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function () {
                done(browser.waitForAngular());
            });
        });

        it("1-All buddies should be displayed in Settings dropdown and buddy checkbox should not be checked by default", function () {
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                toDoList.buddyExpander.click();
                expect(toDoList.buddyCheckboxState(buddy1_id).getAttribute('checked')).toBeFalsy();
                expect(toDoList.buddyCheckboxState(buddy2_id).getAttribute('checked')).toBeFalsy();
                expect(toDoList.buddyCheckboxState(buddy3_id).getAttribute('checked')).toBeFalsy();
                expect(toDoList.buddyCheckboxState(buddy4_id).getAttribute('checked')).toBeFalsy();
                expect(toDoList.buddies.count()).toEqual(4);
                expect(toDoList.buddyName(buddy1_id)).toEqual(buddy1);
                expect(toDoList.buddyName(buddy2_id)).toEqual(buddy2);
                expect(toDoList.buddyName(buddy3_id)).toEqual(buddy3);
                expect(toDoList.buddyName(buddy4_id)).toEqual(buddy4);
            });
        });

        it("2-if 'All Tasks' checkbox checked in the Settings dropdown all buddies also should be checked", function () {
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.allTasksCheckbox.click(); //check 'All Tasks' checkbox
            toDoList.buddyExpander.click();
            expect(toDoList.allTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.toMeTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.toGroupTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.unassignedTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.buddyCheckboxState(buddy1_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy2_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy3_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy4_id).getAttribute('checked')).toEqual('true');

            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy1_id));
            expect(toDoList.allTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.toMeTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.toGroupTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.unassignedTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.buddyCheckboxState(buddy1_id).getAttribute('checked')).toBeFalsy();
            expect(toDoList.buddyCheckboxState(buddy2_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy3_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy4_id).getAttribute('checked')).toEqual('true');

            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy2_id));
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy3_id));
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy4_id));

            expect(toDoList.allTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.toMeTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.toGroupTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.unassignedTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.buddyCheckboxState(buddy1_id).getAttribute('checked')).toBeFalsy();
            expect(toDoList.buddyCheckboxState(buddy2_id).getAttribute('checked')).toBeFalsy();
            expect(toDoList.buddyCheckboxState(buddy3_id).getAttribute('checked')).toBeFalsy();
            expect(toDoList.buddyCheckboxState(buddy4_id).getAttribute('checked')).toBeFalsy();
        });

        /* todo; */
        it("3-should return all the tasks assigned to a buddy and group where buddy as a member if the buddy is checked in Settings dropdown ", function (done) {
            var ifTasksAssignedToBuddy1OrGroup;
            var ifTasksAssignedToBuddy2OrGroup;
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.toMeTasksCheckbox.click(); //uncheck ussigned checkbox
            toDoList.buddyExpander.click();
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy1_id));
            webdriverUtils.clickOnElement(toDoList.settingsFilter);

            toDoList.tasks.count().then(function (tasksCount1) {
                expect(toDoList.tasksInFooter.getText()).toEqual((assignedToBuddy1 + assignedToGroup1).toString());
                var promises1 = [];
                for (var i = 0; i < tasksCount1; i++) {
                    promises1.push(toDoList.taskDescription(i).getText());
                }
                Q.all(promises1).done(function (descriptionArray1) {
                    var promises2 = [];
                    for (var i = 0; i < tasksCount1; i++) {
                        promises2.push(getAssignment(descriptionArray1[i]));
                    }
                    Q.all(promises2).done(function (assignmentArray) {
                        for (var i = 0; i < tasksCount1; i++) {
                            if (assignmentArray[i] == accountName1 || assignmentArray[i] == group1Account) {
                                ifTasksAssignedToBuddy1OrGroup = true;
                            } else {
                                ifTasksAssignedToBuddy1OrGroup = false;
                                break;
                            }
                        }
                        expect(ifTasksAssignedToBuddy1OrGroup).toBe(true);

                        webdriverUtils.clickOnElement(toDoList.settingsFilter);
                        toDoList.buddyExpander.click();
                        webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy1_id)); //uncheck buddy1
                        webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy3_id)); //check buddy2
                        webdriverUtils.clickOnElement(toDoList.settingsFilter);

                        toDoList.tasks.count().then(function (tasksCount2) {
                            expect(toDoList.tasksInFooter.getText()).toEqual((assignedToBuddy3 + assignedToGroup1 + assignedToGroup2).toString());
                            var promises3 = [];
                            for (var i = 0; i < tasksCount2; i++) {
                                promises3.push(toDoList.taskDescription(i).getText());
                            }
                            Q.all(promises3).done(function (descriptionArray2) {
                                var promises4 = [];
                                for (var i = 0; i < tasksCount2; i++) {
                                    promises4.push(getAssignment(descriptionArray2[i]));
                                }
                                Q.all(promises4).done(function (assignmentArray2) {
                                    for (var i = 0; i < tasksCount2; i++) {
                                        if (assignmentArray2[i] == accountName3 || assignmentArray2[i] == group1Account || assignmentArray2[i] == group2Account) {
                                            ifTasksAssignedToBuddy2OrGroup = true;
                                        } else {
                                            ifTasksAssignedToBuddy2OrGroup = false;
                                            break;
                                        }
                                    }
                                    expect(ifTasksAssignedToBuddy2OrGroup).toBe(true);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        /* todo; */
        it("4-should return all the tasks assigned to all buddies if all buddies are checked in Settings dropdown", function (done) {
            var ifTasksAssignedToBuddies;
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.toMeTasksCheckbox.click(); //uncheck ussigned checkbox

            toDoList.buddyExpander.click();
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy1_id));
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy2_id));
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy3_id));
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy4_id));

            expect(toDoList.buddyCheckboxState(buddy1_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy2_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy3_id).getAttribute('checked')).toEqual('true');
            expect(toDoList.buddyCheckboxState(buddy4_id).getAttribute('checked')).toEqual('true');
            webdriverUtils.clickOnElement(toDoList.settingsFilter);

            toDoList.tasks.count().then(function (tasksCount) {
                expect(toDoList.tasksInFooter.getText()).toEqual((assignedToBuddy1 + assignedToBuddy2 +
                    assignedToBuddy3 + assignedToBuddy4 + assignedToGroup1 + assignedToGroup2).toString());
                var promises = [];
                for (var i = 0; i < tasksCount; i++) {
                    promises.push(toDoList.taskDescription(i).getText());
                }
                Q.all(promises).done(function (descriptionArray) {
                    var promises2 = [];
                    for (var i = 0; i < tasksCount; i++) {
                        promises2.push(getAssignment(descriptionArray[i]));
                    }
                    Q.all(promises2).done(function (assignmentArray) {
                        for (var i = 0; i < tasksCount; i++) {
                            if (assignmentArray[i] == accountName1 || assignmentArray[i] == accountName2 ||
                                assignmentArray[i] == accountName3 || assignmentArray[i] == accountName4 ||
                                assignmentArray[i] == group1Account || assignmentArray[i] == group2Account) {
                                ifTasksAssignedToBuddies = true;
                            } else {
                                ifTasksAssignedToBuddies = false;
                                break;
                            }
                        }
                        expect(ifTasksAssignedToBuddies).toBe(true);
                        done();
                    });
                });
            });
        });

        it("5-should persist previously selected options for Settings dropdown", function () {
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.toMeTasksCheckbox.click(); //uncheck ussigned checkbox
            toDoList.buddyExpander.click();
            webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy2_id));
            webdriverUtils.clickOnElement(navigationBar.searchIcon); //navigate to the search view and back
            webdriverUtils.clickOnElement(navigationBar.searchIcon);
            webdriverUtils.clickOnElement(leftRailBar.toDoList); //close and reopen left rail
            webdriverUtils.clickOnElement(leftRailBar.toDoList);
            webdriverUtils.clickOnElement(leftRailBar.diaryList); //go to diary list and back to to do list
            webdriverUtils.clickOnElement(leftRailBar.toDoList);
            webdriverUtils.clickOnElement(toDoList.settingsFilter);

            expect(toDoList.allTasksCheckboxState.getAttribute('checked')).toBeFalsy();
            expect(toDoList.unassignedTasksCheckboxState.getAttribute('checked')).toBeFalsy();
            expect(toDoList.toMeTasksCheckboxState.getAttribute('checked')).toBeFalsy();
            expect(toDoList.toGroupTasksCheckboxState.getAttribute('checked')).toBeFalsy();
            toDoList.buddyExpander.click();
            expect(toDoList.buddyCheckboxState(buddy1_id).getAttribute('checked')).toBeFalsy();
            expect(toDoList.buddyCheckboxState(buddy2_id).getAttribute('checked')).toEqual('true');
        });
    }
});