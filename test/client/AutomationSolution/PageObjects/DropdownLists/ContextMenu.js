var ContextMenu = function () { };

var activeFile = $('.vf-tab-pane.active');

ContextMenu.prototype = Object.create({}, {

    menu: { 
        get: function() {
            return element(by.css('.file-tree-area div[ng-class*="isContextMenu"] ul'));
        }
    },

    menuOptions: {
        get: function() {
            return this.menu.all(by.css('li'));
            // always returns array length 13 with empty indices if action disabled
            //['Expand/collapse', '', 'New Folder', 'New Document', 'Copy', 'Move', 'Add Page', 'Rename', '', 'Print', 'Download', 'Email', 'Copy Url' ]
        }
    },

    //this returns first element in context menu which appears only on folder/doc context clicks to toggle children
    expandCollapse: {
        get: function() {
            return this.menuOptions.get(0);
        }
    },

    addFolder: {
        get: function () {
            return this.menu.element(by.id('contextMenuNewFolderNode'));
        }
    },

    addDocument: {
        get: function () {
            return this.menu.element(by.id('newDocument'));
        }
    },

    copy: {
        get: function () {
            return this.menu.element(by.id('copyNode'));
        }
    },

    move: {
        get: function () {
            return this.menu.all(by.cssContainingText('span.dropdown-menu-item', 'Move')).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    addPage: {
        get: function () {
            return this.menu.all(by.cssContainingText('span.dropdown-menu-item', 'Add Page')).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    rename: {
        get: function () {
            return this.menu.element(by.id('renameNode'));
        }
    },

    //6 is some odd extra rename that never seems to get enabled

    print: {
        get: function () {
            return this.menu.element(by.id('printNode'));
        }
    },

    download: {
        get: function () {
            return this.menu.element(by.id('downloadNode'));
        }
    },

    email: {
        get: function () {
            return this.menu.all(by.cssContainingText('span.dropdown-menu-item', 'Email')).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    copyUrl: {
        get: function () {
            return this.menu.all(by.cssContainingText('span.dropdown-menu-item', 'Copy Shortcut')).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    }
    
});

module.exports = ContextMenu;

