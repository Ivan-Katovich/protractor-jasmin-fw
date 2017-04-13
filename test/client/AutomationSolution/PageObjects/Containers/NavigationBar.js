var NavigationBar = function () { };

NavigationBar.prototype = Object.create({}, {

    searchIcon: {
            get: function () {
                return element(by.css(".switch-search"));
            }
        },

    vertaforeLogo: {
        get: function(){
            return element(by.css(".logo-box"));
        }
    },

    userSettingsIcon: {
        get: function () {
            return element(by.css("#ir-user-config-button"));
        }
    },

    dashboardIcon: {
        get: function () {
            return element(by.css('.navbar-nav .fa-dashboard'));
        }
    }
});
module.exports = NavigationBar;