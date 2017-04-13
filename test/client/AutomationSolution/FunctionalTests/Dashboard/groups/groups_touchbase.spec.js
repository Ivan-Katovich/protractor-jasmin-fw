/*
    Process Dashboard Groups Chart, Level 1. General Verification.
    Created: 10/28/2016, navasaal
	MTM: none; 
*/

exports.tags = ['Process_Dashboard', 'Groups'];

/* usings; */
var Navigation = require('./../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../PageObjects/Dashboard/dashboard.js'),
    Login = require('./../../../PageObjects/LoginPage.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Settings = require('./../../../PageObjects/DropdownLists/UserSettingsDropdown.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard();
    login = new Login(),
    settings = new Settings();

/* vars; */
var data = {
    header: browser.params.defaultFullName + ' Process Dashboard',
    legend: ['0-2 DAYS', '3-30 DAYS', '31-60 DAYS', '>60 DAYS'],
    group: 'Unassigned',
    summ: '37',
    rects : {
        groups: ['Administrators group', 'xp1_test', 'Unassigned']
    }
}

/* test body; */
describe("Groups Chart - UI Smoke Test", function () {
    
    beforeAll(function () {

        return DashboardHelper.cleanDashboardSettings()
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

    it("1-Groups Chart legend items are '0-2 days', '3-30 days', '31-60 days'and '>60 days' and header consists of 'Groups' and 'Workflows'", function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            expect(dashboard.groups.graph.legend.text).toEqual(data.legend);
            expect(dashboard.groups.header.title.groups.text).toEqual('Groups');
            expect(dashboard.groups.header.title.workflows.text).toEqual('Workflows');
        })
    });

    it("2-Groups Chart header buttons Download and Filter are visible when open Level 1", function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            expect(dashboard.groups.header.tasklist.isDisplayed()).toEqual(true);
            expect(dashboard.groups.header.filter.isDisplayed()).toEqual(true);
        });
    });

    it("3-Groups chart tooltip contains correct Group name and total summ on Level 1", function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.group).hover();
        })
        .then(function () {
            expect(dashboard.groups.graph.tooltip.name).toContain(data.group);
            expect(dashboard.groups.graph.tooltip.summ).toEqual(data.summ)
        });
    });

    it("4-Groups chart axis contains correct groups count and names on Level 1", function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            expect(dashboard.groups.graph.y.count).toEqual(3);
            expect(dashboard.groups.graph.y.text).toEqual(data.rects.groups);
        });
    });
});