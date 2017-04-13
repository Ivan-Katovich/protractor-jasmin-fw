var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var DiaryList = function () { };

DiaryList.prototype = Object.create({}, {

    container: { value: ".diary-container " },

    noDiariesMessageDisplayed: {
        get: function () {
            return element.all(by.css(this.container + '.todo-notodos')).get(0).getText();
        }
    },

    searchInput: {
        get: function () {
            return element(by.css(this.container + '.searchbox input'));
        }
    },

    findDiary: {
        value: function (diaryDescription, fn) {
            webdriverUtils.getItemIndex(this.allDiariesDescriptions, diaryDescription.trim(), function (taskIndex) {
                fn(taskIndex);
            });
        }
    },

    diaries: {
        get: function () {
            return element.all(by.css(this.container + 'ul.todo-list-items li[ng-repeat]')).filter(function (elems) {
                return elems.isDisplayed();
            })
        }
    },

    diary: {
        value: function (diary) {
            switch (typeof (diary)) {
                case 'number':
                    return this.diaries.get(diary);
                case 'string':
                    return element(by.cssContainingText(this.container + '.diary-description', diary));
            };
        }
    },

    diaryFileName: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item-title .todo-item-options h3')).get(index);
        }
    },

    diaryFileNumber: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item h4')).get(index);
        }
    },

    diaryAssignedTo: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item .diariy-option .assign-value')).get(index);
        }
    },

    allDiariesDescriptions: {
        get: function () {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item .diary-description'));
        }
    },

    diaryDescription: {
        value: function (index) {
            return this.allDiariesDescriptions.get(index).getText();
        }
    },

    diaryBody: {
        value: function (index) {
            return this.allDiariesDescriptions.get(index);
        }
    },

    hoverMouseOnDiary: {
        value: function (diary) {
            return browser.actions()
                    .mouseMove(this.diary(diary), { x: 5, y: 5 })
                    .mouseDown()
                    .perform();
        }
    },

    clickCog: {
        value: function () {
            return element.all(by.css(this.container + '.fa.fa-cog')).filter(function (elem) {
                return elem.isDisplayed();
            }).first().click()
            .then(function () {
                return browser.sleep(2000);
            })
        }
    },

    getCog: {
        value: function (index) {
            if (index == undefined)
                return element.all(by.css(this.container + '.fa.fa-cog'));
            else
                return element.all(by.css(this.container + '.fa.fa-cog')).get(index);
        }
    },

    priorityAndDate: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item-title .task-priority')).get(index);
        }
    },

    priority: {
        value: function (index, fn) {
            this.priorityAndDate(index).getText().then(function (text) {
                var outgoingArray = text.split("|");
                fn(outgoingArray[0].trim());
            });
        }
    },

    availableDate: {
        value: function (index, fn) {
            this.priorityAndDate(index).getText().then(function (text) {
                var outgoingArray = text.split("|");
                fn(outgoingArray[1].trim());
            });
        }
    },

    footer: {
        get: function () {
            return element(by.css(this.container + '.todo-footer'));
        }
    },
});

module.exports = DiaryList;
