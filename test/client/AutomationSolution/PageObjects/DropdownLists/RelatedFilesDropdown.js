var RelatedFilesDropdown = function () { };

RelatedFilesDropdown.prototype = Object.create({}, {

    container: { value: ".vf-tab-pane.active .dropdown-menu.related-files "},
    
    title: {
        get: function () {
            return element(by.css(this.container + '.dropdown-header')).getText();
        }
    },

    footer: {
        get: function () {
            return element(by.css(this.container + '.file-flyout-footer')).getText();
        }
    },

    allRelatedFiles: {
        get: function () {
            return element.all(by.css(this.container + 'li'));
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
    }
});

module.exports = RelatedFilesDropdown;
