exports.tags = ['File_Navigation', 'File_Search'];
/**
 * Created by corbetja on 8/29/2014.
 */

var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');

var navigationBar = new IR_NavigationBar();
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var irSearchPage = new IR_SearchPage();

//First - get the scenario data you need and store it locally
var data = {
    attributes: '',
    drawer: '',
    fileMarks: '',
    fileName: '%25',
    fileNumber: '',
    fileType: ''
};

var mock = mockBackend([{
    testRoute: 'api/files/find',
    testScenarios: [0],
    testData: data,
    testMethod: 'POST'
}]);

describe("Search - Clear Results :#", function () {
    if (browser.params.siteBase == 'node') {

        beforeEach(function () {
            mockUtils.createMockData(mockBackend, 'api/files/find', 0, 'POST');
            navigationBar.searchIcon.click();
        });

        it("it should clear the data in search results Grid  and  should show search form when Clear Results button is clicked", function () {
            var searchKeyword = '%';

            irSearchPage.clearCriteriaButton.click().then(function () {
                //do the test
                irSearchPage.fileNameSearchBox.sendKeys(searchKeyword).then(function () {
                    irSearchPage.searchButton.click().then(function () {
                        expect(irSearchPage.searchGrid.count()).toBeGreaterThan(1);

                        irSearchPage.clearResultsButton.click().then(function () {

                            //Search grid should contain 0 results
                            expect(irSearchPage.searchGrid.count()).toEqual(0);
                            browser.sleep(500);
                            //Expect Search grid is not visible at this point and make sure that search form button is visible
                            expect(irSearchPage.isSearchGridVisible).toBe(false);


                            //Search  should display search button - to verify the redirection of search form
                            expect(irSearchPage.searchButton.isDisplayed()).toBe(true);

                        });
                    });
                });
            });
        });
    }
});