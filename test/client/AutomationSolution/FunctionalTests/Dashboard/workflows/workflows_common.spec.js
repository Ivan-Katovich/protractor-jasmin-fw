/*
    Process Dashboard. PD Workflows chart common cases;
    Created: 02/15/2017, navasaal,
    MTM: 6.4 -> Process Dashboard -> Workflow Chart -> General;
*/

exports.tags = ['Process_Dashboard', 'Workflow'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),
	Login = require('./../../../PageObjects/LoginPage.js'),
	Settings = require('./../../../PageObjects/DropdownLists/UserSettingsDropdown.js'),
    FilesView = require('./../../../PageObjects/FilesView.js'),
    LockedTaskView = require('./../../../PageObjects/Containers/LockedTaskView.js'),
    SearchPage = require('./../../../pageObjects/SearchPage.js'),
    RescheduleDialog = require('./../../../PageObjects/ModalDialogs/RescheduleDialog.js'),
    ReassignDialog = require('./../../../PageObjects/ModalDialogs/ReassignDialog.js'),
    tasksUtils = require('./../../../utils/tasksUtils.js'),
    webDriver = require('./../../../utils/webdriverExtentionUtils.js'),
	Q = require('q');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    login = new Login(),
    settings = new Settings(),
    filesView = new FilesView(),
    lockedTaskView = new LockedTaskView(),
    searchPage = new SearchPage(),
    rescheduleDialog = new RescheduleDialog(),
    reassignDialog = new ReassignDialog();

