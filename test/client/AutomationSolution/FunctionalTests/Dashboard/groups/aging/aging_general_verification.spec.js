/*
    Process Dashboard Legend. General Verification.
    Created: 10/28/2016, navasaal
	MTM: Aging: Levels 1-4: general verification
*/

exports.tags = ['Process_Dashboard', 'Groups'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js'),
    Login = require('./../../../../PageObjects/LoginPage.js'),
    Settings = require('./../../../../PageObjects/DropdownLists/UserSettingsDropdown.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js'),
    Filters = require('./../../../../PageObjects/Dashboard/filters.js')

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard();
    login = new Login(),
    settings = new Settings(),
    filters = new Filters();

/* metadata; */
var data = {

    groups: {
        administrators: 'Administrators groups',
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    users: {
        xp1: 'xp1',
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
    }
}

describe('Groups Chart Legend - Aging Common Cases', function () {

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
            return filters.sections.selectAll();
        })
        .then(function () {
            return filters.buttons.apply();
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

	it('1-Legend is available for all the levels 1-4 of Groups chart. All the legend values are checked by default', function () {
	    return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.groups.graph.legend.container.isDisplayed()).toBe(true);
        })
		.then(function () {
		    return dashboard.groups.graph.tracker(data.groups.unassigned).click();
		})
        .then(function () {
            return expect(dashboard.flows.graph.legend.container.isDisplayed()).toBe(true);
        })
		.then(function () {
		    return dashboard.flows.graph.tracker(data.flows.jamieWf).click();
		})
        .then(function () {
            return expect(dashboard.steps.graph.legend.container.isDisplayed()).toBe(true);
        });
	});

	it('2-Legend icons should be enabled or disabled by click', function () {
	    return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.legend.icons(1).click()
        })
        .then(function () {
            return dashboard.groups.graph.legend.icons(2).click();
        })
        .then(function () {
            return dashboard.groups.graph.legend.icons(3).click();
        })
        .then(function () {
            expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(true);
            expect(dashboard.groups.graph.legend.icons(1).isActive()).toBe(false);
            expect(dashboard.groups.graph.legend.icons(2).isActive()).toBe(false);
            expect(dashboard.groups.graph.legend.icons(3).isActive()).toBe(false);
        })
        .then(function () {
            return dashboard.groups.graph.legend.icons(0).click();
        })
        .then(function () {
            return dashboard.groups.graph.legend.icons(1).click();
        })
        .then(function () {
            return dashboard.groups.graph.legend.icons(2).click();
        })
        .then(function () {
            return dashboard.groups.graph.legend.icons(3).click();
        })
        .then(function () {
            expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(false);
            expect(dashboard.groups.graph.legend.icons(1).isActive()).toBe(true);
            expect(dashboard.groups.graph.legend.icons(2).isActive()).toBe(true);
            expect(dashboard.groups.graph.legend.icons(3).isActive()).toBe(true);
        });
	});

	it('3-Changes made to a legend on any level should be applied on other levels', function () {
	    return navigation.dashboardIcon.click()
		.then(function () {
		    return dashboard.groups.graph.tracker(data.groups.unassigned).click();
		})
		.then(function () {
		    return dashboard.flows.graph.legend.icons(0).click();
		})
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(false);
        })
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.unassigned).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.jamieWf).click();
        })
        .then(function () {
            return browser.sleep(2000);
        })
        .then(function () {
            expect(dashboard.steps.graph.legend.icons(0).isActive()).toBe(false);
            expect(dashboard.steps.graph.legend.icons(1).isActive()).toBe(true);
            expect(dashboard.steps.graph.legend.icons(2).isActive()).toBe(true);
            expect(dashboard.steps.graph.legend.icons(3).isActive()).toBe(true);
        })
        .then(function () {
            return dashboard.steps.graph.compare('agingGeneralVerification3');
        });
	});

	it('4-The chart is empty, there are no tasks on it when all agings are turned off', function () {

	    return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.unassigned).click();
        })
        .then(function () {
            return dashboard.flows.graph.legend.icons(0).click();
        })
        .then(function () {
            return dashboard.flows.graph.legend.icons(1).click();
        })
        .then(function () {
            return dashboard.flows.graph.legend.icons(2).click();
        })
        .then(function () {
            return dashboard.flows.graph.legend.icons(3).click();
        })
	    .then(function () {
	        return dashboard.flows.graph.compare('agingGeneralVerification4');
	    });
	});

	it('5-Legend aging remains saved when navigating using breadcrumbs', function () {

	    return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.unassigned).click();
        })
        .then(function () {
            return dashboard.flows.graph.legend.icons(0).click();
        })
        .then(function () {
            return dashboard.header.breadcrumbs.levels(0).click();
        })
        .then(function () {
            expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(false);
            expect(dashboard.groups.graph.legend.icons(1).isActive()).toBe(true);
            expect(dashboard.groups.graph.legend.icons(2).isActive()).toBe(true);
            expect(dashboard.groups.graph.legend.icons(3).isActive()).toBe(true);
        });
	});

	it('6-Legend aging remains saved when close/reopen Dashboard', function () {

	    return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.unassigned).click();
        })
        .then(function () {
            return dashboard.flows.graph.legend.icons(0).click();
        })
        .then(navigation.dashboardIcon.click)
        .then(navigation.dashboardIcon.click)
        .then(function () {
            expect(dashboard.flows.graph.legend.icons(0).isActive()).toBe(false);
            expect(dashboard.flows.graph.legend.icons(1).isActive()).toBe(true);
            expect(dashboard.flows.graph.legend.icons(2).isActive()).toBe(true);
            expect(dashboard.flows.graph.legend.icons(3).isActive()).toBe(true);
        });
	});

    /* to do; requires additional changes in User Settings; */
	xit('7-Legend aging remains when Sign-out and then Sign-In back', function () {

	    return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.unassigned).click();
        })
        .then(function () {
            return dashboard.flows.graph.legend.icons(0).click();
        })
        .then(navigation.userSettingsIcon.click)
	    .then(function () {
	        return browser.waitForAngular();
	    })
        .then(settings.signOut.click)
        .then(function () {
            return browser.sleep(2000);
        })
        .then(login.reloginLink.click)
        .then(function () {
            return login.login(browser.params.defaultUserName, browser.params.defaultPassword);
        })
	    .then(navigation.dashboardIcon.click)
        .then(function () {
            expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(false);
            expect(dashboard.groups.graph.legend.icons(1).isActive()).toBe(true);
            expect(dashboard.groups.graph.legend.icons(2).isActive()).toBe(true);
            expect(dashboard.groups.graph.legend.icons(3).isActive()).toBe(true);
        });
	});
});