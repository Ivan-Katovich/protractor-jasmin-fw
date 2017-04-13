var MoveExplorer = function () { };

MoveExplorer.prototype = Object.create({}, {

    title: {
        value: function (titleVal) {
            return element(by.cssContainingText('.vf-modal-title', titleVal));
        }
    },

    moveButton: {
        get: function () {
            return element.all(by.css(".vf-modal-footer button.action-move")).get(0);
        }
    },

    copyButton: {
        get: function () {
            return element.all(by.css(".vf-modal-footer button.action-move")).get(0);
        }
    },

    copyWithAnnotationsButton: {
        get: function () {
            return element.all(by.css(".vf-modal-footer button.action-move")).get(1);
        }
    },

    cancelButton: {
        get: function () {
            return element(by.css(".vf-modal-footer button[ng-click='cancel()']"));
        }
    },

    closeButton: {
        get: function () {
            return element(by.css(".vf-modal-header button[ng-click='close()']"));
        }
    },

    fileElement: {
        get: function () {
            return element(by.css("span.file"));
        }
    },

    columnsBox: {
        get: function () {
            return element(by.css('.columns-box'));
        }
    },

    getColumns: {
        get: function () {
            return element.all(by.css('.columns-box ir-file-explorer-column'));
        }
    },

    getItemsInColumn: {
        value: function (index) {
            return element.all(by.css('.columns-box ir-file-explorer-column')).get(index).all(by.css('li'));
        }
    },

    itemInColumn: {
        value: function (columnIndex, itemIndex) {
            return element.all(by.css('.columns-box ir-file-explorer-column')).get(columnIndex).all(by.css('li')).get(itemIndex);
        }
    },

    getItemInColumnByText: {
        value: function (index, text) {
            return element.all(by.css('.columns-box  ir-file-explorer-column')).get(index).element(by.cssContainingText('li', text));
        }
    },

    getIconInColumnByText: {
        value: function (index, text) {
            return element.all(by.css('.columns-box ir-file-explorer-column')).get(index).element(by.cssContainingText('div', text)).element(by.css('i'));
        }
    },

    getSelectedItemInColumn: {
        value: function (index, text) {
            return element.all(by.css('.columns-box ir-file-explorer-column')).get(index).element(by.css('li.level-selected div'));
        }
    },

    getSelectedItemsInColumn: {
        value: function (index, text) {
            return element.all(by.css('.columns-box ir-file-explorer-column')).get(index).all(by.css('li.level-selected div'));
        }
    },

    docTypeInput: {
        get: function () {
            return element(by.css('#documentType input'));
        }
    },

    docTypeButton: {
        get: function () {
            return element(by.css("#documentType button"));
        }
    },

    docTypeDropdown: {
        get: function () {
            return element(by.css('#documentType'));
        }
    },

    docTypeDropdownList: {
        get: function () {
            return element(by.css("#documentType ul"));
        }
    },

    docTypeDropdownElements: {
        get: function () {
            return element.all(by.css('#documentType ul li a'));
        }
    },

    docTypeDropdownElement: {
        value: function (index) {
            return this.docTypeDropdownElements.get(index);
        }
    },

    getDocTypeDropdownElementByText: {
        value: function (text) {
            return element.all(by.cssContainingText('#documentType ul li a span', text)).get(0);
        }
    },

    informationMessage: {
        get: function () {
            return element(by.css('.explorer-type-default-msg span:not(.ng-hide)')).getText();
        }
    },

    fileNotFoundMessage: {
        get: function () {
            return element(by.css('span[ng-show="fileNoFound"]')).getText();
        }
    },

    withinFileText: {
        get: function () {
            return element(by.css('.explorer-find-label')).getText();
        }
    },

    find_Input: {
        get: function () {
            return element(by.css('.explorer-find-form input'));
        }
    },

    find_Dropdown: {
        get: function () {
            return element(by.css('.explorer-find-form ul'));
        }
    },

    find_DropdownElements: {
        get: function () {
            return element.all(by.css('.explorer-find-form ul li'));
        }
    },

    find_DropdownElement: {
        value: function (index) {
            return element.all(by.css('.explorer-find-form ul li')).get(index);
        }
    },

    find_ClearButton: {
        get: function () {
            return element(by.css('.explorer-find-clear'));
        }
    },

    find_ResultFileNumber: {
        value: function (index) {
            return element.all(by.css('.explorer-result-filename #fileNumber')).get(index);
        }
    },

    find_ResultFileName: {
        value: function (index) {
            return element.all(by.css('.explorer-result-filename #fileName')).get(index);
        }
    },

    find_ResultDrawer: {
        value: function (index) {
            return element.all(by.css('.explorer-result-attr:nth-child(2)')).get(index).getText();
        }
    },

    find_ResultType: {
        value: function (index) {
            return element.all(by.css('.explorer-result-attr:nth-child(4)')).get(index).getText();
        }
    },

    find_ResultItemByFileName: {
        value: function (fileName) {
            return element(by.cssContainingText('.explorer-result-filename #fileName', fileName));
        }
    },

    relatedFileIcon: {
        value: function (index) {
            return element.all(by.css('.icon-related-files')).get(index);
        }
    },

    newDocumentDropdown: {
        get: function () {
            return element(by.id('btnNewDoc'));
        }
    },

    newDocumentTypes: {
        get: function () {
            return element.all(by.css('.new-document li'));
        }
    },

    newDocumentDropdownElement: {
        value: function (index) {
            return element.all(by.css('.new-document li a span')).get(index);
        }
    },

    newDocumentTypeByText: {
        value: function (docType) {
            return element(by.cssContainingText('.new-document li a span', docType));
        }
    },

    newDocumentTypeLinkByText: {
        value: function (docType) {
            return element(by.cssContainingText('.new-document li a', docType));
        }
    },

    newlyCreatedDocument: {
        get: function () {
            return element(by.css('.document ir-editable-text-box input'));
        }
    },

    newlyCreatedDocumentColumn: {
        value: function () {

            function loop(i,count){
                return element.all(by.css('.columns-box ir-file-explorer-column')).get(i).element(by.css('.document ir-editable-text-box input')).isPresent()
                    .then(function (is) {
                        // console.log(i+' ============ '+is);
                        if(is){
                            // console.log('return '+(i+1));
                            return (function(){
                                return i+1;
                            })();
                        }else{
                            if(i++ === count){
                                return (function(){
                                    return null;
                                })();
                            }else{
                                // console.log(i+' +++++++++++++');
                                return loop(i,count);
                            }
                        }
                    });
            }

            return element.all(by.css('.columns-box ir-file-explorer-column')).count()
                .then(function (count) {
                    return loop(0,count);
                });
        }
    },

    newFolderDropdown: {
        get: function () {
            return element(by.id('btnNewFolder'));
        }
    },

    newFolderDropdownList: {
        get: function () {
            return element(by.xpath(".//ul[@id='newFolderMenu']"));
        }
    },

    newFolderTypes: {
        get: function () {
            return element.all(by.repeater('type in selections.selectedNode.foldersToCreate'));
        }
    },

    newFolderDropdownElement: {
        value: function (index) {
            return element.all(by.css('.new-folder li a span')).get(index);
        }
    },

    newFolderTypeByText: {
        value: function (folderType) {
            return element(by.cssContainingText('.new-folder li a span', folderType));
        }
    },

    newFolderTypeLinkByText: {
        value: function (folderType) {
            return element(by.cssContainingText('.new-folder li a', folderType));
        }
    },

    newFolderTypesByText: {
        value: function (folderType) {
            return element.all(by.cssContainingText('.new-folder li a span', folderType));
        }
    },

    newlyCreatedFolder: {
        get: function () {
            return element(by.css('.folder ir-editable-text-box input'));
        }
    },

    newlyCreatedFolderColumn: {
        value: function () {

            function loop(i,count){
                return element.all(by.css('.columns-box ir-file-explorer-column')).get(i).element(by.css('.folder ir-editable-text-box input')).isPresent()
                    .then(function (is) {
                        if(is){
                            return (function(){return i+1;})();
                        }else{
                            if(i++ === count){
                                return (function(){return null;})();
                            }else{
                                return loop(i,count);
                            }
                        }
                    });
            }

            return element.all(by.css('.columns-box ir-file-explorer-column')).count()
                .then(function (count) {
                    return loop(0,count);
                });
        }
    }
});

module.exports = MoveExplorer;

