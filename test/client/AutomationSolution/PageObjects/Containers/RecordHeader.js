var RecordHeader = function () { };

//returns all the elements inside file-marks-list
var activeFile = $('.vf-tab-pane.active'), fileMarksList = activeFile.$('.record-file-marks').$('.ir-file-detail').all(by.css('.file-marks-list'));

RecordHeader.prototype = Object.create({}, {

    recordHeaderContainer: {
        get: function () {
            return $('.ir-client-area');
        }
    },

    recordHeaderContainers: {
        get: function () {
            return element.all(by.css('.ir-client-area'));
        }
    },

    // Below function returns the close file button
    closeFileButton: {
        get: function () {
            return activeFile.$('.record-file-close');
        }
    },

    // Below function returns the value of fileMark label inside Client header
    fileMarkLabel: {
        get: function () {
            return activeFile.$('.record-file-marks');
        }
    },

    // Below function returns fileMarks dropdown element from record header
    fileMarksDropdown: {
        get: function () {
            return activeFile.$('.record-file-marks').$('.ir-file-detail').$('.dropdown-toggle');
        }
    },

    // Below function returns all the availale icons  filemarks
    fileMarksIconElements: {
        get: function () {
            return activeFile.$('.record-file-marks').$('.ir-file-detail').all(by.tagName("img"));
        }
    },

    // Below function returns fileMarks outside elements which are displayed without clicking on filemarks dropdown on record header
    fileMarksOutSideElements: {
        get: function () {
            return fileMarksList.get(0).all(by.css('.fm'));
        }
    },

    // Below function returns specific filemark inside the dropdown based on given index
    fileMarkInDropdown: {
        value: function (index) {
            return fileMarksList.get(1).$('.fm.type-' + index);
        }
    },

    // returns all the elements of filemarks within dropdown
    fileMarksAllElementsList: {
        get: function () {
            return fileMarksList.get(1).all(by.css('.fm'));
        }
    },

    // Below function returns fileMarks value from record header
    fileMarksRecordHeader: {
        get: function () {
            return element.all(by.css('.file-marks-list'));
        }
    },

    // Below function returns drawer value from record header
    drawerRecordHeader: {
        get: function () {
            return activeFile.$('.record-drawer').$('.ir-file-detail');
        }
    },

    // Below function returns filetype value from record header
    fileTypeRecordHeader: {
        get: function () {
            return activeFile.$('.record-file-type').$('.ir-file-detail');
        }
    },

    fileMarksDropdownDownArrow: {
        get: function () {
            return activeFile.$('.record-file-marks').$('.ir-file-detail').$('.dropdown-toggle').$('.caret');
        }
    },

    // Below function returns file number element
    fileNumberRecordHeader: {
        get: function () {
            return activeFile.$('.ir-file-number');
        }
    },

    // Below function returns file name element
    fileNameRecordHeader: {
        get: function () {
            return activeFile.$('.ir-filename');
        }
    },

    // Returns Badge element
    getBadgeInfo: {
        get: function () {
            return activeFile.$('.ir-client-badge');
        }
    },

    // Returns badge attributes pop-up header
    fileAttributePopupHeaderElement: {
        get: function () {
            return activeFile.$('.badge-attr').$('.dropdown-header');
        }
    },

    // The below function returns the attributes displayed in badge pop-up -
    // but below function only used to check the number of the attributes actually displayed or not
    fileAttributesList: {
        get: function () {
            return activeFile.$('.badge-attr').$('.file-attr-list').all(by.tagName('li'));
        }
    },

    // Returns all the file attributes displayed under pop-up below badge -
    // you can iterate through the list and get the details about attributes names that
    fileAttributesNameList: {
        get: function () {
            return activeFile.$('.badge-attr').all(by.css('.file-attr-name'));
        }
    },

    // Returns all the file attributes displayed under pop-up  below badge -
    // you can iterate through the list and get the details of attributes values about that
    fileAttributesValueList: {
        get: function () {
            return activeFile.$('.badge-attr').all(by.css('.file-attr-value'));
        }
    },

    fileTaskListBadge: {
        get: function () {
            return element(by.css('.vf-tab-pane.active .record-diaries button.dropdown-toggle'));
        }
    },

    relatedFileListBadge: {
        get: function () {
            return element(by.css('.vf-tab-pane.active #ir-open-file-button'));
        }
    },

    fileTaskListCountInBadge: {
        get: function () {
            return element.all(by.css('.vf-tab-pane.active .record-diaries .diaries-badge')).get(0);
        }
    },

    // Below function returns active file name element (if several files are opened)
    activeFileNameRecordHeader: {
        get: function () {
            return $('.vf-tab-pane.active .ir-filename');
        }
    }
});

module.exports = RecordHeader;