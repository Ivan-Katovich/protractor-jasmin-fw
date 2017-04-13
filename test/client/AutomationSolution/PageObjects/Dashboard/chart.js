/*
 name: chart.js
 descr: base class for chart component, multiple used on Dashboard;
 created: 6/30/2016;
 by: navasaal, katoviiv;
 comments: some of the controls are generated from Highcharts svg and have no html templates -> using css:
 - tooltip;
 - legend;
 - trackers;
 - axises.
 */

var webdriver = require('../../utils/webdriverExtentionUtils.js');
var Menu = require('./../elementary/menu');

var Chart = function (containerBy, isMain) {

    var container = element(containerBy),

        config = {
            header: {
                root: isMain ? by.id('db-main-chart-header') : by.id('db-chart-header'),

                title: isMain ? {
                    toggle: by.id('db-main-chart-toggle'),
                    groups: by.id('db-main-chart-toggle-groups'),
                    workflows: by.id('db-main-chart-toggle-workflows')
                } : by.id('chart-title'),
                tasklist: by.id('db-chart-btn-tasklist'),
                taskListArrow: by.css('.fa-caret-down'),
                filter: by.id('db-chart-btn-filter'),
                tasklistMenu: by.css('.db-chart-header .dropdown.fade'),
                toggles: by.css('[class*="db-toggle"]')
            },
            tasks: by.css('.task-count-data'),
            filters: {
                filtersError: by.id('filtersError'),
                filtersButton: by.id('filtersButton')
            },
            graph: {
                header: {
                    root: by.id('chart-title-tasks'),
                    taskCounter: by.css('.task-count-data')
                },
                zoomButton: by.css('.highcharts-button tspan'),
                svg: by.css('svg'),
                chartGroup: by.css('.highcharts-series-group'),
                trackers: by.css('g .highcharts-tracker rect'),
                axises: {
                    /* x, y are mixed up inside the class names in Highcharts. reverting here; */
                    xtitle: by.css('.highcharts-xaxis-title'),
                    x: by.css('.highcharts-yaxis-labels text'),
                    y: by.css('.highcharts-xaxis-labels span')
                },
                legend: {
                    root: by.css('.highcharts-legend'),
                    icons: by.css('.highcharts-legend-item rect'),
                    text: by.css('.highcharts-legend-item text')
                },
                tooltip: {
                    root: by.css('.highcharts-tooltip>span'),
                    header: by.css('.hc-tooltip-header'),
                    tasks: by.css('div.hc-tooltip-row')
                }
            }
        };

    return {

        get container() {
            return element(containerBy);
        },

        get header() {

            var root = container.element(config.header.root);

            return {

                get title() {

                    function _title(item) {

                        return {
                            get text() {
                                return item.getText();
                            },

                            click: function () {
                                return item.click();
                            },

                            get isActive () {
                                return item.getAttribute('className').then(function (txt) {
                                    return (txt === 'db-toggle-selected');
                                });
                            }
                        };
                    };

                    /* todo: change to proper getter; */
                    return isMain ? {
                        toggle: root.element(config.header.title.toggle),
                        groups: _title(root.element(config.header.title.groups)),
                        workflows: _title(root.element(config.header.title.workflows))
                    } : root.element(config.header.title);
                },

                get tasklist() {

                    return isMain ? root.element(config.header.tasklist) :
                    {
                        click: function(){
                            return root.element(config.header.tasklist).click();
                        },

                        select: function(item){
                            return new Menu(root.element(config.header.tasklistMenu)).selectByDescription(item);
                        },

                        isArrowDisplayed: function(){
                            return root.element(config.header.tasklist).element(config.header.taskListArrow).isDisplayed();
                        }
                    }
                },

                get filter() {
                    return root.element(config.header.filter);
                },

                getToggle:function(x){
                    if(typeof x === 'number'){
                        return root.all(config.header.toggles).get(x);
                    }else{
                        return root.all(config.header.toggles).filter(function(item){
                            return item.getText()
                                .then(function (text) {
                                    return text === x;
                                })
                        }).get(0);
                    }
                },

                selectToggle:function(x){
                    return this.getToggle(x).click();
                },

                isToggleActive:function(x){
                    return this.getToggle(x).getAttribute('class')
                        .then(function (attr) {
                            return attr.includes('-selected');
                        });
                }
            };
        },

        get tasks() {
            return container.element(config.tasks).getText();
        },

        get errorPane() {

            return {

                get button() {
                    return element.all(config.filters.filtersButton).filter(function (elems) {
                        return elems.isDisplayed();
                    }).first();
                },

                get notification() {
                    return element.all(config.filters.filtersError).filter(function (elems) {
                        return elems.isDisplayed();
                    }).first();
                },
            };
        },

        get actionMenu(){
            return new Menu(this.container.element(by.tagName('ir-dbrd-action-menu')));
        },

        get graph() {

            function _axis(name) {

                return {
                    items:function(){
                        return container.all(name);
                    },

                    item: function (index) {
                        return container.all(name).get(index);
                    },

                    get text() {
                        return container.all(name).getText();
                    },

                    get count() {
                        return container.all(name).count();
                    }
                };
            }

            return {

                get zoomButton () {
                    return element(config.graph.zoomButton);
                },

                get header(){
                    var root = container.element(config.graph.header.root);

                    return {
                        getCount:function(){
                            return root.element(config.graph.header.taskCounter).getText();
                        },
                        getCounterTooltip:function(){
                            return root.element(config.graph.header.taskCounter).getAttribute('title');
                        }
                    }
                },

                get svg() {
                    return container.all(config.graph.svg).filter(function (elems) {
                        return elems.isDisplayed();
                    }).first();
                },

                get x() {
                    return _axis(config.graph.axises.x);
                },

                get y() {
                    return _axis(config.graph.axises.y);
                },

                get xaxisTitle(){
                    return container.element(config.graph.axises.xtitle);
                },

                get tooltip() {

                    var root = container.element(config.graph.tooltip.root);

                    return {

                        get visible() {
                            return root.isDisplayed();
                        },

                        get name() {
                            return root.element(config.graph.tooltip.header).all(by.tagName('span')).get(0).getText();
                        },

                        get summ() {
                            return root.element(config.graph.tooltip.header).all(by.tagName('span')).get(1).getText();
                        },

                        get tasks() {
                            return root.all(config.graph.tooltip.tasks).getText().then(function (text) {
                                return text.join(', ');
                            });
                        }
                    };
                },

                get legend() {

                    return {

                        get container() {
                            return container.element(config.graph.legend.root);
                        },

                        icons: function (index) {

                            function _icon(index) {
                                return container.all(config.graph.legend.icons).filter(function (elems) {
                                    return elems.isDisplayed();
                                }).get(index);
                            }

                            return {

                                click: function () {
                                    return _icon(index).click();
                                },

                                isActive: function () {
                                    return _icon(index).getAttribute('fill').then(function (value) {
                                        return (value.indexOf('#CCC') < 0) ? true : false;
                                    });
                                },

                                get background() {
                                    return _icon(index).getAttribute('fill');
                                }
                            };
                        },

                        get text() {
                            return container.all(config.graph.legend.text).getText();
                        },
                    }
                },

                save: function (name) {
                    return browser.pixDiff.saveRegion(container.element(config.graph.svg), name);
                },

                compare: function (image) {
                    return browser.pixDiff.checkRegion(container.element(config.graph.svg), image);
                },

                trackers:function(){
                    return container.all(config.graph.trackers).filter(function (elems) {
                        return elems.isDisplayed();
                    });
                },

                tracker: function (object) {

                    /* not used for now; */
                    function _hoverRoot() {
                        return container.all(config.graph.chartGroup).filter(function (items) {
                            return items.isDisplayed();
                        })
                        .then(function (elems) {
                            return webdriver.hoverMouse(elems[0]);
                        });
                    }

                    function _tracker(object) {

                        /* select the way to hover: by number/string; */
                        switch (typeof (object)) {

                            case 'number':
                                return container.all(config.graph.trackers).filter(function (elems) {
                                    return elems.isDisplayed();
                                }).get(object);

                            case 'string':
                                return container.all(config.graph.trackers).filter(function (elems) {
                                    return browser.executeScript('return arguments[0].point.category', elems).then(function (text) {
                                        return text === object;
                                    })
                                }).first();

                            default:
                                return null;
                        }

                    }

                    return {

                        get container(){
                            return _tracker(object)
                        },

                        /* by number only for now; */
                        get line() {
                            if (typeof (object) == 'number') {
                                return container.all(config.graph.trackers).filter(function (elems) {
                                    return elems.isDisplayed();
                                }).get(object);
                            } else
                                return null;
                        },

                        click: function (x, y) {
                            return webdriver.hoverAndClick(_tracker(object));
                        },

                        hover: function (x, y) {
                            return webdriver.hoverMouse(_tracker(object), x ? x : 50, y ? y : 0);
                        },

                        contextClick: function (x, y) {
                            return webdriver.hoverAndContextClick(_tracker(object)); /* params are ignored -> fixed tests on TC. need to test with mock env; *///, x ? x : 50, y ? y : 0);
                        }
                    };
                }
            };
        },

        get filters() {
            return Filters();
        }
    };
};

module.exports = Chart;