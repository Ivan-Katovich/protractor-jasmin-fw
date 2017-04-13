/**
 * Created by Jeff on 8/29/2014.
 */

'use strict';

var request = require('request-json'),
    HttpBackend = require('http-backend-proxy'),
    proxy = new HttpBackend(browser),
    client = request.newClient('http://localhost:3000/'),
    apiMocks = require('../../../../src/apimocks/mockRoutes.js');

function MockBackend(configs){

    var httpBackendMock = function() {
        angular.module('httpBackendMock', ['ngMockE2E']);
    };

    browser.addMockModule('httpBackendMock', httpBackendMock);

    proxy.context.testResults = [];
    proxy.context.globalConfigs = [];

    if (configs !== null) {

        for (var c in configs) {

            var config = configs[c];
            proxy.context.globalConfigs.push(config);
            var mock = _getMockRoute(config);

            //Get the data for defined scenario
            var route = mock.testRoute;
            var data = mock.testData;
            var method = mock.testMethod;
            for (var testScenario in mock.testScenarios) {
                var scenario = mock.testScenarios[testScenario];
                var url = mock.testRoute+'?scenario='+scenario; //TODO: fix this again to handle potential pre-existing querystrings
                //add mock data for each scenario
                _getMockData(route, scenario, url, data, method);
            }
        }
    }
}

module.exports = function (configs) {
    return new MockBackend(configs);
};

module.exports.proxy = proxy;

module.exports.registerProxyRoutes = function (configs) {
    return _registerProxyRoutes(configs);
};

module.exports.registerProxyData = function (configs) {
    return _registerProxyData(configs);
};

module.exports.registerProxyPassThrough = function(){
    _registerProxyPassThrough();
};

module.exports.getRouteScenario = function (route, scenario) {
    return _getRouteScenario(route, scenario);
};


/*
 * PRIVATE METHODS
 * */

function _registerProxyRoutes(configs) {
    return (function(){
        var deferred = protractor.promise.defer();
        if (configs !== null) {
            for (var c in configs) {

                var config = configs[c];

                var testRoute = config.testRoute.substring(0,1)==='/' ? config.testRoute.substring(1,config.testRoute.length) : config.testRoute;
                var testRoutePattern = testRoute.replace("/","\\/");
                var testRouteRegexp = new RegExp(testRoutePattern + "\\?.*");

                if (config.testMethod==='GET') {
                    _registerGETProxy(testRouteRegexp);
                }
                if (config.testMethod==='POST') {
                    _registerPOSTProxy(testRoute);
                }
            }
        }
        deferred.fulfill();
        return deferred.promise;
    }());
}

function _registerProxyData(configs) {
    return (function(){
        var deferred = protractor.promise.defer();
        if (configs !== null) {
            proxy.context.configs = configs;
        }
        deferred.fulfill(configs);
        return deferred.promise;
    }());
}

function _registerProxyPassThrough () {
    return (function(){
        proxy.whenPOST(/^\w+.*/).passThrough();
        proxy.whenGET(/^\w+.*/).passThrough();
    }());
}

function _getRouteScenario (route, scenario) {
    return (function(){
        var testResults = proxy.context.testResults.filter(function(testResult){
            return (testResult.testRoute === route && testResult.testScenario === scenario);
        });
        return testResults[0];
    }());
}

function _getMockRoute(config) {
    return (function(){
        var mock = config;
        var testMock = mock.testMock ? mock.testMock : '';
        var findMock;
        for (var mockRoute in apiMocks.mockRoutes) {
            if (apiMocks.mockRoutes[mockRoute].name === testMock) {
                findMock = apiMocks.mockRoutes[mockRoute];
                break;
            }
        }
        var _mockRoute = findMock.mockRoute ? findMock.mockRoute : '';
        Object.defineProperty(mock, 'testRoute', {
            get: function() {
                return _mockRoute;
            },
            set: function(value) {
                _mockRoute = value;
            }
        });
        return mock;
    }());
}

function _getMockData(route, scenario, url, data, method) {
    return (function(){
        if (method === 'GET') {
            client.get(url, function (err, res, body) {

                var testResult = {
                    testRoute: route,
                    testScenario: scenario,
                    testResponse: body,
                    testMethod: method
                };

                proxy.context.testResults.push(testResult);
            });
        }
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
        }
    }());
}

