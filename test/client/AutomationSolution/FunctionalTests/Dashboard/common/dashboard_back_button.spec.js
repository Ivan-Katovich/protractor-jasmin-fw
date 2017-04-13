/*
    Process Dashboard. Back button behaviour.
    Created: 11/21/2016, navasaal,
    MTM: Groups Chart -> General: Back button;
*/

exports.tags = ['Process_Dashboard', 'Common'];

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

    groups: {
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    users: {
        xp1: 'XP1',
        xp1_test: 'xp1_test'
    },

    flows: {
        jamieWf: 'Jamies Workflow Test',
        wf: 'WF',
        wf1: 'wf1',
        wfRelease: 'WFRelease'
    },
    steps: {
        manual1: 'Manual 1',
        randezvous1: 'Rendezvous 1'
    }
}

describe('Process Dashboard - Back Button', function () {

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

    it('1-Back button should open previous chart when navigating via graphs', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.wf).click();
        })
        .then(function () {
            return dashboard.steps.graph.tracker(data.steps.randezvous1).click();
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return expect(dashboard.groups.container.isDisplayed()).toEqual(true);
        });
    });
});