/**
 * Created by Ivan_Katovich on 3/1/2017.
 */

NavigationHelper = function(){
    this.get = function(mockBackend, url) {
        var defer = protractor.promise.defer();

        mockBackend.proxy.onLoad.whenPOST(/^\w+.*/).passThrough();
        mockBackend.proxy.onLoad.whenGET(/^\w+.*/).passThrough();

        browser.get(url).then(function () {
            defer.fulfill(true);
        });

        return defer.promise;
    };
    this.url = '';
};

module.exports = NavigationHelper;
