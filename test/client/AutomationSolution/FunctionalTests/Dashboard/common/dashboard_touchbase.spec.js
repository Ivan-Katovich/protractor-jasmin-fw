/*
    Process Dashboard. Basic persistence.
    Created: 10/20/2016, navasaal
*/

exports.tags = ['Process_Dashboard', 'Common'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard();

/* metadata; */
var data = {
    header: browser.params.defaultFullName + ' Process Dashboard',
    legend: ['0-2 DAYS', '3-30 DAYS', '31-60 DAYS', '>60 DAYS'],
    groups: {
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    flows: {
        diary: 'Diary'
    }
};

/* spec; */
describe('Process Dashboard - UI Smoke Test', function () {

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

    it('1-Process Dashboard icon is presented at navigation bar when open Browser Client', function () {
        return expect(navigation.dashboardIcon.isDisplayed()).toBe(true);
    });

    it('2-By clicking on Process Dashboard icon the main view should be opened and then closed by next click', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.container.isDisplayed()).toBe(true);
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return expect(dashboard.container.isPresent()).toBe(false);
        });
    });

    it('3-When open Process Dashboard the header, groups chart within related icons and sla container should be presented', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            expect(dashboard.header.container.isDisplayed()).toEqual(true);
            expect(dashboard.groups.header.tasklist.isDisplayed()).toEqual(true);
            expect(dashboard.groups.header.filter.isDisplayed()).toEqual(true);
        });
    });

    it('4-When opening Process Dashboard the header text should consist of current user name and Process Dashboard keyword', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.header.text()).toBe(data.header);
        });
    });

    it('5-When hover mouse on tracker the title with task details should appear', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.groups.graph.tooltip.visible).toEqual(false);
        })
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.unassigned).hover();
        })
        .then(function () {
            return expect(dashboard.groups.graph.tooltip.visible).toEqual(true);
        });
    });

    it('6-When open Dashboard the legend items on groups chart should be 0-2 DAYS, 3-30 DAYS, 31-60 DAYS, >60 DAYS', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return expect(dashboard.groups.graph.legend.text).toEqual(data.legend);
        });
    });

    it('7-(screen)When open Groups Chart the trackers should display correct state and distribution of tasks', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.compare('dashboardTouchbase7');
        })
    });

    it('8-By clicking on chart title nothing happens (feature disabled)', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(dashboard.header.title.click)
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(false);
        });
    });

    it('9-Task List has "Task List" header when user navigates from Groups main view', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.header.text()).toEqual('Task List');
        });
    });

    it('10-Task List has "Task List" header when user navigates from Workflows main view', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.header.text()).toEqual('Task List');
        });
    });
});