exports.tags = ['Workflow_Tasks', 'File_Related_Task_Actions'];

var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new SearchPage();

var FileRelatedTasksDropdown = require('./../../pageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var fileTaskList = new FileRelatedTasksDropdown();

var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeader();

var OpenFilesDropdown = require('./../../pageObjects/LeftRail/OpenFilesDropdown.js');
var openFilesDropdown = new OpenFilesDropdown();

var filesview = require('../../pageObjects/FilesView.js');
var filesArea = new filesview();

var FileTree = require('../../pageObjects/Containers/FileTree.js');
var fileTree = new FileTree();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var file1 = 'FileWithTasks_N2';
var file2 = 'FileWithTasks_A8';
var task1_ofFile1 = 'Task_WorkflowFilterTest_N2_M1';
var task2_ofFile1 = 'Task_WorkflowFilterTest_N2_M3';
var task1_ofFile2 = 'Task_WorkflowFilterTest_a8_M1';
var task2_ofFile2 = 'Task_WorkflowFilterTest_a8_M4';

var fileWithDifferentTasks = 'FileWithDifferentTasks';

describe("File Related Tasks - Navigation", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            });
        });

        it("1-when a user selects a task from 'File Related Tasks' which is tasked on a specific page, the page the task is on should display, page should be selected in tree, and file related tasks list should close", function () {
            return navigationBar.searchIcon.click()
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return searchPage.fileNumberSearchBox.sendKeys(fileWithDifferentTasks);
            })
            .then(searchPage.searchButton.click)
            .then(recordHeader.fileTaskListBadge.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return fileTaskList.findTask('TaskOnPage', function (taskIndex) {
                    return webdriverUtils.clickOnElement(fileTaskList.task(taskIndex))
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        return expect(recordHeader.activeFileNameRecordHeader.getText()).toBe(fileWithDifferentTasks);
                    })
                    .then(function () {
                        fileTaskList.searchInput.isDisplayed().then(function (fileTaskListOpen) {
                            expect(fileTaskListOpen).toBeFalsy();
                        });
                    })
                    .then(function () {
                        return filesArea.fileViewHeader.getText();
                    })
                    .then(function (pageName) {
                        return expect(pageName.toLowerCase()).toBe('gif_3pages.gif');
                    })
                    .then(function () {
                        return filesArea.pageNumberInput.getAttribute('value')
                    })
                    .then(function (pageNum) {
                        return expect(pageNum).toBe('2');
                    })
                    .then(function () {
                        return fileTree.selectedPages.getText();
                    })
                    .then(function (selNodes) {
                        return expect(selNodes[0].toLowerCase()).toContain('2: gif_3pages.gif');
                    });
                });
            });
        });

        it("2-when a user selects a task from 'File Related Tasks' which is tasked on a specific doc, the doc the task is on should display and be selected and expanded in tree, and file related task list closed", function (done) {
            var driver = browser.driver;
            navigationBar.searchIcon.click().then(function () {
                browser.waitForAngular().then(function () {
                    searchPage.fileNumberSearchBox.sendKeys(fileWithDifferentTasks).then(function () {
                        searchPage.searchButton.click().then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                browser.waitForAngular().then(function () {
                                    fileTaskList.findTask('TaskOnDoc', function (taskIndex) {
                                        browser.waitForAngular().then(function () {
                                            webdriverUtils.clickOnElement(fileTaskList.task(taskIndex)).then(function () {
                                                browser.waitForAngular().then(function () {
                                                    //verify recordheader of the file
                                                    expect(recordHeader.activeFileNameRecordHeader.getText()).toBe(fileWithDifferentTasks);
                                                    fileTaskList.searchInput.isDisplayed().then(function (fileTaskListOpen) {
                                                        expect(fileTaskListOpen).toBeFalsy();
                                                    });                                                    
                                                    //verify document name
                                                    filesArea.fileViewHeader.getText().then(function (docName) {
                                                        expect(docName.toLowerCase()).toBe('12/22/2015 documentwithdifferenttasks');
                                                    });
                                                    fileTree.selectedPages.getText().then(function (selNodes) {
                                                        expect(selNodes[0].toLowerCase()).toContain('12/22/2015 documentwithdifferenttasks');
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

        it("3-when a user selects a task from 'File Related Tasks' which is tasked on a specific folder, the folder the task is on should display and be selected and expanded in tree, and file related task list closed", function (done) {
            var driver = browser.driver;
            navigationBar.searchIcon.click().then(function () {
                browser.waitForAngular().then(function () {
                    searchPage.fileNumberSearchBox.sendKeys(fileWithDifferentTasks).then(function () {
                        searchPage.searchButton.click().then(function () {
                            recordHeader.fileTaskListBadge.click().then(function () {
                                browser.waitForAngular().then(function () {
                                    fileTaskList.findTask('TaskOnFolder', function (taskIndex) {
                                        browser.waitForAngular().then(function () {
                                            webdriverUtils.clickOnElement(fileTaskList.task(taskIndex)).then(function () {
                                                browser.waitForAngular().then(function () {
                                                    //verify recordheader of the file
                                                    expect(recordHeader.activeFileNameRecordHeader.getText()).toBe(fileWithDifferentTasks);
                                                    fileTaskList.searchInput.isDisplayed().then(function (fileTaskListOpen) {
                                                        expect(fileTaskListOpen).toBeFalsy();
                                                    });
                                                    //verify document name
                                                    filesArea.fileViewHeader.getText().then(function (folderName) {
                                                        expect(folderName.toLowerCase()).toBe('folderwithdifferenttasks');
                                                    });
                                                    fileTree.selectedPages.getText().then(function (selNodes) {
                                                        expect(selNodes[0].toLowerCase()).toContain('folderwithdifferenttasks');
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

        it("4-when a user selects a task from 'File Related Tasks' which is tasked on a specific file, the user should be directed to the file view and there should be nothing selected in tree, and file related task list closed", function (done) {
            var driver = browser.driver;
            navigationBar.searchIcon.click().then(function () {
                browser.waitForAngular().then(function () {
                    searchPage.fileNumberSearchBox.sendKeys(fileWithDifferentTasks).then(function () {
                        searchPage.searchButton.click().then(function () {
                            webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                                recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                                    expect(fileNo.toLowerCase()).toBe(fileWithDifferentTasks.toLowerCase());
                                });
                                recordHeader.fileTaskListBadge.click().then(function () {
                                    browser.waitForAngular().then(function () {
                                        fileTaskList.findTask('TaskOnFile', function (taskIndex) {
                                            browser.waitForAngular().then(function () {
                                                webdriverUtils.clickOnElement(fileTaskList.task(taskIndex)).then(function () {
                                                    browser.waitForAngular().then(function () {
                                                        fileTree.selectedPages.getText().then(function (treeSelection) {
                                                            expect(treeSelection.length).toBe(0); //check that nothing is selected in tree
                                                            fileTaskList.searchInput.isDisplayed().then(function (fileTaskListOpen) {
                                                                expect(fileTaskListOpen).toBeFalsy();
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

        it("5-when a user navigates to a file, all the file related tasks should be displayed in the 'File Related Tasks' dropdown", function (done) {
            //Set filters
            webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                webdriverUtils.clickOnElement(toDoList.dateFilter("ALL")).then(function () {
                    webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                        webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
                            webdriverUtils.clickOnElement(toDoList.flowFilter).then(function () {
                                //Find file in the To Do List
                                toDoList.searchInput.clear().then(function () {
                                    toDoList.searchInput.sendKeys(file1).then(function () {
                                        //Open file
                                        webdriverUtils.clickOnElement(toDoList.taskFileName(0)).then(function () {
                                            //Open 'File Related Tasks' dropdown
                                            recordHeader.fileTaskListBadge.click().then(function () {
                                                //Find certain task
                                                fileTaskList.findTask(task1_ofFile1, function (taskIndex1) {
                                                    expect(taskIndex1).toBeGreaterThan(-1);
                                                    //Find certain task
                                                    fileTaskList.findTask(task2_ofFile1, function (taskIndex2) {
                                                        expect(taskIndex2).toBeGreaterThan(-1);
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



    }
});