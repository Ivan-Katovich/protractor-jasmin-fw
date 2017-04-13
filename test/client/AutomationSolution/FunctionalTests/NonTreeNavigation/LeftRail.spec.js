exports.tags = ['File_Navigation', 'Left_Rail'];
/*
    LeftRail navigation feature;
    Created: ...
    Refactored: 9/30/2016, navasaal
*/

/* modeling; */
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var IR_NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var IR_ToDoList = require('./../../pageObjects/LeftRail/ToDoList.js');
var DiaryList = require('./../../pageObjects/LeftRail/DiaryList.js');
var ImportQueue = require('../../PageObjects/LeftRail/ImportQueue.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var SearchPage = require('./../../pageObjects/SearchPage.js');
var FileTree = require('./../../pageObjects/Containers/FileTree.js');

/* objects; */
var navigationBar = new NavigationBar();
var leftRailBar = new LeftRailBar();
var navigationBar = new IR_NavigationBar();
var toDoList = new IR_ToDoList();
var diaryList = new DiaryList();
var importQueue = new ImportQueue();
var openFilesDropdown = new OpenFilesDropdown();
var searchPage = new SearchPage();
var fileTree = new FileTree();

/* utilts; */
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

describe("Left Rail", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            })
        });

        it("1-Left rail panel with To Do List should be opened by default when a user opens WebClient", function () {
            return expect(toDoList.searchInput.isDisplayed()).toBe(true);
        });

        it("2-User should be able to switch between To Do List, Diary List, Open Files Dropdown and Import Bin in left rail panel", function () {
            return leftRailBar.diaryList.click()
            .then(function () {
                return expect(diaryList.searchInput.isDisplayed()).toBe(true);
            })
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return expect(openFilesDropdown.openFilesDropdownContainer.isDisplayed()).toBe(true);
            })
            .then(leftRailBar.importList.click)
            .then(function () {
                return expect(importQueue.importAllCheckbox.isDisplayed()).toBe(true);
            })
            .then(leftRailBar.toDoList.click)
            .then(function () {
                return expect(toDoList.searchInput.isDisplayed()).toBe(true);
            });
        });

        it("3-User should be able to expand and collapse left rail panel by clicking appropriate button", function () {
            leftRailBar.toDoList.click()
            .then(function () {
                return expect(toDoList.searchInput.isDisplayed()).toBe(false);
            })
            .then(leftRailBar.toDoList.click)
            .then(function () {
                return expect(toDoList.searchInput.isDisplayed()).toBe(true);
            })
            .then(leftRailBar.diaryList.click)
            .then(function () {
                return expect(diaryList.searchInput.isDisplayed()).toBe(true);
            })
            .then(leftRailBar.diaryList.click)
            .then(function () {
                return expect(diaryList.searchInput.isDisplayed()).toBe(false);
            })
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return expect(openFilesDropdown.openFilesDropdownContainer.isDisplayed()).toBe(true);
            })
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return expect(openFilesDropdown.openFilesDropdownContainer.isDisplayed()).toBe(false);
            })
            .then(leftRailBar.importList.click)
            .then(function () {
                return expect(importQueue.importAllCheckbox.isDisplayed()).toBe(true);
            })
            .then(leftRailBar.importList.click)
            .then(function () {
                return expect(importQueue.importAllCheckbox.isDisplayed()).toBe(false);
            });
        });

        it("4-User should be able to switch to search view which cover left rail view and back and state of left rail view should remains", function () {
            webdriverUtils.clickOnElement(leftRailBar.diaryList)
            .then(navigationBar.searchIcon.click)
            .then(function () {
                return searchPage.fileNameSearchBox.sendKeys("FileForAutoTesting");
            })
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(leftRailBar.diaryList.isDisplayed()).toBe(true);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(leftRailBar.toDoList);
            })
            .then(navigationBar.searchIcon.click)
            .then(navigationBar.searchIcon.click)
            .then(function () {
                return expect(leftRailBar.toDoList.isDisplayed()).toBe(true);
            })
            .then(function () {
                return webdriverUtils.clickOnElement(leftRailBar.openFilesDropdown);
            })
            .then(navigationBar.searchIcon.click)
            .then(navigationBar.searchIcon.click)
            .then(function () {
                return expect(leftRailBar.openFilesDropdown.isDisplayed()).toBe(true);
            });
        });
    }
});