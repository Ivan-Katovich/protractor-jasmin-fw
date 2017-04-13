/*
    Process Dashboard Groups Chart, Level 1. Diary cases.
    Created: 11/25/2016, navasaal
	MTM: none; 
*/

exports.tags = ['Process_Dashboard', 'Groups'];

/* usings; */
var Navigation = require('./../../../../PageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../../PageObjects/Dashboard/dashboard.js'),
    DashboardHelper = require('./../../../../utils/dashboardHelper.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard();

/* vars; */
var data = {
    common: {
        groups: ['Administrators group', 'xp1_test', 'Unassigned'],
        totalCount: '74',
        diaryCount: '18',
    },
    groups: {
        administrators: 'Administrators groups',
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    users: {
        xp1: 'XP1',
        ezhovakr: 'ezhovakr',
        khvashma: 'khvashma',
        xp1_test: 'xp1_test'
    },
    flows: {
        diary: 'Diary',
        jamieWf: 'Jamies Workflow Test',
        wf: 'WF',
        wf1: 'wf1',
        wfRelease: 'WFRelease'
    },
    diaries: {
        minusOne: '17'
    }
}

describe('Groups Chart - Diary cases', function () {

    function revertDiary() {
        DashboardHelper.setDiaryStatus('Diary1', 0)
        DashboardHelper.setDiaryStatus('Diary2', 0);
        DashboardHelper.setDiaryStatus('SomeDiary', 0);
        DashboardHelper.setDiaryStatus('PRIORITY 1', 0);
        DashboardHelper.setDiaryStatus('FirstDiary', 0);
        DashboardHelper.setDiaryStatus('SecondDiary', 0);
        DashboardHelper.setDiaryStatus('diary reassign test', 0);
        DashboardHelper.setDiaryStatus('DiaryOnPage', 0);
    }

    beforeAll(function () {
        return DashboardHelper.cleanDashboardSettings()
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
        return browser.driver.get(browser.params.defaultUrl)
		.then(function () {
		    revertDiary();
		})
		.then(function () {
		    return browser.waitForAngular();
		});
    });

    afterAll(function () {
        revertDiary();
    })

    it('1-Diaries in Locked status should not be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('Diary1', 2)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.diaries.minusOne);
        })
    });

    it('2-Diaries in Uncommitted or Waiting statuses should not be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('Diary2', 3)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.diaries.minusOne);
        });
    });

    it('3-Diaries in Completed status should not be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('SomeDiary', 4)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.diaries.minusOne);
        });
    });

    it('4-Diaries in Any status (-1) should be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('SomeDiary', -1)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.common.diaryCount);
        });
    });

    it('5-Diaries in Hold status should be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('SomeDiary', 1)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.common.diaryCount);
        });
    });

    it('6-Diaries in Error status should be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('SomeDiary', 5)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.common.diaryCount);
        });
    });

    it('7-Diaries in Un-doable status should be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('SomeDiary', 6)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.common.diaryCount);
        });
    });

    it('8-Diaries in One Step status should be displayed on charts', function () {
        return navigation.dashboardIcon.click()
		.then(function () {
		    DashboardHelper.setDiaryStatus('SomeDiary', 7)
		})
        .then(function () {
            return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
            return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
            return dashboard.flows.graph.tracker(data.flows.diary).click();
        })
        .then(function () {
            return expect(dashboard.steps.tasks).toEqual(data.common.diaryCount);
        });
    });
});