/* metadata; */
var data = {

    groups: {
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    users: {
        xp1: 'xp1',
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },

    flows: {
        jamieWf: 'Jamies Workflow Test',
        wf: 'WF',
        wf1: 'wf1',
        wfRelease: 'WFRelease',
        simpleWorkFlow1: 'SimpleWorkFlow1',
        simpleWorkFlow3: 'SimpleWorkFlow3',
        diary: 'Diary'
    },
    steps: {
        manual1: 'Manual 1',
        set1: ['Manual 1', 'Manual 3', 'Manual 4'],
        set2: ['Rendezvous 1', 'Split 1'],
        diary: ['Diary Step']
    },

    tasks: {
        forOpen: 'TaskDetailsTest',
        forReassign: 'Task_WorkflowFilterTest_anotherFlow'
    }
};

describe('Workflows Chart - Common', function () {

    beforeAll(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
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

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    afterEach(function () {
        return tasksUtils.rescheduleTask('Task_WorkflowFilterTest_anotherFlow', 'FileWithTasks_A8', '12/23/2015', '12/23/2015')
        then(function () {
            return tasksUtils.unassignTask(data.tasks.forReassign);
        });
    });

    it('1-Message tile should persist on Workflows view, if it was presented before on other views', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return dashboard.filters.sections.workflows.expand();
        })
        .then(function () {
            return dashboard.filters.sections.workflows.tickItem('DIARY');
        })
        .then(function () {
            return dashboard.filters.buttons.apply();
        })
        .then(function () {
            return expect(dashboard.header.tile.visible).toEqual(true);
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return expect(dashboard.header.tile.visible).toEqual(true);
        });
    });

    it('2-User should be able to navigate away from Workflows view to Groups views', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(dashboard.groups.header.title.groups.click)
        .then(function () {
            return expect(dashboard.groups.header.title.groups.isActive).toEqual(true);
        })
        .then(function () {
            return dashboard.groups.graph.save('workflowsCommon1');
        });
    });

    it('3-User should be able to open Save as New Dashboard or Create new view from Workflows view', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return dashboard.filters.sections.workflows.expand();
        })
        .then(function () {
            return dashboard.filters.sections.workflows.tickItem('DIARY');
        })
        .then(function () {
            return dashboard.filters.buttons.apply();
        })
        .then(function () {
            return expect(dashboard.header.tile.visible).toEqual(true);
        });
    });

    it('4-User should to be able to open Task List via context menu item View Task List from Level 1', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return expect(dashboard.flows.actionMenu.isPresent).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View Task List');
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        });
    });

    it('5-User should to be able to open Task List via context menu item View Task List from Level 2', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View Task List');
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        })
        .then(function () {
            return expect(dashboard.taskList.totalTasks).toEqual('18');
        })
    });

    it('6-Title is not available on Workflows chart Level 2', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return expect(dashboard.flows.header.title.isPresent()).toEqual(false)
        });
    });

    it('7-User should to be able to open Task List via context menu item View Task List from Level 3', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('XP1').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View Task List');
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        })
        .then(function () {
            return expect(dashboard.taskList.totalTasks).toEqual('18');
        });
    });

    it('8-Title is not available on Workflows chart Level 3', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return expect(dashboard.flows.header.title.isPresent()).toEqual(false)
        });
    });

    it('9-Task List header contains flow, step and user names when open through the full pipeline', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('XP1').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View Task List');
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        })
        .then(function () {
            return expect(dashboard.header.text()).toEqual('Diary Step XP1 Task List');
        });
    });

    it('10-User should to be able to perform View tasks in bar graph on the right click in Workflows bar graphs to filter tasks and navigate one level deeper', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return expect(dashboard.flows.actionMenu.isPresent).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return expect(dashboard.flows.actionMenu.isPresent).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('XP1').contextClick();
        })
        .then(function () {
            return expect(dashboard.flows.actionMenu.isPresent).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        });
    });

    it('11-Aging should be saved when moving to another levels via View tasks in bar graph', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(dashboard.flows.graph.legend.icons(0).click)
        .then(dashboard.flows.graph.legend.icons(1).click)
        .then(dashboard.flows.graph.legend.icons(2).click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return expect(dashboard.flows.actionMenu.isPresent).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            expect(dashboard.flows.graph.legend.icons(0).isActive()).toEqual(false)
            expect(dashboard.flows.graph.legend.icons(1).isActive()).toEqual(false)
            expect(dashboard.flows.graph.legend.icons(2).isActive()).toEqual(false)
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return expect(dashboard.flows.actionMenu.isPresent).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            expect(dashboard.flows.graph.legend.icons(0).isActive()).toEqual(false)
            expect(dashboard.flows.graph.legend.icons(1).isActive()).toEqual(false)
            expect(dashboard.flows.graph.legend.icons(2).isActive()).toEqual(false)
        });
    });

    it('12-User should be able to navigate inside Workflows view between drill down levels clicking breadcrumbs', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('XP1').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        })
        .then(function () {
            return dashboard.header.breadcrumbs.levels(3).click();
        })
        .then(function () {
            return dashboard.header.breadcrumbs.levels(2).click();
        })
        .then(function () {
            return dashboard.header.breadcrumbs.levels(1).click();
        })
        .then(function () {
            return expect(dashboard.groups.container.isDisplayed()).toEqual(true);
        });
    });

    it('13-User should be able to navigate away from Workflows view to Browser Client by dashboard icon, search icon and open task and then get back to the same Workflows view state', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })

        /* via pd icon; */
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return expect();
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })

        /* via search icon; */
        .then(navigation.searchIcon.click)
        .then(function () {
            return expect(searchPage.isSearchFormVisible).toEqual(true);
        })

        /* via task open; */
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return dashboard.flows.graph.tracker('XP1').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        })
        .then(function () {
            return dashboard.taskList.tasks.doubleClick(5);
        })
        .then(function () {
            return filesView.createIcon.waitReady();
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return expect(dashboard.taskList.visible).toEqual(true);
        })
    });

    it('14-Message Tile remains on screen when navigating away and then back to Workflows view', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return dashboard.filters.sections.workflows.expand();
        })
        .then(function () {
            return dashboard.filters.sections.workflows.tickItem('JAMIE WF');
        })
        .then(function () {
            return dashboard.filters.buttons.apply();
        })
        .then(function () {
            return expect(dashboard.header.tile.visible).toEqual(true);
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return expect(dashboard.header.tile.visible).toEqual(true);
        })
        .then(navigation.searchIcon.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return expect(dashboard.header.tile.visible).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View Task List');
        })
        .then(function () {
            return dashboard.taskList.tasks.doubleClick(5);
        })
        .then(function () {
            return filesView.createIcon.waitReady();
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return expect(dashboard.header.tile.visible).toEqual(true);
        });
    });

    it('15-User should be able to navigate one level back using Back option, which is presented on each level starting from the second', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return browser.waitForAngular();
        })
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return expect(dashboard.groups.container.isDisplayed()).toEqual(true);
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.flows.graph.tracker('Diary Step').contextClick();
        })
        .then(function () {
            return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return expect(dashboard.groups.container.isDisplayed()).toEqual(true);
        })
    });

    it('16-(screen)Workflows chart on level 2 should zoom lane when drag and drop and return scale value when click on Reset Zoom', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.header.title.workflows.click()
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.simpleWorkFlow3).click()
        })
        /* zoom; */
        .then(function () {
            return browser.actions().dragAndDrop(dashboard.flows.graph.tracker(0).line, { x: -100, y: -100 }).perform();
        })
        .then(function () {
            return dashboard.flows.graph.compare('workflowsCommon16.1');
        })
        /* zoom back; */
        .then(dashboard.flows.graph.zoomButton.click)
        .then(function () {
            return dashboard.flows.graph.compare('workflowsCommon16.2');
        });
    });

    /* need to change DB request; */
    xit('17-Workflows chart on level 2 should display the tasks rescheduled to the future', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.simpleWorkFlow3).click();
        })
        .then(dashboard.flows.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(1);
        })
        .then(function () {
            return dashboard.taskList.buttons.reschedule.click();
        })
        .then(function () {
            return expect(rescheduleDialog.rescheduleContainer.isPresent()).toEqual(true);
        })
        .then(rescheduleDialog.textInput.click)
        .then(function () {
            return rescheduleDialog.textInput.clear();
        })
        .then(function () {
            return rescheduleDialog.textInput.sendKeys('10/10/2100');
        })
        .then(function () {
            return webDriver.pressEscape();
        })
        .then(rescheduleDialog.finalizeButton.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(rescheduleDialog.rescheduleContainer.isPresent()).toEqual(false);
        })
        .then(function (count) {
            return expect(dashboard.taskList.tasks.value(13, 1)).toEqual('10/10/2100');
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return expect(dashboard.flows.tasks).toEqual('1');
        });
    });

    it('18-Workflows chart on level 2 should has steps sorted alphabetically', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.header.title.workflows.click()
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.simpleWorkFlow1).click()
        })
        .then(function () {
            return dashboard.steps.graph.y.text.then(function (txt) {
                return expect(txt).toEqual(data.steps.set1);
            })
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.wf).click()
        })
        .then(function () {
            return dashboard.steps.graph.y.text.then(function (txt) {
                return expect(txt).toEqual(data.steps.set2);
            })
        })
    });

    it('19-Workflows chart should display diaries on level 2 on Diary step', function () {
        return navigation.dashboardIcon.click()
        .then(function () {
            return dashboard.groups.header.title.workflows.click()
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click()
        })
        .then(function () {
            return dashboard.steps.graph.y.text.then(function (txt) {
                return expect(txt).toEqual(data.steps.diary);
            });
        })
        .then(function () {
            return dashboard.steps.graph.header.getCount().then(function (count) {
                return expect(count).toEqual('18');
            });
        });
    });

    it('20-Workflows chart should reflect the changes in tasks assignment correctly on Level 2', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.simpleWorkFlow3).click();
        })
        .then(dashboard.flows.header.tasklist.click)
        .then(function () {
            return dashboard.taskList.tasks.selectByIndex(1);
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
            return webDriver.pressTab();
        })
        .then(reassignDialog.finalizeButton.click)
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return expect(reassignDialog.reassignContainer.isPresent()).toEqual(false);
        })
        .then(function (count) {
            return expect(dashboard.taskList.tasks.value(15, 1)).toEqual(data.users.xp1);
        })
        .then(function () {
            return dashboard.header.getBack();
        })
        .then(function () {
            return expect(dashboard.flows.tasks).toEqual('1');
        });
    });
});