function _registerGETProxy (route) {
    return (function(){
        proxy.whenGET(route).respond(function (method, url, data) {

            function _getTestMethod (testMethod) {
                return (function() {
                    return testMethod.toUpperCase();
                }());
            }

            function _getTestUrl (testUrl) {
                return (function(){
                    //remove beginning / if used
                    testUrl = testUrl.substring(0,1)==='/' ? testUrl.substring(1, url.length) : testUrl;
                    //remove query string if used
                    testUrl = testUrl.indexOf('?') > -1 ? testUrl.substring(0, testUrl.indexOf('?')) : url;
                    //return results
                    return testUrl;
                }());
            }

            function _getTestConfig (testUrl, testMethod) {
                return (function(){
                    var configs = $httpBackend.context.configs.filter(function(config){
                        return config.testRoute.indexOf(testUrl) > -1 &&
                            config.testMethod===testMethod;
                    });
                    return configs.length===1 ? {
                            testRoute: configs[0].testRoute,
                            testScope: configs[0].testScope,
                            testScenario: configs[0].testScenario,
                            testMethod: configs[0].testMethod
                        } : null;
                }());
            }


            function _getTestResponse (testConfig) {
                return (function(){
                    var testResults = $httpBackend.context.testResults.filter(function(testResult){
                        return testResult.testRoute===testConfig.testRoute &&
                            testResult.testScenario===testConfig.testScenario &&
                            testResult.testMethod===testConfig.testMethod;
                    });
                    return testResults.length===1 ? testResults[0].testResponse : null;
                }());
            }

            var testMethod =  _getTestMethod(method);
            var testUrl = _getTestUrl(url);
            var testConfig = _getTestConfig(testUrl, testMethod);

            var response = null;

            if (testConfig.testScope === 'error') {
                response = {
                    statusCode: 500,
                    body: 'An unexpected 500 error has occurred!'
                };
            }

            if (testConfig.testScope === 'notFound') {
                response = {
                    statusCode: 404,
                    body: 'A expected 404 has occurred!'
                };
            }

            if (!response) {
                var testResponse = _getTestResponse(testConfig);
                if (testResponse) {
                    response = {
                        statusCode: 200,
                        body: testResponse
                    };
                } else{
                    response = {
                        statusCode: 400,
                        body: 'A bad request has occurred!'
                    };
                }
            }

            return [response.statusCode, response.body];

        });
    }());
}

function _registerPOSTProxy (route) {
    return (function () {
        proxy.whenPOST(route).respond(function (method, url, data) {
            function _getTestMethod (testMethod) {
                return (function() {
                    return testMethod.toUpperCase();
                }());
            }

            function _getTestUrl (testUrl) {
                return (function(){
                    //remove beginning / if used
                    testUrl = testUrl.substring(0,1)==='/' ? testUrl.substring(1, url.length) : testUrl;
                    //remove query string if used
                    testUrl = testUrl.indexOf('?') > -1 ? testUrl.substring(0, testUrl.indexOf('?')) : url;
                    //return results
                    return testUrl;
                }());
            }

            function _getTestConfig (testUrl, testMethod) {
                return (function(){
                    var configs = $httpBackend.context.configs.filter(function(config){
                        return config.testRoute.indexOf(testUrl) > -1 &&
                            config.testMethod===testMethod;
                    });
                    return configs.length===1 ? {
                            testRoute: configs[0].testRoute,
                            testScope: configs[0].testScope,
                            testScenario: configs[0].testScenario,
                            testMethod: configs[0].testMethod
                        } : null;
                }());
            }


            function _getTestResponse (testConfig) {
                return (function(){
                    var testResults = $httpBackend.context.testResults.filter(function(testResult){
                        return testResult.testRoute===testConfig.testRoute &&
                            testResult.testScenario===testConfig.testScenario &&
                            testResult.testMethod===testConfig.testMethod;
                    });
                    return testResults.length===1 ? testResults[0].testResponse : null;
                }());
            }

            var testMethod =  _getTestMethod(method);
            var testUrl = _getTestUrl(url);
            var testConfig = _getTestConfig(testUrl, testMethod);

            var response = null;

            if (testConfig.testScope === 'error') {
                response = {
                    statusCode: 500,
                    body: 'An unexpected 500 error has occurred!'
                };
            }

            if (testConfig.testScope === 'notFound') {
                response = {
                    statusCode: 404,
                    body: 'A expected 404 has occurred!'
                };
            }

            if (!response) {
                var testResponse = _getTestResponse(testConfig);
                if (testResponse) {
                    response = {
                        statusCode: 200,
                        body: testResponse
                    };
                } else{
                    response = {
                        statusCode: 400,
                        body: 'A bad request has occurred!'
                    };
                }
            }

            return [response.statusCode, response.body];
        });
    }());
}