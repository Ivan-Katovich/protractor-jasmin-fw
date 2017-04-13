/*
    Process Dashboard Groups Chart, Level 1-4. Common cases.
    Created: 10/28/2016, navasaal
	MTM: Groups Chart -> Level 1 / Level 4; 
*/

exports.tags = ['Process_Dashboard', 'Groups'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js'),
    Login = require('./../../../../PageObjects/LoginPage.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js'),
    Settings = require('./../../../../PageObjects/DropdownLists/UserSettingsDropdown.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    login = new Login(),
    settings = new Settings();

/* vars; */
var data = {
    common : {
        groups: ['Administrators group', 'xp1_test', 'Unassigned'],
        totalCount: '74',
        diaryCount: '18',
        buddy1: 'bk1',
        buddy2: 'bk2',
        buddy3: 'khvashma',
        buddy4: 'ezhovakr'
    },
    groups: {
        administrators: 'Administrators groups',
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    users: {
        xp1: 'XP1',
        ezhovakr: 'ezhovakr',
        khvashma: 'khvashma',
        xp1_test: 'xp1_test'
    },
    flows: {
        diary: 'Diary',
        jamieWf: 'Jamies Workflow Test',
        wf: 'WF',
        wf1: 'wf1',
        wfRelease: 'WFRelease'
    },
    diaries: {
        minusOne: '17'
    }
}

/* test body; */
describe("Groups Chart - Common Cases", function () {

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

    it('1-alphabetical sorting along the Y axis', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.groups.graph.y.text).toEqual(data.common.groups);
        });
    });

    it('2-Groups chart should not display the tasks assigned to a Role and total number of tasks should match to root groups', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.groups.tasks).toEqual(data.common.totalCount);
        });
    });

    it('3-buddies are not displayed on the chart', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            expect(dashboard.groups.graph.y.text).not.toContain(data.common.buddy1);
            expect(dashboard.groups.graph.y.text).not.toContain(data.common.buddy2);
            expect(dashboard.groups.graph.y.text).not.toContain(data.common.buddy3);
            expect(dashboard.groups.graph.y.text).not.toContain(data.common.buddy4);
        });
    });

    it('4-Diaries should be included into total number of tasks and be available on Diary flow on Steps level', function () {

        return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.groups.tasks).toEqual(data.common.totalCount);
        })
		.then(function () {
		    return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
		})
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return browser.sleep(2000);
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.common.diaryCount);
        });
    })

    it('5-First time view is opened when new user initially open Process Dashboard', function () {
        return DashboardHelper.cleanDashboardSettings()
        .then(function () {
            return browser.executeScript('window.localStorage.clear();');
        })
        .then(browser.driver.get(browser.params.defaultUrl))
        .then(navigation.dashboardIcon.click)
        .then(function () {
            expect(dashboard.groups.errorPane.notification.isDisplayed()).toEqual(true);
            expect(dashboard.groups.errorPane.button.isDisplayed()).toEqual(true);
        });
    });
});