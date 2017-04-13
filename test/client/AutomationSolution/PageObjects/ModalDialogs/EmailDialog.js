var EmailDialog = function () { };

EmailDialog.prototype = Object.create({}, {

    title: {
        value: function (titleVal) {
            return element(by.cssContainingText('.vf-modal-title', titleVal));
        }
    },

    cancelButton: {
        get: function () {
            return element.all(by.css('.vf-modal-footer button')).get(1);
        }
    },

    nextButton: {
        get: function () {
            return element.all(by.css('.vf-modal-footer button')).get(2);
        }
    },

    withAnnotationsCheckbox: {
        get: function () {
            return element(by.css('.modal-body label.fa[for="eattr"]'));
        }
    },

    isWithAnnotationsChecked: {
        get: function () {
            return element(by.css('#eattr')).getAttribute('checked');
        }
    },

    attachmentField: {
        get: function () {
            return element(by.css('input#pr4'));
        }
    },

    getEmailItem: {
        value: function (index) {
            return element.all(by.css('.ir-upload-item input')).get(index);
        }
    },

    getEmailItems: {
        value: function () {
            return element.all(by.css('.ir-upload-item input'));
        }
    },

    getEmailItemIcon: {
        value: function (index) {
            return element.all(by.css('.upload-icon i')).get(index);
        }
    },

    removeEmailItem: {
        value: function (index) {
            return element.all(by.css('button.close')).get(index);
        }
    },

    attachmentAttributesToogle: {
        get: function () {
            return element.all(by.css(".accordion-toggle")).get(0);
        }
    },

    filingOptionsToogle: {
        get: function () {
            return element.all(by.css(".accordion-toggle")).get(1);
        }
    },

    fileMessageCheckbox: {
        get: function () {
            return element(by.css('.modal-body label.fa[for="fem"]'));
        }
    },

    fileMessageCheckboxState: {
        get: function () {
            return element(by.css('#fem'));
        }
    },

    fileAttachmentCheckbox: {
        get: function () {
            return element(by.css('.modal-body label.fa[for="fea"]'));
        }
    },

    fileAttachmentCheckboxState: {
        get: function () {
            return element(by.css('#fea'));
        }
    },

    splitPdfCheckbox: {
        get: function () {
            return element(by.css('.modal-body label.fa[for="spl"]'));
        }
    },

    splitPdfCheckboxState: {
        get: function () {
            return element(by.css('#spl'));
        }
    },

    fileExplorerOverlay: {
        get: function () {
            return element(by.css('.explorer-column-overlay'));
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

    informationMessage: {
        get: function () {
            return element(by.css('.explorer-type-default-msg span:not(.ng-hide)')).getText();
        }
    },

    withinFileText: {
        get: function () {
            return element(by.css('.explorer-find-label')).getText();
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
            return element.all(by.css('#newFolderMenu li')).get(index).element(by.css('a span'));
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
            return element.all(by.cssContainingText('.new-folder li', folderType));
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
    }
});

module.exports = EmailDialog;