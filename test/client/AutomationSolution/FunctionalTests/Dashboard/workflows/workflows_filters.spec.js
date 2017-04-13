/*
    Process Dashboard. PD Workflows chart filtering;
    Created: 02/15/2017, navasaal,
    MTM: 6.4 -> Process Dashboard -> Workflow Chart -> Filter & Chart;
*/

exports.tags = ['Process_Dashboard', 'Workflow'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),
	Login = require('./../../../PageObjects/LoginPage.js'),
	Settings = require('./../../../PageObjects/DropdownLists/UserSettingsDropdown.js'),
	Q = require('q');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    login = new Login(),
    settings = new Settings();

/* metadata; */
var data = {

	groups: {
		xp1_test: 'xp1_test'
	},
	users: {
		xp1: 'XP1'
	},
	flows: {
		wfRelease: {name: 'WFRelease', status: 0},
		Diary: {name: 'Diary', status: 0},
		SimpleWorkFlow1: {name: 'SimpleWorkFlow1', status: 0},
		SimpleWorkFlow2: {name: 'SimpleWorkFlow2', status: 0},
		SimpleWorkFlow3: {name: 'SimpleWorkFlow3', status: 0},
		SimpleWorkFlow444444444444444444444444444444444444444444444444444444444: {name: 'SimpleWorkFlow444444444444444444444444444444444444444444444444444444444', status: 0},
		WF: {name: 'WF', status: 0},
		WFRelease: {name: 'WFRelease', status: 0},
		newWF: {name: 'newWF', status: 1},
		WFSetTaskAttributes: {name: 'WFSetTaskAttributes', status: 0},
		JamiesWorkflowTest: {name: 'Jamies Workflow Test', status: 0},
		NoAccess: {name: 'NoAccess', status: 2},
		JamieWF: {name: 'Jamie WF', status: 0},
		CLAIMWORKFLOW: {name: 'CLAIM WORK FLOW', status: 2}
	},
};

function relogin() {
	return navigation.userSettingsIcon.click()
	.then(function () {
		return browser.waitForAngular();
	})
	.then(function () {
		return settings.signOut.click();
	})
	.then(function () {
		return browser.sleep(5000); /* wait for non-angular page; */
	})
	.then(function () {
		return login.reloginLink.click();
	})
	.then(function () {
		return login.login(browser.params.defaultUserName, browser.params.defaultPassword);
	});
};

function restoreAllFlows() {
	var promise = [];
	for (var flow in data.flows) {
		promise.push(DashboardHelper.setFlowStatus(data.flows[flow].name, data.flows[flow].status));
	};
	return Q.all(promise);
};

function disableAllFlows() {
	var promise = [];
	for (var flow in data.flows) {
		promise.push(DashboardHelper.setFlowStatus(data.flows[flow].name, 1));
	};
	return Q.all(promise);
};

function deactivateAllFlows() {
	var promise = [];
	for (var flow in data.flows) {
		promise.push(DashboardHelper.setFlowStatus(data.flows[flow].name, 2));
	};
	return Q.all(promise);
};

