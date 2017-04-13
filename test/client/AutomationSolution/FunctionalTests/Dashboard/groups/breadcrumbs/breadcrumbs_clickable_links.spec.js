/*
    Process Dashboard Breadcrumbs. Navigation - Task List.
    Created: 11/17/2016, navasaal
	MTM: Groups Breadcrumbs: Level 1-4, Task List: navigate with clickable link
*/

exports.tags = ['Process_Dashboard', 'Groups'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js'),
    Filters = require('./../../../../PageObjects/Dashboard/filters.js'),
    Q = require('q');

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
        manual1: 'Manual 1'
    }
}

describe('Breadcrumbs Navigation - Task List', function () {

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

    it('1-Each level could be opened by clicking on breadcrumbs from Task List', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(dashboard.header.breadcrumbs.levels(1).click)
        .then(function () {
            return expect(dashboard.groups.container.isDisplayed()).toEqual(true);
        })
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(dashboard.users.header.tasklist.click)
        .then(dashboard.header.breadcrumbs.levels(2).click)
        .then(function () {
            return expect(dashboard.users.container.isDisplayed()).toEqual(true);
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(dashboard.flows.header.tasklist.click)
        .then(dashboard.header.breadcrumbs.levels(3).click)
        .then(function () {
            return expect(dashboard.flows.container.isDisplayed()).toEqual(true);
        });
    })

    it('2-Same-named tooltips exist in the DOM for each breadcrumb', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.unassigned).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.jamieWf).click();
        })
        .then(function () {
            return dashboard.steps.graph.tracker(data.steps.manual1).click();
        })
        .then(function () {
            return browser.sleep(2000);
        })
        .then(function () {
            var titles = [];
            for (var i = 1; i < 3; i++) {
                titles.push(dashboard.header.breadcrumbs.levels(i).getAttribute('title'))
            };
            Q.all(titles).then(function () {
                var text = []
                for (var j = 1; j < 3; j++) {
                    text.push(dashboard.header.breadcrumbs.levels(j).getText())
                };
                Q.all(text).then(function () {
                    expect(titles).toEqual(text)
                });
            });
        });
    })
});