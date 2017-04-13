/*
    Process Dashboard Legend. Tasks count.
    Created: 10/31/2016, navasaal
	MTM: Aging: Levels 1-4:  total number of tasks count depends on aging selection
*/

exports.tags = ['Process_Dashboard', 'Groups'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard();

/* metadata; */
var data = {

    tasks: {
        groups: '74',
        users: '37',
        flows: '23',
        steps: '2',
        zero: '0'
    },

    groups: {
        xp1_test: 'xp1_test',
    },
    users: {
        xp1: 'XP1',
        xp1_test: 'xp1_test'
    },

    flows: {
        jamieWf: 'Jamies Workflow Test',
    }
};

/* todo: a couple of sleeps are still there; */
describe('Groups Chart Legend - Aging Tasks Count', function () {

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

    it('1-(screen)When user disables some of agings then Groups chart should reflect total tasks count and tasks distribution on Level 1-4', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.graph.legend.icons(0).click)
        .then(dashboard.groups.graph.legend.icons(1).click)
        .then(dashboard.groups.graph.legend.icons(2).click)

        /* level 1; */
        .then(function () {
            return expect(dashboard.groups.tasks).toEqual(data.tasks.groups);
        })
	    .then(function () {
	        return dashboard.groups.graph.compare('agingTasksCount1.1');
	    })

        /* level 2; */
        .then(dashboard.groups.graph.tracker(data.groups.xp1_test).click)
        .then(function () {
            return expect(dashboard.users.tasks).toEqual(data.tasks.users);
        })
	    .then(function () {
	        return dashboard.flows.graph.compare('agingTasksCount1.2');
	    })

        /* level 3; */
        .then(dashboard.flows.graph.tracker(data.users.xp1).click)
        .then(function () {
            return expect(dashboard.flows.tasks).toEqual(data.tasks.flows);
        })
	    .then(function () {
	        return dashboard.flows.graph.compare('agingTasksCount1.3');
	    })

        /* level 4; */
        .then(dashboard.flows.graph.tracker(data.flows.jamieWf).click)
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.tasks.steps);
        })
	    .then(function () {
	        return dashboard.flows.graph.compare('agingTasksCount1.4');
	    });
    });

    it('2-(screen)When user disables all of agins he should see an empty chart and this rule is applicable for L1-L4.', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.graph.legend.icons(0).click)
        .then(dashboard.groups.graph.legend.icons(1).click)
        .then(dashboard.groups.graph.legend.icons(2).click)
        .then(dashboard.groups.graph.legend.icons(3).click)

        /* level 1; */
        .then(function () {
            return expect(dashboard.groups.tasks).toEqual(data.tasks.zero);
        })
	    .then(function () {
	        return dashboard.groups.graph.compare('agingTasksCount2.1');
	    })

        /* level 2; */
        .then(dashboard.groups.graph.legend.icons(3).click)
        .then(dashboard.groups.graph.tracker(data.groups.xp1_test).click)
        .then(function () {
            return browser.sleep(2000);
        })
        .then(dashboard.users.graph.legend.icons(3).click)
        .then(function () {
            return expect(dashboard.users.tasks).toEqual(data.tasks.zero);
        })
	    .then(function () {
	        return dashboard.users.graph.compare('agingTasksCount2.2');
	    })

        /* level 3; */
        .then(dashboard.users.graph.legend.icons(3).click)
        .then(dashboard.users.graph.tracker(data.users.xp1).click)
        .then(function () {
            return browser.sleep(2000);
        })

        .then(dashboard.flows.graph.legend.icons(3).click)
        .then(function () {
            return expect(dashboard.flows.tasks).toEqual(data.tasks.zero);
        })
	    .then(function () {
	        return dashboard.flows.graph.compare('agingTasksCount2.3');
	    })

        /* level 4; */
        .then(dashboard.flows.graph.legend.icons(3).click)
        .then(dashboard.flows.graph.tracker(data.flows.jamieWf).click)
        .then(function () {
            return browser.sleep(2000);
        })
        .then(dashboard.steps.graph.legend.icons(3).click)
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.tasks.zero);
        })
	    .then(function () {
	        return dashboard.steps.graph.compare('agingTasksCount2.4');
	    });
    });
});