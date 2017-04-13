/*
    Process Dashboard. PD Workflows chart aging;
    Created: 02/15/2017, navasaal,
    MTM: 6.4 -> Process Dashboard -> Workflow Chart -> General;
*/

exports.tags = ['Process_Dashboard', 'Workflow'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),
	Login = require('./../../../PageObjects/LoginPage.js'),
	Settings = require('./../../../PageObjects/DropdownLists/UserSettingsDropdown.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    login = new Login(),
    settings = new Settings();

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
        xp1: 'xp1',
        xp1_test: 'xp1_test'
    },

    flows: {
        jamieWf: 'Jamies Workflow Test',
    }
};

describe('Workflows Chart - Filtering', function () {

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function(){
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

    /* need mock env; */
    xit('1-(screen)User should be able to filter Workflows chart using legend items 0-2 days, 3-30, 31-60 days and more than 60 days', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(dashboard.groups.graph.legend.icons(0).click)
        .then(dashboard.groups.graph.legend.icons(1).click)
        .then(dashboard.groups.graph.legend.icons(2).click)

        .then(function () {
            return expect(dashboard.groups.tasks).toEqual(data.tasks.groups);
        })
	    .then(function () {
	        return dashboard.groups.graph.save('workflowsAging1');
	    });
    });

    it('2-(screen)When user disables all of agins he should see an empty chart', function () {
        return dashboard.groups.header.title.workflows.click()
        .then(dashboard.groups.graph.legend.icons(0).click)
        .then(dashboard.groups.graph.legend.icons(1).click)
        .then(dashboard.groups.graph.legend.icons(2).click)
        .then(dashboard.groups.graph.legend.icons(3).click)

        .then(function () {
            return expect(dashboard.groups.tasks).toEqual(data.tasks.zero);
        })
	    .then(function () {
	        return dashboard.groups.graph.compare('workflowsAging2');
	    });
    });

    it('3-Aging values selection persists while navigating between Groups and Workflows views', function () {

        /* switch to flows and uncheck; */
        return dashboard.groups.header.title.workflows.click()
        .then(dashboard.groups.graph.legend.icons(0).click)
        .then(dashboard.groups.graph.legend.icons(1).click)
        .then(dashboard.groups.graph.legend.icons(2).click)
        .then(dashboard.groups.graph.legend.icons(3).click)

        /* switch to groups and check; */            
        .then(dashboard.groups.header.title.groups.click)
        .then(function () {
            expect(dashboard.groups.graph.legend.icons(0).isActive()).toEqual(false);
            expect(dashboard.groups.graph.legend.icons(1).isActive()).toEqual(false);
            expect(dashboard.groups.graph.legend.icons(2).isActive()).toEqual(false);
            expect(dashboard.groups.graph.legend.icons(3).isActive()).toEqual(false);
        })
        /* enable one of the agings and get back to flows; */
        .then(dashboard.groups.graph.legend.icons(3).click)
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            expect(dashboard.groups.graph.legend.icons(0).isActive()).toEqual(false);
            expect(dashboard.groups.graph.legend.icons(1).isActive()).toEqual(false);
            expect(dashboard.groups.graph.legend.icons(2).isActive()).toEqual(false);
            expect(dashboard.groups.graph.legend.icons(3).isActive()).toEqual(true);
        });
    });
});