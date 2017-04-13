var FileTree = function () { };

//returns the locator so that we can only work in active file -- because there can be more files open at a time but there is only 1 active file at a time
var activeFile = $('.vf-tab-pane.active');

FileTree.prototype = Object.create({}, {

    // returns fileNumber shown at top of tree
    fileNumber: {
        get: function () {
            return element(by.css('#rootFileTreeNode'));
        }
    },

    //returns element for number of items selected when more than 1 in tree
    numberSelected: {
        get: function () {
            return element(by.binding('file.selectedNodes.length'));
        }
    },

    // returns file tree toggle element
    fileTreeSymbol: {
        get: function () {
            return activeFile.$('.toggle-tree');
        }
    },

    // returns a list of all the nodes in the file tree DOM regardless of type. Affected by virtual scrolling
    fileTreeNodes: {
        get: function () {
            return activeFile.$('.list-tree-panel').$('.file-tree-list').all(by.tagName('li'));
        }
    },

    // returns the dropdown node arrow icon of a folder
    expandCollapseFolderNode: {
        value: function (nodeText, index) {
            return activeFile.all(by.cssContainingText('.navigable.folder', nodeText)).get(index).all(by.css('i')).get(0);
        }
    },

    // returns the dropdown node arrow icon of a document
    expandCollapseDocumentNode: {
        value: function (nodeText, index) {
            return activeFile.all(by.cssContainingText('.navigable.document', nodeText)).get(index).all(by.css('i')).get(0);
        }
    },

    // returns the dropdown node arrow icon of a document
    expandCollapseDocumentByText: {
        value: function (nodeText) {
            return activeFile.all(by.cssContainingText('.navigable.document', nodeText)).all(by.css('i')).get(0);
        }
    },

    // returns the dropdown node arrow icon of a folder
    expandCollapseFolderByText: {
        value: function (nodeText) {
            return activeFile.element(by.cssContainingText('.navigable.folder', nodeText)).$('button i');
        }
    },

    //  returns text at a given index but beware as affected by virtual scrolling
    fileTreeNodeText: {
        value: function (index) {
            return activeFile.$('.list-tree-panel').$('.file-tree-list').all(by.tagName('div')).get(index).getText();
        }
    },

    // actually returns class attr of indexed node. Can check for containing doc-selected to see if highlighted in tree
    fileTreeNodeHighlighted: {
        value: function (index) {
            return activeFile.$('.list-tree-panel').$('.file-tree-list').all(by.tagName('li')).get(index).getAttribute('class');
        }
    },

    // returns particular file tree element based on node text
    fileTreeNodesByText: {
        value: function (nodeTextToClick) {
            return activeFile.$('.list-tree-panel').$('.file-tree-list').all(by.cssContainingText('div', nodeTextToClick));
        }
    },

    // returns expand/collapse element of particular file tree element based on node text
    fileTreeNodeIconByText: {
        value: function (nodeTextToClick) {
            return activeFile.$('.list-tree-panel').$('.file-tree-list').all(by.cssContainingText('div', nodeTextToClick)).get(0).$('i');
        }
    },

    documentsInFileTree: {
        get: function () {
            return element.all(by.css('.navigable.document'));
        }
    },

    document: {
        value: function (index) {
            return element.all(by.css('.navigable.document')).get(index);
        }
    },

    pagesInFileTree: {
        get: function () {
            return element.all(by.css('.navigable.page'));
        }
    },

    page: {
        value: function (index) {
            return this.pagesInFileTree.get(index);
        }
    },
    pageByText: {
        value: function (text) {
            return element(by.cssContainingText('.navigable.page', text));   //navigable.page if true tree
        }
    },

    pagesByText: {
        value: function (text) {
            return element.all(by.cssContainingText('.navigable.page', text));
        }
    },

    //Get the li element which is the parent of the one you're looking for
    //if it is selected, the li should have the class of .doc-selected
    getPageLiByText: {
        value: function (text) {
            return element(by.cssContainingText('div.navigable.page', text)).element(by.xpath('..'));
        }
    },

    folderByText: {
        value: function (text) {
            return element(by.cssContainingText('.vf-tab-pane.active .navigable.folder', text));
        }
    },

    documentByText: {
        value: function (text) {
            return element(by.cssContainingText('.vf-tab-pane.active .navigable.document span', text));
        }
    },

    documentByTextAndIndex: {
        value: function (text, index) {
            return element.all(by.cssContainingText('.vf-tab-pane.active .navigable.document span', text)).get(index);
        }
    },

    selectedNode: {
        get: function () {
            return element(by.css('.vf-tab-pane.active .file-tree-node.doc-selected'));
        }
    },

    selectedPages: {
        get: function () {
            return element.all(by.css(".vf-tab-pane.active .file-tree-node.doc-selected"));
        }
    },

    selectedFolder: {
        get: function () {
            return element.all(by.css(".vf-tab-pane.active .level-selected"));
        }
    },

    selectedDocument: {
        value: function (index) {
            return activeFile.$$('.doc-selected .document.file-tree-item').get(index);
        }
    },

    selectedPage: {
        value: function (index) {
            return activeFile.$$('.doc-selected .page.file-tree-item').get(index);
        }
    },

    expandedFolders: {
        get: function () {
            return activeFile.all(by.xpath(".//i[@class='fa fa-caret-down']/../../../div[contains(@class, 'navigable folder file-tree-item')]"));
        }
    },

    expandedDocuments: {
        get: function () {
            return activeFile.all(by.xpath(".//i[@class='fa fa-caret-down']/../../../div[contains(@class, 'navigable document file-tree-item')]"));
        }
    },

    expandedDocumentByText: {
        value: function (text) {
            return element(by.css(".vf-tab-pane.active")).element(by.xpath(".//i[@class='fa fa-caret-down']/../../../div[contains(@class, 'navigable document file-tree-item')]/span[contains(.,'" + text + "')]"));
        }
    },

    findAttrById: {
        value: function(attr, id) {
            return element(by.id(id)).getAttribute(attr);
        }
    }

});

module.exports = FileTree;