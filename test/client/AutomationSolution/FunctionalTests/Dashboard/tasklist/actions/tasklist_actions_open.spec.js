/*
    Process Dashboard. Task List actions: Open.
    Created: 01/30/2017, navasaal;
	MTM: Groups: Task List - Task Actions - Open.
*/

exports.tags = ['Process_Dashboard', 'TaskList'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js'),
    Login = require('./../../../../PageObjects/LoginPage.js'),
    Settings = require('./../../../../PageObjects/DropdownLists/UserSettingsDropdown.js'),
    LockedTaskView = require('./../../../../PageObjects/Containers/LockedTaskView.js'),
    FilesView = require('./../../../../PageObjects/FilesView.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    login = new Login(),
    settings = new Settings(),
    lockedTaskView = new LockedTaskView(),
    filesView = new FilesView();

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
    },

    tasks: {
        forOpen: 'TaskDetailsTest'
    }
}

describe('Task List actions - Open', function () {

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

    it('1-Task should be opened when select in Task List and click Open button', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(5);
        })
        .then(function () {
            return dashboard.taskList.buttons.open.click();
        })
        .then(function () {
            return filesView.createIcon.waitReady();
        })
        .then(function () {
            return expect(lockedTaskView.activeTaskDescription.getText()).toEqual(data.tasks.forOpen);
        });
    });

    it('2-Task should be opened by double click on task in Task List', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.doubleClick(5);
        })
        .then(function () {
            return filesView.createIcon.waitReady();
        })
        .then(function () {
            return expect(lockedTaskView.activeTaskDescription.getText()).toEqual(data.tasks.forOpen);
        });
    });

    it('3-Task List should be opened when click on Dashboard icon after task open', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(5);
        })
        .then(function () {
            return dashboard.taskList.buttons.open.click();
        })
        .then(function () {
            return filesView.createIcon.waitReady();
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        });
    });
});