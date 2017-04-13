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

describe('(Mock) Process Dashboard - Workflows Chart Filtering', function () {

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

    it('1 - Tooltip on workflows chart lvl1 should be changed after using aging filters', function () {
        return dashboard.groups.header.selectToggle('Workflows')
            .then(function () {
                return expect(dashboard.groups.header.isToggleActive('Workflows')).toBe(true);
            })
            .then(function () {
                return dashboard.groups.graph.tracker('Diary').hover(-350);
            })
            .then(function () {
                expect(dashboard.groups.graph.tooltip.visible).toBe(true);
                expect(dashboard.groups.graph.tooltip.name).toBe('Diary:');
                expect(dashboard.groups.graph.tooltip.summ).toBe('10');
                expect(dashboard.groups.graph.tooltip.tasks).toBe('0-2 days: 4, 3-30 days: 1, 31-60 days: 2, >60 days: 3');
            })
            .then(dashboard.groups.graph.legend.icons(0).click)
            .then(function () {
                return dashboard.groups.graph.tracker('Diary').hover(-350);
            })
            .then(function () {
                expect(dashboard.groups.graph.tooltip.visible).toBe(true);
                expect(dashboard.groups.graph.tooltip.name).toBe('Diary:');
                expect(dashboard.groups.graph.tooltip.summ).toBe('6');
                expect(dashboard.groups.graph.tooltip.tasks).toBe('3-30 days: 1, 31-60 days: 2, >60 days: 3');
            })
            .then(dashboard.groups.graph.legend.icons(0).click)
            .then(dashboard.groups.graph.legend.icons(1).click)
            .then(function () {
                return dashboard.groups.graph.tracker('Diary').hover(-350);
            })
            .then(function () {
                expect(dashboard.groups.graph.tooltip.visible).toBe(true);
                expect(dashboard.groups.graph.tooltip.name).toBe('Diary:');
                expect(dashboard.groups.graph.tooltip.summ).toBe('9');
                expect(dashboard.groups.graph.tooltip.tasks).toBe('0-2 days: 4, 31-60 days: 2, >60 days: 3');
            })
            .then(dashboard.groups.graph.legend.icons(1).click)
            .then(dashboard.groups.graph.legend.icons(2).click)
            .then(function () {
                return dashboard.groups.graph.tracker('Diary').hover(-350);
            })
            .then(function () {
                expect(dashboard.groups.graph.tooltip.visible).toBe(true);
                expect(dashboard.groups.graph.tooltip.name).toBe('Diary:');
                expect(dashboard.groups.graph.tooltip.summ).toBe('8');
                expect(dashboard.groups.graph.tooltip.tasks).toBe('0-2 days: 4, 3-30 days: 1, >60 days: 3');
            })
            .then(dashboard.groups.graph.legend.icons(2).click)
            .then(dashboard.groups.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.groups.graph.tracker('Diary').hover(-350);
            })
            .then(function () {
                expect(dashboard.groups.graph.tooltip.visible).toBe(true);
                expect(dashboard.groups.graph.tooltip.name).toBe('Diary:');
                expect(dashboard.groups.graph.tooltip.summ).toBe('7');
                expect(dashboard.groups.graph.tooltip.tasks).toBe('0-2 days: 4, 3-30 days: 1, 31-60 days: 2');
            })
            .then(dashboard.groups.graph.legend.icons(2).click)
            .then(function () {
                return dashboard.groups.graph.tracker('Diary').hover(-350);
            })
            .then(function () {
                expect(dashboard.groups.graph.tooltip.visible).toBe(true);
                expect(dashboard.groups.graph.tooltip.name).toBe('Diary:');
                expect(dashboard.groups.graph.tooltip.summ).toBe('5');
                expect(dashboard.groups.graph.tooltip.tasks).toBe('0-2 days: 4, 3-30 days: 1');
            })
            .then(dashboard.groups.graph.legend.icons(1).click)
            .then(function () {
                return dashboard.groups.graph.tracker('Diary').hover(-350);
            })
            .then(function () {
                expect(dashboard.groups.graph.tooltip.visible).toBe(true);
                expect(dashboard.groups.graph.tooltip.name).toBe('Diary:');
                expect(dashboard.groups.graph.tooltip.summ).toBe('4');
                expect(dashboard.groups.graph.tooltip.tasks).toBe('0-2 days: 4');
            })
            .then(dashboard.groups.graph.legend.icons(0).click)
            .then(function () {
                expect(dashboard.groups.graph.trackers().count()).toBe(0);
                expect(dashboard.groups.graph.tooltip.visible).toBe(false);
            })
    });

    it('2 - Tooltip on workflows chart lvl2 should be changed after using aging filters', function () {
        return dashboard.groups.header.selectToggle('Workflows')
            .then(function () {
                return expect(dashboard.groups.header.isToggleActive('Workflows')).toBe(true);
            })
            .then(function () {
                return dashboard.groups.graph.tracker(0).click(-350);
            })
            .then(function () {
                return waitDBTitle('Diary Steps');
            })
            .then(function () {
                return dashboard.steps.graph.tracker('Manual 1').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Manual 1:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('7');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 1, 3-30 days: 3, 31-60 days: 1, >60 days: 2');
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Manual 1').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Manual 1:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('6');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('3-30 days: 3, 31-60 days: 1, >60 days: 2');
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(dashboard.steps.graph.legend.icons(1).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Manual 1').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Manual 1:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('4');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 1, 31-60 days: 1, >60 days: 2');
            })
            .then(dashboard.steps.graph.legend.icons(1).click)
            .then(dashboard.steps.graph.legend.icons(2).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Manual 1').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Manual 1:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('6');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 1, 3-30 days: 3, >60 days: 2');
            })
            .then(dashboard.steps.graph.legend.icons(2).click)
            .then(dashboard.steps.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Manual 1').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Manual 1:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('5');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 1, 3-30 days: 3, 31-60 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(2).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Manual 1').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Manual 1:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('4');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 1, 3-30 days: 3');
            })
            .then(dashboard.steps.graph.legend.icons(1).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Manual 1').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Manual 1:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('1');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(function () {
                expect(dashboard.steps.graph.trackers().count()).toBe(0);
                expect(dashboard.steps.graph.tooltip.visible).toBe(false);
            });
    });

    it('3 - Tooltip on workflows chart lvl3 should be changed after using aging filters', function () {
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
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Admin:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('5');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 2, 3-30 days: 1, 31-60 days: 1, >60 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Admin:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('3');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('3-30 days: 1, 31-60 days: 1, >60 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(dashboard.steps.graph.legend.icons(1).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Admin:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('4');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 2, 31-60 days: 1, >60 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(1).click)
            .then(dashboard.steps.graph.legend.icons(2).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Admin:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('4');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 2, 3-30 days: 1, >60 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(2).click)
            .then(dashboard.steps.graph.legend.icons(3).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Admin:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('4');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 2, 3-30 days: 1, 31-60 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(2).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Admin:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('3');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 2, 3-30 days: 1');
            })
            .then(dashboard.steps.graph.legend.icons(1).click)
            .then(function () {
                return dashboard.steps.graph.tracker('Admin').hover(-350);
            })
            .then(function () {
                expect(dashboard.steps.graph.tooltip.visible).toBe(true);
                expect(dashboard.steps.graph.tooltip.name).toBe('Admin:');
                expect(dashboard.steps.graph.tooltip.summ).toBe('2');
                expect(dashboard.steps.graph.tooltip.tasks).toBe('0-2 days: 2');
            })
            .then(dashboard.steps.graph.legend.icons(0).click)
            .then(function () {
                expect(dashboard.steps.graph.trackers().count()).toBe(0);
                expect(dashboard.steps.graph.tooltip.visible).toBe(false);
            });
    });

});
