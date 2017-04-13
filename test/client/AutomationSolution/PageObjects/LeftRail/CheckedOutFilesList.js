var CheckedOutFilesList = function () { };

CheckedOutFilesList.prototype = Object.create({}, {

    checkedOutFilesListContainer: {
        get: function () {
            return element(by.css("#openFilesList > div > div.file-list-box.checkout-file-list.ng-scope"));
        }
    },

    getFileList: {
        get: function () {
            return element.all(by.css('[ng-repeat="page in vm.webDavService.webDavPages"]'));
        }
    },

    goToCheckedOutDoc: {
        value: function (index) {
            return this.getFileList.get(index);
        }
    },

    fileNumberContainer: {
        value: function (index) {
            return this.goToCheckedOutDoc(index).$('.file-item-name').$('.record-number');
        }
    },

    fileNameOpenFileDropsDown: {
        value: function (index) {
            return this.goToCheckedOutDoc(index).$('.file-item-name').$('.open-file-name');
        }
    },

    pageCountText: {
        get: function () {
            return element(by.css('#openFilesList > div > div.file-flyout-footer.text-right.ng-binding')).getText();
        }
    }
});

module.exports = CheckedOutFilesList;
