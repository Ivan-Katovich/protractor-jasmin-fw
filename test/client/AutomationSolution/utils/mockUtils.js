var apiMocks = require('../../../../src/apimocks/mockRoutes.js');
var NavigationHelper = require('./navigationHelperForMocks.js');
var helper = new NavigationHelper(protractor, browser);
var mockBackend = require('./mockBackend.js');

//public methods
function useMockData(config) {
    var refresh = config.refresh ? config.refresh : false; //defaults to false
    var configs = config.configs ? config.configs : [];

    //if refresh is true, then refresh the browser, then register the proxy data
    if (refresh) {
        return _refreshBrowser().then(function () {
            return _getProxyConfigsFromMock(mockBackend.proxy.context.globalConfigs).then(function(routeConfigs){
                return _registerProxyRoutes(routeConfigs).then(function(){
                    return _registerProxyPassThrough().then(function(){
                        return _getProxyConfigsFromMock(configs).then(function(mockConfigs){
                            return _registerProxyData(mockConfigs).then(function(){
                                return _syncProxy();
                            });
                        });
                    });
                });
            });
        });
    } else {
        //if refresh is false, then concat and register the proxy data, then sync the proxy data with the browser
        return _getStoredProxyConfigs().then(function(storedConfigs){
            return _clearProxy().then(function(){
                return _getProxyConfigsFromMock(configs).then(function(mockConfigs){
                    var concatConfigs = _concatConfigs(storedConfigs, mockConfigs);
                    return _registerProxyData(concatConfigs).then(function(){
                        return _syncProxy();
                    });
                });
            });
        });
    }
}

//private methods

function _findStoredConfigHandler (config, storedConfigs) {
    return (function () {
        var storedConfig = storedConfigs.filter(function(storedConfig){
            return storedConfig.testRoute===config.testRoute && storedConfig.testMethod===config.testMethod;
        });
        return storedConfig.length === 1 ? storedConfig[0] : null;
    }());
}

function _concatConfigs (storedConfigs, mockConfigs) {
    return (function(){
        var configsToAdd = [];

        //update stored configs
        for (var mockConfig in mockConfigs) {
            var config = mockConfigs[mockConfig];
            var stored = _findStoredConfigHandler(config, storedConfigs);
            //found?
            if (stored !== null) {
                //update test scope and test scenario for stored config
                stored.testScope = config.testScope;
                stored.testScenario = config.testScenario;
            } else {
                //add new configs
                configsToAdd.push(config);
            }
        }

        var concatConfigs = storedConfigs.concat(configsToAdd);

        return concatConfigs;
    }());
}

function _refreshBrowser () {
    return helper.get(mockBackend, helper.url); //returns a promise
}

function _syncProxy () {
    return mockBackend.proxy.syncContext(); //returns a promise
}

function _clearProxy () {
    return (function(){
        var deferred = protractor.promise.defer();
        mockBackend.proxy.context.configs = [];
        deferred.fulfill();
        return deferred.promise;
    }());
}

function _getStoredProxyConfigs () {
    return (function(){
        var deferred = protractor.promise.defer();

        //create object to hold configs
        var configs = [];

        //check if configs already exists
        if (mockBackend.proxy.context.configs && mockBackend.proxy.context.configs.length > 0) {
            for (var config in mockBackend.proxy.context.configs) {
                configs.push(mockBackend.proxy.context.configs[config]);
            }
        }

        deferred.fulfill(configs);

        return deferred.promise;
    }());
}

function _getProxyConfigsFromMock (configs) {
    return (function(){
        var deferred = protractor.promise.defer();

        //create object to hold configs
        var mockConfigs = [];

        for (var cf in configs) {
            var config = configs[cf];

            var testMock = config.testMock ? config.testMock : '';
            var findMock;
            for (var mockRoute in apiMocks.mockRoutes) {
                if (apiMocks.mockRoutes[mockRoute].name === testMock) {
                    findMock = apiMocks.mockRoutes[mockRoute];
                    break;
                }
            }

            var newConfig = {
                testRoute: findMock.mockRoute ? findMock.mockRoute : '',
                testScenario: config.testScenario ? config.testScenario : 0,
                testScope: config.testScope ? config.testScope : 'success', //defaults to success
                testMethod: config.testMethod ? config.testMethod : 'POST' //defaults to post
            };

            //add new config object
            mockConfigs.push(newConfig);
        }

        //register configs
        deferred.fulfill(mockConfigs);

        return deferred.promise;
    }());
}

function _registerProxyRoutes (configs) {
    return (function(){
        var deferred = protractor.promise.defer();

        //register configs
        mockBackend.registerProxyRoutes(configs).then(function(){
            deferred.fulfill(configs);
        });

        return deferred.promise;
    }());
}

function _registerProxyData (configs) {
    return (function(){
        var deferred = protractor.promise.defer();

        //register configs
        mockBackend.registerProxyData(configs).then(function(){
            deferred.fulfill(configs);
        });

        return deferred.promise;
    }());
}

function _registerProxyPassThrough () {
    return (function(){
        var deferred = protractor.promise.defer();
        mockBackend.registerProxyPassThrough();
        deferred.fulfill();
        return deferred.promise;
    }());
}

//expose public methods
exports.useMockData = useMockData;
exports.mockBackend = mockBackend;