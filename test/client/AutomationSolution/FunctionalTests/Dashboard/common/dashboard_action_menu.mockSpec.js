exports.tags = ['Process_Dashboard', 'Common'];

var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),

    navigation = new Navigation(),
    dashboard = Dashboard(),
    convUtils = require('../../../utils/conversionUtils.js'),
    env = require('../../../../../config/configOptions/environments.js');

function waitDBTitle(title){
    return browser.wait(function(){
        return dashboard.header.text()
            .then(function (text) {
                return text === title;
            });
    },5000);
}

describe('(Mock) Process Dashboard - Action menu', function () {

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

    it('1-User should be able to call action menu', function () {
        return dashboard.groups.graph.tracker(10).contextClick()
            .then(function () {
                expect(dashboard.groups.actionMenu.getItemsCount()).toBe(2);
                expect(dashboard.groups.actionMenu.getAllDescriptions()).toContain('View tasks in bar graph');
                expect(dashboard.groups.actionMenu.getAllDescriptions()).toContain('View Task List');
            });
    });

    it('2-User should be able to move to the next level of selected graph', function () {
        return dashboard.groups.graph.tracker(6).contextClick(-50)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.text()).toBe('G1');
                expect(dashboard.users.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.users.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(3).isActive()).toBe(false);
            });
    });

    it('3-User should be able to navigate through all chart levels from "Unassigned" bar', function () {
        return dashboard.groups.graph.tracker(9).contextClick(-50)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('Unassigned Workflows')
            })
            .then(function () {
                expect(dashboard.flows.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.flows.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.flows.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.flows.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).contextClick(-400)
            })
            .then(function () {
                return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('Unassigned Diary Steps')
            })
            .then(function () {
                expect(dashboard.steps.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.steps.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).contextClick(-400)
            })
            .then(function () {
                return dashboard.steps.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.text()).toBe('Unassigned Diary Endorsement Request Task List');
                expect(dashboard.taskList.rowsCount).toBe(2);
            });
    });

    it('4-User should be able to navigate to the next lvl using each aging lvl', function () {
        return dashboard.groups.graph.tracker(10).contextClick(-50)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                expect(dashboard.users.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.users.graph.legend.icons(1).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(dashboard.users.graph.legend.icons(1).click)
            .then(dashboard.users.graph.legend.icons(2).click)
            .then(dashboard.users.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.users.graph.tracker(5).contextClick(-50);
            })
            .then(function () {
                return dashboard.users.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('Admin Workflows')
            })
            .then(function () {
                expect(dashboard.flows.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.flows.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.flows.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.flows.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(dashboard.flows.graph.legend.icons(0).click)
            .then(dashboard.flows.graph.legend.icons(2).click)
            .then(dashboard.flows.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.flows.graph.tracker(1).contextClick(-50);
            })
            .then(function () {
                return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps')
            })
            .then(function () {
                expect(dashboard.steps.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(1).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(2).isActive()).toBe(true);
                expect(dashboard.steps.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(dashboard.steps.graph.legend.icons(1).click)
            .then(dashboard.steps.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.steps.graph.tracker(0).contextClick(-250);
            })
            .then(function () {
                return dashboard.steps.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(4);
            });
    });

    it('5-Scrolling must close action menu', function () {
        return dashboard.groups.graph.tracker(10).contextClick()
            .then(function () {
                return dashboard.groups.actionMenu.actionList.waitReady();
            })
            .then(function () {
                return dashboard.sla.container.scrollIntoView();
            })
            .then(function () {
                return expect(dashboard.groups.actionMenu.actionList.isDisplayed()).toBe(false);
            });
    });

    it('6-Selected aging level must be saved for other levels', function () {
        return dashboard.groups.graph.tracker(6).contextClick(-50)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                expect(dashboard.users.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.users.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.users.graph.tracker(0).click(-400)
            })
            .then(function () {
                return waitDBTitle('Admin Workflows')
            })
            .then(function () {
                expect(dashboard.flows.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.flows.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.flows.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.flows.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-400)
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps')
            })
            .then(function () {
                expect(dashboard.steps.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.steps.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).click(-400)
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.text()).toBe('Admin Diary Endorsement Request Task List');
                expect(dashboard.taskList.rowsCount).toBe(2);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                expect(dashboard.steps.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.steps.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.steps.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(dashboard.steps.graph.legend.icons(2).click)
            .then(dashboard.steps.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.steps.graph.tracker(1).contextClick(-50)
            })
            .then(function () {
                return dashboard.steps.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                expect(dashboard.header.text()).toBe('Admin Diary Endorsement Request Task List');
                expect(dashboard.taskList.rowsCount).toBe(3);
            });
    });

    it('7-User should be able to navigate between levels in subgroups chart', function () {
        return dashboard.groups.graph.tracker(4).click(-350)
            .then(function () {
                return dashboard.subgroups.container.waitReady();
            })
            .then(function () {
                expect(dashboard.subgroups.container.isDisplayed()).toBe(true);
                expect(dashboard.users.container.isDisplayed()).toBe(true);
            })
            .then(function () {
                return dashboard.subgroups.graph.tracker(5).contextClick(-50);
            })
            .then(function () {
                return dashboard.subgroups.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return browser.wait(function(){
                    return dashboard.subgroups.container.isPresent()
                        .then(function (is) {
                            return !is
                        });
                },5000);
            })
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                expect(dashboard.users.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.users.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.users.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.users.graph.tracker(0).contextClick(-250);
            })
            .then(function () {
                return dashboard.users.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('Admin Workflows')
            })
            .then(function () {
                return dashboard.flows.container.waitReady();
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).contextClick(-250);
            })
            .then(function () {
                return dashboard.flows.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps')
            })
            .then(function () {
                return dashboard.steps.container.waitReady();
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).contextClick(-250);
            })
            .then(function () {
                return dashboard.steps.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(2);
            });
    });

    it('8-User should be able to navigate through all sla levels using "View task in bar graph" with current aging lvl', function () {
        return dashboard.sla.chart.level1.graph.tracker(3).contextClick(-250)
            .then(function () {
                return dashboard.sla.chart.level1.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.sla.chart.level2.graph.legend.icons(1).isActive()).toBe(false);
                expect(dashboard.sla.chart.level2.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.sla.chart.level2.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(0).contextClick(-250);
            })
            .then(function () {
                return dashboard.sla.chart.level2.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 G1 Steps')
            })
            .then(function () {
                expect(dashboard.sla.chart.level3.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.sla.chart.level3.graph.legend.icons(1).isActive()).toBe(false);
                expect(dashboard.sla.chart.level3.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.sla.chart.level3.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.sla.chart.level3.graph.tracker(0).contextClick(-250);
            })
            .then(function () {
                return dashboard.sla.chart.level3.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(1);
            });
    });

    it('9-All Selected SLA aging level must be saved for other SLA levels ', function () {
        return dashboard.sla.chart.level1.graph.tracker(3).contextClick(-250)
            .then(function () {
                return dashboard.sla.chart.level1.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.sla.chart.level2.graph.legend.icons(1).isActive()).toBe(false);
                expect(dashboard.sla.chart.level2.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.sla.chart.level2.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(dashboard.sla.chart.level2.graph.legend.icons(1).click)
            .then(dashboard.sla.chart.level2.graph.legend.icons(2).click)
            .then(dashboard.sla.chart.level2.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(4).contextClick(-100);
            })
            .then(function () {
                return dashboard.sla.chart.level2.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 Admin Steps')
            })
            .then(function () {
                expect(dashboard.sla.chart.level3.graph.legend.icons(0).isActive()).toBe(false);
                expect(dashboard.sla.chart.level3.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.sla.chart.level3.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.sla.chart.level3.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(dashboard.sla.chart.level3.graph.legend.icons(0).click)
            .then(dashboard.sla.chart.level3.graph.legend.icons(2).click)
            .then(dashboard.sla.chart.level3.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.sla.chart.level3.graph.tracker(4).contextClick(-100);
            })
            .then(function () {
                return dashboard.sla.chart.level3.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(3);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return waitDBTitle('New Service Level 1 Admin Steps')
            })
            .then(dashboard.sla.chart.level3.graph.legend.icons(0).click)
            .then(dashboard.sla.chart.level3.graph.legend.icons(1).click)
            .then(dashboard.sla.chart.level3.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.sla.chart.level3.graph.tracker(0).contextClick(-200);
            })
            .then(function () {
                return dashboard.sla.chart.level3.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(4);
            });
    });

    it('10-Selected SLA aging level must be saved for other SLA levels and task list', function () {
        return dashboard.sla.chart.level1.graph.tracker(3).contextClick(-50)
            .then(function () {
                return dashboard.sla.chart.level1.actionMenu.selectByDescription('View tasks in bar graph');
            })
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.sla.chart.level2.graph.legend.icons(1).isActive()).toBe(false);
                expect(dashboard.sla.chart.level2.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.sla.chart.level2.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(0).click(-350);
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 G1 Steps')
            })
            .then(function () {
                expect(dashboard.sla.chart.level3.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.sla.chart.level3.graph.legend.icons(1).isActive()).toBe(false);
                expect(dashboard.sla.chart.level3.graph.legend.icons(2).isActive()).toBe(false);
                expect(dashboard.sla.chart.level3.graph.legend.icons(3).isActive()).toBe(false);
            })
            .then(function () {
                return dashboard.sla.chart.level3.graph.tracker(0).click(-350);
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(1);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return waitDBTitle('New Service Level 1 G1 Steps')
            })
            .then(dashboard.sla.chart.level3.graph.legend.icons(1).click)
            .then(dashboard.sla.chart.level3.graph.legend.icons(2).click)
            .then(dashboard.sla.chart.level3.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.sla.chart.level3.graph.tracker(0).click(-350);
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(13);
            });
    });

    it('11-User should be able to navigate to Task List from first chart level using action menu', function () {
        return dashboard.groups.graph.tracker(6).contextClick(-50)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(5);
            });
    });

    it('12-User should be able to navigate to Task List from first chart level using action menu and see only tasks for selected aging level', function () {
        return dashboard.groups.graph.tracker(10).contextClick(-50)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(3);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.container.waitReady();
            })
            .then(function () {
                return dashboard.groups.graph.tracker(6).contextClick(-50);
            })
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(5);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.container.waitReady();
            })
            .then(function () {
                return dashboard.groups.graph.tracker(3).contextClick(-50);
            })
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(7);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.container.waitReady();
            })
            .then(function () {
                return dashboard.groups.graph.tracker(0).contextClick(-350);
            })
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(8);
            });
    });

    it('13-User should be able to return from Task List and all aging levels must be displayed', function () {
        return dashboard.groups.graph.tracker(10).contextClick(-50)
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(3);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.container.waitReady();
            })
            .then(function () {
                expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(2).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(3).isActive()).toBe(true);
            })
            .then(function () {
                return dashboard.groups.graph.tracker(3).contextClick(-50);
            })
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.taskList.rowsCount).toBe(7);
            })
            .then(function () {
                return dashboard.header.breadcrumbs.levels(1).click();
            })
            .then(function () {
                return dashboard.groups.container.waitReady();
            })
            .then(function () {
                expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(2).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(3).isActive()).toBe(true);
            });
    });

    it('14-Breadcrumbs should be correct after using "View Task List" from lvl1 chart', function () {
        return dashboard.groups.graph.tracker(0).contextClick(-350)
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
                return dashboard.groups.container.waitReady();
            })
            .then(function () {
                return dashboard.groups.graph.tracker(1).contextClick(-350);
            })
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('G4 TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.container.waitReady();
            })
            .then(function () {
                return dashboard.groups.graph.tracker(2).contextClick(-350);
            })
            .then(function () {
                return dashboard.groups.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('UNASSIGNED WORKFLOWS TASK LIST');
            });

    });

    it('15-Breadcrumbs should be correct after using "View Task List" from lvl2 chart', function () {
        return dashboard.groups.graph.tracker(0).click(-350)
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
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                return dashboard.users.graph.tracker(3).contextClick(-350);
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
                expect(dashboard.header.breadcrumbs.current).toBe('AGRESSPE WORKFLOWS TASK LIST');
            });
    });

    it('16-Breadcrumbs should be correct after using "View Task List" from lvl3 chart', function () {
        return dashboard.groups.graph.tracker(0).click(-350)
            .then(function () {
                return dashboard.users.container.waitReady();
            })
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
            });
    });

    it('17-Breadcrumbs should be correct after using "View Task List" from lvl4 chart', function () {
        return dashboard.groups.graph.tracker(0).click(-350)
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                return dashboard.users.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Workflows')
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps');
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

    it('18-Breadcrumbs should be correct after using "View Task List" from lvl1 SLA chart', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).contextClick(-350)
            .then(function () {
                return dashboard.sla.chart.level1.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 TASK LIST');
            });
    });

    it('19-Breadcrumbs should be correct after using "View Task List" from lvl2 SLA users', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1');
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
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 ADMIN STEPS TASK LIST');
            });
    });

    it('20-Breadcrumbs should be correct after using "View Task List" from lvl3 SLA users', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1');
            })
            .then(function () {
                return expect(dashboard.sla.chart.level2.header.isToggleActive('Groups & Users')).toBe(true);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 Admin Steps')
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
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('NEW SERVICE LEVEL 1 ADMIN STEPS');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 ADMIN ENDORSEMENT REQUEST TASK LIST');
            });
    });

    it('21-Breadcrumbs should be correct after using "View Task List" from lvl2 SLA steps', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1');
            })
            .then(function () {
                return dashboard.sla.chart.level2.header.selectToggle('Steps')
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
            });
    });

    it('22-Breadcrumbs should be correct after using "View Task List" from lvl3 SLA steps', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1');
            })
            .then(function () {
                return dashboard.sla.chart.level2.header.selectToggle('Steps')
            })
            .then(function () {
                return expect(dashboard.sla.chart.level2.header.isToggleActive('Steps')).toBe(true);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(0).click(-350)
            })
            .then(function () {
                return browser.wait(function(){
                    return dashboard.header.text()
                        .then(function (text) {
                            return text === 'New Service Level 1 Endorsement Request Groups & Users';
                        });
                },5000);
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
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('NEW SERVICE LEVEL 1 ENDORSEMENT REQUEST GROUPS & USERS');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1 ENDORSEMENT REQUEST ADMIN TASK LIST');
            });
    });
});



