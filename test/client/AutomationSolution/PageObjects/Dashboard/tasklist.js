/* 
    name: tasklist.js
    descr: base class for tasklist component on Process Dashboard;
    created: 10/31/2016, navasaal, katoviiv;
*/

var webdriver = require('../../utils/webdriverExtentionUtils.js');

var taskList = function(containerBy) {

    var container = element(containerBy),

    config = {
        buttons: {
            open: by.id('openButton'),
            reassign: by.id('reassignButton'),
            reschedule: by.id('rescheduleButton'),
            exportTo: by.id('exportButton'),
            showHide: by.css('.db-column-filter button')
        },
        tasks: by.css('.task-count-data'),
        table: {
            root: by.css('.ui-grid-render-container'),
            header: by.css('.ui-grid-header-cell-row'),
            rows: by.css('.ui-grid-row'),
            cells: by.css('.ui-grid-cell'),
            labels: by.css('.ui-grid-header-cell-label')
        },
        menu: {
            root: by.css('.filter-list')
        }
    };

    return {

        get container(){
            return container;
        },

        get visible(){
            return container.isPresent();
        },

        get totalTasks() {
            return container.element(config.tasks).getText();
        },

        row: function (index) {
            return container.all(config.table.rows).get(index - 1);
        },

        get rowsCount() {
            return container.all(config.table.rows).count();
        },

        get columnsCount() {
            return container.all(config.table.cells).count();
        },

        get buttons() {
            return {
                get open() {
                    return container.element(config.buttons.open);
                },

                get reassign() {
                    return container.element(config.buttons.reassign);
                },

                get reschedule() {
                    return container.element(config.buttons.reschedule);
                },

                get exportTo() {
                    return container.element(config.buttons.exportTo);
                }
            }
        },

        get tasks() {

            function _rows(index) {
                return container.all(config.table.rows).get(index - 1);
            }

            return {

                selectByIndex: function (index) {
                    return _rows(index).click();
                },

                multiSelect: function (from, to) {
                    return _rows(from).click()
                    .then(function () {
                        return webdriver.shiftClick(_rows(to));
                    });
                },

                doubleClick: function (index) {
                    return browser.actions().doubleClick(_rows(index)).perform();
                },

                /* could be enchanced with strings; */
                value: function (col, row) {
                    return _rows(row).all(config.table.cells).get(col).getText();
                }
            };
        },

        label: function (name) {
            return container.all(config.table.labels).filter(function (elems) {
                return elems.getAttribute('textContent').then(function (text) {
                    return text.toLowerCase().indexOf(name.toLowerCase()) > -1;
                });
            });
        },

        save: function (name) {
            return browser.pixDiff.saveRegion(container.element(config.table.root), name);
        },

        compare: function (image) {
            return browser.pixDiff.checkRegion(container.element(config.table.root), image);
        },

        get menu() {

            return {

                click: function () {
                    return container.element(config.buttons.showHide).click()
                    .then(function(){
                        return browser.sleep(3000); /* I know ;)*/
                    })
                },

                item: function (name) {
                    return container.element(config.menu.root).all(by.css('label')).filter(function (elems) {
                        return elems.getAttribute('textContent').then(function (text) {
                            return text.toLowerCase().indexOf(name.toLowerCase()) > -1;
                        });
                    }).first();
                }
            }
        }
    };
}

module.exports = taskList;