/**
 * Created by ezhovakr on 8/28/2014.
 */
exports.tags = ['File_Navigation', 'File_Search'];
var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var navigationBar = new IR_NavigationBar();
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var irSearchPage = new IR_SearchPage();

var IR_RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var recordHeader = new IR_RecordHeader();

var noFileMarksChecked = 'All File Marks';
var oneFileMark = '1 checked';
var twoFileMarks = '2 checked';

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
    testRoute: 'Search/GetAdvancedSearchCriteria',
    testScenarios: [0],
    testData: data,
    testMethod: 'POST'
}]);


describe("Search - Return Results by File Marks", function () {
    
    beforeEach(function () {
        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'Search/GetAdvancedSearchCriteria', 0, 'POST');
            webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                navigationBar.searchIcon.click();
            });
        } else if (browser.params.siteBase == 'iis') {
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                navigationBar.searchIcon.click();
            });
        } else throw new Error('Incorrect siteBase parameter');
    });

    it("It should display correct number of file marks after checking/unchecking filemarks from the filemarks dropdown(for e.g., If I select 3 fileMarks , it should show '3 checked' in filemark dropdown)", function () {
        webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
            //select one file mark and verify number of file marks displayed
            irSearchPage.fileMarkButton.click().then(function () {
                irSearchPage.fileMarkDropdownElement(2).click().then(function () {
                    expect(irSearchPage.fileMarkCheckElement(2).isDisplayed()).toBeTruthy();
                });
                irSearchPage.fileMarkButton.click().then(function () {
                    expect(irSearchPage.fileMarkCounter).toEqual(oneFileMark);
                });
            });
            //select second file mark and verify number of file marks displayed
            irSearchPage.fileMarkButton.click().then(function () {
                irSearchPage.fileMarkDropdownElement(3).click().then(function () {
                    expect(irSearchPage.fileMarkCheckElement(3).isDisplayed()).toBeTruthy();
                });
                irSearchPage.fileMarkButton.click().then(function () {
                    expect(irSearchPage.fileMarkCounter).toEqual(twoFileMarks);
                });
            });

            //Un-select first file mark and verify number of file marks displayed
            irSearchPage.fileMarkButton.click().then(function () {
                irSearchPage.fileMarkDropdownElement(2).click().then(function () {
                    expect(irSearchPage.fileMarkCheckElement(2).isDisplayed()).toBeFalsy();
                });
                irSearchPage.fileMarkButton.click().then(function () {
                    expect(irSearchPage.fileMarkCounter).toEqual(oneFileMark);
                });
            });

            //select first file mark and verify number of file marks displayed
            irSearchPage.fileMarkButton.click().then(function () {
                irSearchPage.fileMarkDropdownElement(2).click().then(function () {
                    expect(irSearchPage.fileMarkCheckElement(2).isDisplayed()).toBeTruthy();
                });
                irSearchPage.fileMarkButton.click().then(function () {
                    expect(irSearchPage.fileMarkCounter).toEqual(twoFileMarks);
                });
            });
        });
    });

    it("should clear all file marks after selecting other file type", function () {
        webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
            //select two file marks and verify number of file marks displayed
            irSearchPage.fileMarkButton.click().then(function () {
                webdriverUtils.clickOnElement(irSearchPage.fileMarkDropdownElement(2)).then(function () {
                    browser.sleep(500).then(function () { //Here to not make a huge block
                        webdriverUtils.clickOnElement(irSearchPage.fileMarkDropdownElement(3)).then(function () {
                            browser.sleep(1000).then(function () { //Here to not make a huge block
                                expect(irSearchPage.fileMarkCheckElement(3).isDisplayed()).toBeTruthy();
                                expect(irSearchPage.fileMarkCheckElement(2).isDisplayed()).toBeTruthy();
                                irSearchPage.fileMarkButton.click().then(function () {
                                    expect(irSearchPage.fileMarkCounter).toEqual(twoFileMarks);
                                });
                                //select file type from dropdown and verify that number of file marks cleared
                                irSearchPage.fileTypeDropdown.click().then(function () {
                                    webdriverUtils.clickOnElement(irSearchPage.fileTypeDropdownElement(3)).then(function () {
                                        browser.sleep(1000).then(function () { //Here to not make a huge block
                                            expect(irSearchPage.fileMarkCounter).toEqual(noFileMarksChecked);                                            
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

    it("should clear all file marks after selecting 'Uncheck all' option", function () {
        webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
            //select two file marks and verify number of file marks displayed
            irSearchPage.fileMarkButton.click().then(function () {
                irSearchPage.fileMarkDropdownElement(2).click().then(function () {
                    irSearchPage.fileMarkDropdownElement(3).click().then(function () {
                        expect(irSearchPage.fileMarkCheckElement(3).isDisplayed()).toBeTruthy();
                        expect(irSearchPage.fileMarkCheckElement(2).isDisplayed()).toBeTruthy();
                    });
                    irSearchPage.fileMarkButton.click().then(function () {
                        expect(irSearchPage.fileMarkCounter).toEqual(twoFileMarks);
                    });
                    //select Uncheck All option and verify that number of file marks cleared
                    irSearchPage.fileMarkButton.click().then(function () {
                        irSearchPage.fileMarkDropdownElement(1).click();
                        irSearchPage.fileMarkButton.click().then(function () {
                            expect(irSearchPage.fileMarkCounter).toEqual(noFileMarksChecked);
                        });
                    });
                });
            });
        });
    });
    
    it("No File Marks should be selected by default", function () {
        webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
            irSearchPage.fileMarkButton.click().then(function () {
                irSearchPage.fileMarkButton.click().then(function () {
                    expect(irSearchPage.fileMarkCounter).toEqual(noFileMarksChecked);
                });
            });
        });
    });

             //--------------------Perform actual Searches and validate results with live data ------------------
    if (browser.params.siteBase == 'iis') {

        it("Should return all files with specific file mark if one file mark is selected", function () {
            webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
                irSearchPage.fileMarkButton.click().then(function () {
                    irSearchPage.fileMarkDropdownElement(3).click().then(function () { //check the green filemark and then search
                        irSearchPage.searchButton.click().then(function () {
                            webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                                expect(irSearchPage.searchGrid.count()).toBe(2);
                                //breadcrumb verification
                                expect(irSearchPage.searchResultsHeader.getText()).toBe('With File Marks  Green');
                            });
                        });
                    });
                });
            });
        });

        it("Should return only files with all selected file marks selected if more than one file mark is selected", function () {
            webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
                irSearchPage.fileMarkButton.click().then(function () {
                    irSearchPage.fileMarkDropdownElement(2).click();
                    irSearchPage.fileMarkDropdownElement(3).click().then(function () { //check the blue and green filemarks and then search
                        irSearchPage.searchButton.click().then(function () {
                            webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function() {
                                expect(recordHeader.fileNumberRecordHeader.getText()).toBe('RECORDHEADERWITHFILEMARKS');
                                navigationBar.searchIcon.click().then(function() {
                                    webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function() {
                                        expect(irSearchPage.searchGrid.count()).toBe(1); //green has 2 but only 1 of those ALSO has blue selected
                                        //breadcrumb verification
                                        expect(irSearchPage.searchResultsHeader.getText()).toBe('With File Marks  Blue File Mark,  Green');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it("Should return file with specified fileNumber and fileMark if fileMark is selected", function () {
            webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
                irSearchPage.fileNumberSearchBox.sendKeys('RecordHeaderWithFileMarks').then(function () {
                    irSearchPage.fileMarkButton.click().then(function () {
                        irSearchPage.fileMarkDropdownElement(3).click().then(function () { //2 files with green file mark but only 1 also named recordheaderwithfilemarks
                            irSearchPage.searchButton.click().then(function () {
                                webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function () {
                                    expect(recordHeader.fileNumberRecordHeader.getText()).toBe('RECORDHEADERWITHFILEMARKS');
                                    //breadcrumb verification
                                    navigationBar.searchIcon.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                                            expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of RecordHeaderWithFileMarks and With File Marks  Green');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it("Should return 0 file if specified fileumber does not have the selected fileMarks", function () {
            webdriverUtils.waitTillElementVisible(irSearchPage.fileMarkButton).then(function () {
                irSearchPage.fileNumberSearchBox.sendKeys('RecordHeaderWithFileMarks');
                irSearchPage.fileMarkButton.click().then(function () {
                    irSearchPage.fileMarkDropdownElement(11).click().then(function () {
                        irSearchPage.searchButton.click().then(function () {
                            webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                                expect(irSearchPage.searchGrid.count()).toBe(0);
                                //breadcrumb verification
                                expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of RecordHeaderWithFileMarks and With File Marks vertafore');
                            });
                        });
                    });
                });
            });
        });
    }

});