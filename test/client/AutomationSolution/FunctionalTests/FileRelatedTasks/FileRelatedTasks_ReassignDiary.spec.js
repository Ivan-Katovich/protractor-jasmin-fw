exports.tags = ['Workflow_Diary', 'File_Related_Diary_Actions'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var ReassignDialog = require('./../../pageObjects/ModalDialogs/ReassignDialog.js');
var reassignDialog = new ReassignDialog();

var TaskActionsDropdown = require('./../../pageObjects/DropdownLists/TaskActionsDropdown.js');
var taskActionsDropdown = new TaskActionsDropdown();

var DiaryList = require('./../../pageObjects/LeftRail/DiaryList.js');
var fileTaskList = new DiaryList();

var SearchPage = require('../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var tasksUtils = require('../../utils/tasksUtils.js');

var dataBaseHelper = require('../../utils/dataBaseHelper.js');
var Q = require('q');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var assignment;
var currentAssignment;
var group = 'xp1_test';
var unassigned = 'Unassigned';
var diary = 'diary reassign test';

describe("File Related Tasks - Reassign Diary", function () {

    if (browser.params.siteBase == 'iis') {
        // if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
        beforeEach(function () {
            tasksUtils.changePriority(diary, 8);
            currentAssignment = browser.params.defaultFullName;
            if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
                tasksUtils.reassignTask(diary, 'xp1');
                assignment = 'Jamie 1 Barnwell 1';
            } else if (browser.params.authentication == 'vsso') {
                assignment = 'xp2 xp2';
                tasksUtils.reassignTask(task, browser.params.defaultUserName);
            } else {
                assignment = 'jbarnwell1';
                tasksUtils.reassignTask(task, browser.params.defaultUserName);
            }
            browser.executeScript('window.localStorage.clear();');
            browser.driver.get(browser.params.defaultUrl).then(function () {
                browser.waitForAngular().then(function () {
                    navigationBar.searchIcon.click().then(function () {
                        searchPage.fileNameSearchBox.sendKeys("FileWithDifferentDiaries").then(function () {
                            searchPage.searchButton.click().then(function () {
                                recordHeader.fileTaskListBadge.click();
                            });
                        });
                    });
                });
            });
        });

        it('Selecting Reassign in the Diary Actions dropdown should open the Reassign dialog with an Assign To dropdown only with users with permissions to the diaries and no groups as well as a dropdown with values 0 - 9 to change the priority', function () {
            //first select a diary which gives permission to user Jamie 1 Barnwell 1 and check for user in Assign To list
            fileTaskList.searchInput.clear().then(function () {
                fileTaskList.searchInput.sendKeys('diary reassign test').then(function () {
                    expect(fileTaskList.diaries.count()).toBe(1);
                    fileTaskList.diaryActionsIcon(0).click().then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                            browser.waitForAngular().then(function () {
                                reassignDialog.header.getText().then(function (elementTitle) {
                                    expect(elementTitle).toBe('Reassign Diary');
                                });
                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                    if (browser.browserName != 'firefox') {
                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                    }
                                    browser.actions().sendKeys(assignment).perform().then(function () {
                                        reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                            browser.waitForAngular().then(function () {
                                                expect(assignToNames).toContain(assignment);
                                            });
                                            //verify that groups are not in the Assign To dropdown
                                            webdriverUtils.clickOnElement(reassignDialog.header).then(function () {
                                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                        browser.actions().sendKeys(group).perform().then(function () {
                                                            reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                                                browser.waitForAngular().then(function () {
                                                                    expect(assignToNames).not.toContain(group);
                                                                });
                                                                //verify that 'Unassigned' is not in the Assign To dropdown
                                                                webdriverUtils.clickOnElement(reassignDialog.header).then(function () {
                                                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                                            browser.actions().sendKeys(unassigned).perform().then(function () {
                                                                                reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                                                                    browser.waitForAngular().then(function () {
                                                                                        expect(assignToNames).not.toContain(unassigned);
                                                                                    });
                                                                                    webdriverUtils.clickOnElement(reassignDialog.header).then(function () { //close assign to dropdown by clicking header area
                                                                                        browser.waitForAngular().then(function () {
                                                                                            webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                                                                                reassignDialog.priorityElements().getText().then(function (priorities) {
                                                                                                    browser.waitForAngular().then(function () {
                                                                                                        expect(priorities.length).toBe(11);
                                                                                                        expect(priorities).toContain(''); //makes a space for the current priority?
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
                                                                                                    webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () { //close priority dropdown
                                                                                                        webdriverUtils.clickOnElement(reassignDialog.cancelButton); //close reassign dialog without changes
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
        }); // end it

        it('If a user changes the assigned to value as well as the priority value but then presses the cancel button, the assigned to and priority values should remain the same as before the dialog was opened', function () {
            var currentPriority;
            fileTaskList.searchInput.clear().then(function () {
                fileTaskList.searchInput.sendKeys(diary).then(function () {
                    expect(fileTaskList.diaries.count()).toBe(1);
                    fileTaskList.diaryActionsIcon(0).click().then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        taskActionsDropdown.reassignAction(0).click().then(function () {
                            browser.waitForAngular().then(function () {
                                reassignDialog.assignToDropdown.getText().then(function (currAssigned) {
                                    expect(currAssigned).toBe(currentAssignment);
                                });
                                reassignDialog.priorityDropdown.getText().then(function (currPriority) {
                                    expect(currPriority.trim()).toBe('8');
                                    currentPriority = currPriority.trim();
                                });
                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                        browser.actions().sendKeys(assignment).perform().then(function () {
                                            webdriverUtils.pressTab().then(function () { //select other user
                                                webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                                    var priorities = reassignDialog.priorityElements();
                                                    priorities.then(function (priorityList) {
                                                        webdriverUtils.clickOnElement(priorityList[1]).then(function () { //change priority to 0 
                                                            webdriverUtils.clickOnElement(reassignDialog.cancelButton).then(function () {
                                                                browser.waitForAngular().then(function () {
                                                                    recordHeader.fileTaskListBadge.click().then(function () {
                                                                        fileTaskList.diaryPriorityDate(0).getText().then(function (newPriority) {
                                                                            expect(newPriority).toContain(currentPriority); //check priorities did not change
                                                                        });
                                                                        fileTaskList.diaryActionsIcon(0).click().then(function () {
                                                                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                                                                browser.waitForAngular().then(function () {
                                                                                    reassignDialog.assignToDropdown.getText().then(function (newAssigned) {
                                                                                        expect(newAssigned).toBe(currentAssignment);
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
        }); //end it

        it('If a user changes the priority within the reassign dialog but does not change the assigned to value, the diary should remain assigned the same but with the updated priority value and the list should still be in order by priority', function () {
            var currentPriority;
            fileTaskList.searchInput.clear().then(function () {
                fileTaskList.searchInput.sendKeys(diary).then(function () {
                    expect(fileTaskList.diaries.count()).toBe(1);
                    fileTaskList.diaryActionsIcon(0).click().then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                            browser.waitForAngular().then(function () {
                                //currentlyAssigned = reassignDialog.assignToDropdown.getText(); //note the current assigned to and priority values
                                reassignDialog.assignToDropdown.getText().then(function (currAssigned) {
                                    expect(currAssigned).toBe(currentAssignment);
                                });
                                reassignDialog.priorityDropdown.getText().then(function (currPriority) {
                                    expect(currPriority.trim()).toBe('8');
                                    currentPriority = currPriority.trim();
                                });
                                webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                    //now change the priority and check that priority is different, assigned to is the same, and todolist is still in order by priority
                                    var prioritiesArr = reassignDialog.priorityElements();
                                    prioritiesArr.then(function (priorities) {
                                        webdriverUtils.clickOnElement(priorities[4]).then(function () { //change to 3

                                            webdriverUtils.clickOnElement(reassignDialog.finalizeButton).then(function () {
                                                browser.sleep(2000).then(function () {
                                                    recordHeader.fileTaskListBadge.click().then(function () {
                                                        fileTaskList.diaryPriorityDate(0).getText().then(function (newPriority) {
                                                            expect(newPriority).not.toBe(currentPriority);
                                                        });
                                                        fileTaskList.diaryActionsIcon(0).click().then(function () {
                                                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                                                browser.waitForAngular().then(function () {
                                                                    reassignDialog.assignToDropdown.getText().then(function (newAssignTo) {
                                                                        expect(newAssignTo).toBe(currentAssignment); //check that assigned to did not change
                                                                        webdriverUtils.clickOnElement(reassignDialog.cancelButton).then(function () {
                                                                            browser.waitForAngular().then(function () {
                                                                                recordHeader.fileTaskListBadge.click().then(function () {
                                                                                    fileTaskList.searchInput.clear().then(function () {
                                                                                        browser.waitForAngular().then(function () {
                                                                                            fileTaskList.diaries.count().then(function (count) {
                                                                                                expect(count).toBeGreaterThan(0);
                                                                                                var promises1 = [];
                                                                                                for (var i = 0; i < count; i++) {
                                                                                                    promises1.push(fileTaskList.diaryPriorityDate(i).getText());
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
        }); //end it

        it('If the currently signed in user reassigns a diary to another user but keeps the priority the same, it show in the file related diary list with the same priority and new assignment', function () {
            var currentPriority;
            fileTaskList.searchInput.clear().then(function () {
                fileTaskList.searchInput.sendKeys(diary).then(function () {
                    fileTaskList.diaryPriorityDate(0).getText().then(function (currPriority) {
                        currentPriority = currPriority.trim();
                    });
                    fileTaskList.diaryActionsIcon(0).click().then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        webdriverUtils.waitTillElementVisible(taskActionsDropdown.reassignAction(0)).then(function () {
                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                browser.waitForAngular().then(function () {
                                    reassignDialog.priorityDropdown.getText().then(function (dialogPriority) {
                                        expect(currentPriority).toContain(dialogPriority.trim()); //show that the current priority attained from diarylist matches default dropdown value
                                    });
                                    reassignDialog.assignToDropdown.getText().then(function (dialogAssigned) {
                                        expect(dialogAssigned).toBe(currentAssignment);
                                    });
                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                            browser.actions().sendKeys(assignment).perform().then(function () {
                                                webdriverUtils.pressTab().then(function () {
                                                    webdriverUtils.clickOnElement(reassignDialog.finalizeButton).then(function () {
                                                        browser.sleep(2000).then(function () {
                                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                                fileTaskList.findDiary(diary, function (taskIndex) {
                                                                    fileTaskList.diaryPriorityDate(taskIndex).getText().then(function (currentPriority) {
                                                                        expect(currentPriority).toContain('PRIORITY 8');
                                                                        fileTaskList.diaryActionsIcon(taskIndex).click().then(function () {
                                                                            browser.waitForAngular().then(function () {
                                                                                webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(taskIndex)).then(function () {
                                                                                    browser.waitForAngular().then(function () {
                                                                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                                                            if (browser.browserName != 'firefox') {
                                                                                                webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                                                                            }
                                                                                            browser.actions().sendKeys(assignment).perform().then(function () {

                                                                                                reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                                                                                    browser.waitForAngular().then(function () {
                                                                                                        expect(assignToNames).toContain(assignment);
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
        });



        it('If the currently signed in user reassigns a diary to another user and changes priority,it should show in the file related diary list with new priority and new assignment', function () {
            var currentPriority;
            fileTaskList.searchInput.clear().then(function () {
                fileTaskList.searchInput.sendKeys(diary).then(function () {
                    fileTaskList.diaryPriorityDate(0).getText().then(function (currPriority) {
                        currentPriority = currPriority.trim();
                    });
                    fileTaskList.diaryActionsIcon(0).click().then(function () {
                        taskActionsDropdown.container = fileTaskList.container;
                        webdriverUtils.waitTillElementVisible(taskActionsDropdown.reassignAction(0)).then(function () {
                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(0)).then(function () {
                                browser.waitForAngular().then(function () {
                                    reassignDialog.priorityDropdown.getText().then(function (dialogPriority) {
                                        expect(currentPriority).toContain(dialogPriority.trim()); //show that the current priority attained from diarylist matches default dropdown value
                                    });
                                    reassignDialog.assignToDropdown.getText().then(function (dialogAssigned) {
                                        expect(dialogAssigned).toBe(currentAssignment);
                                    });
                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                        webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                            browser.actions().sendKeys(assignment).perform().then(function () {
                                                webdriverUtils.pressTab().then(function () {
                                                    webdriverUtils.clickOnElement(reassignDialog.priorityDropdown).then(function () {
                                                        var priorities = reassignDialog.priorityElements();
                                                        priorities.then(function (priorityList) {
                                                            webdriverUtils.clickOnElement(priorityList[1]).then(function () { //change priority to 0 
                                                                webdriverUtils.clickOnElement(reassignDialog.finalizeButton).then(function () {
                                                                    browser.sleep(2000).then(function () {
                                                                        recordHeader.fileTaskListBadge.click().then(function () {
                                                                            fileTaskList.findDiary(diary, function (taskIndex) {
                                                                                fileTaskList.diaryPriorityDate(taskIndex).getText().then(function (currentPriority) {
                                                                                    expect(currentPriority).toContain('PRIORITY 0');
                                                                                    fileTaskList.diaryActionsIcon(taskIndex).click().then(function () {
                                                                                        browser.waitForAngular().then(function () {
                                                                                            taskActionsDropdown.container = fileTaskList.container;
                                                                                            webdriverUtils.clickOnElement(taskActionsDropdown.reassignAction(taskIndex)).then(function () {
                                                                                                browser.waitForAngular().then(function () {
                                                                                                    webdriverUtils.clickOnElement(reassignDialog.assignToDropdown).then(function () {
                                                                                                        if (browser.browserName != 'firefox') {
                                                                                                            webdriverUtils.clickOnElement(reassignDialog.assignToDropdown);
                                                                                                        }
                                                                                                        browser.actions().sendKeys(assignment).perform().then(function () {

                                                                                                            reassignDialog.assignToElements().getText().then(function (assignToNames) {
                                                                                                                browser.waitForAngular();
                                                                                                                expect(assignToNames).toContain(assignment);
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
                });
            });
        });
    }// end if
});
