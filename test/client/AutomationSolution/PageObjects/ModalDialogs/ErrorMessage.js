var ErrorMessage = function () { };

ErrorMessage.prototype = Object.create({}, {

    errorMessageText: {
        get: function () {
            return element(by.css('.notification-text')).getText();
        }
    },

    //todo: update to use id's
    errorMessageTextNode: {
        get: function () {
            return element(by.css('.notification-container'));
        }
    },

    errorMessageTitle: {
        get: function () {
            return element(by.id('modal-title'));
        }
    },

    errorMessageIcon: {
        get: function () {
            return element(by.id('notification-window-icon'));
        }
    },

    okButton: {
        get: function () {
            return element(by.id('btnOk'));
        }
    },

    error: {
        get: function () {
            return element.all(by.css('.notification-container'));
        }
    },

    growlNotification: {
        get: function () {
            return element(by.tagName('growl-notifications'));
        }
    },

    growlNotificationRow: {
        get: function () {
            return browser.driver.findElement(by.css('.growl-notification-row.ng-binding')).getText();
        }
    },

    growlNotificationText: {
        get: function () {
            return browser.driver.findElement(by.css('growl-notifications ng-include')).getText();
        }
    },

    growlNotificationButton: {
        get: function () {
            return browser.driver.findElement(by.css('growl-notification button.btn-primary'));
        }
    },

    growlLockedNotificationButton: {
        get: function () {
            return browser.driver.findElement(by.css('growl-notification button'));
        }
    },

    growlNotificationButtonProt: {
        get: function () {
            return element(by.css('growl-notification button.btn-primary'));
        }
    },

    growlNotifications: {
        get: function () {
            return browser.driver.findElements(by.css('growl-notification'));
        }
    },

    moveErrorMessage: {
        get: function () {
            return element(by.css('.move-error-notification')).getText();
        }
    },

    notMovedDocsList: {
        get: function () {
            return element.all(by.css('.move-error-notification .error-data li'));
        }
    },

    notMovedDoc: {
        value: function (index) {
            return this.notMovedDocsList.get(index);
        }
    }
});

module.exports = ErrorMessage;

