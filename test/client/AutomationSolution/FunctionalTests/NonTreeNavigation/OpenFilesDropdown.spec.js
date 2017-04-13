exports.tags = ['File_Navigation', 'Left_Rail'];
var mockBackend = require('../../utils/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');

var conversionUtils = require('../../utils/conversionUtils.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var Filesview = require('../../PageObjects/FilesView.js');
var ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var userSettingsDropdown = require('./../../PageObjects/DropdownLists/UserSettingsDropdown.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var LoginPage = require('./../../PageObjects/LoginPage.js');
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var leftRailBar = new LeftRailBar();
var filesArea = new Filesview();
var fileTree = new FileTree();
var errorMessage = new ErrorMessage();
var settingsDropdown = new userSettingsDropdown();
var irSearchPage = new SearchPage();
var navigationBar = new NavigationBar();
var openFilesDropdown = new OpenFilesDropdown();
var recordHeader = new RecordHeader();
var loginPage = new LoginPage();

var Q = require('q');
var noOpenFilesMessage = "You have no open files";
var header = "OPEN FILES";


var data = {
    attributes: '',
    drawer: '',
    fileMarks: '',
    fileName: '%25',
    fileNumber: '',
    fileType: ''
};

/* Any front-end/mock tests should be moved to separate spec in frontend folder
var mock = mockBackend([
    {
        testRoute: 'api/files/find',
        testScenarios: [0, 1, 2, 3],
        testData: data,
        testMethod: 'POST'
    }
]);
*/

describe("Open files dropdown",
    function() {

        beforeEach(function() {

            /* if (browser.params.siteBase == 'node') {
                mockUtils.createMockData(mockBackend, 'api/files/find', 0, 'POST');
                navigationBar.searchIcon.click();
                browser.sleep(500);
            } else if (browser.params.siteBase == 'iis') { */

            browser.driver.get(browser.params.defaultUrl)
                .then(navigationBar.searchIcon.click)
                .then(function() {
                    webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox)
                        .then(function() {
                            irSearchPage.fileNameSearchBox.clear()
                                .then(function() {
                                    return irSearchPage.fileNameSearchBox.sendKeys("%");
                                })
                                .then(irSearchPage.searchButton.click)
                                .then(function() {
                                    return webdriverUtils.waitTillElementVisible(irSearchPage.clearResultsButton);
                                });
                        });
                });
        });

        function openFiles(count, callback) {
            var promise = [];
            for (var i = 0; i < count; i++) {
                promise.push(irSearchPage.cellFromResultsGrid("file number", i)
                    .click()
                    .then(function() {
                        return browser.waitForAngular();
                    })
                    .then(navigationBar.searchIcon.click));
            }
            Q.all(promise)
                .then(function() {
                    callback();
                });
        }

        function verifyFileRecord(i, number, name) {
            return openFilesDropdown.openFileRecord(i)
                .click()
                .then(function() {
                    return recordHeader.fileNumberRecordHeader.getText()
                })
                .then(function(fileNumber) {
                    return expect(fileNumber.toString().toUpperCase()).toBe(number);
                })
                .then(function() {
                    return recordHeader.fileNameRecordHeader.getText();
                })
                .then(function(fileName) {
                    return expect(fileName).toBe(name);
                });
        }

        /* todo; */
        xit("1-should show all of the open files that the user has opened in that browser session",
            function() {

                var gridFilesList = [];
                irSearchPage.cellFromResultsGrid("file number", 0)
                    .getText()
                    .then(function(text1) {

                        irSearchPage.firstLinkInResults.click();

                        navigationBar.searchIcon.click();
                        browser.sleep(2000);
                        irSearchPage.cellFromResultsGrid("file number", 1)
                            .getText()
                            .then(function(text2) {
                                irSearchPage.cellFromResultsGrid("file number", 1).click();
                                navigationBar.searchIcon.click();
                                browser.sleep(2000);
                                irSearchPage.cellFromResultsGrid("file number", 2)
                                    .getText()
                                    .then(function(text3) {
                                        //changing values to uppercase since all the file number values are displayed in capital letters
                                        gridFilesList.push(text3.toUpperCase());
                                        gridFilesList.push(text2.toUpperCase());
                                        gridFilesList.push(text1.toUpperCase());
                                        irSearchPage.cellFromResultsGrid("file number", 2).click();

                                        leftRailBar.openFilesDropdown.click();
                                        browser.sleep(2000);
                                        expect(openFilesDropdown.dropdownHeader.getText()).toContain(header);
                                        openFilesDropdown.getFileNumbers.then(function(items) {
                                            var promises = [];
                                            for (var i = 0; i < items.length; i++) {
                                                promises.push(items[i].getText());
                                            }
                                            Q.all(promises)
                                                .done(function(dropdownFilesList) {
                                                    var resultsArray = [], dropdownFileNumberList = [];
                                                    expect(dropdownFilesList.length).toBeGreaterThan(0);
                                                    if (dropdownFilesList.length > 0) {
                                                        for (var i = 0; i < gridFilesList.length; i++) {
                                                            resultsArray.push(gridFilesList[i]);

                                                            //Removed the badge info from Open File DropDown and add it to the array
                                                            dropdownFileNumberList.push(dropdownFilesList[i]);
                                                        }
                                                        var flag =
                                                            'file numbers opened from search grid does not match to the open file dropdown fileNumbers';
                                                        if (conversionUtils
                                                            .isArraysEquivalent(dropdownFileNumberList, resultsArray)) {
                                                            flag =
                                                                'file numbers opened from search grid matches to the open file dropdown fileNumbers';
                                                        }
                                                        expect(flag)
                                                            .toBe('file numbers opened from search grid matches to the open file dropdown fileNumbers');
                                                    }
                                                });
                                        });
                                    });
                            });
                    });
            });

        it("2-user should see close file icon only after hovering the mouse over the file",
            function() {
                irSearchPage.firstLinkInResults.click()
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(filesArea.fileViewTitle);
                    })
                    .then(leftRailBar.openFilesDropdown.click)
                    .then(function() {
                        return browser.waitForAngular();
                    })
                    .then(function() {
                        return expect(openFilesDropdown.removeOpenFileIconNotHovered(0).isDisplayed()).toBe(false);
                    })
                    .then(function() {
                        return openFilesDropdown.howerMouseOnFile(0);
                    })
                    .then(function() {
                        return expect(openFilesDropdown.removeOpenFileIconNotHovered(0).isDisplayed()).toBe(true);
                    });
            });

        it("3-should allow the user to close a single open file by selecting the X button next to it and that file should be removed from the dropdown list",
            function() {
                irSearchPage.firstLinkInResults.click()
                    .then(function() {
                        return webdriverUtils.waitTillElementVisible(filesArea.fileViewTitle);
                    })
                    .then(leftRailBar.openFilesDropdown.click)
                    .then(function() {
                        return openFilesDropdown.getFileList.count();
                    })
                    .then(function(count) {
                        return expect(count).toEqual(1);
                    })
                    .then(function() {
                        return openFilesDropdown.howerMouseOnFile(0);
                    })
                    .then(openFilesDropdown.closeFileIcon(0).click)
                    .then(function() {
                        return expect(openFilesDropdown.noFilesMessage.getText()).toEqual(noOpenFilesMessage);
                    });
            });

        it("4-should allow the user to close all opened files by selecting the X button at the top of Open Files Dropdown and all files should be removed from the dropdown list",
            function(done) {
                openFiles(3,
                    function() {
                        navigationBar.searchIcon.click()
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(function() {
                                return openFilesDropdown.getFileList.count();
                            })
                            .then(function(count) {
                                return expect(count).toEqual(3);
                            })
                            .then(openFilesDropdown.closeAllFilesButton.click)
                            .then(function() {
                                return expect(openFilesDropdown.noFilesMessage.getText()).toEqual(noOpenFilesMessage);
                            })
                            .then(navigationBar.searchIcon.click)
                            .then(function() {
                                done(expect(recordHeader.recordHeaderContainers.count()).toBe(0));
                            });
                    });
            });

        it("5-When a file is closed by selecting the X button in the Record Header the file should be removed from openFilesDropdownList",
            function(done) {
                openFiles(3,
                    function() {
                        navigationBar.searchIcon.click()
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(recordHeader.closeFileButton.click)
                            .then(function() {
                                return expect(recordHeader.recordHeaderContainers.count()).toBe(2);
                            })
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(function() {
                                return openFilesDropdown.getFileList.count();
                            })
                            .then(function(count) {
                                return expect(count).toEqual(2);
                            })
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(recordHeader.closeFileButton.click)
                            .then(function() {
                                return expect(recordHeader.recordHeaderContainers.count()).toBe(1);
                            })
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(function() {
                                return openFilesDropdown.getFileList.count();
                            })
                            .then(function(count) {
                                return expect(count).toEqual(1);
                            })
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(recordHeader.closeFileButton.click)
                            .then(function() {
                                return expect(recordHeader.recordHeaderContainers.count()).toBe(0);
                            })
                            .then(function() {
                                done(expect(openFilesDropdown.noFilesMessage.getText()).toEqual(noOpenFilesMessage));
                            });
                    });
            });

        it("6-should allow the user to navigate to other opened files in the Open Files drop down by clicking on the text of the open file node",
            function(done) {
                openFiles(4,
                    function() {
                        navigationBar.searchIcon.click()
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(function() {
                                openFilesDropdown.getFileNumbers.map(function(number) {
                                        return number.getText();
                                    })
                                    .then(function(numbers) {
                                        openFilesDropdown.getFileNames.map(function(name) {
                                                return name.getText();
                                            })
                                            .then(function(names) {
                                                var prom = [];
                                                for (var i = 0; i < 4; i++) {
                                                    prom.push(verifyFileRecord(i, numbers[i], names[i]));
                                                }
                                                Q.all(prom)
                                                    .done(function() {
                                                        done();
                                                    });
                                            });
                                    });
                            });
                    });
            });

        it('7-If a user attempts to open more than 15 files they should be given a warning dialog,that states they can only have 15 files open at a time and need to close a file before opening more',
            function(done) {
                var errorMsg = 'You can only have 15 files open at one time. Close a file before trying to open more.';
                openFiles(15,
                    function() {
                        irSearchPage.cellFromResultsGrid("file number", 16)
                            .click()
                            .then(function() {
                                return errorMessage.errorMessageText;
                            })
                            .then(function(msg) {
                                return expect(errorMsg).toBe(msg);
                            })
                            .then(errorMessage.okButton.click)
                            .then(function() {
                                return browser.waitForAngular();
                            })
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(function() {
                                return openFilesDropdown.getFileList.count();
                            })
                            .then(function(count) {
                                done(expect(count).toEqual(15));
                            });
                    });
            });

        it('8-When a user opens multiple files and opens openfile dropdown, the most recently opened file will be on the top of the list in openfile dropdown ',
            function(done) {
                var openFilesCount = 4, openedFileNumbersFromSearchGrid = [];

                var promises = [];
                for (var i = 0; i < openFilesCount; i++) {
                    promises.push(irSearchPage.cellFromResultsGrid("file number", i)
                        .getText()
                        .then(function(fileNumber) {
                            return openedFileNumbersFromSearchGrid.push(fileNumber);
                        })
                        .then(irSearchPage.cellFromResultsGrid("file number", i).click)
                        .then(function() {
                            return browser.waitForAngular();
                        })
                        .then(navigationBar.searchIcon.click))
                }
                Q.all(promises)
                    .done(function() {
                        navigationBar.searchIcon.click()
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(function() {
                                return openFilesDropdown.getFileNumbers.get(0).getText();
                            })
                            .then(function(topMostFileValue) {
                                done(expect(openedFileNumbersFromSearchGrid[3].toLowerCase())
                                    .toBe(topMostFileValue.toLowerCase()));
                            });
                    });
            });

        it('9-When a user opens 2 files and selects a file, open file dropdown should be opened',
            function(done) {
                openFiles(2,
                    function() {
                        navigationBar.searchIcon.click()
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(function() {
                                return browser.waitForAngular();
                            })
                            .then(openFilesDropdown.openFileRecord(1).click)
                            .then(function() {
                                return browser.waitForAngular();
                            })
                            .then(function() {
                                done(expect(openFilesDropdown.visible).toBe(true));
                            })
                    });
            });

        it('10-When a user opens multiple files and selects a different file in the open file dropdown, the currently selected file should always be on the top of the list',
            function(done) {
                openFiles(3,
                    function() {
                        var text1
                        navigationBar.searchIcon.click()
                            .then(leftRailBar.openFilesDropdown.click)
                            .then(openFilesDropdown.openFileRecord(1).click)
                            .then(function() {
                                recordHeader.fileNumberRecordHeader.getText()
                                    .then(function(recordHeadFileNum) {
                                        openFilesDropdown.getFileNumbers.get(0)
                                            .getText()
                                            .then(function(text) {
                                                expect(recordHeadFileNum).toEqual(text);

                                                recordHeader.fileNameRecordHeader.getText()
                                                    .then(function(recordHeadFileName) {
                                                        openFilesDropdown.getFileNames.get(0)
                                                            .getText()
                                                            .then(function(text) {
                                                                done(expect(recordHeadFileName).toEqual(text));
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });

    it('11-When a user opens multiple files and closes the files (one by one) through the open files dropdown, the open file dropdown will stay open.', function (done) {
        openFiles(4, function() {
            navigationBar.searchIcon.click()
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                var prom = [];
                while (prom.length < 3) {
                    prom.push(openFilesDropdown.howerMouseOnFile(0)
                    .then(openFilesDropdown.closeFileIcon(0).click));
                }
                Q.all(prom).then(function () {
                    done(expect(openFilesDropdown.visible).toBe(true));
                });
            });
        });
    });

    it('12-When a user opens 4 files and close the file which is in the focus, open file dropdown will stay open and the next opened file in the list will come to the focus.', function (done) {
        openFiles(4, function () {
            var names = [];
            navigationBar.searchIcon.click()
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return openFilesDropdown.getFileNumbers.map(function (number) {
                    return number.getText();
                });
            })
            .then(function (numbers) {
                openFilesDropdown.howerMouseOnFile(0)
                .then(openFilesDropdown.closeFileIcon(0).click)
                .then(function () {
                    return expect(openFilesDropdown.visible).toBe(true);
                })
                .then(function () {
                    return openFilesDropdown.getFileNumbers.get(0).getText();
                })
                .then(function (number) {
                    done(expect(number).toBe(numbers[1]));
                })
            });
        });
    });

    /* todo: fix the scroll;  */
    fit('13-should have scrollable results if there are more files opened than what can be displayed in the dropdown at a time', function () {

        var openFilesCount = 15, openedFileNumbersFromSearchGrid = [];

        var promises = [];
        for (var i = 0; i < openFilesCount; i++) {
            promises.push(irSearchPage.cellFromResultsGrid("file number", i).getText()
            .then(function (fileNumber) {
                return openedFileNumbersFromSearchGrid.push(fileNumber);
            })
            .then(irSearchPage.cellFromResultsGrid("file number", i).click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(navigationBar.searchIcon.click))
        }
        Q.all(promises).done(function () {
            navigationBar.searchIcon.click()
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return openFilesDropdown.scroll.isDisplayed();
            })
            .then(function (value) {
                return expect(value).toBe(true);
            });
        });
    });
});