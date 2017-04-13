var base = require('./../elementary/modal.js');
var modal = new base(0);

var Filters = function () {

    var container = modal.container;

    var config = {

        root: by.css('.modal-content'),

        sections: {
            flows: by.id('filter-flows'),
            groups: by.id('filter-groups'),
            types: by.id('filter-types'),
            require: by.css('.field-required')
        },

        checkboxes: {
            all: by.css('.modal-dialog .accordion-header-label'),
            wf: by.id('selectAllWorkflows')

            /* todo: other checkboxes; */

        }
    };

    return Object.assign(modal, {

        get visible() {
            return element(config.root).isPresent();
        },

        get sections() {

            function expand(root) {
                return root.all(by.css('.fa-plus-circle')).filter(function (elems) {
                    return elems.isDisplayed();
                }).first().click();
            };

            function collapse(root) {
                return root.all(by.css('.fa-minus-circle')).filter(function (elems) {
                    return elems.isDisplayed();
                }).first().click();
            };

            function isRequired(root) {
                return root.element(config.sections.require).isPresent();
            };

            function tickItem(root, name) {
                return root.all(by.css('.ir-vs-filter-item')).filter(function (elems) {
                    return elems.getAttribute('innerText').then(function (text) {
                        return text.indexOf(name) > -1;
                    });
                }).first().element(by.css('input')).click();
            };

            return {

                selectAll: function () {
                    return element.all(config.checkboxes.all).filter(function (elems) {
                        return elems.isDisplayed();
                    }).first().click();
                },

                get workflows() {

                    var root = element(config.sections.flows);

                    return {

                        expand: function () {
                            return expand(root);
                        },

                        collapse: function () {
                            return collapse(root);
                        },

                        tickRoot: function () {
                            return element(config.checkboxes.wf).click();
                        },

                        tickItem: function (flow) {
                            return tickItem(root, flow);
                        },

                        isRequired: function () {
                            return isRequired(root);
                        },

                        isPresent: function (name) {
                            return root.all(by.css('.ir-vs-filter-item')).filter(function (elems) {
                                return elems.getAttribute('innerText').then(function (text) {
                                    return text.indexOf(name) > -1;
                                });
                            }).count().then(function (count) {
                                return count > 0 ? true : false;
                            })
                        }
                    };
                },

                get groupsUsers() {

                    var root = element(config.sections.groups);

                    return {

                        isRequired: function () {
                            return isRequired(root);
                        }
                    };
                },

                get types() {

                    var root = element(config.sections.types);

                    return {

                        tickItem: function (type) {
                            return tickItem(root, type);
                        },

                        collapse: function () {
                            return collapse(root);
                        },

                        expand: function () {
                            return expand(root);
                        },

                        isRequired: function () {
                            return isRequired(root);
                        }
                    };
                }
            };
        },

        get buttons() {

            return {

                apply: function () {
                    return element.all(by.id('btnOk')).filter(function (elems) {
                        return elems.isDisplayed();
                    }).first().click()
                    .then(function () {
                        return browser.sleep(2000);
                    })
                },

                reset: function () {
                    return element.all(by.id('btnAction')).filter(function (elems) {
                        return elems.isDisplayed();
                    }).first().click();
                }
            }
        }
    });
}

module.exports = Filters;