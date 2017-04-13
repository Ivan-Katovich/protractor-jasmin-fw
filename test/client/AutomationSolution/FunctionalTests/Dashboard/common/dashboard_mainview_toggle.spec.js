/*
    Process Dashboard. Main View toggle state.
    Created: 02/16/2017, navasaal,
    MTM: 6.4 -> Process Dashboard -> Common;
*/

exports.tags = ['Process_Dashboard', 'Common'];

/* usings; */
var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    DashboardHelper = require('./../../../utils/dashboardHelper.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),
    Filters = require('./../../../PageObjects/Dashboard/filters.js'),
    Login = require('./../../../PageObjects/LoginPage.js'),
    Settings = require('./../../../PageObjects/DropdownLists/UserSettingsDropdown.js');

/* objects; */
var navigation = new Navigation(),
    dashboard = Dashboard(),
    filters = new Filters(),
    login = new Login(),
    settings = new Settings();

/* metadata; */
var data = {

    views: {
        test1: 'XP1 Process Dashboard',
        test2: 'XP1 Create New View',
        test3: 'XP1 Simple View',
        test4: 'XP1 Save As New View',
        test5: 'XP1 Relogin View'
    }
};

function setupView() {

    return dashboard.groups.errorPane.button.waitReady()
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
}

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

describe('Process Dashboard - Main View toggle', function () {

    beforeAll(function () {
        return DashboardHelper.cleanDashboardSettings()
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(navigation.dashboardIcon.click)
        .then(function () {
            return setupView();
        });
    });

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        });
    });

    it('1-First time view and "Create New View" should always have "Groups" toggle button state by default', function () {
        return navigation.dashboardIcon.click()

        /* check default toggle; */
        .then(function () {
            return expect(dashboard.groups.header.title.groups.isActive).toEqual(true);
        })

        /* create view; */
        .then(dashboard.header.dashboardViews.show)
        .then(dashboard.header.dashboardViews.newView.buttons.create.click)
        .then(function () {
            return dashboard.header.dashboardViews.newView.typeName(data.views.test2);
        })
        .then(dashboard.header.dashboardViews.newView.buttons.apply.click)
        .then(function () {
            return setupView();
        })

        /* check default toggle; */
        .then(function () {
            return expect(dashboard.groups.header.title.groups.isActive).toEqual(true);
        });
    });

    it('2-The last selected Groups or Workflows toggle button state should persist for each saved dashboard view', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)

        /* create view; */
        .then(dashboard.header.dashboardViews.show)
        .then(dashboard.header.dashboardViews.newView.buttons.create.click)
        .then(function () {
            return dashboard.header.dashboardViews.newView.typeName(data.views.test3);
        })
        .then(dashboard.header.dashboardViews.newView.buttons.apply.click)
        .then(function () {
            return setupView();
        })

        /* switch view & check toggle; */
        .then(function () {
            return dashboard.header.dashboardViews.selectView(data.views.test1);
        })
        .then(function () {
            return expect(dashboard.groups.header.title.workflows.isActive).toEqual(true);
        })

        /* switch view & check toggle; */
        .then(function () {
            return dashboard.header.dashboardViews.selectView(data.views.test3);
        })
        .then(function () {
            return expect(dashboard.groups.header.title.groups.isActive).toEqual(true);
        });
    });

    it('3-The last selected Groups or Workflows toggle button state should persist after re-login ', function () {
        return navigation.dashboardIcon.click()
        
        /* create view; */
        .then(dashboard.header.dashboardViews.show)
        .then(dashboard.header.dashboardViews.newView.buttons.create.click)
        .then(function () {
            return dashboard.header.dashboardViews.newView.typeName(data.views.test5);
        })
        .then(dashboard.header.dashboardViews.newView.buttons.apply.click)
        .then(function () {
            return setupView();
        })
        .then(dashboard.groups.header.title.workflows.click)

        /* relogin; */
        .then(function () {
            return relogin();
        })
        .then(navigation.dashboardIcon.click)

        /* check toggle; */
        .then(function () {
            return dashboard.header.dashboardViews.selectView(data.views.test5);
        })
        .then(function () {
            return expect(dashboard.groups.header.title.workflows.isActive).toEqual(true);
        });
    });

    it('4-Save as new Dashboard should inherit toggle button state from the initial dashboard view', function () {
        return navigation.dashboardIcon.click()
        .then(dashboard.groups.header.title.workflows.click)

        /* change & save view; */
        .then(dashboard.groups.header.filter.click)
        .then(function () {
            return dashboard.filters.sections.workflows.expand();
        })
        .then(function () {
            return dashboard.filters.sections.workflows.tickItem('DIARY');
        })
        .then(function () {
            return dashboard.filters.buttons.apply();
        })
        .then(function () {
            return dashboard.header.tile.saveAsNew(data.views.test4);
        })
        .then(function () {
            return dashboard.header.dashboardViews.selectView(data.views.test1);
        })
        .then(function () {
            return dashboard.header.dashboardViews.selectView(data.views.test4);
        })

        /* check toggle; */
        .then(function () {
            return expect(dashboard.groups.header.title.workflows.isActive).toEqual(true);
        });
    });
});