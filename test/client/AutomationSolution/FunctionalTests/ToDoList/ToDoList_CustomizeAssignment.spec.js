exports.tags = ['Workflow_Settings', 'To_Do_List_Filters'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();
var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();
var tasksUtils = require('../../utils/tasksUtils.js');
var Q = require('q');

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var noTasksMessage = 'You have no items.';
var noTasksInFooter = '0 TASKS';

var assignedToMe = 'assignedToMe';
var assignedToGroup = 'assignedToGroup';
var unassigned = 'unassigned';
var assignedToBuddy1 = 'Buddy_AssignedToKris';
var assignedToBuddy2 = 'Buddy_AssignedToMar';

var buddy1_id = 5302;
var accountName1 = "ezhovakr";
var buddy2_id = 6060;
var accountName2 = "khvashma";


describe("To Do List - Customize Assignment: ", function () {

    function verifyTaskCountInFooter(count) {
        var footer = toDoList.footer.getText().then(function (f) {
            return f.split(" ");
        });
        footer.then(function (footerCount) {
            expect(parseInt(footerCount[4])).toEqual(count);
        });
    }

    if (browser.params.siteBase == 'iis') {
        tasksUtils.reassignTask(assignedToGroup, 'xp1_test');
        tasksUtils.unassignTask(unassigned);
        if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
            tasksUtils.reassignTask(assignedToMe, 'xp1');            
        } else {
            tasksUtils.reassignTask(assignedToMe, browser.params.defaultUserName);
        }

        beforeAll(function () {
            tasksUtils.reassignTask(assignedToBuddy1, accountName1);
            tasksUtils.reassignTask(assignedToBuddy2, accountName2);
        });

        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                webdriverUtils.clickOnElement(toDoList.dateFilter("ALL")).then(function () {
                    webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    });
                });
            });
        });

        afterEach(function () {
        });

        it("1-'Assigned' filter should be selected in Settings dropdown (by default)", function () {
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            expect(toDoList.allTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.toMeTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.toGroupTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.unassignedTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
        });

        it("2-should return no tasks in To Do List when nothing is checked in Settings dropdown", function () {
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            webdriverUtils.clickOnElement(toDoList.toMeTasksCheckbox);
            //toDoList.toMeTasksCheckbox.click(); //uncheck Asigned to me checkbox
            toDoList.settingsFilter.click().then(function () {
                browser.sleep(5000);
                expect(toDoList.tasks.length).not.toBeDefined();
                expect(toDoList.noTasksMessageDisplayed.getText()).toEqual(noTasksMessage);
                expect(toDoList.footer.getText()).toEqual(noTasksInFooter);
            });
        });

        it("3-should return All tasks when All is checked in Settings dropdown ", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            var toBuddy1 = false;
            var toBuddy2 = false;

            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.allTasksCheckbox.click();
            toDoList.searchInput.sendKeys('assigned');
            toDoList.tasks.count().then(function (tasksCount) {
                expect(tasksCount).toBeGreaterThan(0);
                var promises = [];
                for (var i = 0; i < tasksCount; i++) {
                    promises.push(toDoList.taskDescription(i).getText());
                }
                Q.all(promises).done(function (descriptionArray) {
                    for (var i = 0; i < tasksCount; i++) {
                        if (descriptionArray[i] == assignedToMe) {
                            toMe = true;
                        }
                        if (descriptionArray[i] == assignedToGroup) {
                            toGroup = true;
                        }
                        if (descriptionArray[i] == unassigned) {
                            unassign = true;
                        }
                        if (descriptionArray[i] == assignedToBuddy1) {
                            toBuddy1 = true;
                        }
                        if (descriptionArray[i] == assignedToBuddy2) {
                            toBuddy2 = true;
                        }
                    }
                    expect(toMe).toBeTruthy();
                    expect(toGroup).toBeTruthy();
                    expect(unassign).toBeTruthy();
                    expect(toBuddy1).toBeTruthy();
                    expect(toBuddy2).toBeTruthy();
                    done();
                });
            });
        });

        it("4-should return assigned to me tasks and when Assigned is checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            //by default assigned to me is checked
            toDoList.searchInput.sendKeys('assigned').then(function () {
                toDoList.tasks.count().then(function (tasksCount) {
                    expect(tasksCount).toBeGreaterThan(0);
                    var promises = [];
                    for (var i = 0; i < tasksCount; i++) {
                        promises.push(toDoList.taskDescription(i).getText());
                    }
                    Q.all(promises).done(function (descriptionArray) {
                        for (var i = 0; i < tasksCount; i++) {
                            if (descriptionArray[i] == assignedToMe) {
                                toMe = true;
                            }
                            if (descriptionArray[i] == assignedToGroup) {
                                toGroup = true;
                            }
                            if (descriptionArray[i] == unassigned) {
                                unassign = true;
                            }
                        }
                        expect(toMe).toBeTruthy();
                        expect(toGroup).toBeFalsy();
                        expect(unassign).toBeFalsy();
                        done();
                    });
                });
            });
        });

        it("5-should return assigned to group tasks when Group tasks is checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.toMeTasksCheckbox.click(); //uncheck Asigned to me checkbox
            toDoList.toGroupTasksCheckbox.click(); //check Asigned to group checkbox
            toDoList.settingsFilter.click().then(function () {
                toDoList.searchInput.sendKeys('assigned');
                toDoList.tasks.count().then(function (tasksCount) {
                    expect(tasksCount).toBeGreaterThan(0);
                    var promises = [];
                    for (var i = 0; i < tasksCount; i++) {
                        promises.push(toDoList.taskDescription(i).getText());
                    }
                    Q.all(promises).done(function (descriptionArray) {
                        for (var i = 0; i < tasksCount; i++) {
                            if (descriptionArray[i] == assignedToMe) {
                                toMe = true;
                            }
                            if (descriptionArray[i] == assignedToGroup) {
                                toGroup = true;
                            }
                            if (descriptionArray[i] == unassigned) {
                                unassign = true;
                            }
                        }
                        expect(toMe).toBeFalsy();
                        expect(toGroup).toBeTruthy();
                        expect(unassign).toBeFalsy();
                        done();
                    });
                });
            });
        });

        it("6-should return unassigned tasks when Unassigned is checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.toMeTasksCheckbox.click(); //uncheck Asigned to me checkbox
            toDoList.unassignedTasksCheckbox.click(); //check Unassigned checkbox
            toDoList.settingsFilter.click().then(function () {
                toDoList.searchInput.sendKeys('assigned');
                toDoList.tasks.count().then(function (tasksCount) {
                    expect(tasksCount).toBeGreaterThan(0);
                    var promises = [];
                    for (var i = 0; i < tasksCount; i++) {
                        promises.push(toDoList.taskDescription(i).getText());
                    }
                    Q.all(promises).done(function (descriptionArray) {
                        for (var i = 0; i < tasksCount; i++) {
                            if (descriptionArray[i] == assignedToMe) {
                                toMe = true;
                            }
                            if (descriptionArray[i] == assignedToGroup) {
                                toGroup = true;
                            }
                            if (descriptionArray[i] == unassigned) {
                                unassign = true;
                            }
                        }
                        expect(toMe).toBeFalsy();
                        expect(toGroup).toBeFalsy();
                        expect(unassign).toBeTruthy();
                        done();
                    });
                });
            });
        });

        it("7-should return unassigned and assigned to me tasks when Unassigned and Assigned is checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.unassignedTasksCheckbox.click();//check unassigned checkbox (Assigned to me is checked by default)
            toDoList.settingsFilter.click().then(function () {
                toDoList.searchInput.sendKeys('assigned');
                toDoList.tasks.count().then(function (tasksCount) {
                    expect(tasksCount).toBeGreaterThan(0);
                    var promises = [];
                    for (var i = 0; i < tasksCount; i++) {
                        promises.push(toDoList.taskDescription(i).getText());
                    }
                    Q.all(promises).done(function (descriptionArray) {
                        for (var i = 0; i < tasksCount; i++) {
                            if (descriptionArray[i] == assignedToMe) {
                                toMe = true;
                            }
                            if (descriptionArray[i] == assignedToGroup) {
                                toGroup = true;
                            }
                            if (descriptionArray[i] == unassigned) {
                                unassign = true;
                            }
                        }
                        expect(toMe).toBeTruthy();
                        expect(toGroup).toBeFalsy();
                        expect(unassign).toBeTruthy();
                        done();
                    });
                });
            });
        });

        it("8-should return unassigned and assigned to group tasks when Unassigned and Group tasks is checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.allTasksCheckbox.click();//check All checkbox
            toDoList.toMeTasksCheckbox.click();//uncheck Asigned to me checkbox
            toDoList.settingsFilter.click().then(function () {
                toDoList.searchInput.sendKeys('assigned');
                toDoList.tasks.count().then(function (tasksCount) {
                    expect(tasksCount).toBeGreaterThan(0);
                    var promises = [];
                    for (var i = 0; i < tasksCount; i++) {
                        promises.push(toDoList.taskDescription(i).getText());
                    }
                    Q.all(promises).done(function (descriptionArray) {
                        for (var i = 0; i < tasksCount; i++) {
                            if (descriptionArray[i] == assignedToMe) {
                                toMe = true;
                            }
                            if (descriptionArray[i] == assignedToGroup) {
                                toGroup = true;
                            }
                            if (descriptionArray[i] == unassigned) {
                                unassign = true;
                            }
                        }
                        expect(toMe).toBeFalsy();
                        expect(toGroup).toBeTruthy();
                        expect(unassign).toBeTruthy();
                        done();
                    });
                });
            });
        });

        it("9-should return assigned to me and to group tasks when Assign and Group tasks is checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.toGroupTasksCheckbox.click();//uncheck Asigned to group checkbox (Assigned to me is checked by default)
            toDoList.settingsFilter.click().then(function () {
                toDoList.searchInput.sendKeys('assigned');
                toDoList.tasks.count().then(function (tasksCount) {
                    expect(tasksCount).toBeGreaterThan(0);
                    var promises = [];
                    for (var i = 0; i < tasksCount; i++) {
                        promises.push(toDoList.taskDescription(i).getText());
                    }
                    Q.all(promises).done(function (descriptionArray) {
                        for (var i = 0; i < tasksCount; i++) {
                            if (descriptionArray[i] == assignedToMe) {
                                toMe = true;
                            }
                            if (descriptionArray[i] == assignedToGroup) {
                                toGroup = true;
                            }
                            if (descriptionArray[i] == unassigned) {
                                unassign = true;
                            }
                        }
                        expect(toMe).toBeTruthy();
                        expect(toGroup).toBeTruthy();
                        expect(unassign).toBeFalsy();
                        done();
                    });
                });
            });
        });

        it("10-should persist previously selected options for Settings dropdown", function (done) {
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            toDoList.toMeTasksCheckbox.click()
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            webdriverUtils.clickOnElement(navigationBar.searchIcon); //navigate to the search view and back
            webdriverUtils.clickOnElement(navigationBar.searchIcon);
            webdriverUtils.clickOnElement(leftRailBar.toDoList); //close and reopen left rail
            webdriverUtils.clickOnElement(leftRailBar.toDoList);
            webdriverUtils.clickOnElement(leftRailBar.diaryList); //go to diary list and back to to do list
            webdriverUtils.clickOnElement(leftRailBar.toDoList);
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            expect(toDoList.allTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.toMeTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.toGroupTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.unassignedTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.tasks.length).not.toBeDefined();
            expect(toDoList.noTasksMessageDisplayed.getText()).toEqual(noTasksMessage);
            toDoList.toGroupTasksCheckbox.click();//check Assigned to Group and to me checkbox
            toDoList.toMeTasksCheckbox.click();
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            webdriverUtils.clickOnElement(navigationBar.searchIcon); //navigate to the search view and back
            webdriverUtils.clickOnElement(navigationBar.searchIcon);
            webdriverUtils.clickOnElement(leftRailBar.toDoList); //close and reopen left rail
            webdriverUtils.clickOnElement(leftRailBar.toDoList);
            webdriverUtils.clickOnElement(leftRailBar.diaryList); //go to diary list and back to to do list
            webdriverUtils.clickOnElement(leftRailBar.toDoList);
            webdriverUtils.clickOnElement(toDoList.settingsFilter);
            expect(toDoList.allTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            expect(toDoList.toMeTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.toGroupTasksCheckboxState.getAttribute('class')).not.toContain('ng-hide');
            expect(toDoList.unassignedTasksCheckboxState.getAttribute('class')).toContain('ng-hide');
            toDoList.tasks.count().then(function (count) {
                expect(count).toBeGreaterThan(0);
                done();
            });
        });

        it("11-should return tasks assigned to me, to buddy and to groups where buddy is a memeber when Assigned and buddy are checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var toBuddy = false;
            var unassign = false;
            //by default assigned to me is checked
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                webdriverUtils.clickOnElement(toDoList.buddyExpander);
                webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy1_id));
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    toDoList.searchInput.sendKeys('assigned').then(function () {
                        toDoList.tasks.count().then(function (tasksCount) {
                            expect(tasksCount).toBeGreaterThan(0);
                            var promises = [];
                            for (var i = 0; i < tasksCount; i++) {
                                promises.push(toDoList.taskDescription(i).getText());
                            }
                            Q.all(promises).done(function (descriptionArray) {
                                for (var i = 0; i < tasksCount; i++) {
                                    if (descriptionArray[i] == assignedToMe) {
                                        toMe = true;
                                    }
                                    if (descriptionArray[i] == assignedToGroup) {
                                        toGroup = true;
                                    }
                                    if (descriptionArray[i] == unassigned) {
                                        unassign = true;
                                    }
                                    if (descriptionArray[i] == assignedToBuddy1) {
                                        toBuddy = true;
                                    }
                                }
                                expect(toMe).toBeTruthy();
                                expect(toGroup).toBeTruthy();
                                expect(unassign).toBeFalsy();
                                expect(toBuddy).toBeTruthy();
                                done();
                            });
                        });
                    });
                });
            });
        });

        it("12-should return tasks unassigned and assigned to a buddy and to a groups where buddy is a memeber when Unassigned and buddy are checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var toBuddy = false;
            var unassign = false;
            //by default assigned to me is checked
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                toDoList.toMeTasksCheckbox.click(); //uncheck Asigned to me checkbox
                toDoList.unassignedTasksCheckbox.click();
                webdriverUtils.clickOnElement(toDoList.buddyExpander);
                webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy2_id));
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    toDoList.searchInput.sendKeys('assigned').then(function () {
                        toDoList.tasks.count().then(function (tasksCount) {
                            expect(tasksCount).toBeGreaterThan(0);
                            var promises = [];
                            for (var i = 0; i < tasksCount; i++) {
                                promises.push(toDoList.taskDescription(i).getText());
                            }
                            Q.all(promises).done(function (descriptionArray) {
                                for (var i = 0; i < tasksCount; i++) {
                                    if (descriptionArray[i] == assignedToMe) {
                                        toMe = true;
                                    }
                                    if (descriptionArray[i] == assignedToGroup) {
                                        toGroup = true;
                                    }
                                    if (descriptionArray[i] == unassigned) {
                                        unassign = true;
                                    }
                                    if (descriptionArray[i] == assignedToBuddy2) {
                                        toBuddy = true;
                                    }
                                }
                                expect(toMe).toBeFalsy();
                                expect(toGroup).toBeTruthy();
                                expect(unassign).toBeTruthy();
                                expect(toBuddy).toBeTruthy();
                                done();
                            });
                        });
                    });
                });
            });
        });

        it("13-should return assigned to group and to buddies tasks when Unassigned and buddies are checked in Settings dropdown", function (done) {
            var toMe = false;
            var toGroup = false;
            var unassign = false;
            var toBuddy1 = false;
            var toBuddy2 = false;

            //by default assigned to me is checked
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                toDoList.toMeTasksCheckbox.click(); //uncheck Asigned to me checkbox
                toDoList.toGroupTasksCheckbox.click(); //check Asigned to group checkbox
                webdriverUtils.clickOnElement(toDoList.buddyExpander);
                webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy1_id));
                webdriverUtils.clickOnElement(toDoList.buddyCheckbox(buddy2_id));
                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                    toDoList.searchInput.sendKeys('assigned').then(function () {
                        toDoList.tasks.count().then(function (tasksCount) {
                            expect(tasksCount).toBeGreaterThan(0);
                            var promises = [];
                            for (var i = 0; i < tasksCount; i++) {
                                toDoList.taskDetailsExpander(i).click();
                                promises.push(toDoList.taskDescription(i).getText());
                            }
                            Q.all(promises).done(function (descriptionArray) {
                                for (var i = 0; i < tasksCount; i++) {
                                    if (descriptionArray[i] == assignedToMe) {
                                        toMe = true;
                                    }
                                    if (descriptionArray[i] == assignedToGroup) {
                                        toGroup = true;
                                    }
                                    if (descriptionArray[i] == unassigned) {
                                        unassign = true;
                                    }
                                    if (descriptionArray[i] == assignedToBuddy1) {
                                        toBuddy1 = true;
                                    }
                                    if (descriptionArray[i] == assignedToBuddy2) {
                                        toBuddy2 = true;
                                    }
                                }
                                expect(toMe).toBeFalsy();
                                expect(toGroup).toBeTruthy();
                                expect(unassign).toBeFalsy();
                                expect(toBuddy1).toBeTruthy();
                                expect(toBuddy2).toBeTruthy();
                                done();
                            });
                        });
                    });
                });
            });
        });
    }
});