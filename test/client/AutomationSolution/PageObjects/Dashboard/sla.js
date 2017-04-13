var Chart = require('./chart.js');

var Sla = function (containerBy) {

    var container = element(containerBy),
        config = {
            header: {
                root: by.css('.db-chart-header'),
                name: by.css('.dashboard-title'),
                actions: {
                    cog: by.css('.btn-action'),
                    extLink: by.css('.fa-external-link')
                }
            },
            chart: {
                level1: by.id('db-main-view-sla'),
                level2: by.css('.db-chart-panel'),
                level3: by.css('.db-chart-panel')
            },
            emptySla: {
                root: by.css('.db-chart-empty'),
                bar: by.css('.fa-bar-chart'),
                label: by.css('db-empty-chart-label'),
                addSlaBtn: by.tagName('button')
            }
        };

    return {

        get container() {
            return container;
        },

        get chart() {

            return {

                get level1() {
                    return Chart(config.chart.level1);
                },

                get level2() {
                    return Chart(config.chart.level2);
                },

                get level3() {
                    return Chart(config.chart.level3);
                }
            };
        },

        get header() {
            var root = container.element(config.header.root);
            return {
                getName: function() {
                    return root.element(config.header.name).getText();
                },
                get cog() {
                    return root.element(config.header.actions.cog)
                },
                get extLink() {
                    return root.element(config.header.actions.extLink)
                }
            };
        },

        get emptySla(){
            var root = container.element(config.emptySla.root);
            return {
                getLabelText: function(){
                    return root.element(config.emptySla.label).getText();
                },
                get addSlaBtn() {
                    return root.element(config.emptySla.addSlaBtn);
                },
                addSla: function() {
                    return this.addSlaBtn.click();
                }
            };
        }
    };
};

module.exports = Sla;