exports.tags = ['File_Navigation', 'File_Search'];
/*
    Search Toggle, navigation;
    Created: ...
    Refactored: 9/30/2016, navasaal
*/

/* modeling; */
var SearchPage = require('../../PageObjects/SearchPage.js');
var FilesView = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var Q = require('q');

/* objects; */
var searchPage = new SearchPage();
var filesView = new FilesView();
var navigationBar = new NavigationBar();
var recordHeader = new RecordHeader();

/* helpers; */
var navigationHelper = require('../../utils/navigationHelper.js');

/* vars; */
var data = {
    attributes: '',
    drawer: '',
    fileMarks: '',
    fileName: '%25',
    fileNumber: '',
    fileType: ''
};


describe("Search Icon Toggle feature", function () {

    var searchKeyword = 'SearchToggle';

    beforeEach(function() {
        browser.driver.get(browser.params.defaultUrl)
            .then(function() {
                browser.waitForAngular()
                    .then(navigationBar.searchIcon.click);
            });
    });

    it("1-Search icon toogle from the File view to Search page and back when any file is opened", function () {

        searchPage.fileNameSearchBox.sendKeys(searchKeyword)
        .then(searchPage.searchButton.click)
        .then(function () {
            return expect(recordHeader.fileNumberRecordHeader.isDisplayed()).toBe(true);
        })
        .then(function () {
            return expect(recordHeader.fileNumberRecordHeader.isDisplayed()).toBe(true);
        })
        .then(navigationBar.searchIcon.click)
        .then(function () {
            return expect(searchPage.isSearchGridVisible).toBe(true);
        })
        .then(navigationBar.searchIcon.click)
        .then(function () {
            return expect(recordHeader.fileNumberRecordHeader.isDisplayed()).toBe(true);
        })
        .then(function () {
            return expect(recordHeader.fileNumberRecordHeader.isDisplayed()).toBe(true);
        });
    });

    it("2-Search icon toogle from the File view to Search page and back when no files are opened", function () {
        navigationBar.searchIcon.click()
        .then(function () {
            return expect(searchPage.isSearchFormVisible).toBe(false);
        })
        .then(navigationBar.searchIcon.click)
        .then(function () {
            return expect(searchPage.isSearchFormVisible).toBe(true);
        });
    });
});