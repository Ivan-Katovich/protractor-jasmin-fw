var test = require('./testlib.js');

//Configure mockBackend
test.mocks.mockBackend([
    {
        testMock: 'GetResults',
        testScenarios: ['multipleResults', 'singleResult'],
        testScope: 'success',
        testMethod: 'POST'
    }
]);

describe("Search", function () {

    beforeEach(function () {
        return browser.driver.get(browser.baseUrl);
    });

    afterEach(function () {
    });

    //-----------------------------------------BEGIN BASIC SEARCH USING FILE NAME---------------------------------------
    //------------------------------------------------------------------------------------------------------------------

    //This scenario applies to the mock data in Search.js to be equal to 1
    it("should return a single record and navigate to the File when a single result is found in file name search", function () {

        test.mocks.useMockData([
            {
                testMock:'GetResults',
                testScenario:'singleResult',
                testMethod:'POST' //defaults to post
            }
        ]);

        test.pageObjects.navigationBar.searchIcon.click().then(function() {

            test.pageObjects.searchPage.form.fileName.textBox.sendKeys('some keyword').then(function () {

                test.pageObjects.searchPage.form.buttons.search.click().then(function () {

                    expect(test.pageObjects.searchPage.grid.rows.count()).toEqual(1);

                });

            });

        });

    });

});