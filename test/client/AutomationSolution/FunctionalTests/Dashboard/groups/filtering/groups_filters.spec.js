/*
    Process Dashboard. Groups chart filtering: user cases.
    Created: 11/21/2016, navasaal
	MTM: Groups: Filter & Charts
*/

exports.tags = ['Process_Dashboard', 'Groups'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js'),
    Login = require('./../../../../PageObjects/LoginPage.js'),
    Settings = require('./../../../../PageObjects/DropdownLists/UserSettingsDropdown.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    login = new Login(),
    settings = new Settings();

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
        manual1: 'Manual 1'
    }
}

describe('Groups Chart - Filtering', function() {

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
            return DashboardHelper.setStepStatus('WFRelease', 'Manual 1', 0)
        })
        .then(function () {
            return DashboardHelper.setStepStatus('WFRelease', 'Manual 2', 0);
        })
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    afterAll(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return DashboardHelper.setStepStatus('WFRelease', 'Manual 1', 0)
        })
        .then(function () {
            return DashboardHelper.setStepStatus('WFRelease', 'Manual 2', 0);
        });
    })

    it('1-When user reset changes there is no confirmation message when close Filters', function () {

        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return expect(dashboard.filters.visible).toBe(true);
        })
        .then(function () {
            return dashboard.filters.header.close();
        })
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.filters.visible).toBe(false);
        })
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return dashboard.filters.sections.selectAll();
        })
        .then(function () {
            return dashboard.filters.buttons.reset();
        })
        .then(function () {
            return expect(dashboard.filters.visible).toBe(true);
        })
        .then(function () {
            return dashboard.filters.header.close();
        })
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.filters.visible).toBe(false);
        });
    });

    it('2-When user select invalid filters there is red marks appear against invalid value - Root', function () {

        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return dashboard.filters.sections.selectAll();
        })
        .then(function () {
            expect(dashboard.filters.sections.workflows.isRequired()).toEqual(true);
            expect(dashboard.filters.sections.groupsUsers.isRequired()).toEqual(true);
            expect(dashboard.filters.sections.types.isRequired()).toEqual(true);
        })
        .then(function () {
            return dashboard.filters.sections.selectAll();
        })
        .then(function () {
            return dashboard.filters.buttons.apply();
        })
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.filters.visible).toBe(false);
        })
    });

    it('3-When user select invalid filters there is red marks appear against invalid value - Drawer and File Types case', function () {

        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return dashboard.filters.sections.types.expand();
        })
        .then(function () {
            return dashboard.filters.sections.types.tickItem('AUTO');
        })
        .then(function () {
            expect(dashboard.filters.sections.workflows.isRequired()).toEqual(false);
            expect(dashboard.filters.sections.groupsUsers.isRequired()).toEqual(false);
            expect(dashboard.filters.sections.types.isRequired()).toEqual(false);
        })
        .then(function () {
            return dashboard.filters.sections.selectAll();
        })
        .then(function () {
            return expect(dashboard.filters.sections.types.isRequired()).toEqual(false);
        })
        .then(function () {
            return dashboard.filters.buttons.reset();
        })
        .then(function () {
            return dashboard.filters.header.close();
        })
        .then(function () {
            return expect(dashboard.filters.visible).toEqual(false);
        });
    });
});