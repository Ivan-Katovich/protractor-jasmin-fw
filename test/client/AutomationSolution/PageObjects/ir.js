//var deferred = require('deferred');

//IR.FormElement
var formElement = function (config) {
    this.label = config.label ? config.label : null;
    this.element = config.element ? config.element : null;
};

formElement.prototype.setText = function(value) {
    var def = protractor.promise.defer();

    var desc = this.element;
    desc.click().then(function() {
        desc.clear().then(function() {
            desc.sendKeys(value).then(function() {
                def.fulfill();
            });
        });
    });

    return def.promise;
};

//IR.DropDown
var dropDown = function (config) {
    formElement.call(this, config);
    this.selectElement = config.selectElement ? config.selectElement : null;
    this.optionsElementSelector = config.optionsElementSelector ? config.optionsElementSelector : null;
    this.selectElementToggleElement = config.selectElementToggleElement ? config.selectElementToggleElement  : null;
};
dropDown.prototype = Object.create(formElement.prototype);

dropDown.prototype.getOptions = function() {
    return this.selectElement.all(by.css('option'));
};
dropDown.prototype.getSelectedOption = function() {
    return this.selectElement.all(by.css('option:selected')).first();
};
dropDown.prototype.setSelectedOption = function(index) {
    var def = protractor.promise.defer();

    var optionSelector = this.optionsElementSelector;
    this.selectElementToggleElement.click().then(function() {
        var item = element.all(by.css(optionSelector)).get(index);
        item.click().then(function() {
            def.fulfill();
        });
    });
    return def.promise;
};


//IR.DropdownMenu
var dropDownMenu = function(config) {
    formElement.call(this, config);
    this.toggleButton = config.toggleButton ? config.toggleButton : null;
};
dropDown.prototype = Object.create(formElement.prototype);

//IR.Button
var button = function (config) {
    formElement.call(this, config);
};
button.prototype = Object.create(formElement.prototype);

button.prototype.enabled = function() {
    var def = protractor.promise.defer();
    this.element.getAttribute('class').then(function(value) {
        def.fulfill(value.indexOf('disabled') < 0);
    });

    return def.promise;
};

button.prototype.click = function() {
    return this.element.click();
};

//IR.Grid
var grid = function (config) {
    this.element = config.element ? config.element : null;
    this.rows = config.rows ? config.rows : null;
};

//IR.IconButton
var iconButton = function(config) {
    this.icon = config.icon ? config.icon : null;
    this.button = config.button ? config.button : null;
};

//IR.List - Handlers
function getItemByTextHandler (el, itemTextLocator, text) {
    return (function () {
        return el.element.all(itemTextLocator).first().getText().then(function(value){
            return value === text ? el : null;
        });
    }());
}
function getItemByAttributeHandler (el, attribute, text) {
    return (function () {
        return el.element.getAttribute(attribute).then(function(value){
            return value === text ? el : null;
        });
    }());
}

//IR.List
var list = function (config) {
    //todo - add header and footer objects
    return {
        itemsLocator: config.itemsLocator ? config.itemsLocator : null,
        itemTextLocator: config.itemTextLocator ? config.itemTextLocator : null,
        itemType: config.itemType ? config.itemType : listItem,
        get items () {
            return function () {
                var that = this;
                var def = protractor.promise.defer();
                var items = [];
                var el = element.all(this.itemsLocator);
                el.then(function(elements){
                    var index = 0;
                    for (var i in elements) {
                        var item = new that.itemType({ //new listItem
                            element: elements[i],
                            index: index
                        });
                        items.push(item);
                        index++;
                    }
                    def.fulfill(items);
                });
                return def.promise;
            };
        },
        get itemAt() {
            return function(index) {
                return new this.itemType({
                    element: element.all(this.itemsLocator).get(index),
                    index: index
                });
            };
        },
        get itemsCount () {
            return element.all(this.itemsLocator).count();
        },

        getItemByText: function (text) {
            var that = this;
            return function () {
                var response = function(result){
                    if (result !== null) {
                        def.fulfill(result);
                    }
                };
                var def = protractor.promise.defer();
                that.items().then(function(items){
                    for (var item in items) {
                        var el = items[item];
                        getItemByTextHandler(el, that.itemTextLocator, text).then(response);
                    }
                });
                return def.promise;
            };
        },
        getItemByAttribute: function (attribute, text) {
            var that = this;
            return function () {
                var def = protractor.promise.defer();
                that.items().then(function(items){
                    for (var item in items) {
                        var el = items[item];
                        var attributeItem = getItemByAttributeHandler(el, attribute, text)();
                        if (attributeItem !== null) {
                            def.fulfill(attributeItem);
                        }
                    }
                });
                return def.promise;
            };
        }
    };
};

