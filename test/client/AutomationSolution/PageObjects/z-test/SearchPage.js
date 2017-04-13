var DatepickerPopup = require('./../Containers/DatepickerPopup.js');
var datepickerPopup = new DatepickerPopup();

var OpenFilesDropdown = require('./../LeftRail/OpenFilesDropdown.js');
var openFilesDropdown = new OpenFilesDropdown();


var SearchPage = function () { };

//searchPage
SearchPage.prototype = Object.create({}, {
    //new: searchPage.tab()
    //old: searchPage.getTab()
    //This will return the tab based on the tab index
    tab: {
        value: function(tabIndex) {
            return element.all(by.repeater('view in mainViews')).get(tabIndex).element(by.css('.ng-binding')); //css('.nav.nav-tabs li')
        }
    }
});

//searchPage.form
SearchPage.prototype.form = Object.create({}, {
    //new: searchPage.form.isVisible
    //old: searchPage.isSearchFormVisible
    isVisible: {
        get: function() {
            return element(by.css('.search-layout')).isDisplayed();
        }
    }
});


SearchPage.prototype.form.buttons = Object.create({}, {
    //new: searchPage.form.buttons.search
    //old: searchPage.searchButton
    search: {
        //This will return the search button
        get: function() {
            return element(by.id('irSearchButton'));
        }
    },
    //new: searchPage.form.buttons.clearCriteria
    //old: searchPage.clearCriteriaButton
    clearCriteria: {
        //clear values in input search boxes
        get: function() {
            return element(by.css('[ng-click="clearCriteria()"]'));
        }
    },
    //new: searchPage.form.buttons.clearResults
    //old: searchPage.clearResultsButton
    clearResults: {
        //clear data in the search grid
        get: function() {
            return element(by.css('[ng-click="clearSearch()"]'));
        }
    }
});

//searchPage.form.fileName
SearchPage.prototype.form.fileName = Object.create({}, {
    //new: searchPage.form.fileName.label
    label: {
        get: function() {
            return null; //stubbed to return file name label
        }
    },
    //new: searchPage.form.fileName.textBox
    //old: searchPage.fileNameSearchBox
    textBox: {
        //This will return the file name search box
        get: function() {
            return element.all(by.model('fileName')).get(0);
        }
    }
});

//searchPage.form.fileNumber
SearchPage.prototype.form.fileNumber = Object.create({}, {
    //new: searchPage.form.fileNumber.label
    label: {
        get: function() {
            return null; //stubbed to return file number label
        }
    },
    //new: searchPage.form.fileNumber.textBox
    //old: searchPage.fileNumberSearchBox
    textBox: {
        //This will return the file number search box
        get: function() {
            return element.all(by.model('fileNumber')).get(0);
        }
    }
});


//searchPage.form.fileMarks
SearchPage.prototype.form.fileMarks = Object.create({}, {
    //new: searchPage.form.fileMarks.label
    label: {
        get: function() {
            return null; //stubbed to return file marks label
        }
    }
});

//searchPage.form.fileMarks.dropdown
SearchPage.prototype.form.fileMarks.dropdown = Object.create({}, {
    //new: searchPage.form.drawers.dropdown.element
    element: {
        get: function() {
            return element(by.id('fileMarks'));
        }
    },
    //new: searchPage.form.fileMarks.dropdown.elements()
    //old: searchPage.fileMarkDropdownElement()
    elements: {
        value: function(index) {
            return element.all(by.css('div#fileMarks a.ng-binding')).get(index);
        }
    },
    //new: searchPage.form.fileMarks.dropdown.button
    //old: searchPage.fileMarkButton
    button: {
        get: function() {
            return element(by.id('fileMarks')).$('.btn');
        }
    },
    //new: searchPage.form.fileMarks.dropdown.selectedValue
    //old: searchPage.fileMarkCounter
    selectedValue: {
        //selects the value that displays the file mark button
        get: function() {
            return element(by.css('.multiselect-parent.btn-group.dropdown-multiselect')).getText();
        }
    },
    //new: searchPage.forms.fileMarks.dropdown.checkElements()
    //old: searchPage.fileMarkCheckElement()
    checkElements: {
        value: function(index) {
            return element.all(by.css('div#fileMarks a.ng-binding')).get(index).element(by.css('span'));
        }
    }
});

//searchPage.form.drawers
SearchPage.prototype.form.drawers = Object.create({}, {
    //new: searchPage.form.drawers.label
    label: {
        get: function() {
            return null; //stubbed to return drawers label
        }
    }
});

//searchPage.form.drawers.dropdown
SearchPage.prototype.form.drawers.dropdown = Object.create({}, {
    //new: searchPage.form.drawers.dropdown.element
    //old: searchPage.drawerDropDownList
    element: {
        get: function() {
            return element(by.id('drawers'));
        }
    },
    //new: searchPage.form.drawers.dropdown.elements()
    //old: searchPage.drawerDropdownElement()
    elements: {
        value: function(index) {
            return element.all(by.css('select#drawers~div li')).get(index);
        }
    },
    //new: searchPage.form.drawers.dropdown.button
    //old: searchPage.drawerDropdown
    button: {
        get: function() {
            return element(by.xpath("//button[@data-id='drawers']"));
        }
    },
    //new: searchPage.form.drawers.dropdown.selectedValue
    //old: searchPage.drawerDropdownSelectedValue
    selectedValue: {
        get: function() {
            return element(by.xpath("//button[@data-id='drawers']")).$('.filter-option');
        }
    }
});

SearchPage.prototype.grid = Object.create({}, {
    //new: searchPage.grid.rows
    //old: searchPage.searchGrid
    rows: {
        get: function() {
            return element.all(by.css('.search-results')).get(0).all(by.repeater('row in renderedRows'));
        }
    }
});

SearchPage.prototype.header = Object.create({}, {
    //new: searchPage.header.label
    //old: searchPage.searchResultsHeader
    label: {
        get: function() {
            return $('[ng-bind-html=searchDataString]');
        }
    }
});


module.exports = SearchPage;




