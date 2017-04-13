exports.tags = ['Workflow_Tasks', 'To_Do_List_Task_Actions'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var RescheduleDialog = require('./../../pageObjects/ModalDialogs/RescheduleDialog.js');
var rescheduleDialog = new RescheduleDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('../../pageObjects/SearchPage.js');
var irSearchPage = new SearchPage();

var DatepickerPopup = require('./../../pageObjects/Containers/DatepickerPopup.js');
var datepickerPopup = new DatepickerPopup("attributes");

var tasksUtils = require('../../utils/tasksUtils.js');

var dataBaseHelper = require('../../utils/dataBaseHelper.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var dateObj = new Date();

var taskNextWeekReschedule = 'next week reschedule';
var taskTomorrowReschedule = 'tomorrorw reschedule';

describe("To Do List - Reschedule", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
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

        it('1-Selecting Reschedule in the Task Actions dropdown should open the Reschedule dialog with a textbox which currently displays the next days date', function (done) {
            var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var tomorrow = month + '/' + day + '/' + year;
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys('tomorrorw reschedule')
            expect(toDoList.tasks.count()).toBe(1);
            toDoList.hoverMouseOnTask('tomorrorw reschedule')
            toDoList.clickCog();
            taskActionsDropdown.rescheduleAction.click()
            .then(function () {
                browser.waitForAngular();
                rescheduleDialog.header.getText().then(function (elementTitle) {
                    expect(elementTitle).toBe('Reschedule Task');
                });
                rescheduleDialog.textInput.getAttribute('value').then(function (defaultDate) {
                    expect(defaultDate).toBe(tomorrow);
                });
                rescheduleDialog.cancelButton.click(); //close reassign dialog without changes
                done();
            });
        });

        it('2-Selecting the Reschedule button without changing the default date should move the task to being due tomorrow, and the task should not show up in today search.', function (done) {
            toDoList.searchInput.clear()
            .then(function () {
                return toDoList.searchInput.sendKeys('tomorrorw reschedule');
            })
            .then(function () {
                return expect(toDoList.tasks.count()).toBe(1);
            })
            .then(function () {
                return toDoList.hoverMouseOnTask(0);
            })
            .then(function () {
                return toDoList.clickCog();
            })
            .then(function () {
                return webdriverUtils.clickOnElement(taskActionsDropdown.rescheduleAction);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(rescheduleDialog.finalizeButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(toDoList.searchInput.clear)
            .then(function () {
                return toDoList.searchInput.sendKeys('tomorrorw reschedule');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.settingsFilter)
            })
                .then(toDoList.dateFilter('TODAY').click)
            .then(function () {
                return webdriverUtils.clickOnElement(toDoList.settingsFilter);
            })
            .then(function () {
                done(expect(toDoList.tasks.count()).toBe(0))
            });
        });

        it('3-If the user enters a date before todays, the reschedule button should be disabled and the user should be notified of the error', function (done) {
            var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var lastMonth = currentDate.getMonth();
            if (lastMonth == 0) {//so this month is jan
                lastMonth = 12; //change it to december
            }
            else if (lastMonth < 10) {
                lastMonth = '0' + lastMonth;
            }
            var year = currentDate.getFullYear();
            var monthAgo = lastMonth + '/' + day + '/' + year;


            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys('tomorrorw reschedule')
            .then(function () {
                toDoList.hoverMouseOnTask(0)
                .then(function () {
                    return toDoList.clickCog();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(taskActionsDropdown.rescheduleAction);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    browser.waitForAngular();
                    rescheduleDialog.textInput.clear();
                    rescheduleDialog.textInput.sendKeys(monthAgo);
                    expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    done();
                });
            });
        });

        it('4-If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date day, the user should be informed of the error and the Reschedule button should not be clickable', function (done) {
            var invalidDate = '02/30/2020';

            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys('tomorrorw reschedule').then(function () {
                expect(toDoList.tasks.count()).toBe(1);
                toDoList.hoverMouseOnTask(0)
                .then(function () {
                    return toDoList.clickCog();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(taskActionsDropdown.rescheduleAction);
                })
                .then(function () {
                    return browser.waitForAngular();
                }).then(function () {
                    browser.waitForAngular();
                    rescheduleDialog.textInput.clear();
                    rescheduleDialog.textInput.sendKeys(invalidDate);
                    expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    done();
                });
            });
        });

        it('5-If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date month, the user should be informed of the error and the Reschedule button should not be clickable', function (done) {
            var invalidDate = '13/02/2020';
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys('tomorrorw reschedule').then(function () {
                toDoList.hoverMouseOnTask(0)
                .then(function () {
                    return toDoList.clickCog();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(taskActionsDropdown.rescheduleAction);
                })
                .then(function () {
                    return browser.waitForAngular();
                }).then(function () {
                    browser.waitForAngular();
                    rescheduleDialog.textInput.clear();
                    rescheduleDialog.textInput.sendKeys(invalidDate);
                    expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    done();
                });
            });
        });

        it('6-If the Reschedule dialog is open and the user tries to use the text input to enter an invalid date year, the user should be informed of the error and the Reschedule button should not be clickable', function (done) {
            var invalidDate = '02/02/99999';
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys('tomorrorw reschedule').then(function () {
                toDoList.hoverMouseOnTask(0)
                .then(function () {
                    return toDoList.clickCog();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(taskActionsDropdown.rescheduleAction);
                })
                .then(function () {
                    return browser.waitForAngular();
                }).then(function () {
                    browser.waitForAngular();
                    rescheduleDialog.textInput.clear();
                    rescheduleDialog.textInput.sendKeys(invalidDate);
                    expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    done();
                });
            });
        });

        it("7-when a string is entered into the date attribute the 'Reschedule' button should be disabled", function (done) {
            var stringDate = 'stringsAreNotDates';
            toDoList.searchInput.clear();
            toDoList.searchInput.sendKeys('tomorrorw reschedule').then(function () {
                toDoList.hoverMouseOnTask(0)
                .then(function () {
                    return toDoList.clickCog();
                })
                .then(function () {
                    return webdriverUtils.clickOnElement(taskActionsDropdown.rescheduleAction);
                })
                .then(function () {
                    return browser.waitForAngular();
                }).then(function () {
                    browser.waitForAngular();
                    rescheduleDialog.textInput.clear();
                    rescheduleDialog.textInput.sendKeys(stringDate);
                    expect(rescheduleDialog.finalizeButton.getAttribute('class')).toContain('disabled');
                    done();
                });
            });
        });

        it('8-If a user selects to reschedule a task but then presses Cancel, the task should not be rescheduled', function (done) {
            //first schedule a task for today
            var currentDate = new Date;
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var today = month + '/' + day + '/' + year;
            toDoList.searchInput.clear().then(function () {
                toDoList.searchInput.sendKeys(taskTomorrowReschedule).then(function () {
                    toDoList.hoverMouseOnTask(taskTomorrowReschedule).then(function () {
                        toDoList.clickCog().then(function () {
                            taskActionsDropdown.rescheduleAction.click().then(function () {
                                webdriverUtils.waitTillElementVisible(rescheduleDialog.textInput).then(function () {
                                    rescheduleDialog.textInput.clear().then(function () {
                                        rescheduleDialog.textInput.sendKeys(today).then(function () {
                                            rescheduleDialog.header.click().then(function () { //click outside of textfield to validate date. Otherwise own't click
                                                rescheduleDialog.finalizeButton.click().then(function () { //save assigned to today
                                                    browser.waitForAngular().then(function () { //open todo list again where search persists
                                                        webdriverUtils.waitTillElementVisible(toDoList.settingsFilter).then(function () {
                                                            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                toDoList.dateFilter('TODAY').click().then(function () { //look at Today tasks and see that the task is marked to be due today
                                                                    webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                        expect(toDoList.tasks.count()).toBe(1); //should exist in today tasks 
                                                                        toDoList.hoverMouseOnTask(taskTomorrowReschedule).then(function () {
                                                                            toDoList.clickCog().then(function () {
                                                                                taskActionsDropdown.rescheduleAction.click().then(function () {
                                                                                    webdriverUtils.waitTillElementVisible(rescheduleDialog.textInput).then(function () {
                                                                                        rescheduleDialog.textInput.clear();
                                                                                        rescheduleDialog.textInput.sendKeys('12/25/2035');
                                                                                        rescheduleDialog.cancelButton.click();
                                                                                        browser.waitForAngular();
                                                                                        webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                                            toDoList.dateFilter('TODAY').click().then(function () { //look at Today tasks and see that the task is marked to be due today
                                                                                                webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                                                                                                    expect(toDoList.tasks.count()).toBe(1); //should still exist in today's tasks
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
