//var mockBackend = require('../../../lib/z-test/mockBackend.js');
var mockUtils = require('../../../utils/z-test/mockUtils.js');
var IR_SearchPage = require('../../../PageObjects/z-test/SearchPage.js');
var irSearchPage = new IR_SearchPage();
var IR_NavigationBar = require('./../../../PageObjects/Containers/NavigationBar.js');
var navigationBar = new IR_NavigationBar();
var webdriverUtils = require('../../../utils/webdriverExtentionUtils.js');

var config = {
    mocks: {
        mockBackend: mockUtils.mockBackend,
        useMockData: mockUtils.useMockData
    },
    pageObjects: {
        searchPage: irSearchPage,
        navigationBar: navigationBar
    },
    utils: {
        webdriver: webdriverUtils
    }
};

module.exports = config;
