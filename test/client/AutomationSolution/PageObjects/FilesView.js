var FilesView = function () { };

var activeFile = $('.vf-tab-pane.active'),
    fileNoteHeader = activeFile.$('.file-notes-area').all(by.css('.file-notes-header')).get(1);

FilesView.prototype = Object.create({}, {

    //Below function returns the file title displayed right after information symbol
    fileViewHeader: {
        get: function() {
            return activeFile.$('.file-title');
        }
    },

    fileAreaBriefCaseIcon: {
        get: function() {
            return activeFile.$('.file-level-wrapper').$('.file-level-area').$('.fa-briefcase');
        }
    },

    //The title of the file in Viewer area
    fileViewTitle: {
        get: function() {
            return activeFile.$('.file-title-area');
        }
    },

    folderViewSymbol: {
        get: function() {
            return activeFile.$('.file-level-wrapper').$('.file-level-area').$('.fa-folder-open');
        }
    },

    fileViewActions: {
        get: function() {
            return activeFile.$('.file-actions').$('.pull-left').all(by.tagName('i'));
        }
    },

    //3 columns button
    thumNailViewButton: {
        get: function() {
            return activeFile.$('.col3-view');
        }
    },

    //1 column button
    singleColumnViewButton: {
        get: function() {
            return activeFile.$('.col1-view');
        }
    },

    thumbNailView: {
        get: function() {
            return activeFile.$('.thumb-view');
        }
    },

    singleColumnView: {
        get: function() {
            return activeFile.$('.frame-cols');
        }
    },

    framesInThumNailView: {
        get: function() {
            return activeFile.$('.thumb-view').all(by.tagName('img'));
        }
    },

    framesIn1ColumnView: {
        get: function() {
            return activeFile.$('.frame-cols').all(by.tagName('img'));
        }
    },

    iframeInFilesView: {
        get: function() {
            return element(by.css('iframe[id*="sandboxViewer"]'));
        }
    },

    //returns the Zoom IN button element
    zoomIn: {
        value: function() {
            return activeFile.$('.file-page-zoomer').$('.fa-search-plus');
        }
    },

    zoomControllerElement: {
        get: function() {
            return activeFile.$('.file-page-zoomer');
        }
    },

    zoomInButtonElement: {
        get: function() {
            return activeFile.$('.file-page-zoomer').$('.fa-search-plus').element(by.xpath('..'));
        }
    },

    //returns the Zoom out button element
    zoomOut: {
        value: function() {
            return activeFile.$('.file-page-zoomer').$('.fa-search-minus');
        }
    },

    zoomOutButtonElement: {
        get: function() {
            return activeFile.$('.file-page-zoomer').$('.fa-search-minus').element(by.xpath('..'));
        }
    },

    //reuturns the input box element for zoom 
    zoomInputField: {
        get: function() {
            return activeFile.$('.file-page-zoomer').$('.page-zoom-value');
        }
    },

    //returns the zoom value
    zoomValue: {
        value: function() {
            return  $('.vf-tab-pane.active').$('.file-page-zoomer').$('.page-zoom-value').getAttribute('value');
        }
    },

    //returns the frame number field object --which is inside the viewer
    frameInputField: {
        get: function() {
            return activeFile.$('.focused-frame-mode').$('.page-counter-input');
        }
    },

    //returns the total frame number field value --which is inside the viewer--the return value will be like 'of 5 frames' so to get the value you will have to manipulate the string
    numberOfFrames: {
        value: function() {
            return activeFile.$('.focused-frame-mode').getText();
        }
    },

    multiFrameComponentRow: {
        get: function() {
            return activeFile.$('.focused-frame-mode');
        }
    },

    //returns the frame number input element--which is outside the viewer --this is about imageRight page input field
    pageNumberInput: {
        get: function () {
            return element(by.model('page.number'));
        }
    },

    //returns  total number of frames element with (of number) text
    totalNumberOfPages: {
        value: function() {
            return activeFile.$('.file-page-counter');
        }
    },

    //returns the right  page button object---imageright page
    nextPageButton: {
        get: function() {
            return activeFile.$('.file-page-counter').$('.action-nx-page');
        }
    },

    //returns the left page  button object----imageright page
    previousPageButton: {
        get: function() {
            return element(by.css('button[ng-click="prevPage()"]'));
        }
    },

    //filemarks colors of the file view area---by getting 'style' attribute--you get information for background color
    fileMarksColorsOfFileViewArea: {
        get: function() {
            return activeFile.$('.file-level-wrapper').$('.file-marks-area').all(by.css('.fm'));
        }
    },

    //Icon file marks of the file view area -- by getting getText() function --you can get information of the icon
    fileMarksIconsOfFileViewArea: {
        get: function() {
            return activeFile.$('.file-level-wrapper').$('.file-marks-area').all(by.repeater('cell in row.cells'));
        }
    },

    //file view notes header
    fileViewNotesHeaderForOpenedFile: {
        value: function() {
            return fileNoteHeader.getText();
        }
    },

    notesHeaderForKeyboardTest: {
        get: function () {
            return element(by.css('.file-notes-area .file-notes-header'));
        }
    },

    //returns a list of all the notes --- this will return file/folder notes
    fileViewAllNotesText: {
        get: function() {
            return activeFile.$('.file-notes-area').$('.file-notes-content').all(by.css('.file-notes-text'));
        }
    },

    noNotesMessage: {
        get: function () {
            return activeFile.$('.file-notes-label').getText();
        }
    },

    fileViewRawNotes: {
        get: function() {
            return activeFile.$('.file-notes-area').$('.file-notes-content');
        }
    },

    //returns the date and the user of the added note
    dateAndUserOfAddedNote: {
        value: function(index) {
            return element.all(by.css('.file-notes-list .file-notes-title')).get(index).getText();
        }
    },

    //Returns file attributes information  symbol
    informationSymbol: {
        get: function() {
            return activeFile.$('.file-view-actions').$('.action-file-attr');
        }
    },

    scrollabilityClassOfInformationPopup: {
        value: function() {
            return activeFile.$('.file-view-actions').$('.doc-attr-body').$('.attr-box-inner').isDisplayed();
        }
    },

    //returns the information symbol pop-up header element
    informationPopUpHeader: {
        get: function() {
            return activeFile.$('.file-view-actions').$('.dropdown-menu').$('.dropdown-header');
        }
    },

    //Below function returns a list of attributes displayed in the information symbol pop-up--this function is only used to get the count for attributes
    informationSymbolAttrLists: {
        get: function() {
            return activeFile.$('.file-view-actions').$('.doc-attr-body').$('.file-attr-list').all(by.tagName('li'));
        }
    },

    //returns the all the names of the attributes inside information symbol pop-up
    informationPopUpAttrNames: {
        get: function() {
            return activeFile.$('.file-view-actions').$('.doc-attr-body').all(by.css('.file-attr-name'));
        }
    },

    //returns the all the values  of the attributes inside information symbol pop-up
    informationPopUpAttrValues: {
        get: function() {
            return activeFile.$('.file-view-actions').$('.doc-attr-body').all(by.css('.file-attr-value'));
        }
    },

    informationPopUpPageAttr:{
        get: function() {
            return element.all(by.css('.doc-attr-body')).get(1);
        }
    },

    //returns the 'NEW FOLDER' button object
    newFolderButton: {
        get: function() {
            return activeFile.$('.file-level-wrapper').$('.file-level-buttons').element(by.tagName("ir-add-folder")).element(by.tagName('button'));
          }
    },

    //returns the 'NEW DOCUMENT' button object
    newDocumentButton: {
        get: function() {
            return activeFile.$('.file-level-wrapper').$('.file-level-buttons').element(by.tagName("ir-add-add-document")).element(by.tagName('button'));
        }
    },

    pageActionsButton: {
        get: function () {
            return element.all(by.css('.vf-tab-pane.active .file-actions .page-toolbar-dropdown button .fa-cog')).filter(function (elems) {
                return elems.isDisplayed();
            }).first();
        }
    },

    actionsGear: {
        value: function (fileId) {
            return element(by.id('actions-gear-' + fileId));
        }
    },

    createTaskDiaryButtonPageLevel: {
        value: function (fileId) {
            return element(by.id('task-diary-button-page-' + fileId));
        }
    },

    createTaskDiaryButtonFileFolderDocumentLevel: {
        value: function (fileId) {
            return element(by.id('task-diary-button-file-folder-document-' + fileId));
        }
    },

    actionsDropdownButton: {
        get: function () {
            return activeFile.all(by.css('.multi-select-actions .dropdown-toggle')).get(0);
        }
    },

    actionsDropdownItemByText: {
        value: function (text) {
            return element.all(by.cssContainingText('.vf-tab-pane.active .dropdown-menu li', text)).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
        }
    },

    annotationButtonsContainer: {
        value: function (fileId) {
            return element(by.id('annotation-buttons-' + fileId));
        }
    },

    toggleShowAnnotations: {
        value: function (fileId) {
            return element(by.id("display-annotation-button-" + fileId));
        }
    },

    editAnnotationIconButton: {
        get: function() {
            return activeFile.$('.fa-pencil-square-o').element(by.xpath('..'));
        }
    },

    //returns  the edit annotation icon object
    editAnnotationIcon: {
        get: function() {
            return activeFile.$('.fa-pencil-square-o');
        }
    },

    customStampFooterElement: {
        get: function() {
            return browser.driver.findElement(by.className('stamp-flyout-footer'));
        }
    },

    customStampScrollability: {
        value: function() {
            return browser.driver.findElement(by.className('stamp-list-box')).findElement(by.className('list-box-inner')).isDisplayed();
        }
    },

    //return  me specific id of icon element based on parameter
    annotationIcon: {
        value: function(iconName) {
            //since this is not angular page--we are using selenium API
            return browser.driver.findElement(by.id(iconName));
        }
    },

    addNoteButton: {
        get: function() {
            return element(by.css('.action-add-note'));
        }
    },

    isAddNoteButtonDisplayed: {
        get: function() {
            return element.all(by.css('.action-add-note')).count > 0;
        }
    },

    noteEditor: {
        get: function() {
            return element(by.css(".cke_editable.cke_editable_themed.cke_contents_ltr"));
        }
    },

    createIcon: {
        get: function() {
            return activeFile.$('button[title="Create"]');
        }
    },

    pageName: {
        get: function() {
            return activeFile.element(by.xpath("html/body/div[2]/div/div[1]/div/div[3]/div/input"));
        }
    },

    checkOutButton: {
        get: function() {
            return activeFile.element(by.css('[ng-click="checkOut()"]'));
        }
    },

    checkInButton: {
        get: function() {
            return activeFile.element(by.css('[ng-click="checkIn()"]'));
        }
    },

    cancelCheckOutButton: {
        get: function() {
            return activeFile.element(by.css('[ng-click="cancelCheckOut()"]'));
        }
    },

    verifyCancelButton: {
        get: function() {
            return element(by.css("#btnOk"));
        }
    },

    viewOnlyButton: {
        get:function() {
            return activeFile.element(by.css('[ng-click="viewOnly()"]'));
        }
    },

    officeIcon: {
        get:function() {
            return element(by.css('i[ng-class="viewSubMode.icon"]'));
        }
    },

    openButton: {
        get: function () {
            return activeFile.element(by.css('[ng-click="open(file.selectedNode.webDavUrl)"]'));
        }
    },

    cancelCheckOutHeader: {
        get: function() {
            return $('.modal-content').$('.vf-modal-header').$('.vf-modal-title');
        }
    },

    cancelCheckOutMessageContents: {
        get: function () {
            return $('.modal-content').$('.modal-body').$('.notification-text');
        }
    },

    okButton: {
        get:function() {
            return element(by.css('#btnOk'));//$('.modal-content').element(by.buttonText("OK"));
        }
    },

    documentType: {
        get: function () {
            return activeFile.all(by.css('.doc-attr-value')).get(0).getText();
        }
    },

    pageCount: {
        get: function () {
            return activeFile.all(by.css('.doc-attr-value')).get(1).getText();
        }
    },

    fileViewingActionsPageLevel: {
        value: function (fileId) {
            return element(by.id('ir-file-viewing-actions-page-level-' + fileId));
        }
    }
});

module.exports = FilesView;