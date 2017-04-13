/**
 * Created by Jeff on 8/29/2014.
 */

'use strict';

var request = require('request-json'),
    HttpBackend = require('http-backend-proxy'),
    proxy = new HttpBackend(browser),
    client = request.newClient('http://localhost:3000/');

function MockBackend(configs){

    var httpBackendMock = function() {
        angular.module('httpBackendMock', ['ngMockE2E']);
    };

    browser.addMockModule('httpBackendMock', httpBackendMock);

    proxy.context.testResults = [];

    if (configs != null) {

        for (var c=0; c < configs.length; c++) {

            var config = configs[c];

            //Get the data for defined scenario
            for (var i=0; i < config.testScenarios.length; i++){

                var route = config.testRoute;
                var scenario = config.testScenarios[i];
                var url = config.testRoute+'?scenario='+scenario; //TODO: fix this again to handle potential pre-existing querystrings
                var data = config.testData;
                var method = config.testMethod;

                _getMockData(route, scenario, url, data, method);
            }
        }
    }
}


module.exports = function (configs) {
    return new MockBackend(configs);
};

module.exports.proxy = proxy;

module.exports.registerProxy = function (configs) {

    if (configs != null) {

        this.proxy.context.configs = configs;

        for (var c=0; c < configs.length; c++) {

            var config = configs[c];

            var pattern = config.testRoute.replace("/","\\/");
            var regexp = new RegExp(pattern + "\\?.*");

            if (config.testMethod === 'GET') {

                this.proxy.whenGET(regexp).respond(function (method, url, data) {
                    //return the scenario data stored in the proxy context

                    var response = null;

                    for (var i = 0; i < $httpBackend.context.testResults.length; i++) {
                        var result = $httpBackend.context.testResults[i];

                        for (var ii=0; ii < $httpBackend.context.configs.length; ii++) {

                            if ($httpBackend.context.configs[ii].testRoute === result.testRoute
                                && $httpBackend.context.configs[ii].testScenario === result.testScenario
                                && $httpBackend.context.configs[ii].testMethod === 'GET') {
                                response = $httpBackend.context.testResults[i].testResponse;
                            }
                        }
                    }

                    return [200, response];
                });
            }

            if (config.testMethod === 'POST') {

                this.proxy.whenPOST(config.testRoute).respond(function (method, url, data) {
                    //return the scenario data stored in the proxy context

                    var response = null;

                    for (var i = 0; i < $httpBackend.context.testResults.length; i++) {
                        var result = $httpBackend.context.testResults[i];

                        for (var ii=0; ii < $httpBackend.context.configs.length; ii++) {

                            if ($httpBackend.context.configs[ii].testRoute === result.testRoute
                                && $httpBackend.context.configs[ii].testScenario === result.testScenario
                                && $httpBackend.context.configs[ii].testMethod === 'POST') {
                                response = $httpBackend.context.testResults[i].testResponse;
                            }
                        }
                    }

                    return [200, response];
                });
            }
        }
    }

    //passthrough all other requests
    this.proxy.whenPOST(/^\w+.*/).passThrough();
    this.proxy.whenGET(/^\w+.*/).passThrough();
};

module.exports.getRouteScenario = function (route, scenario) {

    var data = proxy.context.testResults.filter(function(item){
        return (item.testRoute === route && item.testScenario === scenario);
    });
    return data[0];
}
/*
 * PRIVATE METHODS
 * */

function _getMockData(route, scenario, url, data, method) {

    if (method === 'POST') {
        client.post(url, data, function (err, res, body) {

            var testResult = {
                testRoute: route,
                testScenario: scenario,
                testResponse: body,
                testMethod: method
            };

            proxy.context.testResults.push(testResult);
        });
    } else {
        client.get(url, function (err, res, body) {

            var testResult = {
                testRoute: route,
                testScenario: scenario,
                testResponse: body,
                testMethod: method
            };

            proxy.context.testResults.push(testResult);
        })
    }
}