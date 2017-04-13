exports.tags = ['File_Navigation', 'File_Search'];
var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var Q = require('q');
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var irSearchPage = new IR_SearchPage();
var IR_RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var navigationBar = new IR_NavigationBar();
var recordHeader = new IR_RecordHeader();
var IR_FilesView = require('../../PageObjects/FilesView.js');
var irFilesView = new IR_FilesView();
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

//First - get the scenario data you need and store it locally
var data = {
    attributes: '',
    drawer: '',
    fileMarks: '',
    fileName: '%25',
    fileNumber: '',
    fileType: ''
};

//Get data for route scenario
var mock = mockBackend([
    {
        testRoute: 'api/files/find',
        testScenarios: [0, 1, 2, 3],
        testScope: 'success',
        testMethod: 'POST'
    },
    {
        testRoute: 'Search/GetResultsError',
        testScenarios: 0,
        testScope: 'error',
        testMethod: 'POST'
    }
]);


describe("Search", function () {

    beforeEach(function () {

        if (browser.params.siteBase == 'iis') {
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.waitTillElementVisible(navigationBar.searchIcon);
                return navigationBar.searchIcon.click();
            });
        } else if (browser.params.siteBase == 'node') {
            return browser.driver.get(browser.baseUrl);
        }


    });

    afterEach(function () {
        browser.sleep(1000);

    });

    //-----------------------------------------BEGIN BASIC SEARCH USING FILE NAME---------------------------------------
    //------------------------------------------------------------------------------------------------------------------

    //This scenario applies to the mock data in Search.js to be equal to 1
    it("should return a single record and navigate to the File when a single result is found in file name search", function () {

        var searchKeyword = 'AddPage';

        if (browser.params.siteBase == 'node') {
            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            navigationBar.searchIcon.click();
        }
        webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function() {
            irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                irSearchPage.searchButton.click().then(function () {
                    //expect(irFilesView.filesView.isDisplayed()).toBe(true);
                    expect(irSearchPage.searchGrid.count()).toEqual(1);
                    recordHeader.fileNameRecordHeader.isDisplayed().then(function (fNameRecordHeader) {
                        if (!(fNameRecordHeader)) {
                            console.log("Files view has not been displayed..after search as expected");
                        }
                        expect(fNameRecordHeader).toBe(true);
                    });
                    if (browser.params.siteBase == 'iis') {
                        expect(recordHeader.fileNameRecordHeader.getText()).toContain(searchKeyword);
                    }
                });
            });

            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Name of ' + searchKeyword);
                });
            });
        });
    });

    //This scenario applies to the mock data in Search.js to be equal to 3  
    it("should return zero files when given an invalid FILE NAME", function () {
        var searchKeyword = 'No Results';

        if (browser.params.siteBase == 'node') {
            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'api/files/find', 3, 'POST');
            navigationBar.searchIcon.click();
        }
        webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function() {

            //do the test
            irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                irSearchPage.searchButton.click().then(function () {
                    expect(irSearchPage.searchGrid.count()).toEqual(0);
                    //breadcrumb verification
                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Name of ' + searchKeyword);
                });
            });
        });
    });

    //This scenario applies to the mock data in Search.js to be equal to 0
    it("should return more than one file when multiple files contain the same file name", function () {
        var searchKeyword = 'a';

        if (browser.params.siteBase == 'node') {
            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'api/files/find', 0, 'POST');
            navigationBar.searchIcon.click();

            webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function() {
                irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                    irSearchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                            expect(irSearchPage.searchGrid.count()).toBeGreaterThan(1);
                        });
                    });
                    //breadcrumb verification
                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Name of ' + searchKeyword);
                });
            });
        }
    });


    if (browser.params.siteBase == 'node') {

        it("should return ALL files up to 1000 results in alphabetical order by file Number when entering % as a File Name and no other search criteria is entered", function () {
            var searchKeyword = '%';

            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'api/files/find', 2, 'POST');
            navigationBar.searchIcon.click();
            webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function() {

                irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                    irSearchPage.searchButton.click();
                    browser.sleep(1000);
                    irSearchPage.pageCountElement.getText().then(function (text) {
                        expect(text).toEqual('Total Items: 1000');
                    });
                    irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                        var promises = [];
                        // var fileNums = [];
                        items.map(function (element) {
                            element.getText().then(function (elmText) {
                                promises.push(elmText.toLowerCase());
                            });
                        });
                        Q.all(promises).done(function (searchResultsArray) {
                            expect(conversionUtils.isArraySortedDescending(searchResultsArray)).toBe(true);
                        });
                    });
                });
                //breadcrumb verification
                expect(irSearchPage.searchResultsHeader.getText()).toBe('File Name of ' + searchKeyword);
            });
        });
    }

    if (browser.params.siteBase == 'iis') {

        it("should return files starting from ' a' and 'a' in alphabetical order by file number when entered a 'a%' as a FILE NAME and no other search criteria is entered", function () {
            var searchKeyword = 'a%';
            webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function() {

                irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                    //Click on search button to view results
                    irSearchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                            //Get the fileName object values from search grid
                            expect(irSearchPage.searchGrid.count()).toBe(14); //takes into account both upper and lower case
                            irSearchPage.getAllResultsFromColumnInGrid("File Name").map(function (element) {
                                element.getText().then(function (fn) {
                                    expect(fn.substring(0, 1).toLowerCase()).toBe('a');
                                });
                            });
                            irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                                var promises = [];
                                // var fileNums = [];
                                items.map(function (element) {
                                    element.getText().then(function (elmText) {
                                        promises.push(elmText.toLowerCase());
                                    });
                                });
                                Q.all(promises).done(function (searchResultsArray) {
                                    expect(conversionUtils.isArraySortedDescending(searchResultsArray)).toBe(true);
                                });
                            });
                        });
                    });
                    //breadcrumb verification
                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Name of ' + searchKeyword);
                });
            });
        });

        it("should return files ending by '2' when entered a '%2' as a FILE NAME and no other search criteria is entered", function () {
            var searchKeyword = '%2';
            webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function () {
                irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                    irSearchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                            expect(irSearchPage.searchGrid.count()).toBe(3);//according to DB
                            irSearchPage.getAllResultsFromColumnInGrid("File Name").map(function (element) {
                                element.getText().then(function (fn) {
                                    expect(fn.slice(-1)).toBe('2');
                                });
                            });

                        });

                    });
                    //breadcrumb verification
                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Name of ' + searchKeyword);
                });
            });
        });      

    }

    //-----------------------------------------BEGIN BASIC SEARCH USING FILE NUMBER-------------------------------------
    //------------------------------------------------------------------------------------------------------------------

    //This scenario applies to the mock data in Search.js to be equal to 1
    it("should return a single record and navigate to the File when a single result is found in file number search", function () {
        var searchKeyword = 'ADDPAGE';

        if (browser.params.siteBase == 'node') {
            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            navigationBar.searchIcon.click();
        }

        webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function () {
            irSearchPage.fileNumberSearchBox.sendKeys(searchKeyword).then(function () {
                irSearchPage.searchButton.click().then(function () {
                    recordHeader.fileNameRecordHeader.isDisplayed().then(function (fNameRecordHeader) {
                        if (!(fNameRecordHeader)) {
                            console.log("Files view has not been displayed..after search as expected");
                        }
                        expect(fNameRecordHeader).toBe(true);
                    });
                    if (browser.params.siteBase == 'iis') {
                        expect(recordHeader.fileNumberRecordHeader.getText()).toContain(searchKeyword);
                    }
                });
            });
            //breadcrumb verification
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of ' + searchKeyword);
                });
            });
        });
    });    

    //This scenario applies to the mock data in Search.js to be equal to 3
    it("should return zero files when given a invalid FILE NUMBER", function () {
        var searchKeyNumber = 'No Results';
        if (browser.params.siteBase == 'node') {
            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'api/files/find', 3, 'POST');
            navigationBar.searchIcon.click();
        }
        webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function () {
            irSearchPage.fileNumberSearchBox.sendKeys(searchKeyNumber).then(function () {
                irSearchPage.searchButton.click().then(function () {
                    expect(irSearchPage.searchGrid.count()).toEqual(0);
                });
            });
            //breadcrumb verification
            expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of ' + searchKeyNumber);
        });
    });

    if (browser.params.siteBase == 'node') {

        it("should return ALL files up to 1000 results when entering % as a File Number and no other search criteria is entered", function () {
            var searchKeyNumber = '%';
            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'api/files/find', 2, 'POST');
            navigationBar.searchIcon.click();
            webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox).then(function () {
                irSearchPage.fileNumberSearchBox.sendKeys(searchKeyNumber).then(function () {
                    irSearchPage.searchButton.click().then(function () {
                        browser.sleep(1000);
                        irSearchPage.pageCountElement.getText().then(function (text) {
                            expect(text).toEqual('Total Items: 1000');
                        });
                    });
                });
                //breadcrumb verification
                expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of ' + searchKeyNumber);
            });
        });
    }

    //Considered part of the URL lookup story, but URL lookup is totally tested against live data, so added it to Search spec which already has mock data info set up
    it("Should display an error popup if server returns an error", function () {
        if (browser.params.siteBase == 'node') {
            mockBackend.proxy.context.configs = [];
            mockUtils.createMockData(mockBackend, 'Search/GetResultsError', 0, 'POST');
        }
        browser.getCurrentUrl().then(function (url) { //customer name and number
            browser.driver.get(url + '?documentAttributes=381%3DTest2%2C384%3D2').then(function () {
                browser.sleep(15000);
            });
        });

    });

});