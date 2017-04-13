/**
 * Created by Ivan_Katovich on 3/22/2017.
 */

exports.tags = ['Process_Dashboard', 'SLA'];

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

describe('(Mock) Process Dashboard - Service Level Chart', function () {

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

    it('1 - SLA chart lvl2 view should contain new axis title', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.graph.xaxisTitle.getText()).toBe('Groups & Users');
                expect(dashboard.sla.chart.level2.header.getToggle(0).getText()).toBe('Groups & Users');
            })
    });

    it('2 - SLA chart should contain new title on lvl2 and no titles on lvl3', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.header.getToggle(0).getText()).toBe('Groups & Users');
                expect(dashboard.sla.chart.level2.header.getToggle(1).getText()).toBe('Steps');
                expect(dashboard.sla.chart.level2.header.isToggleActive(0)).toBe(true);
                expect(dashboard.sla.chart.level2.header.isToggleActive(1)).toBe(false);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(2).click(-350)
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 G1 Steps')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.header.title.isPresent()).toBe(false);
            })
            .then(dashboard.header.getBack)
            .then(function () {
                return dashboard.sla.chart.level2.header.selectToggle('Steps');
            })
            .then(function () {
                return expect(dashboard.sla.chart.level2.header.isToggleActive(1)).toBe(true);
            })
            .then(function () {
                return dashboard.sla.chart.level2.graph.tracker(0).click(-350)
            })
            .then(function () {
                return waitDBTitle('New Service Level 1 Endorsement Request Groups & Users')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.header.title.isPresent()).toBe(false);
            });
    });

    it('5 - SLA name should be displayed correctly on lvl2 chart for "Groups&Users" and "Steps"', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return expect(dashboard.header.text()).toBe('New Service Level 1');
            })
            .then(function () {
                return dashboard.sla.chart.level2.header.selectToggle('Steps');
            })
            .then(function () {
                return expect(dashboard.header.text()).toBe('New Service Level 1');
            });
    });

    it('6 - SLA breadcrumbs should be displayed correctly on lvl2 chart for "Groups&Users" and "Steps"', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1');
            })
            .then(function () {
                return dashboard.sla.chart.level2.header.selectToggle('Steps');
            })
            .then(function () {
                expect(dashboard.header.breadcrumbs.levels(1).getText()).toBe('XP1 PROCESS DASHBOARD');
                expect(dashboard.header.breadcrumbs.current).toBe('NEW SERVICE LEVEL 1');
            });
    });

    it('7 - SLA tooltips should be displayed correctly', function () {
        return dashboard.sla.chart.level1.graph.tracker(0).click(-350)
            .then(function () {
                return waitDBTitle('New Service Level 1')
            })
            .then(function () {
                expect(dashboard.sla.chart.level2.graph.header.getCounterTooltip()).toBe('Task counts represented in bar charts demonstrate direct group and user task assignment.');
            });
    });

});

