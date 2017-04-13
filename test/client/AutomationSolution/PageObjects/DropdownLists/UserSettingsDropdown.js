var UserSettingsDropdown = function() { };

UserSettingsDropdown.prototype = Object.create({}, {

    userSettingsDropdown: {
        get: function () {
            return element(by.css('#ir-user-config-button'));
        }
    },
    
    userAccount: {
        get: function () {
            return element(by.css('.user-account'));
        }
    },

    logBackInLinkTextMessage: {
     get:function() {
        return  browser.driver.findElement(by.className('textMessage'));
     }   
    },

    logBackAnchorLink: {
        get:function() {
            return browser.driver.findElement(by.tagName('a'));
        }
    },

    signOut: {
        get: function() {
            return element(by.css("[ng-click='vm.signOut()']"));
        }
    },


    settings: {
        get: function () {
            return element(by.css("[ng-click='vm.changeSettings()']"));
        }
    },

    help: {
        get: function() {
            return $('.navbar-right').$('.open').$('.user-flyout').all(by.tagName('a')).get(1);
        }
    },

    termsOfUse: {
        get: function() {
            return $('.navbar-right').$('.open').$('.user-flyout').all(by.tagName('a')).get(2);
        }
    }
});

module.exports = UserSettingsDropdown;