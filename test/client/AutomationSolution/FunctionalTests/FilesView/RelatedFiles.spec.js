exports.tags = ['File_Navigation','File_Navigation'];
var IR_NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var navigationBar = new IR_NavigationBar();

var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();

var IR_SearchPage = require('./../../pageObjects/SearchPage.js');
var searchPage = new IR_SearchPage();

var IR_RelatedFilesDropdown = require('./../../pageObjects/DropdownLists/RelatedFilesDropdown.js');
var relatedFilesDropdown = new IR_RelatedFilesDropdown();

var IR_RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var recordHeader = new IR_RecordHeader();

var IR_Filesview = require('../../pageObjects/FilesView.js');
var filesArea = new IR_Filesview();

var IR_FileTree = require('../../pageObjects/Containers/FileTree.js');
var fileTree = new IR_FileTree();

var IR_OpenFilesDropdown = require('./../../pageObjects/LeftRail/OpenFilesDropdown.js');
var openFilesDropdown = new IR_OpenFilesDropdown();

var file = 'FileForAutoTesting';
var relatedFile1 = 'RelatedFile';
var relatedFile1number = 'RelatedFile';
var relatedFile1type = 'Personal Client';
var relatedFile2 = 'RelatedFileForAutoTesting';
var relatedFile2number = 'RelatedFileForAutoTesting';
var relatedFile2type = 'Events';
var relatedFilesCount = 2;


describe("Related Files - Dropdown", function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(leftRailBar.openFilesDropdown.click)
            .then(openFilesDropdown.closeAllFilesButton.click)
            .then(leftRailBar.toDoList.click)
            .then(navigationBar.searchIcon.click)
            .then(function () {
                return searchPage.fileNameSearchBox.sendKeys(file);
            })
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            
        });
        
        it("Related Files dropdown should display all the related files and it is possible to navigate to a file view via Related Files dropdown", function () {
            var relatedFilesCount = 2;
            
            recordHeader.relatedFileListBadge.click();
            browser.waitForAngular();

            expect(relatedFilesDropdown.title).toEqual("2 RELATED FILES");
            expect(relatedFilesDropdown.allRelatedFiles.count()).toEqual(relatedFilesCount);
            
            expect(relatedFilesDropdown.fileNumber(0).getText()).toEqual(relatedFile1number.toUpperCase());
            expect(relatedFilesDropdown.fileName(0).getText()).toEqual(relatedFile1);
            expect(relatedFilesDropdown.fileType(0).getText()).toEqual(relatedFile1type);
            
            expect(relatedFilesDropdown.fileNumber(1).getText()).toEqual(relatedFile2number.toUpperCase());
            expect(relatedFilesDropdown.fileName(1).getText()).toEqual(relatedFile2);
            expect(relatedFilesDropdown.fileType(1).getText()).toEqual(relatedFile2type);

            relatedFilesDropdown.fileName(0).click();
            browser.waitForAngular();
            expect(filesArea.fileViewTitle.getText()).toEqual(relatedFile1);

            recordHeader.relatedFileListBadge.click();
            browser.waitForAngular();
            relatedFilesDropdown.fileName(1).click();
            browser.waitForAngular();
            expect(filesArea.fileViewTitle.getText()).toEqual(relatedFile2);
            expect(fileTree.selectedPages.count()).toEqual(0);
        });

        it("Related Files dropdown should display all the related files except active file in the file view", function () {
            var relatedFilesCount = 2;

            recordHeader.relatedFileListBadge.click();
            browser.waitForAngular();
            
            expect(relatedFilesDropdown.allRelatedFiles.count()).toEqual(relatedFilesCount);

            expect(relatedFilesDropdown.fileName(0).getText()).toEqual(relatedFile1);
            expect(relatedFilesDropdown.fileName(1).getText()).toEqual(relatedFile2);

            relatedFilesDropdown.fileName(0).click();
            browser.waitForAngular();
            expect(filesArea.fileViewTitle.getText()).toEqual(relatedFile1);

            recordHeader.relatedFileListBadge.click();
            browser.waitForAngular();
            expect(relatedFilesDropdown.fileName(0).getText()).toEqual(file);
            expect(relatedFilesDropdown.fileName(1).getText()).toEqual(relatedFile2);

            relatedFilesDropdown.fileName(0).click();
            browser.waitForAngular();
            expect(filesArea.fileViewTitle.getText()).toEqual(file);

            recordHeader.relatedFileListBadge.click();
            browser.waitForAngular();
            expect(relatedFilesDropdown.fileName(0).getText()).toEqual(relatedFile1);
            expect(relatedFilesDropdown.fileName(1).getText()).toEqual(relatedFile2);
        });

        it("All files and their types opened via Related Files dropdown should be displayd in the Open File dropdown", function () {
            return recordHeader.relatedFileListBadge.click()
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(relatedFilesDropdown.allRelatedFiles.count()).toEqual(relatedFilesCount);
            })
            .then(relatedFilesDropdown.fileName(0).click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(filesArea.fileViewTitle.getText()).toEqual(relatedFile1);
            })
            .then(recordHeader.relatedFileListBadge.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return relatedFilesDropdown.fileName(1).getText()
            })
            .then(function (name) {
                return expect(name).toEqual(relatedFile2);
            })
            .then(relatedFilesDropdown.fileName(1).click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.fileViewTitle.getText();
            })
            .then(function (name2) {
                return expect(name2).toEqual(relatedFile2);
            })
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                expect(openFilesDropdown.getFileList.count()).toEqual(3);
                expect(openFilesDropdown.fileName(0).getText()).toEqual(relatedFile2);
                expect(openFilesDropdown.fileType(0).getText()).toEqual(relatedFile2type);
                expect(openFilesDropdown.fileName(1).getText()).toEqual(relatedFile1);
                expect(openFilesDropdown.fileType(1).getText()).toEqual(relatedFile1type);
                expect(openFilesDropdown.fileName(2).getText()).toEqual(file);
                expect(openFilesDropdown.fileType(2).getText()).toEqual(relatedFile2type);
            });
        });
    }
});