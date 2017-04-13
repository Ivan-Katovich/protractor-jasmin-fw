exports.tags = ['Options', 'Shortcut_Keys'];
/// <reference path='../../pageObjects/DropdownLists/IR_OpenFilesDropdown.js' />
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    ReassignDialog = require('./../../PageObjects/ModalDialogs/ReassignDialog.js'),
    EmailDownloadPrintDialog = require('./../../PageObjects/ModalDialogs/EmailDownloadPrintDialog.js'),
    ToDoList = require('./../../PageObjects/LeftRail/ToDoList.js'),
    Diary = require('./../../PageObjects/LeftRail/DiaryList.js'),
    OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js'),
    CheckedOutFilesList = require('./../../PageObjects/LeftRail/CheckedOutFilesList.js'),
    FileTree = require('./../../PageObjects/Containers/FileTree.js'),
    SearchPage = require('../../PageObjects/SearchPage.js'),
    PrintDialog = require('./../../PageObjects/ModalDialogs/EmailDownloadPrintDialog.js'),
    AddDocModal = require('./../../PageObjects/ModalDialogs/AddDocModal.js'),
    DownloadDialog = require('./../../PageObjects/ModalDialogs/EmailDownloadPrintDialog.js'),
    RenameDialog = require('./../../PageObjects/ModalDialogs/RenameDialog.js'),
    RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js'),
    Filesview = require('../../PageObjects/FilesView.js'),
    MoveExplorer = require('./../../PageObjects/ModalDialogs/MoveExplorer.js'),
    DocumentPageActionsDropdown = require('./../../PageObjects/DropdownLists/DocumentPageActionsDropdown.js'),
    LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js'),
    ImportQueue = require('../../PageObjects/LeftRail/ImportQueue.js'),

    tasksUtils = require('../../utils/tasksUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    conversionUtils = require('../../utils/conversionUtils.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    searchUtil = require('../../BusinessProcess/Search.js'),
    helper = require('../../utils/helper.js'),
    // Q = require('q'),

    importQueue = new ImportQueue(),
    leftRailBar = new LeftRailBar(),
    navigationBar = new NavigationBar(),
    reassignDialog = new ReassignDialog(),
    emailDownloadPrintDialog = new EmailDownloadPrintDialog(),
    toDoList = new ToDoList(),
    diaryList = new Diary(),
    openFilesDropdown = new OpenFilesDropdown(),
    checkedOutFilesList = new CheckedOutFilesList(),
    fileTree = new FileTree(),
    searchPage = new SearchPage(),
    printDialog = new PrintDialog(),
    addDocModal = new AddDocModal(),
    downloadDialog = new DownloadDialog(),
    renameDialog = new RenameDialog(),
    recordHeader = new RecordHeader(),
    filesArea = new Filesview(),
    moveExplorer = new MoveExplorer(),
    docPageActionsDropdown = new DocumentPageActionsDropdown(),

    fileName = 'KeyboardShortcuts1',

    isFirst = true;

describe('Keyboard Shortcuts', function () {

    function restoreFileStructure() {
        return fileUtils.deleteDocumentByDescription(fileName, 'returnKeyTest');
    }

    function cancelCheckOut() {
        return filesArea.cancelCheckOutButton.click()
        .then(function () {
            return filesArea.okButton.waitReady();

        })
        .then(function () {
            return filesArea.okButton.click();
        });
    }

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            if(isFirst){
                isFirst = false;
                return restoreFileStructure()
                    .then(function () {
                        return browser.executeScript('window.localStorage.clear();');
                    })
                    .then(function () {
                        return browser.driver.get(browser.params.defaultUrl);
                    })
                    .then(function () {
                        return navigationBar.vertaforeLogo.waitReady();
                    });
            }else{
                return browser.driver.get(browser.params.defaultUrl)
                    .then(function () {
                        return navigationBar.vertaforeLogo.waitReady();
                    });
            }
        });

        afterEach(function () {
            return restoreFileStructure()
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            });
        });

        it('1-with a modal open, clicking the Escape key should close the modal', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return filesArea.createIcon.waitReady();
            })
            .then(filesArea.actionsDropdownButton.click)
            .then(filesArea.actionsDropdownItemByText('New Document').click)
            .then(function(){
                return addDocModal.finalizeAddDocument.waitReady();
            })
            .then(function(){
                return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
            })
            .then(function(){
                return browser.waitForAngular();
            })
            .then(function(){
                return expect(reassignDialog.reassignContainer.isPresent()).toBe(false);
            })
        });

        it('2-with a modal open and an element focused, pressing the Return key should select the element or act like clicking it', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return filesArea.createIcon.waitReady();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.fileViewNotesHeaderForOpenedFile();
            })
            .then(function (notesBefore) {
                filesArea.addNoteButton.click()
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.pressEnter();
                })
                .then(function () {
                    filesArea.fileViewNotesHeaderForOpenedFile().then(function (notesAfter) {
                        expect(notesBefore).toBe(notesAfter);
                    });
                });
            });
        });

        /* muted until protractor upgrade to version 3+, since tabs are not working anymore in current chromedriver version; */
        xit('3-should focus and highlight appropriate element in correct order when clicking Tab and then backwards when clicking shift+Tab', function () {
            return navigationBar.searchIcon.click()
            .then(function () {
                return webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox);
            })
            .then(function () {
                return searchPage.fileNameSearchBox.sendKeys('1');
            })
            .then(function () {
                return webdriverUtils.isElementFocused(searchPage.fileNameSearchBox);
            })
            .then(function () {
                return webdriverUtils.pressTab();
            })
            .then(function () {
                return webdriverUtils.isElementFocused(searchPage.fileNumberSearchBox);
            })
            .then(function () {
                return webdriverUtils.pressTab();
            })
            .then(function () {
                return webdriverUtils.isElementFocused(searchPage.drawerDropdown);
            })
            .then(function () {
                return webdriverUtils.pressTab();
            })
            .then(function () {
                return webdriverUtils.isElementFocused(searchPage.fileTypeDropdown);
            })
            .then(function () {
                return webdriverUtils.pressTab();
            })
            .then(function () {
                return webdriverUtils.isElementFocused(searchPage.fileMarkButton);
            })
            .then(function () {
                return webdriverUtils.pressTab();
            })
            .then(function () {
                return webdriverUtils.isElementFocused(searchPage.clearCriteriaButton);
            })
            .then(function () {
                return webdriverUtils.pressTab();
            })
            .then(function () {
                return webdriverUtils.isElementFocused(searchPage.searchButton);
            })
            .then(function () {
                webdriverUtils.shiftTab();
                webdriverUtils.isElementFocused(searchPage.clearCriteriaButton);
                webdriverUtils.shiftTab();
                webdriverUtils.isElementFocused(searchPage.fileMarkButton);
            });
        });

        it('4-when user presses D then I outside of a textbox or modal, Diary List should open and If already open, pressing D then I should close it', function () {
            return leftRailBar.toDoList.click()
            .then(function () {
                return browser.actions().sendKeys('di').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(diaryList.searchInput.isDisplayed()).toBe(true);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('di').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(diaryList.searchInput.isDisplayed()).toBe(false);
            });
        });

        it('5-when user presses T then D outside of a textbox or modal, ToDo List should open and If already open, pressing T then D should close it', function () {
            return leftRailBar.diaryList.click()
            .then(function () {
                return browser.actions().sendKeys('td').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(toDoList.searchInput.isDisplayed()).toBe(true);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('di').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(toDoList.searchInput.isDisplayed()).toBe(false);
            });
        });

        it('6-when user presses O then F outside of a textbox or modal, Open Files List should open and If already open, pressing O then F should close it', function () {
            return leftRailBar.diaryList.click()
            .then(function () {
                return browser.actions().sendKeys('of').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(openFilesDropdown.dropdownHeader.isDisplayed()).toBe(true);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('di').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(openFilesDropdown.dropdownHeader.isDisplayed()).toBe(false);
            });
        });

        it('7-when user presses I then B outside of a textbox or modal, Import Bin should open and If already open, pressing I then B should close it', function () {
            return leftRailBar.diaryList.click()
            .then(function () {
                return browser.actions().sendKeys('ib').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(importQueue.importAllCheckbox.isDisplayed()).toBe(true);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('di').perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(importQueue.importAllCheckbox.isDisplayed()).toBe(false);
            });
        });

        it('8-with the Open Files List open, user can navigate up and down the list with arrow keys and open a file  with Enter key and close a file pressing C then L', function () {
            return searchUtil.openFile(fileName)
            .then(function(){
                return searchUtil.reopenFile('KeyboardShortcuts2');
            })
            .then(function(){
                return searchUtil.reopenFile('KeyboardShortcuts3');
            })
            .then(function(){
                return searchUtil.reopenFile('KeyboardShortcuts4');
            })
            .then(leftRailBar.diaryList.click)
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(openFilesDropdown.openFileRecord(1));
            })
            .then(function () {
                return browser.actions().sendKeys(protractor.Key.DOWN).perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.pressEnter();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return recordHeader.fileNameRecordHeader.getText();
            })
            .then(function (fileName) {
                return expect(fileName).toBe('KeyboardShortcuts3');
            })
            .then(function () {
                return browser.actions().sendKeys('cl').perform();
            })
            .then(function () {
                return openFilesDropdown.fileName(0).getText();
            })
            .then(function (openedFileNames) {
                return expect(openedFileNames).toBe('KeyboardShortcuts4');
            });
        });

        //need to update environment with webdav
        xit('9-if user presses down past all open files in open files list, he can then navigate the checked out files list and press Enter to open in viewer', function () {
            var pageText;
            return searchUtil.openFile('webdav')
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('webdav tests', 'document')
            })
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return checkedOutFilesList.getFileList.get(0).element(by.css('.open-file-name')).getText();
            })
            .then(function (text) {
                pageText = text;
                console.log(text);
                return browser.actions().sendKeys(protractor.Key.DOWN).perform();
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(fileTree.fileTreeNodesByText(pageText).get(0).element(by.xpath('.//..')).getAttribute('class')).not.toContain('doc-selected');
            })
            .then(function () {
                return webdriverUtils.pressEnter();
            })
            .then(function () {
                return expect(fileTree.fileTreeNodesByText(pageText).get(0).element(by.xpath('.//..')).getAttribute('class')).toContain('doc-selected');
            });
        });

        it('10-with a page in view, when user presses E then M outside of a textbox or modal, The Email Document modal should open should open', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('cat.jpg');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('em').perform();
            })
            .then(function () {
                return expect(emailDownloadPrintDialog.title('Email Set Up').isDisplayed()).toBe(true);
            });
        });

        it('11-with a page in view, when user presses M then V, the Move Dialog should open', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('cat.jpg');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('mv').perform();
            })
            .then(function () {
                return expect(moveExplorer.title('Move 1 page').isDisplayed()).toBe(true);
            });
        });

        it('12-with a page in view, when user presses C then P, the Copy Dialog should open', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('cat.jpg');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('cp').perform();
            })
            .then(function () {
                return expect(moveExplorer.title('Copy 1 page').isDisplayed()).toBe(true);
            });
        });

        it('13-with a page in view, when user presses E then D, the Rename Page Dialog should open', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('cat.jpg');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('ed').perform();
            })
            .then(function () {
                return expect(renameDialog.renameContainer.isPresent()).toBe(true);
            });
        });

        it('14-with a page in view, when user presses D then W, the Download Dialog should open', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('cat.jpg');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('dw').perform();
            })
            .then(function () {
                return expect(downloadDialog.title('Download Set Up').isDisplayed()).toBe(true);
            });
        });

        it('15-With a page in view, when user presses P then R, the Print Dialog should open', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('cat.jpg');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return browser.actions().sendKeys('pr').perform();
            })
            .then(function () {
                return expect(printDialog.title('Print Set Up').isDisplayed()).toBe(true);
            });
        });

        it('16 - When user is inside of a modal, shortcuts should not work', function () {
            return searchUtil.openFile(fileName)
            .then(filesArea.actionsDropdownButton.click)
            .then(docPageActionsDropdown.newDocumentAction.click)
            .then(function () {
                return addDocModal.finalizeAddDocument.waitReady();
            })
            .then(function () {
                return browser.actions().sendKeys('di').perform();
            })
            .then(function () {
                return browser.sleep(1000);
            })
            .then(function () {
                return expect(diaryList.searchInput.isDisplayed()).toBe(false);
            })
            .then(function () {
                return browser.actions().sendKeys('of').perform();
            })
            .then(function () {
                return browser.sleep(1000);
            })
            .then(function () {
                return expect(openFilesDropdown.dropdownHeader.isDisplayed()).toBe(false);
            })
            .then(function () {
                return browser.actions().sendKeys('ib').perform();
            })
            .then(function () {
                return browser.sleep(1000);
            })
            .then(function () {
                return expect(importQueue.importAllCheckbox.isDisplayed()).toBe(false);
            });
        });

        it('17 - When user has an HTML page in the viewer, zoom functionality should be disabled', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return filesArea.createIcon.waitReady();
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1'));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('html.html'));
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('html.html');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(filesArea.iframeInFilesView.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.zoomControllerElement.getAttribute('class');
            })
            .then(function (zoomClass) {
                return expect(zoomClass).toContain('disabled');
            });
        });

        it('18 - When user has an HTML page in the viewer and focus is on the viewer, keyboard shortcuts should not work but mouse clicking page actions should work', function () {
            return searchUtil.openFile(fileName)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('F1D1', 'document')
            })
            .then(function () {
                return webdriverUtils.selectNodeIconByText('html.html')
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(filesArea.iframeInFilesView.click)
            .then(function () {
                return browser.actions().sendKeys('cp').perform();
            })
            .then(function () {
                return browser.sleep(1000);
            })
            .then(function () {
                return expect(moveExplorer.title('Copy 1 page').isPresent()).toBe(false);
            })
            .then(function () {
                return browser.actions().sendKeys('of').perform();
            })
            .then(function () {
                return browser.sleep(1000);
            })
            .then(function () {
                return expect(openFilesDropdown.dropdownHeader.isDisplayed()).toBe(false);
            })
            .then(function () {
                return browser.actions().sendKeys('mv').perform();
            })
            .then(function () {
                return browser.sleep(1000);
            })
            .then(function () {
                return expect(moveExplorer.title('Move 1 page').isPresent()).toBe(false);
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.copyAction.click)
            .then(function () {
                return expect(moveExplorer.title('Copy 1 page').isDisplayed()).toBe(true);
            })
            .then(moveExplorer.cancelButton.click)
        });
    }
});
