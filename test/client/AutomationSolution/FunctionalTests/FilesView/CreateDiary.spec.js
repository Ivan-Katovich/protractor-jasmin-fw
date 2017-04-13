/*
    Files_View feature. Avengers stuff: Create Task & Create Diary.
    Created: ...
    Refactored: 10/10/2016, navasaal
*/
exports.tags = ['Workflow_Diaries', 'Create_Diary'];

/* modeling; */
var SearchPage = require('./../../PageObjects/SearchPage.js');
var CreateTaskDiaryModal = require('./../../PageObjects/ModalDialogs/CreateTaskDiaryModal.js');
var CreateTaskDiaryDropdown = require('./../../PageObjects/DropdownLists/CreateTaskDiaryDropdown.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var FilesView = require('./../../PageObjects/FilesView.js');
var DatepickerPopup = require('./../../PageObjects/Containers/DatepickerPopup.js');
var Diary = require('./../../PageObjects/LeftRail/DiaryList.js');
var FileTree = require('../../PageObjects/Containers/FileTree.js');
var FileRelatedTasksDropdown = require('./../../PageObjects/DropdownLists/FileRelatedTasksDropdown.js');
var RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var filesview = require('../../PageObjects/FilesView.js');
var LockedTaskView = require('./../../PageObjects/Containers/LockedTaskView.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var searchUtil = require('../../BusinessProcess/Search.js');
var tasksUtils = require('../../utils/tasksUtils.js');
var Q = require('q');

/* objects; */
var leftRailBar = new LeftRailBar();
var createDiaryDialog = new CreateTaskDiaryModal();
var searchPage = new SearchPage();
var createTaskDiaryDropdown = new CreateTaskDiaryDropdown();
var navigationBar = new NavigationBar();
var filesView = new FilesView();
var datepickerPopup = new DatepickerPopup("attributes");
var diaryList = new Diary();
var fileTree = new FileTree();
var fileTaskList = new FileRelatedTasksDropdown();
var recordHeader = new RecordHeader();
var filesArea = new filesview();
var lockedTaskView = new LockedTaskView();

/* vars; */
var file = "CreateDiary";
var folder = "Folder1";
var document = "F1D1";
var page = 'doc.doc';
var diary = "CreateDiaryTesting";


function getCurrentUser() {
    var currentUser;
    if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
        currentUser = "XP1";
    } else {
        currentUser = browser.params.defaultUserName;
    }
    return currentUser;
}

function createDiary(diary) {
    return filesView.createIcon.click()
    .then(createTaskDiaryDropdown.createDiaryAction.click)
    .then(function () {
        return webdriverUtils.waitTillElementVisible(createDiaryDialog.cancelButton);
    })
    .then(function () {
        return createDiaryDialog.description.sendKeys(diary);
    })
    .then(createDiaryDialog.doneButton.click)
    .then(function () {
        return browser.waitForAngular();
    });
};

describe("Create Diary", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return tasksUtils.deleteDiaryByDescription(diary)
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            })
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return leftRailBar.diaryList.waitReady();
            })
            .then(function () {
                return browser.waitForAngular();
            })
        });

        it("1-when a user creates a diary on a file level it should be displayed in the Diary List and File Related Tasks", function () {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                return createDiary(diary);
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge);
            })
            .then(recordHeader.fileTaskListBadge.click)
            .then(fileTaskList.searchInput.clear)
            .then(function () {
                return fileTaskList.searchInput.sendKeys(diary);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(fileTaskList.diaryDescription(0)).toEqual(diary);
            })
            .then(leftRailBar.diaryList.click)
            .then(diaryList.searchInput.clear)
            .then(function () {
                return diaryList.searchInput.sendKeys(diary);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(diaryList.diaryDescription(0).getText()).toEqual(diary);
            });
        });

        it("2-'Available Date', 'Priority', 'Assigned To' and 'Diary Description' fields should be displayed with default values", function (done) {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createDiaryAction.click)
            .then(function () {
                done(function(){
                    expect(createDiaryDialog.assignToDropdown).toBeDefined();
                    expect(createDiaryDialog.assignToValue).toEqual(getCurrentUser());
                    expect(createDiaryDialog.priorityDropdown).toBeDefined();
                    expect(createDiaryDialog.priorityDropdown.getAttribute("title")).toEqual("1");
                    expect(createDiaryDialog.getClassOfPriorityDropdown).toContain("field-required");
                    expect(createDiaryDialog.availableDateInput).toBeDefined();
                    expect(createDiaryDialog.getClassOfAvailableDateInput).toContain("field-required");
                    expect(createDiaryDialog.availableDateInput.getAttribute("value")).toEqual(conversionUtils.getDate(new Date()));
                    expect(createDiaryDialog.description).toBeDefined();
                    expect(createDiaryDialog.description.getAttribute("title")).toEqual("Diary Description");
                });
            });
        });

        it("3-user names should be displayed in the 'Assign To' dropdown with selectable values", function () {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createDiaryAction.click)
            .then(createDiaryDialog.assignToDropdown.click)
            .then(function(){
                return createDiaryDialog.assignToAllUsers.count();
            })
            .then(function (count) {
                return expect(count).toBeGreaterThan(0);
            });
        });

        it("4-when a user creates a diary on a folder level it should be displayed on this level", function () {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.folderByText(folder));
            })
            .then(fileTree.folderByText(folder).click)
            .then(function () {
                return createDiary(diary);
            })
            .then(leftRailBar.diaryList.click)
            .then(diaryList.searchInput.clear)
            .then(function () {
                return diaryList.searchInput.sendKeys(diary);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(diaryList.diaryDescription(0).getText()).toEqual(diary);
            })
            .then(diaryList.diaryFileName(0).click)
            .then(function () {
                return expect(filesArea.fileViewTitle.getText()).toEqual(folder);
            })
            .then(function () {
                return expect(lockedTaskView.taskDescription.getText()).toBe(diary);
            });
        });

        it("5-priority should be displayed in the 'Priority' dropdown in ascending order with selectable values", function (done) {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createDiaryAction.click)
            .then(function () {
                return createDiaryDialog.cancelButton.waitReady();
            })
            .then(createDiaryDialog.priorityDropdown.click)
            .then(function () {
                return createDiaryDialog.allPriorities.count();
            })
            .then(function (count) {
                expect(count - 1).toEqual(10);
                var promises = [];
                for (var i = 1; i < count; i++) {
                    promises.push(createDiaryDialog.priorityDropdownElement(i).getText());
                }
                Q.all(promises).then(function (priorityFromDropdown) {
                    done(expect(conversionUtils.isArraySortedAscending(priorityFromDropdown)).toBe(true));
                });
            });
        });

        it("6-after available date selection it should display a correct date in mm/dd/yyyy", function () {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createDiaryAction.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(createDiaryDialog.datepickerIcon.click)
            .then(function () {
                datepickerPopup.container = createDiaryDialog.diaryDataContainer;
                var dateObj = new Date();
                dateObj.setDate(dateObj.getDate() + 1);
                var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();

                if (new Date().getDate() >= 25) {
                    dateObj.setDate(15);
                    dateObj.setMonth(new Date().getMonth() + 1);
                    date = 15;
                    datepickerPopup.rightRowButton.click();
                }

                datepickerPopup.clickDateButton(date.toString(), browser);
                expect(datepickerPopup.datepickerContainer.isPresent()).toBe(false);
                expect(createDiaryDialog.availableDateInput.getAttribute("value")).toEqual(conversionUtils.getDate(dateObj));
            });
        });

        it("7-after enter of date with invalid format the date picker boarder should be red and 'Done' button should be disabled", function () {
            datepickerPopup.container = createDiaryDialog.diaryDataContainer;
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createDiaryAction.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(createDiaryDialog.cancelButton);
            })
            .then(createDiaryDialog.availableDateInput.clear)
            .then(createDiaryDialog.availableDateInput.click)
            .then(function () {
                return createDiaryDialog.availableDateInput.sendKeys("gyjhrtjrt");
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(createDiaryDialog.availableDateInput.getAttribute("class")).toContain("ng-invalid-date");
            })
            .then(function () {
                return expect(createDiaryDialog.doneButton.getAttribute("class")).toContain('disabled');
            })
            .then(function () {
                var dateObj = new Date();
                var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();

                if (dateObj.getDate() >= 25) {
                    dateObj.setDate(15);
                    date = 15;
                    datepickerPopup.rightRowButton.click();
                }

                datepickerPopup.clickDateButton(date.toString(), browser);
                browser.waitForAngular().then(function () {
                    expect(datepickerPopup.datepickerContainer.isPresent()).toBe(false);
                    expect(createDiaryDialog.availableDateInput.getAttribute("class")).not.toContain("ng-invalid-date");
                });

                createDiaryDialog.availableDateInput.clear();
                createDiaryDialog.availableDateInput.click().then(function () {
                    createDiaryDialog.availableDateInput.sendKeys("13/32/2015").then(function () {
                        browser.waitForAngular().then(function () {
                            expect(createDiaryDialog.doneButton.getAttribute("class")).toContain('disabled');
                            expect(createDiaryDialog.availableDateInput.getAttribute("class")).toContain("ng-invalid-date");
                        });
                    });
                });
            });
        });

        it("8-when a user creates a diary on a first page of document level it should be displayed on this level", function () {
            return searchUtil.openFile(file)
            .then(function () {
                return filesView.createIcon.waitReady();
            })
            .then(filesView.createIcon.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.folderByText(folder));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document, 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText(page));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(page, 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return createDiary(diary);
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(document, 'document')
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(leftRailBar.diaryList.click)
            .then(diaryList.searchInput.clear)
            .then(function () {
                return diaryList.searchInput.sendKeys(diary);
            })
            .then(function () {
                return expect(diaryList.diaryDescription(0).getText()).toEqual(diary);
            })
            .then(diaryList.diaryFileName(0).click)
            .then(function () {
                return filesArea.fileViewHeader.getText();
            })
            .then(function (header) {
                return expect(header.toLowerCase()).toContain('doc.doc');
            });
        });

        it("9-available dates prior to today's date must be disabled", function () {
            datepickerPopup.container = createDiaryDialog.diaryDataContainer;
            return searchUtil.openFile(file)
             .then(function () {
                 return filesView.createIcon.waitReady();
             })
             .then(filesView.createIcon.click)
            .then(createTaskDiaryDropdown.createDiaryAction.click)
            .then(function(){
                return createDiaryDialog.cancelButton.waitReady();
            })
            .then(function () {
                var dateObj = new Date();
                dateObj.setDate(dateObj.getDate() - 1);
                createDiaryDialog.availableDateInput.clear();
                createDiaryDialog.availableDateInput.sendKeys(conversionUtils.getDate(dateObj));
                expect(createDiaryDialog.doneButton.getAttribute("class")).toContain("disabled");
                createDiaryDialog.datepickerIcon.click();
                var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
                if (dateObj.getDate() == 1 && dateObj.getDay() == 0) {
                    datepickerPopup.leftRowButton.click();
                }
                datepickerPopup.ifDateButtonDisabled(date.toString(), function (value) {
                    expect(value).toBe("true");
                });
            });
        });
    }
});