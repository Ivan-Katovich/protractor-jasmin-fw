var ImportQueue = function () { };

ImportQueue.prototype = Object.create({}, {

    container: { value: '.import-list ' },

    importListButton: {
        get: function () {
            return element(by.css('.icon-import-list'));
        }
    },

    importDropdownMenu: {
        get: function () {
            return element(by.css('.import-list'));
        }
    },

    importFiles: {
        get: function () {
            return element.all(by.css(this.container + 'ul.import-file-list li[ng-repeat]'));
        }
    },

    importFile: {
        value: function (index) {
            return this.importFiles.get(index);
        }
    },

    importFileName: {
        value: function (index) {
            return element.all(by.css(this.container + '.queue-text-node')).get(index);
        }
    },

    importAllCheckbox: {
        get: function () {
            return element(by.css(this.container + '.file-flyout-header .checkbox-control label.fa'));
        }
    },

    importAllCheckboxState: {
        get: function () {
            return element(by.css(this.container + '.file-flyout-header .checkbox-control input'));
        }
    },

    importCheckbox: {
        value: function (index) {
            return element.all(by.css(this.container + '.import-list-item .import-item-checkbox label.fa')).get(index);
        }
    },

    importCheckboxState: {
        value: function (index) {
            return element.all(by.css(this.container + '.import-list-item .import-item-checkbox input')).get(index);
        }
    },

    splitCheckbox: {
        value: function (index) {
            return element.all(by.css(this.container + '.import-list-item .queue-file-box label.fa')).get(index);
        }
    },

    splitCheckboxState: {
        value: function (index) {
            return element.all(by.css(this.container + '.import-list-item .queue-file-box input')).get(index);
        }
    },

    previewButton: {
        value: function (index) {
            browser.actions().mouseMove(this.importFileName(index)).perform();
            return this.previewButtonNotHovered(index);
        }
    },

    previewButtonNotHovered: {
        value: function (index) {
            return element.all(by.css(this.container + '.import-item-actions button[ng-click*="togglePreview"]')).get(index);
        }
    },

    deleteButton: {
        value: function (index) {
            var _this = this;
            return browser.actions().mouseMove(_this.importFileName(index)).perform()
                .then(function () {
                    return browser.sleep(100);
                })
                .then(function () {
                    return _this.deleteButtonNotHovered(index).click();
                });
        }
    },

    deleteButtonNotHovered: {
        value: function (index) {
            return element.all(by.css(this.container + '.import-item-actions button[title="Delete"]')).get(index);
        }
    },

    deleteAllButton: {
        get: function () {
            return element(by.css(this.container + 'button[title="Delete All"]'));
        }
    },

    importButton: {
        get: function () {
            return element(by.css(this.container + '.import-btn-box button.btn-primary'));
        }
    },

    importFilesCountInBadge: {
        get: function () {
            return element(by.css('button[title="Import Bin"] .diaries-badge'));
        }
    },

    youHaveNoItemsMessage: {
        get: function () {
            return element(by.cssContainingText(this.container + '.import-list-box .todo-notodos', 'You have no items.'));
        }
    }


});

module.exports = ImportQueue;
