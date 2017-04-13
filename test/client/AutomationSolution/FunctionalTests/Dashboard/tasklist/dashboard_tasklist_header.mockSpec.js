/**
 * Created by Ivan_Katovich on 3/27/2017.
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

describe('(Mock) Process Dashboard - Task List Header', function () {

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

    it('1 - Task List Title should be correct after navigation from main view', function () {
        return dashboard.groups.header.tasklist.click()
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.header.text()).toBe('Task List');
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
                return expect(dashboard.header.text()).toBe('Task List');
            });
    });

    it('2 - Task List Title should be correct after navigation from SLA lvl2', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(dashboard.sla.chart.level2.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.header.text()).toBe('New Service Level 1 Task List');
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
                return expect(dashboard.header.text()).toBe('New Service Level 1 Task List');
            });
    });

    it('3 - Task List Title should be correct after navigation from all Groups chart lvls', function () {
        return dashboard.groups.graph.tracker(2).contextClick(-350)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.header.text()).toBe('Unassigned Workflows Task List');
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
                return expect(dashboard.header.text()).toBe('Unassigned Diary Steps Task List');
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
                return expect(dashboard.header.text()).toBe('Unassigned Diary Endorsement Request Task List');
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
                return expect(dashboard.header.text()).toBe('G1 Task List');
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
                return expect(dashboard.header.text()).toBe('Admin Workflows Task List');
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
                return expect(dashboard.header.text()).toBe('Admin Diary Steps Task List');
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
                return expect(dashboard.header.text()).toBe('Admin Diary Endorsement Request Task List');
            });
    });

    it('4 - Task List Title should be correct after navigation from all SLA chart lvls', function () {
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
                return expect(dashboard.header.text()).toBe('New Service Level 1 G1 Steps Task List');
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
                return expect(dashboard.header.text()).toBe('New Service Level 1 G1 Endorsement Request Task List');
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
                return expect(dashboard.header.text()).toBe('New Service Level 1 Endorsement Request Groups & Users Task List');
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
                return expect(dashboard.header.text()).toBe('New Service Level 1 Endorsement Request G1 Task List');
            });
    });

});