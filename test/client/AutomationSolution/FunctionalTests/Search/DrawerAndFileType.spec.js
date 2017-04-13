exports.tags = ['File_Navigation', 'File_Search'];
/**
 * Created by corbetja on 9/05/2014.
 */

var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');

var navigationBar = new IR_NavigationBar();
var Q = require('q');
var irSearchPage = new IR_SearchPage();

var IR_RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var recordHeader = new IR_RecordHeader();

var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

describe("Search - Return Results", function () {
  

    if (browser.params.siteBase == 'iis') { //not actually written for mock

        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                navigationBar.searchIcon.click();
            });
        });

        it("should load Associated file types into the dropdown depending on selected drawer", function () {
            webdriverUtils.waitTillElementVisible(irSearchPage.drawerDropdown).then(function() {
                //Open drawer drop down and select a drawer and check related file types
                irSearchPage.drawerDropdown.click().then(function () {
                    webdriverUtils.clickOnElement(irSearchPage.drawerDropdownElement(1)).then(function () {
                        //Select 1st element in drawer which is Auto in live data
                        //Click on file type dropdown
                        irSearchPage.fileTypeDropdown.click().then(function() {
                            //Get the number of fileTypes
                            var numberOfFileTypes1 = irSearchPage.fileTypeDropdownElements.count();
                            var expectedValues = ['All File Types', 'Events', 'Personal Client'];

                            var actualValues = irSearchPage.fileTypeDropdownElements.map(function (fileType) {
                                return fileType.getText();
                            });
                            actualValues.then(function (actualVal) {
                                //verify the arrays are identical
                                expect(expectedValues).toEqual(actualVal);
                            });
                            expect(numberOfFileTypes1).toEqual(3);
                        });
                    });
                });
            });
        });

        it("should return files with drawer equals to selected", function () {
            var drawerName = 'Human Resource';
            webdriverUtils.waitTillElementVisible(irSearchPage.drawerDropdown).then(function() {
                webdriverUtils.clickOnElement(irSearchPage.drawerDropdown).then(function() {
                    webdriverUtils.clickOnElement(irSearchPage.drawerDropdownElement(2)).then(function() {
                        //human resource drawer has 33 files
                        irSearchPage.searchButton.click().then(function () {
                            irSearchPage.getAllResultsFromColumnInGrid("Drawer").map(function (items) {
                                for (var i = 0; i < items.length; i++) {
                                    expect(items[i].getText()).toBe(drawerName);
                                }
                            });
                            expect(irSearchPage.searchGrid.count()).toEqual(34);
                        });
                        //breadcrumb verification
                        expect(irSearchPage.searchResultsHeader.getText()).toBe('In Drawer ' + drawerName);
                    });
                });
            });
        });

        it("should return files with drawer and file type equal to selected", function () {
            var drawerName = 'Human Resource';
            var fileType = 'P&C CL';
            webdriverUtils.waitTillElementVisible(irSearchPage.drawerDropdown).then(function() {
                webdriverUtils.clickOnElement(irSearchPage.drawerDropdown).then(function() {
                    webdriverUtils.clickOnElement(irSearchPage.drawerDropdownElement(2)).then(function() {
                        webdriverUtils.clickOnElement(irSearchPage.fileTypeDropdown).then(function() {
                            webdriverUtils.clickOnElement(irSearchPage.fileTypeDropdownElement(2)).then(function() {
                                irSearchPage.searchButton.click().then(function () {
                                    expect(irSearchPage.searchGrid.count()).toEqual(2);
                                    irSearchPage.getAllResultsFromColumnInGrid("Drawer").then(function (items) {
                                        for (var i = 0; i < items.length; i++) {
                                            expect(items[i].getText()).toBe(drawerName);
                                        }
                                        irSearchPage.getAllResultsFromColumnInGrid("File Type").then(function (items) {
                                            for (var i = 0; i < items.length; i++) {
                                                expect(items[i].getText()).toBe(fileType);
                                            }
                                        });
                                    });
                                });
                                //breadcrumb verification
                                expect(irSearchPage.searchResultsHeader.getText()).toBe('In Drawer ' + drawerName + ' and File Type of ' + fileType);
                            });
                        });
                    });
                });
            });
        });

        it("should return files with drawer and file type equal to selected and file number equals to entered", function () {
            var searchKeyword = 'a%';
            var drawerName = 'Human Resource';
            var fileType = 'Events';

            webdriverUtils.waitTillElementVisible(irSearchPage.drawerDropdown).then(function() {
                irSearchPage.fileNumberSearchBox.sendKeys(searchKeyword).then(function () {
                    irSearchPage.drawerDropdown.click().then(function () {
                        //select human resource drawer
                        webdriverUtils.clickOnElement(irSearchPage.drawerDropdownElement(2)).then(function () {
                            browser.sleep(500); //Here to not make a huge block
                            irSearchPage.fileTypeDropdown.click().then(function () {
                                //select events fieltype
                                webdriverUtils.clickOnElement(irSearchPage.fileTypeDropdownElement(1)).then(function () {
                                    browser.sleep(500); //Here to not make a huge block
                                    irSearchPage.searchButton.click().then(function() {
                                        expect(irSearchPage.searchGrid.count()).toEqual(3);
                                        irSearchPage.getAllResultsFromColumnInGrid("Drawer").then(function (items) {
                                            for (var i = 0; i < items.length; i++) {
                                                expect(items[i].getText()).toBe(drawerName);
                                            }
                                            irSearchPage.getAllResultsFromColumnInGrid("File Type").then(function (items) {
                                                for (var i = 0; i < items.length; i++) {
                                                    expect(items[i].getText()).toBe(fileType);
                                                }
                                                irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                                                    for (var i = 0; i < items.length; i++) {
                                                        items[i].getText().then(function (number) {
                                                            expect(number.substring(0, 1).toLowerCase()).toBe('a');
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    });
                                    //breadcrumb verification
                                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of ' + searchKeyword + ' and In Drawer ' + drawerName + ' and File Type of ' + fileType);
                                });
                            });
                        });
                    });
                });
            });
        });

        it("should return file with drawer and file type equal to selected and file name equal to entered", function () {
            var fileName = 'RelatedFileForAutoTesting', fileNo = 'RELATEDFILEFORAUTOTESTING';
            var drawerName = 'Investigations';
            var fileType = 'Events';
            webdriverUtils.waitTillElementVisible(irSearchPage.drawerDropdown).then(function () {
                irSearchPage.fileNameSearchBox.sendKeys(fileName).then(function () {
                    irSearchPage.drawerDropdown.click().then(function () {
                        webdriverUtils.clickOnElement(irSearchPage.drawerDropdownElement(3)).then(function () {
                            browser.sleep(500).then(function () { //Here to not make a huge block                                                                    
                                irSearchPage.fileTypeDropdown.click().then(function () {
                                    webdriverUtils.clickOnElement(irSearchPage.fileTypeDropdownElementByText(fileType)).then(function () {
                                        browser.sleep(500).then(function () { //Here to not make a huge block                                               
                                            irSearchPage.searchButton.click().then(function () {
                                                webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function () {
                                                    expect(recordHeader.fileNumberRecordHeader.getText()).toBe(fileNo);
                                                    expect(recordHeader.fileNameRecordHeader.getText()).toBe(fileName);
                                                    expect(recordHeader.drawerRecordHeader.getText()).toBe(drawerName);
                                                    expect(recordHeader.fileTypeRecordHeader.getText()).toBe(fileType);
                                                });
                                                //breadcrumb verification
                                                navigationBar.searchIcon.click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                                                        expect(irSearchPage.searchResultsHeader.getText()).toBe('File Name of ' + fileName + ' and In Drawer ' + drawerName + ' and File Type of ' + fileType);
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


