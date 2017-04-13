
//Test that when user enters values for a search and clicks on sorting for FILE NAME or FILE NUMBER column the data are sorted in expected alphabetical order.
exports.tags = ['File_Navigation', 'File_Search'];
var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var navigationBar = new IR_NavigationBar();
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var irSearchPage = new IR_SearchPage();

var Q = require('q');

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
        testScenarios: [0, 1, 2, 3],
        testScope: 'success',
        testMethod: 'POST'
    }
]);

describe("Search - Sort Results", function () {

    if (browser.params.siteBase == 'node') {

        beforeEach(function () {
            mockUtils.createMockData(mockBackend, 'api/files/find', 0, 'POST');
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function () {
                    irSearchPage.fileNameSearchBox.clear().then(function () {
                        irSearchPage.fileNameSearchBox.sendKeys("%").then(function () {
                            irSearchPage.searchButton.click().then(function () {
                                webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                                    expect(irSearchPage.searchGrid.count()).toBeGreaterThan(1);
                                });
                            });
                        });
                    });
                });
            });
        });



        it("when user clicks on sorting button for file number column and sortUp button is not active the data should be sorted in ascending order", function () {
            irSearchPage.buttonInSearchResultsGridHeader("file number").click().then(function () {
                irSearchPage.isSortButtonUpActive("File Number").then(function (isActive) {
                    //  if (!isActive) {
                    irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                        var promises = [];
                        for (var i = 0; i < items.length; i++) {
                            promises.push(items[i].getText());
                        }
                        Q.all(promises).done(function (searchResultsArray) {
                            expect(conversionUtils.isArraySortedAscending(searchResultsArray)).toBe(true);
                        });
                    });
                    // }
                });
            });
        });


        it("when user clicks on sorting button for file number column and sortDown button is not active the data should be sorted in descending order", function () {
            irSearchPage.buttonInSearchResultsGridHeader("file number").click().then(function () {

                irSearchPage.isSortButtonDownActive("File Number").then(function (isActive) {
                    if (isActive) {
                        irSearchPage.buttonInSearchResultsGridHeader("file number").click().then(function () {
                            irSearchPage.isSortButtonDownActive("File Number").then(function (isActive) {
                                if (!isActive) {
                                    irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                                        var promises = [];
                                        for (var i = 0; i < items.length; i++) {
                                            promises.push(items[i].getText());
                                        }
                                        Q.all(promises).done(function (searchResultsArray) {
                                            expect(conversionUtils.isArraySortedDescending(searchResultsArray)).toBe(true);
                                        });
                                    });
                                }
                            });
                        });
                      }
                });
            });
        });


        it("when user clicks on sorting button for file name column and sortUp button is not active the data should be sorted in ascending order", function () {
            irSearchPage.buttonInSearchResultsGridHeader("file name").click().then(function () {
                irSearchPage.isSortButtonUpActive("File Name").then(function (isActive) {
                    if (!isActive) {
                        irSearchPage.getAllResultsFromColumnInGrid("File Name").then(function (items) {
                            var promises = [];
                            for (var i = 0; i < items.length; i++) {
                                promises.push(items[i].getText());
                            }
                            Q.all(promises).done(function (searchResultsArray) {
                                expect(conversionUtils.isArraySortedAscending(searchResultsArray)).toBe(true);
                            });
                        });
                    }
                });
            });
        });

        it("when user clicks on sorting button for file name column and sortDown button is not active the data should be sorted in descending order", function () {
            irSearchPage.buttonInSearchResultsGridHeader("file name").click().then(function () {
                irSearchPage.isSortButtonDownActive("File Name").then(function (isActive) {
                    if (isActive) {
                        irSearchPage.buttonInSearchResultsGridHeader("file name").click().then(function () {
                            irSearchPage.isSortButtonDownActive("File Name").then(function (isActive) {
                                if (!isActive) {
                                    irSearchPage.getAllResultsFromColumnInGrid("File Name").then(function (items) {
                                        var promises = [];
                                        for (var i = 0; i < items.length; i++) {
                                            promises.push(items[i].getText());
                                        }
                                        Q.all(promises).done(function (searchResultsArray) {
                                            expect(conversionUtils.isArraySortedDescending(searchResultsArray)).toBe(true);
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });
    }
});

