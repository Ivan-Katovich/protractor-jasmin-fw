var DocumentPageActionsDropdown = function () { };

var activeFile = $('.vf-tab-pane.active');

DocumentPageActionsDropdown.prototype = Object.create({}, {

    menuRoot: {
        
        get: function () {
            return activeFile.all('.dropdown-menu.vf-dropdown-menu').filter(function (elems) {
                return elems.isDisplayed();
            }).first();
        }
    },

    printAction: {
        get: function () {
            return activeFile.$('.dropdown.open [ng-click="print()"]');
        }
    },

    emailAction: {
        get: function () {
            return element.all(by.css(".vf-tab-pane.active .dropdown.open [ng-click='email()']")).get(0);
        }
    },

    newDocumentAction: {
        get: function () {
            return element.all(by.css(".vf-tab-pane.active .dropdown.open [ng-click*='showDocumentWindow']")).get(0);
        }
    },

    newFolderAction: {
        get: function () {
            return element.all(by.css(".vf-tab-pane.active .dropdown.open [ng-click*='addFolder']")).get(0);
        }
    },

    downloadAction: {
        get: function () {
            return element.all(by.css(".vf-tab-pane.active .dropdown.open [ng-click='download()']")).get(0);
        }
    },

    renameAction: {
        get: function () {
            return activeFile.$('.dropdown.open [ir-content-rename-description]');
        }
    },

    addPageAction: {
        get: function () {
            return activeFile.$('.dropdown.open [ng-click="showExistingDocumentWindow()"]');
        }
    },

    copyAction: {
        get: function () {
            return element.all(by.id('copyNode')).filter(function (elems) {
                return elems.isDisplayed();
            }).first();

        }
    },

    moveAction: {
        get: function () {
            return activeFile.$('.dropdown.open [ng-if*="move"]');
        }
    }
});

module.exports = DocumentPageActionsDropdown;