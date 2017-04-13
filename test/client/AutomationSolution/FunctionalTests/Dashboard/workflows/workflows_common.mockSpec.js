/**
 * Created by Ivan_Katovich on 3/29/2017.
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

describe('(Mock) Process Dashboard - Workflows common tests', function () {

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

    it('1 - Workflows lvl2 should display correct diary steps ', function () {
        return dashboard.groups.header.selectToggle('Workflows')
            .then(function () {
                expect(dashboard.groups.header.isToggleActive('Workflows')).toBe(true);
                expect(dashboard.groups.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(2).isActive()).toBe(true);
                expect(dashboard.groups.graph.legend.icons(3).isActive()).toBe(true);
            })
            .then(function () {
                return dashboard.groups.graph.tracker(0).click(-350);
            })
            .then(function () {
                return waitDBTitle('Diary Steps');
            })
            .then(function () {
                expect(dashboard.steps.graph.trackers().count()).toBeGreaterThan(0);
                expect(dashboard.steps.graph.header.getCount()).toBe('13');
            });
    });

    it('2 - Workflows lvl2 should display correct steps for common view', function () {
        return dashboard.groups.header.selectToggle('Workflows')
            .then(function () {
                expect(dashboard.groups.header.isToggleActive('Workflows')).toBe(true);
            })
            .then(function () {
                return dashboard.groups.graph.tracker(3).click(-350);
            })
            .then(function () {
                return waitDBTitle('Not Used Agency Endorsement Steps');
            })
            .then(function () {
                expect(dashboard.steps.graph.trackers().count()).toBeGreaterThan(0);
                expect(dashboard.steps.graph.header.getCount()).toBe('13');
                expect(dashboard.steps.graph.y.count).toBe(4);
                expect(dashboard.steps.graph.y.item(0).getText()).toBe('Manual 1');
                expect(dashboard.steps.graph.y.item(1).getText()).toBe('N-Manual');
                expect(dashboard.steps.graph.y.item(2).getText()).toBe('O-Manual');
                expect(dashboard.steps.graph.y.item(3).getText()).toBe('P-Manual');
                expect(dashboard.steps.graph.x.count).toBe(9);
                expect(dashboard.steps.graph.legend.icons(0).isActive()).toBe(true);
                expect(dashboard.steps.graph.legend.icons(1).isActive()).toBe(true);
                expect(dashboard.steps.graph.legend.icons(2).isActive()).toBe(true);
                expect(dashboard.steps.graph.legend.icons(3).isActive()).toBe(true);
            });
    });

    it('3 - Workflows lvl2 steps should be ordered in alphabetic order', function () {
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
                return dashboard.steps.graph.y.items().getText();
            })
            .then(function (texts) {
                return expect(texts).toBe(texts.sort());
            });
    });

    it('4 - Zoom on Workflows lvl3 should be available', function () {
        var xCount;
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
                return dashboard.steps.graph.x.count;
            })
            .then(function (count) {
                xCount=count;
                return browser.actions()
                    .dragAndDrop(dashboard.steps.graph.tracker('Admin').container, { x: -100, y: -20 })
                    .perform();
            })
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').container.waitToBeCompletelyVisibleAndStable();
            })
            .then(function () {
                return expect(dashboard.steps.graph.x.count).toBeLessThan(xCount);
            })
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(dashboard.steps.graph.zoomButton.click)
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').container.waitToBeCompletelyVisibleAndStable();
            })
            .then(function () {
                return expect(dashboard.steps.graph.x.count).toBe(xCount);
            });
    });




});