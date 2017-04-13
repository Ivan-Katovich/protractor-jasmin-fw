//todo: remove from e2e tests folder

// Test that when user does a search and sorts the data and clicks off of the Search Tab to another tab
// and clicks back on to the Search tab the data order should persist
exports.tags = ['File_Navigation', 'File_Search'];
var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var Q = require('q');
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var irSearchPage = new IR_SearchPage();
var navigationBar = new IR_NavigationBar();

var searchKeyword = '%';

var data = {
    attributes: '',
    drawer: '',
    fileMarks: '',
    fileName: '%25',
    fileNumber: '',
    fileType: ''
};

var mock = mockBackend([
    {
        testRoute: 'api/files/find',
        testScenarios: [0, 1, 2],
        testScope: 'success',
        testMethod: 'POST'
    }
]);

var browserName; //This is undefined if the siteBase is not node

describe("Search - Persistence", function () {

    if (browser.params.siteBase == 'node') {

        beforeEach(function () {
            mockUtils.createMockData(mockBackend, 'api/files/find', 0, 'POST');
            navigationBar.searchIcon.click();
            webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function () {
                irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                    irSearchPage.searchButton.click().then(function () {
                        expect(irSearchPage.searchGrid.count()).toBeGreaterThan(1);
                    });
                });
            });
        });

            function sortGridClick(columnName) {
                var element = irSearchPage.buttonInSearchResultsGridHeader(columnName);
                webdriverUtils.clickOnElement(element);
            }

            function validatePersistanceOfDataOrder(columnName, done) {
                sortGridClick(columnName);
                browser.waitForAngular().then(function () {
                    irSearchPage.isSortButtonUpActive(columnName).then(function (isActive) {
                        if (!isActive) {
                            irSearchPage.getAllResultsFromColumnInGrid(columnName).then(function (items) {
                                var promises = [];
                                for (var i = 0; i < items.length; i++) {
                                    promises.push(items[i].getText());
                                }
                                Q.all(promises).done(function (searchResultsArray1) {
                                    //console.log(searchResultsArray1);
                                    expect(conversionUtils.isArraySortedAscending(searchResultsArray1)).toBe(true);
                                    //We go to the 3rd file in the grid because the fileNumber: T3MP0
                                    //loads extremely slowly which causes the test to fail
                                    irSearchPage.cellFromResultsGrid("file number", 2).click().then(function () {
                                        navigationBar.searchIcon.click().then(function () {
                                            browser.sleep(500).then(function () {
                                                irSearchPage.getAllResultsFromColumnInGrid(columnName).then(function (items) {
                                                    var promises = [];
                                                    for (var i = 0; i < items.length; i++) {
                                                        promises.push(items[i].getText());
                                                    }
                                                    Q.all(promises).done(function (searchResultsArray2) {
                                                        //    console.log(searchResultsArray2);
                                                        expect(conversionUtils.isArraySortedAscending(searchResultsArray2)).toBe(true);
                                                        expect(conversionUtils.isArraysIdentical(searchResultsArray1, searchResultsArray2)).toBe(true);
                                                        done();
                                                    });
                                                });
                                            });

                                        });
                                    });
                                });
                            });
                        }
                    });
                });
            }

            it("after sorting of data from File Number column and navigation away from search page and returning back the sorted data should persists", function (done) {
                validatePersistanceOfDataOrder("file number", done);
       
            });

            it("after sorting of data from File Name column and navigation away from search page and returning back the sorted data should persists", function (done) {
                validatePersistanceOfDataOrder("file name", done);
            });

            it("after sorting of data from Drawer column and navigation away from search page and returning back the sorted data should persists", function (done) {
                validatePersistanceOfDataOrder("drawer", done);
            });

            it("after sorting of data File Type column and navigation away from search page and returning back the sorted data should persists", function (done) {
                validatePersistanceOfDataOrder("file type", done);
            });

            it("should persist entered file name and focus after navigation away from search page and returning back", function (done) {
                irSearchPage.fileNameSearchBox.clear().then(function () {
                    irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                        irSearchPage.cellFromResultsGrid("file number", 0).click().then(function () {
                            navigationBar.searchIcon.click().then(function () {
                                expect(irSearchPage.fileNameSearchBox.getAttribute('value')).toEqual(searchKeyword);
                                //webdriverUtils.isElementFocused(irSearchPage.fileNameSearchBox); //waiting for requirements
                                done();
                            });
                        });
                    });
                });
            });

            it("should persist entered file number and focus after navigation away from search page and returning back", function (done) {
                irSearchPage.fileNumberSearchBox.clear().then(function () {
                    irSearchPage.fileNumberSearchBox.sendKeys(searchKeyword).then(function () {
                        irSearchPage.cellFromResultsGrid("file number", 0).click().then(function () {
                            navigationBar.searchIcon.click().then(function () {
                                expect(irSearchPage.fileNumberSearchBox.getAttribute('value')).toEqual(searchKeyword);
                                //webdriverUtils.isElementFocused(irSearchPage.fileNumberSearchBox); //waiting for requirements
                                done();
                            });
                        });
                    });
                });
            });
        }
});
