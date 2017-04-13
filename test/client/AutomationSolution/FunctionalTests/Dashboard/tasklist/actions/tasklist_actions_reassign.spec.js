/*
    Process Dashboard. Task List actions: Reassign;
    Created: 01/30/2017, navasaal;
	MTM: Groups: Task List - Task Actions - Reassign.
*/

exports.tags = ['Process_Dashboard', 'TaskList'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js'),
    Login = require('./../../../../PageObjects/LoginPage.js'),
    Settings = require('./../../../../PageObjects/DropdownLists/UserSettingsDropdown.js'),
    ReassignDialog = require('./../../../../PageObjects/ModalDialogs/ReassignDialog.js'),
    webdriverUtils = require('./../../../../utils/webdriverExtentionUtils.js'),
    tasksUtils = require('./../../../../utils/tasksUtils.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    login = new Login(),
    settings = new Settings(),
    reassignDialog = new ReassignDialog();
    

/* metadata; */
var data = {

    groups: {
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    users: {
        xp1: 'xp1',
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
        description1: 'Date23Priority0',
        description2: 'Date24Priority0',
        description3: 'Date25Priority0',
        description4: 'TaskDetailsTest',
        assignedTo: 'Unassigned',
        priority: 1
    },

    modal: {
        titleSingle: 'Reassign Task',
        titleMulti: 'Reassign Diary and 4 Tasks'
    }
}

describe('Task List actions - Reassign', function () {

    function revertTasks() {
        tasksUtils.unassignTask(data.tasks.description1);
        tasksUtils.unassignTask(data.tasks.description2);
        tasksUtils.unassignTask(data.tasks.description3);
        tasksUtils.unassignTask(data.tasks.description4);
    };

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
            revertTasks();
        })
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    afterAll(function () {
        revertTasks();
    });

    it('1-(single)Reassign modal should appear when click on Reassign button and then should be closed without applying changes by click on Cancel', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(5);
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.click();
        })
        .then(function () {
            return expect(reassignDialog.assignToDropdown.isPresent()).toEqual(true);
        })
        .then(reassignDialog.assignToDropdown.click)
        .then(function () {
            return reassignDialog.assignToInput.sendKeys(data.users.xp1);
        })
        .then(function () {
            return webdriverUtils.pressTab();
        })
        .then(reassignDialog.cancelButton.click)
        .then(function () {
            return expect(reassignDialog.assignToDropdown.isPresent()).toEqual(false);
        })
        .then(function (count) {
            return expect(dashboard.taskList.tasks.value(15, 5)).toEqual(data.tasks.assignedTo);
        });
    });

    it('2-(multi)Reassign modal should appear when click on Reassign button and then should be closed without applying changes by click on Cancel', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.multiSelect(1, 3);
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.click();
        })
        .then(function () {
            return reassignDialog.assignToDropdown.waitReady();
        })
        .then(reassignDialog.assignToDropdown.click)
        .then(function () {
            return reassignDialog.assignToInput.sendKeys(data.users.xp1);
        })
        .then(function () {
            return webdriverUtils.pressTab();
        })
        .then(reassignDialog.cancelButton.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(reassignDialog.assignToDropdown.isPresent()).toEqual(false);
        })
        .then(function (count) {
            for (var i = 1; i < 4; i++) {
                return expect(dashboard.taskList.tasks.value(15, i)).toEqual(data.tasks.assignedTo);
            };
        });
    });

    it('3-(single)Task should be reassigned when change Assigned To value and confirm on Reassign Dialog', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(5);
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.click();
        })
        .then(function () {
            return expect(reassignDialog.assignToDropdown.isDisplayed()).toEqual(true);
        })
        .then(reassignDialog.assignToDropdown.click)
        .then(function () {
            return reassignDialog.assignToInput.sendKeys(data.users.xp1);
        })
        .then(function () {
            return webdriverUtils.pressTab();
        })
        .then(reassignDialog.finalizeButton.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(dashboard.taskList.tasks.value(15, 5)).toEqual(data.users.xp1);
        });
    });

    it('4-(multi)Task should be reassigned when change Assigned To value and confirm on Reassign Dialog', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.multiSelect(1, 3);
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.click();
        })
        .then(function () {
            return reassignDialog.assignToDropdown.waitReady();
        })
        .then(reassignDialog.assignToDropdown.click)
        .then(function () {
            return reassignDialog.assignToInput.sendKeys(data.users.xp1);
        })
        .then(function () {
            return webdriverUtils.pressTab();
        })
        .then(reassignDialog.finalizeButton.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function (count) {
            for (var i = 1; i < 4; i++) {
                return expect(dashboard.taskList.tasks.value(15, i)).toEqual(data.users.xp1);
            };
        });
    });

    it('5-Reassign button is disabled if nothing selected', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.buttons.reassign.getAttribute('class');
        })
        .then(function (text) {
            return expect(text).toContain('disabled');
        })
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(5);
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.getAttribute('class');
        })
        .then(function (text) {
            return expect(text).not.toContain('disabled');
        })
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(5);
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.getAttribute('class');
        })
        .then(function (text) {
            return expect(text).toContain('disabled');
        });
    });

    it('6-Reassign Dialog changes title when multi select items to Reassign NUMBER Tasks', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(1);
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.click();
        })
        .then(function () {
            return reassignDialog.assignToDropdown.waitReady();
        })
        .then(function () {
            return reassignDialog.header.getText().then(function (title) {
                return expect(title).toBe(data.modal.titleSingle);
            });
        })
        .then(reassignDialog.cancelButton.click)
        .then(function () {
            return webdriverUtils.shiftClick(dashboard.taskList.row(5));
        })
        .then(function () {
            return dashboard.taskList.buttons.reassign.click();
        })
        .then(function () {
            return reassignDialog.assignToDropdown.waitReady();
        })
        .then(function () {
            return reassignDialog.header.getText().then(function (title) {
                return expect(title).toBe(data.modal.titleMulti);
            });
        });
    });
});