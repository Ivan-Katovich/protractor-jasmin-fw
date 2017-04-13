var HistoricalNoteView = function () { };

HistoricalNoteView.prototype = Object.create({}, {

    historicalNoteViewContainer: {
        get: function() {
            return element(by.css('body > div:nth-child(1) > div.grid-main-content > div > div > div > div > div > ir-open-file > div.viewer-box > div.grid-wrapper > div.grid-right > div > div > div.file-level-wrapper.ng-scope.ng-isolate-scope'));
        }
    },

    header: {
        get: function () {
            return element(by.css('body > div:nth-child(1) > div.grid-main-content > div > div > div > div > div > ir-open-file > div.viewer-box > div.grid-wrapper > div.grid-right > div > div > div.file-level-wrapper.ng-scope.ng-isolate-scope > div > div.file-notes-header.clearfix > div:nth-child(2)'));
        }
    },

    entryByIndex: {
        value: function (index) {
            return element(by.css('body > div:nth-child(1) > div.grid-main-content > div > div > div > div > div > ir-open-file > div.viewer-box > div.grid-wrapper > div.grid-right > div > div > div.file-level-wrapper.ng-scope.ng-isolate-scope > div > div.file-notes-content > ul > li:nth-child(' + index + ')'));
        }
    },

    dateOfEntry: {
        value: function (index) {
            return element(by.css('body > div:nth-child(1) > div.grid-main-content > div > div > div > div > div > ir-open-file > div.viewer-box > div.grid-wrapper > div.grid-right > div > div > div.file-level-wrapper.ng-scope.ng-isolate-scope > div > div.file-notes-content > ul > li:nth-child(' + index + ') > div > span.text-uppercase.ng-binding'));
        }
    }
});

module.exports = HistoricalNoteView;







