/**
 * Created by Jeff on 8/29/2014.
 */

NavigationHelper = function(protractor, browser){

    var that = this;

    this.url = browser.baseUrl;

    this.navigateToApp = function() {
        browser.get(that.url).then(function () {
            browser.driver.manage().window().maximize();
        });
    };

    this.navigateToSearch = function(navigationBar) {
        var defer = protractor.promise.defer();

        navigationBar.searchIcon.click().then(function() {
            defer.fulfill(true);
        });

        return defer.promise;
    };
};

module.exports = NavigationHelper;