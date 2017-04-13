
var title = 'ImageRight Login';

var LoginPage = function() {};

LoginPage.prototype = Object.create({}, {
    
    userNameField: {
        get: function () {
            return browser.driver.findElement(by.id('UserName'));
        }
    },
    
    passwordField: {
        get: function () {
            return browser.driver.findElement(by.id('Password'));
        }
    },
    
    loginButton: {
        get: function () {
            return browser.driver.findElement(by.className('loginBtn'));
        }
    },
    
    login: {
        value: function (userName, password) {
            var self = this;
            var EC = protractor.ExpectedConditions;
            return browser.driver.wait(EC.titleIs('ImageRight Login'), 20000)
                .then(function () {
                    return self.userNameField.clear();
                })
                .then(function () {
                    return self.userNameField.sendKeys(userName);
                })
                .then(function () {
                    return self.passwordField.clear();
                })
                .then(function () {
                    return self.passwordField.sendKeys(password);
                })
                .then(function () {
                    return browser.sleep(1500);
                })
                .then(function () {
                    return self.loginButton.click();
                })
                .then(function () {
                    return browser.sleep(1500);
                });
        }
    },

    getLoginFailedMessage: {
        get: function () {
            return browser.driver.findElement(by.className('textMessage')).getText();
        }
    },

    reloginLink: {
        get: function() {
            return browser.driver.findElement(by.css('.textMessage a'));
        }
    },

    getClassAttributeOfInput: {
        value: function (inputName) {
            switch(inputName) {
                case "UserName":
                    return this.userNameField.getAttribute("class");
                case "Password": 
                    return this.passwordField.getAttribute("class");
                default:
                    break;
            }
        }
    },

    getTitle: {
        get: function () {
            return browser.driver.findElement(by.className('logo')).getText();
        }
    },

    helpPageTitle: {
        get: function () {
            return element(by.css('body > h1'));
        }
    }
});

module.exports = LoginPage;