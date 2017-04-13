var MultiSelectView = function () { };

var activeFile = $('.vf-tab-pane.active');

MultiSelectView.prototype = Object.create({}, {

    multiSelectViewContainer: {
        get: function () {
            return $('.multi-select-view');
        }
    },

    renameButton: {
        get: function () {
            return activeFile.$('[ir-content-rename-description]');
        }
    },

    envelopes: {
        get: function () {
            return element.all(by.css('.multi-select-stack .stacked-item:not(.ng-hide)'));
        }
    },

    envelope1Image: {
        get: function () {
            return element(by.css('.multi-select-stack .stacked-1'));
        }
    },

    envelope2Image: {
        get: function () {
            return element(by.css('.multi-select-stack .stacked-2'));
        }
    },

    envelope3Image: {
        get: function () {
            return element(by.css('.multi-select-stack .stacked-3'));
        }
    },

    envelope4Image: {
        get: function () {
            return element(by.css('.multi-select-stack .stacked-4'));
        }
    },

    envelope5Image: {
        get: function () {
            return element(by.css('.multi-select-stack .stacked-5'));
        }
    },

    documentType: {
        get: function () {
            return element.all(by.css(".multi-select-view h1")).get(0).getText();
        }
    },

    multiSelectTitle: {
        get: function () {
            return element(by.css('.multi-select-title')).getText();
        }
    },

    multiSelectActionsButton: {
        get: function () {
            return element(by.css('.multi-select-actions button'));
        }
    }
});

module.exports = MultiSelectView;