//IR.ListItem
var listItem = function (config) {
    this.element = config.element ? config.element : null;
    this.index = config.index ? config.index : 0;
};
listItem.prototype.text = function () {
    return this.element.getText().then(function(text){
        return text;
    });
};

//IR.FileTree
var fileTree = function (config) {
    return new list(config);
};

//IR.Modal
var modal = function(config) {
    return {

        elementSelector: config.elementSelector ? config.elementSelector : null,
        okButtonSelector: config.okButtonSelector ? config.okButtonSelector : null,
        cancelButtonSelector: config.cancelButtonSelector ? config.cancelButtonSelector : null,
        headerSelector: config.headerSelector ? config.headerSelector : null,

        get element() {
            return element(by.css(this.elementSelector));
        },

        get header() {
            return element(by.css(this.headerSelector));
        },

        get headerText() {
            return element(by.css(this.headerSelector)).getText();
        },

        get okButton() {
            return new button({
                element: element(by.css(this.okButtonSelector))
            });
        },

        get cancelButton() {
            return new button({
                element: element(by.css(this.cancelButtonSelector))
            });
        }
    };
};

//IR.View
var view = function (config) {
    if (config.isPreview === false) {
        this.viewer = element(by.css('.vf-tab-pane.active'));
    } else {
        this.viewer = function (fileId) {
            return element(by.id('preview-viewer-' + fileId));
        };
    }
    this.viewingArea = function (fileId) {
        return this.viewer(fileId).element(by.id('viewing-area-' + fileId));
    };
    this.actionsButton = function (fileId) {
        return this.viewer(fileId).element(by.id('actions-button-' + fileId));
    };
    this.createTaskDiaryButton = function (fileId) {
        return this.viewer(fileId).element(by.id('task-diary-button-file-folder-' + fileId));
    };
};

/* ir.dashboardHeader + prots; */
var dashboardHeader = function (config) {
    this.config = (config !== null) ?
        config : null;
};
dashboardHeader.prototype.getText = function () {
    return element(by.id(this.config.text)).getText();
};
dashboardHeader.prototype.stepBack = function () {
    return element(by.id(this.config.breadcrumbs)).click();
};

/* ir.chartHeader + prots; */
var chartHeader = function (config) {

    this.config = (config !== null) ?
        config : null;

    this.actions = {
        get download() {
            return element(by.id(config.actions.download));
        },
        get filter() {
            return element(by.id(config.actions.filter));
        }
    };
};
chartHeader.prototype.getName = function () {
    return element(by.id(this.config.root)).element(by.id(this.config.name)).getText();
};
chartHeader.prototype.getTasks = function () {
    return element(by.id(this.config.root)).element(by.id(this.config.tasks)).getText();
};

/* ir.chartTooltip + prots; */
var chartTooltip = function (config) {
    this.config = (config !== null) ?
        config : null;
};
chartTooltip.prototype.getName = function () {
    return element(by.id(this.config.root)).
        all(by.css(this.config.header))
        .get(0)
        .getText();
};
chartTooltip.prototype.getSumm = function () {
    return element(by.id(this.config.root))
        .all(by.css(this.config.header))
        .get(1)
        .getText();
};
chartTooltip.prototype.getTasks = function () {
    return element(by.id(this.config.root)).element(by.css(this.config.tasks)).getText().then(function (text) {
        return text.join();
    });
};

/* ir.chartLegend + prots; */
var chartLegend = function (config) {
    this.config = (config !== null) ?
        config : null;
};
chartLegend.prototype.getItems = function () {
    return element(by.id(this.config.root)).
        element(by.css(this.config.container)).
        all(by.css(this.config.text)).getText();
};

//exports IR
module.exports = {
    FormElement: formElement,
    DropDown: dropDown,
    Grid: grid,
    IconButton: iconButton,
    FileTree: fileTree,
    List: list,
    ListItem: listItem,
    Modal: modal,
    Button: button,
    DropDownMenu: dropDownMenu,
    view: view,
    dashboardHeader: dashboardHeader,
    chartHeader: chartHeader,
    chartTooltip: chartTooltip,
    chartLegend: chartLegend
};