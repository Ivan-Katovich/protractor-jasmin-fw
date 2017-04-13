/*
    FileRelatedTasks_Find spec;
    Created: ...
    Refactored: 9/27/2016, navasaal
*/

exports.tags = ['Workflow_Tasks', 'File_Related_Search'];

/* modeling; */
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var SearchPage = require('./../../pageObjects/SearchPage.js');
var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');

/* objects; */
var navigationBar = new NavigationBar();
var searchPage = new SearchPage();
var fileTaskList = new FileRelatedTasksDropdown();
var recordHeader = new RecordHeader();

/* utils; */
var conversionUtils = require('../../utils/conversionUtils.js');
var Q = require('q');
var tasksUtils = require('../../utils/tasksUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

/* vars; */
var noTasksMessage = 'You have no items.';
var noDiariesMessage = 'You have no items.';
var file = 'FileWithDifferentTasks';
var file2 = 'TwoTasksAndTwoDiaries';
var file3 = 'FileWithTasksAndDiaries';

describe("File Related Tasks - Find", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(navigationBar.searchIcon.click)
            .then(function () {
                return browser.waitForAngular();
            });
        });

        it("1-should return no tasks and diaries in File Related Tasks List when entered invalid search keyword", function () {
            var searchKeyword = 'Invalid%#@!';
            return searchPage.fileNameSearchBox.sendKeys(file)
            .then(searchPage.searchButton.click)
            .then(function () {
                return recordHeader.fileTaskListBadge.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return fileTaskList.searchInput.sendKeys(searchKeyword);
            })
            .then(function () {
                return expect(fileTaskList.tasks.length).not.toBeDefined();
            })
            .then(function () {
                return expect(fileTaskList.noTasksMessageDisplayed.getText()).toContain(noTasksMessage);
            })
            .then(function () {
                return expect(fileTaskList.diaries.length).not.toBeDefined();
            })
            .then(function () {
                return expect(fileTaskList.noDiariesMessageDisplayed.getText()).toContain(noDiariesMessage);
            });
        });

        it("2-should return all tasks and diaries in File Related Tasks List when nothing is entered", function () {
            var searchKeyword = '';
            return searchPage.fileNameSearchBox.sendKeys(file)
            .then(searchPage.searchButton.click)
            .then(function () {
                return webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge);
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return fileTaskList.searchInput.sendKeys(searchKeyword);
            })
            .then(function () {
                return fileTaskList.tasks.count();
            })
            .then(function (tasksCount) {
                return expect(tasksCount).toEqual(8);
            });
        });

        it("3-should return tasks by Flow when appropriate value of Flow entered as a search keyword", function () {
            var searchKeyword = 'SimpleWorkFlow1';
            return searchPage.fileNameSearchBox.sendKeys(file)
            .then(searchPage.searchButton.click)
            .then(function () {
                return recordHeader.fileTaskListBadge.waitReady();
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return fileTaskList.searchInput.sendKeys(searchKeyword);
            })
            .then(function () {
                return fileTaskList.tasks.count();
            })
             .then(function (tasks) {
                 return expect(tasks).toBeGreaterThan(0);
             })
            .then(function () {
                return expect(fileTaskList.diaries.length).not.toBeDefined();
            })
            .then(function () {
                return expect(fileTaskList.noDiariesMessageDisplayed.getText()).toContain(noDiariesMessage);
            });
        });

        it("4-should return tasks by Step when appropriate value of Step entered as a search keyword", function () {
            var searchKeyword = 'Manual 1';
            return searchPage.fileNameSearchBox.sendKeys(file)
            .then(searchPage.searchButton.click)
            .then(function () {
                return webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge);
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function(){
                return fileTaskList.searchInput.sendKeys(searchKeyword);
            })    
            .then(function(){
                return fileTaskList.tasks.count();
            })   
            .then(function (tasksCount) {
                return expect(tasksCount).toBeGreaterThan(0);
            })
            .then(function(){
                return fileTaskList.tasks.count();
            })  
            .then(function (tasksCount) {
                for (var i = 0; i < tasksCount; i++) {
                    expect(fileTaskList.getTaskDetails(i, 'Step').getText()).toContain(searchKeyword);
                }
            })
            .then(function () {
                return expect(fileTaskList.diaries.length).not.toBeDefined();
            })
            .then(function () {
                expect(fileTaskList.noDiariesMessageDisplayed.getText()).toContain(noDiariesMessage);
            });
        });

        /* todo; */
        xit("5-should return tasks and diaries by Description when appropriate value of Description entered as a search keyword and count in footer should be updated", function () {
            searchPage.fileNameSearchBox.sendKeys(file2);
            searchPage.searchButton.click();
            webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge).then(function () {
                recordHeader.fileTaskListBadge.click();
                fileTaskList.searchInput.sendKeys("First");
                fileTaskList.tasks.count().then(function (tasksCount) {
                    for (var i = 0; i < tasksCount; i++) {
                        fileTaskList.taskDetailsExpander(i).click();
                        browser.waitForAngular();
                        expect(fileTaskList.taskDescription(i).getText()).toContain("First");
                    }

                    fileTaskList.diaries.count().then(function (diariesCount) {
                        for (var j = 0; j < diariesCount; j++) {
                            expect(fileTaskList.diaryDescription(j).getText()).toContain("First");
                        }
                        fileTaskList.searchInput.clear();
                        fileTaskList.searchInput.sendKeys("SecondDiary").then(function () {
                            fileTaskList.diaries.count().then(function (diariesCount2) {
                                expect(diariesCount2).toEqual(1);
                                expect(fileTaskList.diaryDescription(0).getText()).toContain("SecondDiary");
                                expect(fileTaskList.tasks.length).not.toBeDefined();
                                expect(fileTaskList.noTasksMessageDisplayed.getText()).toContain(noTasksMessage);
                                fileTaskList.searchInput.clear();
                                fileTaskList.searchInput.sendKeys("SecondTask").then(function () {
                                    fileTaskList.tasks.count().then(function (tasksCount2) {
                                        expect(tasksCount2).toEqual(1);
                                        expect(fileTaskList.diaries.length).not.toBeDefined();
                                        expect(fileTaskList.noDiariesMessageDisplayed.getText()).toContain(noDiariesMessage);
                                        fileTaskList.taskDetailsExpander(0).click().then(function () {
                                            expect(fileTaskList.taskDescription(0).getText()).toContain("SecondTask");
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it("6-should return all tasks and diaries by File Name when appropriate value of File Name entered as a search keyword", function () {
            var searchKeyword = file2;
            return searchPage.fileNameSearchBox.sendKeys(file2)
            .then(searchPage.searchButton.click)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return fileTaskList.searchInput.sendKeys(searchKeyword);
            })
            .then(function () {
                return fileTaskList.tasks.count();
            })
            .then(function (tasksCount) {
                return expect(tasksCount).toEqual(2);
            })
            .then(function () {
                return fileTaskList.diaries.count()
            })
            .then(function (diariesCount) {
                return expect(diariesCount).toEqual(2);
            });
        });

        it("7-should return all tasks and diaries by File Number when appropriate value of File Number entered as a search keyword", function () {
            var searchKeyword = file2;
            return searchPage.fileNameSearchBox.sendKeys(file2)
            .then(searchPage.searchButton.click)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return fileTaskList.searchInput.sendKeys(searchKeyword);
            })
            .then(function () {
                return fileTaskList.tasks.count();
            })
            .then(function (tasksCount) {
                return expect(tasksCount).toEqual(2);
            })
            .then(function () {
                return fileTaskList.diaries.count()
            })
            .then(function (diariesCount) {
                return expect(diariesCount).toEqual(2);
            });
        });

        /* todo; */
        xit("8-should return tasks and diaries found by Priority and also tasks and diaries containing 'Priority X' text in other fields", function () {
            searchPage.fileNameSearchBox.sendKeys(file3);
            searchPage.searchButton.click();
            webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge).then(function () {
                recordHeader.fileTaskListBadge.click();
                fileTaskList.searchInput.sendKeys("PRIORITY 1").then(function () {
                    fileTaskList.tasks.count().then(function (tasksCount) {
                        for (var i = 0; i < tasksCount; i++) {
                            expect(fileTaskList.priorityAndDate(i).getText()).toContain("PRIORITY 1");
                        }
                        fileTaskList.diaries.count().then(function (diariesCount) {
                            for (var i = 0; i < diariesCount; i++) {
                                expect(fileTaskList.diaryPriorityDate(i).getText()).toContain("PRIORITY 1");
                            }
                            fileTaskList.searchInput.clear();
                            fileTaskList.searchInput.sendKeys("PRIORITY 5").then(function () {
                                fileTaskList.diaries.count().then(function (diariesCount2) {
                                    expect(diariesCount2).toEqual(1);
                                    expect(fileTaskList.diaryDescription(0).getText()).toContain("PRIORITY 5");
                                    expect(fileTaskList.tasks.length).not.toBeDefined();
                                    expect(fileTaskList.noTasksMessageDisplayed.getText()).toContain(noTasksMessage);
                                    fileTaskList.searchInput.clear();
                                    fileTaskList.searchInput.sendKeys("PRIORITY 6").then(function () {
                                        fileTaskList.tasks.count().then(function (tasksCount2) {
                                            expect(tasksCount2).toEqual(1);
                                            expect(fileTaskList.diaries.length).not.toBeDefined();
                                            expect(fileTaskList.noDiariesMessageDisplayed.getText()).toContain(noDiariesMessage);
                                            fileTaskList.taskDetailsExpander(0).click().then(function () {
                                                expect(fileTaskList.taskDescription(0).getText()).toContain("PRIORITY 6");
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

        it("9-should persist previously entered search criteria and results", function () {
            var globalCount;
            return searchPage.fileNameSearchBox.sendKeys(file2)
            .then(searchPage.searchButton.click)
            .then(function () {
                return webdriverUtils.waitTillElementPresent(recordHeader.fileTaskListBadge);
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return fileTaskList.searchInput.sendKeys("SecondDiary")
            })
            .then(function () {
                return fileTaskList.diaries.count();
            })
            .then(function (diariesCount) {
                globalCount = diariesCount;
                return expect(fileTaskList.tasks.length).not.toBeDefined();
            })
            .then(navigationBar.searchIcon.click)
            .then(navigationBar.searchIcon.click)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return expect(fileTaskList.searchInput.getAttribute('value')).toContain("SecondDiary");
            })
            .then(function () {
                return fileTaskList.diaries.count()
            })
            .then(function (diariesCount2) {
                return expect(diariesCount2).toEqual(globalCount);
            })
            .then(function () {
                return expect(fileTaskList.tasks.length).not.toBeDefined();
            });
        });
    }
});