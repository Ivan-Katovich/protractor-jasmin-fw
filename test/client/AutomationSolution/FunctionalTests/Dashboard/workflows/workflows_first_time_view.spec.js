/*
    Process Dashboard. PD Workflows charts first time view cases: ui moustly.
    Created: 11/21/2016, navasaal,
    MTM: 6.4 -> Process Dashboard -> Workflow Chart -> General;
*/

exports.tags = ['Process_Dashboard', 'Workflow'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard();

describe('Workflows Chart - First Time View', function () {

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return DashboardHelper.cleanDashboardSettings();
        })
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    it('1-Same First time view for Groups and Workflows appears when user open clean Dashboard', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.groups.errorPane.notification.isPresent()).toEqual(true);
        })
        .then(function () {
            return expect(dashboard.groups.errorPane.button.isPresent()).toEqual(true);
        });
    });

    it('2-Groups and Workflows toggles and TaskList button are disabled when open clean Dashboard', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.groups.header.title.toggle.getAttribute('className')).toContain('item-disabled');
        })
        .then(function () {
            return expect(dashboard.groups.header.tasklist.getAttribute('className')).toContain('item-disabled');
        });
    });
});