describe('Workflows Chart - Filtering', function () {

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
		return restoreAllFlows()
		.then(function () {
			return DashboardHelper.setStepStatus('WFRelease', 'Manual 1', 0)
		})
        .then(function () {
        	return DashboardHelper.setStepStatus('WFRelease', 'Manual 2', 0);
        })
		.then(browser.executeScript('window.localStorage.clear();'))
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
        	return browser.waitForAngular();
        });
	});

	afterEach(function () {
		return restoreAllFlows()
		.then(function () {
			return DashboardHelper.setStepStatus('WFRelease', 'Manual 1', 0)
		})
		.then(function () {
			return DashboardHelper.setStepStatus('WFRelease', 'Manual 2', 0);
		});
	});

	it('1-(screen)Workflows chart should not display disabled flows', function () {
		return DashboardHelper.setFlowStatus('WFRelease', '1')
        .then(function () {
        	return relogin();
        })
		.then(navigation.dashboardIcon.click)
		.then(function(){
			return browser.waitForAngular();
		})
		.then(dashboard.groups.header.title.workflows.click)
		.then(function () {
			return dashboard.groups.graph.compare('workflowsFilters1');
		});
	});

	it('2-(screen)Workflows chart should not display deactivated flows', function () {
		return DashboardHelper.setFlowStatus('Jamie WF', '2')
		.then(function () {
			return relogin();
		})
		.then(navigation.dashboardIcon.click)
		.then(dashboard.groups.header.title.workflows.click)
		.then(function () {
			return dashboard.groups.graph.compare('workflowsFilters2');
		});
	});

	it('3-Filters dialog should not contain disabled and deactivated flows', function () {
		return DashboardHelper.setFlowStatus('WFRelease', '1')
		.then(function () {
			return DashboardHelper.setFlowStatus('Jamie WF', '2')
		})
		.then(function () {
			return relogin();
		})
		.then(navigation.dashboardIcon.click)
        .then(function () {
        	return dashboard.groups.header.filter.click();
        })
		.then(function () {
			return dashboard.filters.sections.workflows.expand();
		})
        .then(function () {
        	return dashboard.filters.sections.workflows.isPresent('WFRelease');
        })
		.then(function (present) {
			return expect(present).toEqual(false);
		})
		.then(function () {
			return dashboard.filters.sections.workflows.isPresent('Jamie WF');
		})
		.then(function (present) {
			return expect(present).toEqual(false);
		});
	});

	it('4-(screen)Steps with status Deleted should not be displayed in charts and steps with To be deleted - should be', function () {

		/* check normal status; */
		return navigation.dashboardIcon.click()
        .then(function () {
        	return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
        	return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
        	return dashboard.flows.graph.tracker(data.flows.wfRelease.name).click();
        })
        .then(function () {
        	return dashboard.steps.graph.compare('groupsFilterCases1_1');
        })

        /* change step statuses; */
        .then(function () {
        	return DashboardHelper.setStepStatus('WFRelease', 'Manual 1', 2);
        })
        .then(function () {
        	return DashboardHelper.setStepStatus('WFRelease', 'Manual 2', 1);
        })

		/* relogin; */
		.then(function () {
			return relogin();
		})

        /* recheck; */
        .then(navigation.dashboardIcon.click)
        .then(function () {
        	return dashboard.groups.graph.tracker(data.groups.xp1_test).click();
        })
        .then(function () {
        	return dashboard.users.graph.tracker(data.users.xp1).click();
        })
        .then(function () {
        	return dashboard.flows.graph.tracker(data.flows.wfRelease.name).click();
        })
        .then(function () {
        	return dashboard.steps.graph.compare('groupsFilterCases1_2');
        });
	});

    it('5-When user unselect all flows or set invalid filters there are red marks appear against invalid values', function () {

		return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.filter.click)
        .then(function () {
        	return dashboard.filters.sections.workflows.expand();
        })
        .then(function () {
        	return dashboard.filters.sections.workflows.tickItem('DIARY');
        })
        .then(function () {
        	expect(dashboard.filters.sections.workflows.isRequired()).toEqual(false);
        	expect(dashboard.filters.sections.groupsUsers.isRequired()).toEqual(false);
        	expect(dashboard.filters.sections.types.isRequired()).toEqual(false);
        })
        .then(function () {
        	return dashboard.filters.sections.selectAll();
        })
        .then(function () {
        	expect(dashboard.filters.sections.workflows.isRequired()).toEqual(false);
        	expect(dashboard.filters.sections.groupsUsers.isRequired()).toEqual(false);
        	expect(dashboard.filters.sections.types.isRequired()).toEqual(false);
        })
		.then(function () {
			return dashboard.filters.sections.selectAll();
		})
        .then(function () {
        	expect(dashboard.filters.sections.workflows.isRequired()).toEqual(true);
        	expect(dashboard.filters.sections.groupsUsers.isRequired()).toEqual(true);
        	expect(dashboard.filters.sections.types.isRequired()).toEqual(true);
        })
        .then(function () {
        	return dashboard.filters.buttons.reset();
        })
        .then(function () {
        	return dashboard.filters.header.close();
        })
        .then(function () {
        	return browser.waitForAngular();
        })
        .then(function () {
        	return expect(dashboard.filters.visible).toEqual(false);
        });
    });

    it('6-The title of filters dialog is Groups & Workflows Filter Settings', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return expect(dashboard.filters.header.getName()).toEqual('Groups & Workflows Filter Settings');
        });
    });

    it('7-When all of filtered workflows became disabled a message with ability to setup filters should appear', function () {
    	
        return DashboardHelper.cleanDashboardSettings()
		.then(browser.executeScript('window.localStorage.clear();'))
        .then(browser.driver.get(browser.params.defaultUrl))
        .then(function () {
            return browser.waitForAngular();
        })
    	.then(navigation.dashboardIcon.click)
		.then(dashboard.groups.errorPane.button.click)
		.then(function () {
		    return dashboard.filters.sections.workflows.expand();
		})
		.then(function () {
		    return dashboard.filters.sections.workflows.tickItem('WFRELEASE');
		})
		.then(function () {
		    return dashboard.filters.sections.selectAll();
		})
		.then(function () {
		    return dashboard.filters.buttons.apply();
		})
        .then(function () {
            return browser.waitForAngular();
        })
		.then(function () {
		    return DashboardHelper.setFlowStatus('WFRelease', 2);
		})
		.then(function () {
		    return relogin();
		})
    	.then(navigation.dashboardIcon.click)
		.then(function () {
		    return expect(dashboard.groups.errorPane.notification.isPresent()).toEqual(true);
		});
    });
});