/*
    Process Dashboard. Workflows chart -> Colors verification;
    Created:02/14/2017, navasaal;
    MTM: 6.4 -> Process Dashboard -> Workflow Chart -> General.
*/

exports.tags = ['Process_Dashboard', 'Workflow'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),
    Filters = require('./../../../PageObjects/Dashboard/filters.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    filters = new Filters();

/* metadata; */
var data = {

    colors: {
        groups: '#9E99CA',
        workflows: '#68ADD8 '
    }
};

describe('Workflows Chart - Colors', function () {

    beforeAll(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return DashboardHelper.cleanDashboardSettings();
        })
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return dashboard.groups.errorPane.button.waitReady();
        })
        .then(function () {
            return dashboard.groups.errorPane.button.click();
        })
        .then(function () {
            return dashboard.filters.sections.selectAll();
        })
        .then(function () {
            return dashboard.filters.buttons.apply();
        })
        .then(function () {
            return dashboard.header.tile.save();
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    it('1-Groups and Workflows chart colors should be 9E99CA and 68ADD8', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.groups.graph.y.count;
        })
        .then(function (count) {
            for (rect = 1; rect <= count; rect++) {
                return expect(dashboard.groups.graph.tracker(rect).line.getAttribute('fill')).toEqual(data.colors.workflows);
            }
        })
        .then(dashboard.groups.header.title.groups.click)
        .then(function () {
            return dashboard.groups.graph.y.count;
        })
        .then(function (count) {
            for (rect = 1; rect <= count; rect++) {
                return expect(dashboard.groups.graph.tracker(rect).line.getAttribute('fill')).toEqual(data.colors.groups);
            }
        });
    });
});