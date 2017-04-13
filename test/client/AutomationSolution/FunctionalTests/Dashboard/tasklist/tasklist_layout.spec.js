/*
    Process Dashboard. Task List layout tests (columns, shows/hide, tasklist values, etc.).
    Created: 11/21/2016, navasaal,
    MTM: Process Dashboard -> Task List;
*/

exports.tags = ['Process_Dashboard', 'TaskList'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    FileHelper = require('./../../../utils/fileUtils.js'),
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
        manual1: 'Manual 1',
        randezvous1: 'Rendezvous 1'
    },

    sla: {
        level1: 'SLA for Task List',
        unassigned: 'Unassigned',
        manual1: 'Manual 1'
    },

    columns: ['drawer',
              'file type',
              'document type',
              'file number',
              'file name',
              'workflow',
              'step',
              'task description',
              'initiated date',
              'priority',
              'assigned to',
              'available date',
              'start time']
}; 

describe('TaskList Layout', function () {

    beforeAll(function () {
        return DashboardHelper.cleanDashboardSettings()
        .then(function () {
            return FileHelper.renameDrawerInstanceDescription('Investigations_Renamed', 'Investigations');
        })
        .then(function () {
            return FileHelper.renameFileTypeDescription('Events_Renamed', 'Events');
        })
        .then(function () {
            return FileHelper.renameDocumentTypeDescription('Application_Renamed', 'Application');
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

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    afterAll(function () {
        return FileHelper.renameDrawerInstanceDescription('Investigations_Renamed', 'Investigations')
        .then(function () {
            return FileHelper.renameFileTypeDescription('Events_Renamed', 'Events');
        })
        .then(function () {
            return FileHelper.renameDocumentTypeDescription('Application_Renamed', 'Application');
        });
    });

    it('1-Task List should display full set of columns when open from Level 1', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            for (name = 0; name < data.columns.length; name++) {
                return expect(dashboard.taskList.label(data.columns[name]).isPresent()).toBeTruthy();
            }
        });
    });

    it('2-Task List should display full set of columns when open from Level 2', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(dashboard.users.header.tasklist.click)
        .then(function () {
            for (name = 0; name < data.columns.length; name++) {
                return expect(dashboard.taskList.label(data.columns[name]).isPresent()).toBeTruthy();
            }
        });
    });

    it('3-Task List should display full set of columns when open from Level 3', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1_test).click();
        })
        .then(dashboard.flows.header.tasklist.click)
        .then(function () {
            for (name = 0; name < data.columns.length; name++) {
                return expect(dashboard.taskList.label(data.columns[name]).isPresent()).toBeTruthy();
            }
        });
    });

    it('4-Task List should display full set of columns when open from Level 4', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1_test).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.wfRelease).click();
        })
        .then(dashboard.steps.header.tasklist.click)
        .then(function () {
            for (name = 0; name < data.columns.length; name++) {
                return expect(dashboard.taskList.label(data.columns[name]).isPresent()).toBeTruthy();
            }
        });
    });

    it('5-(screen)Task List should display correct drawers, file types and document types (for the tasks on document level) when open from Level 1-4 ', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.compare('tasklistLayout5');
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(dashboard.users.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.compare('tasklistLayout5');
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1_test).click();
        })
        .then(dashboard.flows.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.compare('tasklistLayout5');
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.wfRelease).click();
        })
        .then(dashboard.steps.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.compare('tasklistLayout5');
        });
    });

    it('6-Task List should not display columns if they are unchecked via show/hide menu', function () {
        
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.menu.click();
        })
        .then(dashboard.taskList.menu.item('drawer').click)
        .then(dashboard.taskList.menu.item('file type').click)
        .then(dashboard.taskList.menu.item('document type').click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return dashboard.taskList.menu.click();
        })
        .then(function () {
            expect(dashboard.taskList.label('drawer').isPresent()).toBeFalsy();
            expect(dashboard.taskList.label('file type').isPresent()).toBeFalsy();
            expect(dashboard.taskList.label('document type').isPresent()).toBeFalsy();
        });
    })

    xit('7-(screen)Task List should display full set of columns when open from SLA', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.sla.emptySla.addSla()
        })
        .then(function () {
            return dashboard.addSlaModal.body.slaName.setDefName(data.sla.level1);
        })
        .then(dashboard.addSlaModal.body.clearFix.hoursRadio.select)
        .then(function () {
            return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
        })
        .then(function () {
            return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(2);
        })
        .then(function () {
            return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.check();
        })
        .then(dashboard.addSlaModal.footer.accept)
        .then(dashboard.addSlaModal.header.close)
        .then(function () {
            return dashboard.header.tile.save();
        })
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return dashboard.sla.chart.level1.graph.tracker(data.sla.level1).click()
        })
        .then(function () {
            return dashboard.sla.chart.level2.graph.tracker(data.sla.unassigned).click()
        })
        .then(function () {
            return dashboard.sla.chart.level3.graph.tracker(data.sla.manual1).click()
        })
        .then(function () {
            for (name = 0; name < data.columns.length; name++) {
                return expect(dashboard.taskList.label(data.columns[name]).isPresent()).toBeTruthy();
            }
        })
        .then(function () {
            return dashboard.taskList.compare('tasklistLayout7');
        });
    });

    it('8-(screen)Task List should reflect changes in names for Drawer, File Type and Document Types', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.tasklist.click)
        .then(dashboard.taskList.label('document type').click) /* double-sort by document type to make it visible on screen; */
        .then(dashboard.taskList.label('document type').click)
        .then(function () {
            return dashboard.taskList.compare('tasklistLayout8.1');
        })
        .then(function () {
            return FileHelper.renameDrawerInstanceDescription('Investigations', 'Investigations_Renamed');
        })
        .then(function () {
            return FileHelper.renameFileTypeDescription('Events', 'Events_Renamed');
        })
        .then(function () {
            return FileHelper.renameDocumentTypeDescription('Application', 'Application_Renamed');
        })
        .then(function () {
            return browser.executeScript('window.localStorage.clear();')
        })
        .then(browser.driver.get(browser.params.defaultUrl))
        .then(function () {
            return browser.waitForAngular();
        })
        .then(navigation.dashboardIcon.click)
        .then(dashboard.groups.header.tasklist.click)
        .then(dashboard.taskList.label('document type').click) /* double-sort by document type to make it visible on screen; */
        .then(dashboard.taskList.label('document type').click)
        .then(function () {
            return dashboard.taskList.compare('tasklistLayout8.2');
        })
    })
});