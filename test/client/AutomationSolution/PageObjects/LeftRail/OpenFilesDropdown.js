var OpenFilesDropdown = function () { };

OpenFilesDropdown.prototype = Object.create({}, {

    container: { value: ".open-list-container " },

    openFilesDropdownContainer: {
        get: function () {
            return element(by.css(".file-flyout"));
        }
    },

    visible: {
        get: function(){
            return element(by.css('.file-list-box')).isDisplayed();
        }
    },

    isOpenFileDropdownOpen: {
        value: function () {
            return element(by.id('openFilesList')).$('.dropdown-toggle').getAttribute('aria-expanded');
        }
    },

    dropdownHeader: {
        get: function () {
            return element.all(by.css('.file-flyout-header')).get(0);
        }
    },

    headerFileCount: {
        get: function () {
            return element.all(by.css('#openFilesList .file-flyout-header .pull-left')).first().getText();
        }
    },

    closeAllFilesButton: {
        get: function () {
            return element(by.css('.file-flyout-header .fa.fa-close'));
        }
    },

    getFileNumbers: {
        get: function () {
            return element.all(by.css('.file-item-name .record-number'));
        }
    },

    getFileNames: {
        get: function () {
            return element.all(by.css('.file-item-name .open-file-name'));
        }
    },

    fileName: {
        value: function (index) {
            return element.all(by.css(this.container + '.open-file-name')).get(index);
        }
    },

    fileNumber: {
        value: function (index) {
            return element.all(by.css(this.container + '.record-number')).get(index);
        }
    },

    fileType: {
        value: function (index) {
            return element.all(by.css(this.container + '.open-file-type')).get(index);
        }
    },

    getFileList: {
        get: function () {
            return element.all(by.repeater('file in vm.navService.openFiles'));
        }
    },

    openFileRecord: {
        value: function (index) {
            return this.getFileList.get(index);
        }
    },

    fileNumberContainer: {
        get: function () {
            return element(by.xpath('//li[@ir-open-files-list=""]')).$('.open-file-title').$('.ir-file-info');
        }
    },

    fileNameOpenFileDropsDown: {
        get: function () {
            return element(by.xpath('//li[@ir-open-files-list=""]')).$('.open-file-title').$('.open-file-name');
        }
    },

    //is this still part of the webclient?
    badgeInfo: {
        get: function () {
            return element(by.xpath('//li[@ir-open-files-list=""]')).$('.ir-file-badge');
        }
    },

    howerMouseOnFile: {
        value: function (index, x, y) {
            var px = x ? x : 5;
            var py = y ? x : 5;
            return browser.actions()
                    .mouseMove(this.fileName(index), { x: px, y: py })
                    .mouseDown()
                    .mouseMove({ x: px, y: py })
                    .perform();
        }
    },

    closeFileIcon: {
        value: function (index) {
            return element.all(by.css(".file-item-remove")).get(index);
        }
    },

    removeOpenFileIcon: {
        value: function (index) {
            browser.actions().mouseMove(this.fileName(index), { x: 5, y: 5 }).mouseDown().mouseMove({ x: 5, y: 5 }).perform();
            return this.removeOpenFileIconNotHovered(index);
        }
    },

    removeOpenFileIconNotHovered: {
        value: function (index) {
            return element.all(by.css(".file-item-remove")).get(index);
        }
    },

    noFilesMessage: {
        get: function () {
            return element(by.css('.file-list-nofiles'));
        }
    },

    fileNameByText: {
        value: function (text) {
            return element(by.cssContainingText('div.open-file-name', text));
        }
    }
});

module.exports = OpenFilesDropdown;
