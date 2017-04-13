/**
 * Created by ezhovakr on 10/01/2014.
 */
exports.tags = ['File_Navigation', 'File_Search'];
var mockBackend = require('../../lib/mockBackend.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var mockUtils = require('../../utils/mockUtils.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');

var irSearchPage = new IR_SearchPage();
var navigationBar = new IR_NavigationBar();
var searchKeyword = '%';

var mock = mockBackend([]);

describe("Search - Tabbing", function () {
    if (browser.params.siteBase == 'node') {

        beforeEach(function () {
            mockUtils.createMockData(mockBackend, 'api/files/find', 0, 'POST');
            navigationBar.searchIcon.click();
        });

        it("File Name should have initial focus", function () {
            webdriverUtils.isElementFocused(irSearchPage.fileNameSearchBox);
        });

        it("should focus and highlight appropriate element in correct order when clicking Tab key", function () {
            irSearchPage.fileNameSearchBox.sendKeys('1').then(function () {
                webdriverUtils.isElementFocused(irSearchPage.fileNameSearchBox);
                webdriverUtils.clickTabKey();
                webdriverUtils.isElementFocused(irSearchPage.fileNumberSearchBox);
                webdriverUtils.clickTabKey();
                webdriverUtils.isElementFocused(irSearchPage.drawerDropdown);
                webdriverUtils.clickTabKey();
                webdriverUtils.isElementFocused(irSearchPage.fileTypeDropdown);
                webdriverUtils.clickTabKey();
                webdriverUtils.isElementFocused(irSearchPage.fileMarkButton);
                webdriverUtils.clickTabKey();
                webdriverUtils.isElementFocused(irSearchPage.clearCriteriaButton);
                webdriverUtils.clickTabKey();
                webdriverUtils.isElementFocused(irSearchPage.searchButton);
            });
        });
    }
});