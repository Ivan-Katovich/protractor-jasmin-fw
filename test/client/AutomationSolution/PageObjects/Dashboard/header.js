/* 
    name: header.js
    descr: dashboard header object with breadcrumbs;
    created: 7/6/2016;
    by: navasaal;
*/

/* reqs; */
var Breadcrumbs = require('./breadcrumbs.js');
var Menu = require('./../elementary/menu.js');

/* root header object; */
var Header = function(containerBy) {

    var container = element(containerBy),
        config = {
            text: by.id('dashboard-header-text'),
            views: {
                caret: by.css('#dashboard-header-text .caret'),
                toggle: by.css(' .dropdown-toggle'),
                menu: by.css('#dashboard-header-text .dropdown-menu'),
                buttons: {
                    create: by.id('db-new-view-link'),
                    apply: by.id('db-new-view-apply'),
                    cancel: by.id('db-new-view-cancel')
                },
                newViewInput: by.id('viewNameInput')
            },
            arrowButton: by.css('#dashboard-header-text button'),
            breadcrumbs: by.css('.dashboard-breadcrumbs'),
            backbutton: by.id('dashboard-back-button'),
            tile: {
                root: by.id('tilePanel'),
                save: by.id('tileSave'),
                saveAsNew: by.id('tileSaveAsNew'),
                close: by.id('tileClose'),
                message: by.id('tileMessage'),
                newView: {
                    input: by.css('#tilePanel #viewName'),
                    cancel: by.id('tile-newView-cancel'),
                    apply: by.id('tile-newView-apply')
                },
            }
        };

    return {

        get container() {
            return container;
        },

        getBack: function () {
            return element(config.backbutton).click();
        },

        get breadcrumbs() {
            return new Breadcrumbs(config.breadcrumbs);
        },

        text: function() {
            return element(config.text).getText();
        },

        get dashboardViews() {
        
            function _menu() {
                return new Menu(element(config.views.menu));
            };

            return {

                show: function () {
                    return element(config.views.caret).click();
                },

                selectView: function (name) {
                    return this.show()
                    .then(function () {
                        return _menu().selectByDescription(name);
                    });
                },

                get newView() {

                    return {

                        typeName: function (name) {
                            return element(config.views.newViewInput).sendKeys(name);
                        },

                        get buttons() {

                            return {

                                get create() {
                                    return element(config.views.buttons.create);
                                },

                                get cancel() {
                                    return element(config.views.buttons.cancel);
                                },

                                get apply() {
                                    return element(config.views.buttons.apply);
                                }
                            };
                        }
                    };
                },
            }
        },

        get title () {
            return element(by.css('.dashboard-header-title'));
        },

        get tile() {

            return {

                get visible(){
                    return element(config.tile.root).isDisplayed();
                },

                get message() {
                    return element(config.tile.message).getText();
                },

                save: function () {
                    return element(config.tile.save).click();
                },

                saveAsNew: function (name) {
                    return element(config.tile.saveAsNew).click()
                    .then(function () {
                        return element(config.tile.newView.input).sendKeys(name);
                    })
                    .then(function () {
                        return element(config.tile.newView.apply).click();
                    });
                },

                close: function () {
                    return element(config.tile.close).click();
                }
            };
        }
    };
};

module.exports = Header;