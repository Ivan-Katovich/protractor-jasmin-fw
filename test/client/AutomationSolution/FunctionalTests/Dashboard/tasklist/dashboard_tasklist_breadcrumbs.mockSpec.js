/**
 * Created by Ivan_Katovich on 3/23/2017.
 */


exports.tags = ['Process_Dashboard', 'TaskList'];

var Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),
    Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),

    navigation = new Navigation(),
    dashboard = Dashboard(),
    env = require('../../../../../config/configOptions/environments.js');

function waitDBTitle(title){
    return browser.wait(function(){
        return dashboard.header.text()
            .then(function (text) {
                return text === title;
            });
    },5000);
}

describe('(Mock) Process Dashboard - Task List Breadcrumbs', function () {

    beforeAll(function(){
        if(browser.params.name !== 'mock'){
            browser.params = env.mock.params;
            return browser.driver.get(browser.params.defaultUrl);
        }
    });

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl)
            })
            .then(function () {
                return navigation.dashboardIcon.waitReady();
            })
            .then(navigation.dashboardIcon.click);
    });

    afterAll(function(){
        if(process.env.ENVIRONMENT !== 'mock'){
            return browser.params = env[process.env.ENVIRONMENT].params;
        }
    });

    it('1 - Breadcrumbs should be correct after navigating from main view', function () {
        return dashboard.groups.header.tasklist.click()
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.container.waitReady()
            })
            .then(function () {
                return dashboard.groups.header.selectToggle('Workflows');
            })
            .then(function () {
                return expect(dashboard.groups.header.isToggleActive('Workflows')).toBe(true);
            })
            .then(dashboard.groups.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('TASK LIST');
            })

    });

    it('2 - Breadcrumbs should be correct after navigating from SLS lvl2', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(dashboard.sla.chart.level2.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('NEW SERVICE LEVEL 1');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                return dashboard.sla.chart.level2.header.selectToggle('Steps');
            })
            .then(function () {
                return expect(dashboard.sla.chart.level2.header.isToggleActive('Steps')).toBe(true);
            })
            .then(dashboard.sla.chart.level2.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('NEW SERVICE LEVEL 1');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 TASK LIST');
            });
    });

    it('3 - Breadcrumbs should be correct after navigating from all SLS lvls', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(2).contextClick(-350)
            })
            .then(function () {
                return dashboard.sla.chart.level2.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('NEW SERVICE LEVEL 1');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 G1 STEPS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(2).click(-350)
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 G1 Steps')
            })
            .then(function () {
                return dashboard.sla.chart.level3.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.sla.chart.level3.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('NEW SERVICE LEVEL 1');
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('NEW SERVICE LEVEL 1 G1 STEPS');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 G1 ENDORSEMENT REQUEST TASK LIST');
            })
            .then(dashboard.header.breadcrumbs.levels(2).click)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                return dashboard.sla.chart.level2.header.selectToggle('Steps');
            })
            .then(function () {
                return expect(dashboard.sla.chart.level2.header.isToggleActive('Steps')).toBe(true);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.sla.chart.level2.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('NEW SERVICE LEVEL 1');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 ENDORSEMENT REQUEST GROUPS & USERS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                return expect(dashboard.sla.chart.level2.header.isToggleActive('Steps')).toBe(true);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 Endorsement Request Groups & Users')
            })
            .then(function () {
                return dashboard.sla.chart.level3.graph.tracker(2).contextClick(-350)
            })
            .then(function () {
                return dashboard.sla.chart.level3.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('NEW SERVICE LEVEL 1');
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('NEW SERVICE LEVEL 1 ENDORSEMENT REQUEST GROUPS & USERS');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 ENDORSEMENT REQUEST G1 TASK LIST');
            });
    });

    it('4 - Breadcrumbs should be correct after navigating from all Groups chart lvls', function () {
        return dashboard.groups.graph.tracker(2).contextClick(-350)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('UNASSIGNED WORKFLOWS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.graph.tracker(2).click(-350)
            })
            .then(function () {
                return waitDBTitle('Unassigned Workflows')
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.flows.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('UNASSIGNED WORKFLOWS');
                expect(dashboard.header.breadcrumbs.current).toBe('UNASSIGNED DIARY STEPS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Unassigned Diary Steps')
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.steps.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('UNASSIGNED WORKFLOWS');
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('UNASSIGNED DIARY STEPS');
                expect(dashboard.header.breadcrumbs.current).toBe('UNASSIGNED DIARY ENDORSEMENT REQUEST TASK LIST');
            })
            .then(dashboard.header.breadcrumbs.levels(1).click)
            .then(function () {
                return dashboard.groups.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('G1 TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.graph.tracker(0).click(-350)
            })
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                return dashboard.users.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.users.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('G1');
                expect(dashboard.header.breadcrumbs.current).toBe('ADMIN WORKFLOWS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.users.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Workflows')
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.flows.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('G1');
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('ADMIN WORKFLOWS');
                expect(dashboard.header.breadcrumbs.current).toBe('ADMIN DIARY STEPS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps')
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).contextClick(-350)
            })
            .then(function () {
                return dashboard.steps.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('G1');
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('ADMIN WORKFLOWS');
                expect(dashboard.header.breadcrumbs.levels(4).getText()).toBe('ADMIN DIARY STEPS');
                expect(dashboard.header.breadcrumbs.current).toBe('ADMIN DIARY ENDORSEMENT REQUEST TASK LIST');
            });
    });

});


