exports.tags = ['Workflow_Tasks', 'To_Do_List_Tree_Navigation'];
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new NavigationBar();

var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();

var ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var toDoList = new ToDoList();

var RecordHeaderElement = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new RecordHeaderElement();

var OpenFilesDropdown = require('./../../pageObjects/LeftRail/OpenFilesDropdown.js');
var openFilesDropdown = new OpenFilesDropdown();

var LockedTaskView = require('./../../pageObjects/Containers/LockedTaskView.js');
var lockedTaskView = new LockedTaskView();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var Q = require('q');

var FilesView = require('../../pageObjects/FilesView.js');
var filesArea = new FilesView();

var FileTree = require('./../../pageObjects/Containers/FileTree.js');
var fileTree = new FileTree();

var fileName = 'FileWithTasks_N2';
var otherFileName = 'FileWithTasks_A8';
var taskOnFileN2 = 'Task_WorkflowFilterTest_N2_M1';
var otherTaskOnFileN2 = 'Task_WorkflowFilterTest_N2_M3';
var taskOnFileA8 = 'Task_WorkflowFilterTest_a8_M1';


describe("To Do List - Navigation", function () {

    if (browser.params.siteBase == 'iis') {
        beforeEach(function (done) {
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

        it("1-when a user selects a task from 'To Do List' which is tasked on a specific page, the page should display, be selected in tree, and todo list should close", function (done) {
            //navigate to a file with multiple pages containing a task on the second page
            toDoList.searchInput.clear().then(function () {
                toDoList.searchInput.sendKeys('TaskOnPage').then(function () {
                    toDoList.taskFileName(0).click().then(function () {
                        browser.waitForAngular();
                        //verify recordheader of the file
                        expect(recordHeader.activeFileNameRecordHeader.getText()).toBe('FileWithDifferentTasks');
                        //verify name
                        filesArea.fileViewHeader.getText().then(function (docName) {
                            expect(docName.toLowerCase()).toBe('gif_3pages.gif');
                        });
                        //verify page number
                        filesArea.pageNumberInput.getAttribute('value').then(function (pageNum) {
                            expect(pageNum).toBe('2');

                            toDoList.searchInput.isDisplayed().then(function (toDoListOpen) {
                                expect(toDoListOpen).toBeFalsy();
                            });
                            fileTree.fileTreeSymbol.click().then(function () {
                                fileTree.selectedPages.getText().then(function (selNodes) {
                                    expect(selNodes[0].toLowerCase()).toContain('2: gif_3pages.gif');
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it("2-when a user selects a task from 'To Do List' which is tasked on a specific folder, the folder should display, be selected and expanded in tree, and todo list should close", function (done) {
            toDoList.searchInput.clear().then(function () {
                toDoList.searchInput.sendKeys('TaskOnFolder').then(function () {
                    toDoList.taskFileName(0).click().then(function () {
                        browser.waitForAngular();
                        //verify recordheader of the file
                        expect(recordHeader.activeFileNameRecordHeader.getText()).toBe('FileWithDifferentTasks');
                        //verify document name
                        filesArea.fileViewHeader.getText().then(function (folderName) {
                            expect(folderName.toLowerCase()).toBe('folderwithdifferenttasks');
                        });
                        toDoList.searchInput.isDisplayed().then(function (toDoListOpen) {
                            expect(toDoListOpen).toBeFalsy();
                        });
                        fileTree.fileTreeSymbol.click().then(function () {
                            fileTree.selectedPages.getText().then(function (selNodes) {
                                expect(selNodes[0].toLowerCase()).toContain('folderwithdifferenttasks');
                                done();
                            });
                        });
                    });
                });
            });
        });

        it("3-when a user selects a task from 'To Do List' which is tasked on a specific doc, the doc should display, be selected and expanded in tree, and todo list should close", function (done) {
            toDoList.searchInput.clear().then(function () {
                toDoList.searchInput.sendKeys('TaskOnDoc').then(function () {
                    toDoList.taskFileName(0).click().then(function () {
                        browser.waitForAngular();
                        //verify recordheader of the file
                        expect(recordHeader.activeFileNameRecordHeader.getText()).toBe('FileWithDifferentTasks');
                        //verify document name
                        filesArea.fileViewHeader.getText().then(function (docName) {
                            expect(docName.toLowerCase()).toBe('12/22/2015 documentwithdifferenttasks');
                        });
                        toDoList.searchInput.isDisplayed().then(function (toDoListOpen) {
                            expect(toDoListOpen).toBeFalsy();
                        });

                        fileTree.fileTreeSymbol.click().then(function () {
                            fileTree.selectedPages.getText().then(function (selNodes) {
                                expect(selNodes[0].toLowerCase()).toContain('12/22/2015 documentwithdifferenttasks');
                                done();
                            });
                        });
                    });
                });
            });
        });

        it("4-when a user selects a task from 'To Do List' which is tasked on a specific file, the file should display (file level never selected in tree), and todo list should close", function (done) {
            toDoList.searchInput.clear().then(function () {
                toDoList.searchInput.sendKeys('TaskOnFile').then(function () {
                    toDoList.taskFileName(0).click().then(function () {
                        browser.waitForAngular();
                        //verify recordheader of the file
                        expect(recordHeader.activeFileNameRecordHeader.getText()).toBe('FileWithDifferentTasks');
                        toDoList.searchInput.isDisplayed().then(function (toDoListOpen) {
                            expect(toDoListOpen).toBeFalsy();
                        });
                        //verify name
                        filesArea.fileViewHeader.getText().then(function (fileName) {
                            expect(fileName.toLowerCase()).toBe('filewithdifferenttasks');
                            done();
                        });                        
                    });
                });
            });
        });


        it("5-should open only one file in the Open File Dropdown when user does doubleclick on the title of task in To Do List ", function (done) {
            //find task in to do list
            toDoList.searchInput.sendKeys(fileName).then(function () {
                browser.waitForAngular();
                var taskDescription = toDoList.taskDescription(0).getText();
                //double click on task for opening it on files view
                webdriverUtils.doubleClick(toDoList.taskFileName(0)).then(function () {
                    browser.waitForAngular();
                    //verify recordheader of the file
                    expect(recordHeader.fileNameRecordHeader.getText()).toBe(fileName);
                    //verify task in locked task view
                    expect(lockedTaskView.taskDescription.getText()).toBe(taskDescription);
                    //verify that only one file appears in open files dropdown and close it at the end
                    webdriverUtils.clickOnElement(leftRailBar.openFilesDropdown);
                    openFilesDropdown.getFileList.count().then(function (count) {
                        browser.waitForAngular();
                        expect(count).toEqual(1);
                        browser.waitForAngular();
                        openFilesDropdown.removeOpenFileIcon(0).click();
                        done();
                    });
                });
            });
        });

    }
});