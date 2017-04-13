/**
 * Created by Ivan_Katovich on 3/16/2017.
 */

exports.tags = ['Process_Dashboard', 'Common'];

var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),
    mockUtils = require('./../../../utils/mockUtils.js'),

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

describe('(Mock) Process Dashboard - Groups Chart', function () {

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

    it('1 - User should be able to receive task list using "Go To Task List" dropdown', function () {
        return dashboard.groups.graph.tracker(4).click(-350)
            .then(function () {
                return dashboard.subgroups.container.waitToBeCompletelyVisibleAndStable();
            })
            .then(function () {
                expect(dashboard.subgroups.container.isDisplayed()).toBe(true);
                expect(dashboard.users.container.isDisplayed()).toBe(true);
                expect(dashboard.subgroups.header.tasklist.isArrowDisplayed()).toBe(true);
                expect(dashboard.users.header.tasklist.isArrowDisplayed()).toBe(true);
            })
            .then(dashboard.users.header.tasklist.click)
            .then(function () {
                return dashboard.users.header.tasklist.select('Users');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('22');
                expect(dashboard.header.breadcrumbs.current).toBe('G2 USERS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.subgroups.container.waitToBeCompletelyVisibleAndStable();
            })
            .then(dashboard.users.header.tasklist.click)
            .then(function () {
                return dashboard.users.header.tasklist.select('G2');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('22');
                expect(dashboard.header.breadcrumbs.current).toBe('G2 TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.subgroups.container.waitToBeCompletelyVisibleAndStable();
            })
            .then(dashboard.subgroups.header.tasklist.click)
            .then(function () {
                return dashboard.subgroups.header.tasklist.select('G2');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('22');
                expect(dashboard.header.breadcrumbs.current).toBe('G2 TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.subgroups.container.waitToBeCompletelyVisibleAndStable();
            })
            .then(dashboard.subgroups.header.tasklist.click)
            .then(function () {
                return dashboard.subgroups.header.tasklist.select('Subgroups');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('58');
                expect(dashboard.header.breadcrumbs.current).toBe('G2 SUBGROUPS TASK LIST');
            });
    });

    it('2 - User should be able to receive task list using "Go To Task List" button', function () {
        return dashboard.groups.container.waitToBeCompletelyVisibleAndStable()
            .then(dashboard.groups.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('98');
                expect(dashboard.header.breadcrumbs.current).toBe('TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.graph.tracker(0).click(-350);
            })
            .then(function () {
                return dashboard.users.container.waitToBeCompletelyVisibleAndStable();
            })
            .then(dashboard.users.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('23');
                expect(dashboard.header.breadcrumbs.current).toBe('G1 USERS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.users.graph.tracker(0).click(-350);
            })
            .then(function () {
                return waitDBTitle('Admin Workflows');
            })
            .then(dashboard.flows.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('10');
                expect(dashboard.header.breadcrumbs.current).toBe('ADMIN WORKFLOWS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-350);
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps');
            })
            .then(dashboard.steps.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.taskList.totalTasks).toBe('10');
                expect(dashboard.header.breadcrumbs.current).toBe('ADMIN DIARY STEPS TASK LIST');
            });
    });

    it('3 - Level 3 chart must not contain title', function () {
        return dashboard.groups.graph.tracker(2).click(-350)
            .then(function () {
                return waitDBTitle('Unassigned Workflows');
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Unassigned Diary Steps');
            })
            .then(function () {
                return expect(dashboard.steps.header.title.isPresent()).toBe(false);
            })
            .then(dashboard.header.breadcrumbs.levels(1).click)
            .then(function () {
                return dashboard.groups.graph.tracker(0).click(-350)
            })
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                return dashboard.users.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Workflows');
            })
            .then(function () {
                return expect(dashboard.flows.header.title.isPresent()).toBe(false);
            });
    });

    it('4 - Level 2 chart must not contain title for Unassigned', function () {
        return dashboard.groups.graph.tracker(2).click(-350)
            .then(function () {
                return waitDBTitle('Unassigned Workflows');
            })
            .then(function () {
                return expect(dashboard.flows.header.title.isPresent()).toBe(false);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.groups.graph.tracker(0).click(-350)
            })
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                expect(dashboard.users.header.title.isPresent()).toBe(true);
                expect(dashboard.users.header.title.getText()).toBe('Users');
            });
    });

    it('5 - Level 4 chart must not contain title', function () {
        return dashboard.groups.graph.tracker(0).click(-350)
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                return dashboard.users.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Workflows');
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps');
            })
            .then(function () {
                return expect(dashboard.steps.header.title.isPresent()).toBe(false);
            });
    });

    it('6 - Level 4 breadcrumbs for diary steps must contain "Diary" and mustn\'t contain workflow', function () {
        return dashboard.groups.graph.tracker(0).click(-350)
            .then(function () {
                return dashboard.users.container.waitReady();
            })
            .then(function () {
                return dashboard.users.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Workflows');
            })
            .then(function () {
                return dashboard.flows.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('Admin Diary Steps');
            })
            .then(function () {
                return expect(dashboard.header.breadcrumbs.current).toBe('ADMIN DIARY STEPS');
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).click(-350)
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                return expect(dashboard.header.breadcrumbs.current).toBe('ADMIN DIARY ENDORSEMENT REQUEST TASK LIST');
            })
            .then(dashboard.header.getBack)
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
                return expect(dashboard.header.breadcrumbs.current).toBe('ADMIN DIARY ENDORSEMENT REQUEST TASK LIST');
            });
    });

});
