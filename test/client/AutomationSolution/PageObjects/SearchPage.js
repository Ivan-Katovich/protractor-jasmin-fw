var DatepickerPopup = require('./Containers/DatepickerPopup.js');
var datepickerPopup = new DatepickerPopup();

var OpenFilesDropdown = require('./LeftRail/OpenFilesDropdown.js');
var openFilesDropdown = new OpenFilesDropdown();


var SearchPage = function () { };

SearchPage.prototype = Object.create({}, {

    //This will return the tab based on the tab index
    getTab: {
        value: function(tabIndex) {
            return element.all(by.repeater('view in mainViews')).get(tabIndex).element(by.css('.ng-binding')); //css('.nav.nav-tabs li')
        }
    },

    //This will return whether the search page is currently open or not
    isSearchFormVisible: {
        get: function() {
            return element(by.css('.search-layout')).isDisplayed();
        }
    },

    fileNameSearchBox: {
        //This will return the file name search box
        get: function() {
            return element.all(by.model('fileName')).get(0);
        }
    },


    fileNumberSearchBox: {
        //This will return the file number search box
        get: function() {
            return element.all(by.model('fileNumber')).get(0);
        }
    },


    searchButton: {
        //This will return the search button
        get: function() {
            return element(by.id('irSearchButton'));
        }
    },

    //This will return the search grid
    searchGrid: {
        get: function() {
            return element.all(by.css('.search-results')).get(0).all(by.css('.ngRow'));
        }
    },

    isSearchGridVisible: {
        get: function() {
            return $('.search-results').isDisplayed();
        }
    },

    searchResultsHeader: {
        get: function() {
            return $('[ng-bind-html=searchDataString]');
        }
    },

    pageCountElement: {
        get: function() {
            return element.all(by.css('.search-results')).get(0).all(by.css('.ngFooterTotalItems span:not(.ng-hide)')).get(0);
        }
    },

    currentPage: {
        get: function() {
            return element(by.css('.ngPagerCurrent'));
        }
    },

    totalPages: {
        get: function() {
            return element(by.css('.ngMaxPages'));
        }
    },

    previousPageButton: {
        get: function() {
            return element(by.css('.ngPagerPrevTriangle'));
        }
    },

    nextPageButton: {
        get: function() {
            return element(by.css('.ngPagerNextTriangle '));
        }
    },

    firstLinkInResults: {
        get: function() {
            return this.searchGrid.get(0).all(by.repeater('col in renderedColumns')).get(0).all(by.css('a')).get(0);
        }
    },

    clearCriteriaButton: {
        //clear values in input search boxes
        get: function() {
            return element(by.css('[ng-click="clearCriteria()"]'));
        }
    },

    clearResultsButton: {
        //clear data in the search grid
        get: function() {
            return element(by.css('[ng-click="clearSearch()"]'));
        }
    },

    closeResultsButton: {
        //close search results
        get: function () {
            return element(by.css('[ng-click="closeSearchResults()"]'));
        }
    },

    fileMarkButton: {
        get: function() {
            return element(by.id('fileMarks')).$('.btn');
        }
    },

    fileMarkCounter: {
        //selects the value that displays the file mark button
        get: function() {
            return element(by.css('.multiselect-parent.btn-group.dropdown-multiselect')).getText();
        }
    },

    fileMarkDropdownElement: {
        value: function(index) {
            return element.all(by.css('div#fileMarks a.ng-binding')).get(index);
        }
    },

    fileMarkCheckElement: {
        value: function(index) {
            return element.all(by.css('div#fileMarks a.ng-binding')).get(index).element(by.css('span'));
        }
    },

    drawerDropdown: {
        get: function() {
            return element(by.xpath("//button[@data-id='drawers']"));
        }
    },

    drawerDropdownElement: {
        value: function(index) {
            return element.all(by.css('select#drawers~div li')).get(index);
        }
    },

    drawerDropdownSelectedValue: {
        get: function() {
            return element(by.xpath("//button[@data-id='drawers']")).$('.filter-option');
        }
    },

    fileTypeDropdown: {
        get: function() {
            return element(by.xpath("//button[@data-id='fileTypes']"));
        }
    },

    fileTypeDropdownElement: {
        value: function(index) {
            return element.all(by.css('select#fileTypes~div li')).get(index);
        }
    },

    fileTypeDropdownElementByText: {
        value: function (text) {
            return element(by.linkText(text));
        }
    },

    //Below function returns all the fileTypes elements in a  list
    fileTypeDropdownElements: {
        get: function() {
            return element.all(by.css('select#fileTypes~div li'));
        }
    },
    fileTypeDropdownSelectedValue: {
        get: function() {
            return element(by.xpath("//button[@data-id='fileTypes']")).$('.filter-option');
        }
    },

    fileTypeAttrBoolCheckbox: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(0).all(by.tagName('label')).get(1);
        }
    },
    fileTypeAttrBoolCheckboxChecked: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(0).all(by.tagName('input')).get(0).getAttribute('checked');
        }
    },
    fileTypeAttrDatepicker: {
        get: function() {
            return element(by.css('input[uib-datepicker-options="dateOptions"]'));
        }
    },

    fileTypeAttrStringInput: {
        get: function() {
            return element(by.id("ir:attrdef_3"));
        }
    },

    fileTypeAttrStringDropdown: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(3).all(by.tagName('button')).get(0);
            //element(by.id("ir:attrdef_4"));
        }
    },

    fileTypeAttrStringElements: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(3).all(by.tagName('li'));
            // element.all(by.css("[id='ir:attrdef_4']>option"));
        }
    },

    fileTypeAttrStringSelectedValue: {
        get: function() {
            return this.fileTypeAttrStringDropdown.getAttribute('title');
        }
    },

    fileTypeAttrIntDropdown: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(5).all(by.tagName('button')).get(0);
            //element(by.id("ir:attrdef_6"));
        }
    },

    fileTypeAttrIntSelectedValue: {
        get: function() {
            return this.fileTypeAttrIntDropdown.getAttribute('title');
        }
    },

    fileTypeAttrIntElements: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(5).all(by.tagName('li'));
            //element.all(by.css("[id='ir:attrdef_6']>option"));
        }
    },

    fileTypeAttrFloatDropdown: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(8).all(by.tagName('button')).get(0);
            // element(by.id("ir:attrdef_9"));
        }
    },

    fileTypeAttrFloatSelectedValue: {
        get: function() {
            return this.fileTypeAttrFloatDropdown.getAttribute('title');
        }
    },

    fileTypeAttrFloatElements: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(8).all(by.tagName('li'));
        }
    },

    fileTypeAttrUserDropdown: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(10).all(by.tagName('button')).get(0);
        }
    },

    fileTypeAttrUserElements: {
        get: function() {
            return element.all(by.repeater('attr in attrGroup')).get(10).all(by.tagName('li'));
            //element.all(by.css("[id='ir:attrdef_11']>option"));
        }
    },

    fileTypeAttrUserSelectedValue: {
        get: function() {
            return this.fileTypeAttrUserDropdown.getAttribute('title');
        }
    },
    //Below for live data
    labelIntMinMax: {
        get:function() {
            return element(by.xpath('//label[@title="int with min(10) and max(20)"]'));
        }
    },
    //Below for live data
    labelFloatMinMax: {
        get: function () {
            return element(by.xpath('//label[@title="float with min(50)-max(200)"]'));
        }
    },
    labelFileTypeAttrInt: {
        get: function() {
            return element(by.xpath('//label[@title="Attr Int no min max"]'));
        }
    },
    attrStrMax255: {
        get: function() {
            return element(by.id("ir:attrdef_9304"));
        }
    },
    attrStrMax15: {
        get: function () {
            return element(by.id("ir:attrdef_9308"));
        }
    },
    attrFloatMax255: {
        get: function () {
            return element(by.id("ir:attrdef_9305"));
        }
    },
    attrFloatMax15: {
        get: function () {
            return element(by.id("ir:attrdef_9306"));
        }
    },
    attrIntMax255: {
        get: function () {
            return element(by.id("ir:attrdef_9303"));
        }
    },
    attrIntNumberMinMaxEncrypted: {
        get: function () {
            return element(by.id("ir:attrdef_1"));
        }
    },
    attrIntNumberMinMaxUnencrypted: {
        get: function () {
            return element(by.id("ir:attrdef_2"));
        }
    },
    attrIntMax15: {
        get: function () {
            return element(by.id("ir:attrdef_9307"));
        }
    },
    attrDateTimePicker: {
        get: function () {
            return element(by.id("attrdef9309"));
        }
    },
    attrDateTimePicker_none: {
        get: function () {
            return element(by.id("ir:attrdef_9310"));
        }
    },
    attrFloatMin50Max200: {
        get: function () {
            return element(by.id("ir:attrdef_9311"));
        }
    },
    attrIntMin10Max20: {
        get: function () {
            return element(by.id("ir:attrdef_9312"));
        }
    },
    fileTypeAttrIntScrollingMin: {
        get: function() {
            return element(by.id("ir:attrdef_7"));
        }
    },

    fileTypeAttrIntScrollingMax: {
        get: function() {
            return element(by.id("ir:attrdef_5"));
        }
    },
    labelfileTypeAttrFloatScrollingMin:{
        get:function() {
            return element(by.xpath('//label[@title="Attr Float with min max"]'));
        }
    },
    fileTypeAttrFloatScrollingMin: {
        get: function() {
            return element(by.id("ir:attrdef_10"));
        }
    },

    fileTypeAttrFloatScrollingMax: {
        get: function() {
            return element(by.id("ir:attrdef_8"));
        }
    },

    fileTypeAttrEncrString: { //Attr named EncryptedAttr
        get: function() {
            return element(by.id("ir:attrdef_30241"));
        }
    },

    fileTypeAttrBillingCode: {
        get: function() {
            return element(by.id("ir:attrdef_48"));
        }
    },

    drawerDropDownList: {
        get: function() {
            return element(by.id('drawers'));
        }
    },

    getAllResultsFromColumnInGrid: {
        value: function(columnName) {
            switch (columnName.toLowerCase()) {
            case "file number":
                return element.all(by.css('.ngCell.col0.colt0 a'));
            case "file name":
                return element.all(by.css('.ngCellText.ng-scope.col1.colt1 span'));
            case "drawer":
                return element.all(by.css('.ngCellText.ng-scope.col2.colt2 span'));
            case "file type":
                return element.all(by.css('.ngCellText.ng-scope.col3.colt3 span'));
            default:
                throw new Error("Invalid column name!");
            }
        }
    },

    cellFromResultsGrid: {
        value: function(columnName, rowIndex) {
            return this.getAllResultsFromColumnInGrid(columnName).get(rowIndex);
        }
    },

    buttonInSearchResultsGridHeader: {
        value: function(columnName) {
            switch (columnName.toLowerCase()) {
            case "file number":
                return element(by.css('.ngHeaderCell.ng-scope.col0.colt0'));
            case "file name":
                return element(by.css('.ngHeaderCell.ng-scope.col1.colt1'));
            case "drawer":
                return element(by.css('.ngHeaderCell.ng-scope.col2.colt2'));
            case "file type":
                return element(by.css('.ngHeaderCell.ng-scope.col3.colt3'));
            default:
                throw new Error("Invalid column name!");
            }
        }
    },

    isSortButtonUpActive: {
        value: function(columnName) {
            return this.buttonInSearchResultsGridHeader(columnName).element(by.css('.ngSortButtonUp')).isDisplayed();
        }
    },

    isSortButtonDownActive: {
        value: function(columnName) {
            return this.buttonInSearchResultsGridHeader(columnName).element(by.css('.ngSortButtonUp')).isDisplayed();
        }
    },

    datepicker: {
        get: function() {
            return datepickerPopup.datepickerContainer;
        }
    },

    chooseDateInDatepicker: {
        value: function(date, browser) {
            if (browser) {
                datepickerPopup.clickDateButton(date, browser);
            } else {
                datepickerPopup.clickDateButton(date);
            }
        }
    },

    clickLeftRowInDatepicker: {
        value: function() {
            datepickerPopup.leftRowButton.click();
        }
    },

    invalidUrlPopup: {
        get: function () {
            return element(by.css('.modal-content'));
        }
    }
});

module.exports = SearchPage;




