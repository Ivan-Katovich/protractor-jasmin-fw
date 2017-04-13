var apiMocks = require('../../../../../src/apimocks/mockRoutes.js');
var NavigationHelper = require('../navigationHelper.js');
var helper = new NavigationHelper(protractor, browser);
var mockBackend = require('../../lib/z-test/mockBackend.js');

function useMockData(configs) {

    for (var cf in configs) {
        var config = configs[cf];
        helper.get(mockBackend, helper.url);

        var testMock = config.testMock ? config.testMock : '';
        var findMock;
        for (var mockRoute in apiMocks.mockRoutes) {
            if (apiMocks.mockRoutes[mockRoute].name === testMock) {
                findMock = apiMocks.mockRoutes[mockRoute];
                break;
            }
        }

        var route = findMock.mockRoute ? findMock.mockRoute : '';
        var scenario = config.testScenario ? config.testScenario : 0;
        var method = config.testMethod ? config.testMethod : 'POST'; //defaults to post

        var mockConfig = {
            testRoute: route,
            testScenario: scenario,
            testMethod: method
        };

        //create object to hold configs
        var configs = [];

        //check if configs already exists
        if (mockBackend.proxy.context.configs && mockBackend.proxy.context.configs.length > 0) {
            configs = mockBackend.proxy.context.configs;
        }

        //add new config object
        configs.push(mockConfig);

        //register configs
        mockBackend.registerProxy(configs);
    }

}

exports.useMockData = useMockData;
exports.mockBackend = mockBackend;