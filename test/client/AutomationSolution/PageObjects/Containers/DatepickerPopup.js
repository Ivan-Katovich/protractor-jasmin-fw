var DatepickerPopup = function () { };

DatepickerPopup.prototype = Object.create({}, {

    container: { writable: true, configurable: true, value: "" },

    datepickerContainer: {
        get: function () {
            return element(by.css('.input-group.ir-datepicker ul'));
        }
    },

    monthYearButton: {
        get: function () {
            return element(by.css("thead th[colspan='5'] button"));
        }
    },

    rightRowButton: {
        get: function () {
            return element(by.css(this.container + ".btn.btn-default.btn-sm.pull-right"));
        }
    },

    leftRowButton: {
        get: function () {
            return element(by.css(this.container + ".btn.btn-default.btn-sm.pull-left"));
        }
    },

    getMonth: {
        get: function () {
            return this.monthYearButton.getText();
        }
    },

    clickDateButton: {
        value: function (numeric, browser) {
            return element.all(by.repeater('dt in row track by dt.date')).filter(function (elem, index) {  
                return elem.getText().then(function (text) {
                    return text === numeric;
                });
            }).then(function (filteredElements) {
                if (browser) {
                    if (browser.browserName === 'firefox') {
                        return browser.actions().mouseMove(filteredElements[0]).mouseDown().mouseUp().perform();
                    } else {
                        return filteredElements[0].click();
                    }
                } else {
                    return filteredElements[0].click();
                }
            });
        }
    },

    ifDateButtonDisabled: {
        value: function (numeric, fn) {
            element.all(by.repeater('dt in row track by dt.date')).filter(function (elem, index) {
                return elem.getText().then(function (text) {
                    return text === numeric;
                });
            }).then(function (filteredElements) {
                fn(filteredElements[0].element(by.css("button")).getAttribute("disabled"));
            });
        }
    }
});

module.exports = DatepickerPopup;

