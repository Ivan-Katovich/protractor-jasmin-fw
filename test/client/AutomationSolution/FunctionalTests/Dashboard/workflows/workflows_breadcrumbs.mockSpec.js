/**
 * Created by Ivan_Katovich on 4/3/2017.
 */

exports.tags = ['Process_Dashboard', 'Workflow'];

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

describe('(Mock) Process Dashboard - Workflows breadcrumbs', function () {

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

    it('1 - Breadcrumbs shouldn\'t contain "Workflow" word for Diary on WF lvl3', function () {
        return dashboard.groups.header.selectToggle('Workflows')
            .then(function () {
                expect(dashboard.groups.header.isToggleActive('Workflows')).toBe(true);
            })
            .then(function () {
                return dashboard.groups.graph.tracker(0).click(-350);
            })
            .then(function () {
                return waitDBTitle('Diary Steps');
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).click(-350);
            })
            .then(function () {
                return waitDBTitle('Diary Endorsement Request Groups & Users');
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('DIARY STEPS');
                expect(dashboard.header.breadcrumbs.current).toBe('DIARY ENDORSEMENT REQUEST GROUPS & USERS');
            })
            .then(dashboard.steps.header.tasklist.click)
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('DIARY STEPS');
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('DIARY ENDORSEMENT REQUEST GROUPS & USERS');
                expect(dashboard.header.breadcrumbs.current).toBe('DIARY ENDORSEMENT REQUEST GROUPS & USERS TASK LIST');
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return waitDBTitle('Diary Endorsement Request Groups & Users');
            })
            .then(function () {
                return dashboard.steps.graph.tracker(0).contextClick(-350);
            })
            .then(function () {
                return dashboard.steps.actionMenu.selectByDescription('View Task List');
            })
            .then(function () {
                return dashboard.taskList.container.waitReady();
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.levels(2).getText()).toBe('DIARY STEPS');
                expect(dashboard.header.breadcrumbs.levels(3).getText()).toBe('DIARY ENDORSEMENT REQUEST GROUPS & USERS');
                expect(dashboard.header.breadcrumbs.current).toBe('DIARY ENDORSEMENT REQUEST G1 TASK LIST');
            });
    });

});
