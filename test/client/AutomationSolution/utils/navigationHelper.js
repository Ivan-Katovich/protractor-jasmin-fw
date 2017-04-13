/**
 * Created by Jeff on 8/29/2014.
 */

NavigationHelper = function(protractor, browser){
    this.get = function(mockBackend, url) {
        var defer = protractor.promise.defer();
        mockBackend.proxy.onLoad.whenGET(/api\/objects\/[0-9]+\/notes\/regular/);
        mockBackend.proxy.onLoad.whenPOST('api/licensing/WebClient/login').passThrough();

        //temporary workaround to fix tests failing because of "unexpected request: POST Search/GetAdvancedSearchCriteria"    
        mockBackend.proxy.onLoad.whenPOST('Search/GetAdvancedSearchCriteria').passThrough();

        //temporary workaround to fix tests failing on webclient load because of unexpected GetAllTasks/Diaries calls
        mockBackend.proxy.onLoad.whenGET('/Task/GetAllTasks').respond(200);
        mockBackend.proxy.onLoad.whenGET('/Task/GetAllDiaries').respond(200);

        browser.get(url).then(function () {
            defer.fulfill(true);
        });

        return defer.promise;
    };
    this.url = '';
};

module.exports = NavigationHelper;