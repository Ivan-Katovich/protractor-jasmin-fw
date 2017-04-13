var LoginPageVsso = function () { };

LoginPageVsso.prototype = Object.create({}, {

    userNameField: {
        get: function () {
            return browser.driver.findElement(by.id('ctl00_ContentPlaceHolder1_UsernameTextBox'));
        }
    },

    passwordField: {
        get: function () {
            return browser.driver.findElement(by.id('ctl00_ContentPlaceHolder1_PasswordTextBox'));
        }
    },

    loginButton: {
        get: function () {
            return browser.driver.findElement(by.className('LoginButton'));
        }
    },

    login: {
        value: function (userName, password) {
            this.userNameField.sendKeys(userName);
            this.passwordField.sendKeys(password);
            this.loginButton.click();
            //browser.actions().sendKeys(protractor.Key.ENTER).perform();
        }
    },

    getLoginFailedMessage: {
        get: function () {
            return browser.driver.findElement(by.id('ctl00_MainActionErrorContainer_ErrorTextLabel')).getText();
        }
    },

    getTitle: {
        get: function () {
            return browser.driver.findElement(by.id('productName'));
        }
    }
});

module.exports = LoginPageVsso;