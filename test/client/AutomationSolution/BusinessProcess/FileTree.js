/**
 * Created by iglesibr on 11/25/2015.
 * This file contains all common functions used within the file tree
 */

// finds node by text & type then clicks the description
function clickOnNodeInFileTree(nodeText, nodeType) {
    switch (nodeType) {
        case 'folder':
            waitTillElementVisible(fileTree.folderByText(nodeText));
            return fileTree.folderByText(nodeText).click();
            break;
        case 'page':
            waitTillElementVisible(fileTree.pageByText(nodeText));
            // Amit : firefox 38 .click() behaves strangely, use an action sequence instead.
            //return clickOnElement(fileTree.pageByText(nodeText));
            return fileTree.pageByText(nodeText).click();
            break;
        case 'document':
            waitTillElementVisible(fileTree.documentByText(nodeText));
            //return clickOnElement(fileTree.documentByText(nodeText));
            return fileTree.documentByText(nodeText).click();
            break;
    }
}

// finds a node by text & type and then displays the children of the given node
function showNodeChildrenByText(nodeText, nodeType, index) {
    // figure logic in here to check if already expanded. Only perfom following if now already expanded
    if (typeof index == "undefined") {
        var index = 0;
    }

    switch (nodeType) {
        case 'folder':
            return waitTillElementVisible(fileTree.expandCollapseFolderNode(nodeText, index)).then(function () {
                fileTree.expandCollapseFolderNode(nodeText, index).click();
            });
            break;
        case 'document':
            return waitTillElementVisible(fileTree.expandCollapseDocumentNode(nodeText, index)).then(function () {
                fileTree.expandCollapseDocumentNode(nodeText, index).click();
            });
            break;
    }

}

// selects node to bring up menu options
function selectNodeIconByText(nodeText) {
    return fileTree.fileTreeNodesByText(nodeText).click();
}