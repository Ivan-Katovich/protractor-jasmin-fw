var TaskActionsDropdown = function () { };

TaskActionsDropdown.prototype = Object.create({}, {

    container: { writable: true, configurable: true, value: "" },

    actionsText: {
        get: function () {
            return element(by.css(".todo-item-actions.open .dropdown-menu")).getText();
        }
    },

    releaseAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='release()']")).filter(function(elem){
                return elem.isDisplayed();
            }).first();
        }
    },

    setAttributesAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='getAttributes()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    deleteAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='cancel()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    closeAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='close()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    openAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='open()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    editTaskAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='edit()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    routeAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='route()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    reassignAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='reassign()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    rescheduleAction: {
        get: function () {
            return element.all(by.css(this.container + "[ng-click='reschedule()']")).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    }
});

module.exports = TaskActionsDropdown;
