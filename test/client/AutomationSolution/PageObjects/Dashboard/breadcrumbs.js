/* 
    name: breadcrumbs.js
    descr: extension for dashboard header class. represents breadcrumbs functionality;
    created: 7/6/2016;
    by: navasaal;
*/

/* breadcrumbs class; */
var Breadcrumbs = function (containerBy) {

    var container = element(containerBy),

        config = {
            link: by.css('.db-breadcrumbs-item'),
            current: by.css('.db-breadcrumbs-current')
        };

    return {

        get container() {
            return container;
        },

        levels: function(index) {
            return container.all(config.link).filter(function (item) {
                return item.isDisplayed();
            }).get(index - 1);
        },

        get current() {
            return container.all(config.current).filter(function (elems) {
                return elems.isDisplayed();
            }).first().getText();
        }
    };
};

module.exports = Breadcrumbs;