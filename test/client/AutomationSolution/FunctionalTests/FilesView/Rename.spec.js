exports.tags = ['File_Manipulation', 'Rename'];
var SearchPage = require('../../pageObjects/SearchPage.js');
var Filesview = require('../../pageObjects/FilesView.js');
var NavigationBar = require('./../../pageObjects/Containers/NavigationBar.js');
var RecordHeader = require('./../../pageObjects/Containers/RecordHeader.js');
var MultiSelectView = require('./../../pageObjects/Containers/MultiSelectView.js');
var RenameDialog = require('./../../pageObjects/ModalDialogs/RenameDialog.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var FileTree = require('../../pageObjects/Containers/FileTree.js');
var DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js');
var fileUtils = require('../../utils/fileUtils.js');

var docPageActionsDropdown = new DocumentPageActionsDropdown();
var fileTree = new FileTree();
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var filesArea = new Filesview();
var recordHeader = new RecordHeader();
var multiSelectView = new MultiSelectView();
var renameDialog = new RenameDialog();

var fileName = 'FilesViewRname';
var folder1 = 'Folder1';
var document1 = 'F1D1';
var document2 = 'F1D2';
var document3 = 'F1D3';
var document4 = 'F1D4';

if (browser.params.siteBase == 'iis') {
    describe('Rename Docs and Pages', function () {

        function prepareTest() {
            fileUtils.changePageDescription(83202, 'page1ForRename');
            fileUtils.changePageDescription(83203, 'page2ForRename');
            fileUtils.changeDocumentDescription(22550, '1 Miscellaneous');
            fileUtils.changeDocumentDescription(19115, '2 Miscellaneous');

            browser.driver.get(browser.params.defaultUrl);
            browser.waitForAngular();
            return webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                navigationBar.searchIcon.click().then(function () {
                    webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox);//.then(function () {
                    searchPage.fileNameSearchBox.sendKeys(fileName).then(function () {
                        searchPage.searchButton.click();
                        browser.waitForAngular();
                    });
                });
            });
        }

        afterAll(function () { //make sure page names are properly returned to original
            fileUtils.changeDocumentDescription(28584, "F1D1");
            fileUtils.changeDocumentDescription(28585, "F1D2");
        });

        function renameDoc(newName) {
            return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                filesArea.actionsDropdownButton.click().then(function () {
                    docPageActionsDropdown.renameAction.click().then(function () {
                        webdriverUtils.waitTillElementVisible(renameDialog.newNameInput).then(function () {
                            renameDialog.newNameInput.sendKeys(newName).then(function () {
                                renameDialog.okButton.click();
                            });
                        });
                    });
                });
            });
        }

        function renamePage(newName) {
            return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                filesArea.pageActionsButton.click().then(function () {
                    docPageActionsDropdown.renameAction.click().then(function () {
                        webdriverUtils.waitTillElementVisible(renameDialog.newNameInput).then(function () {
                            renameDialog.newNameInput.sendKeys(newName).then(function () {
                                renameDialog.okButton.click();
                            });
                        });
                    });
                });
            });
        }


        it('With one or more documents selected, selecting "Rename" from the actions dropdown should open a Rename Document modal', function () {
            prepareTest().then(function () {
                browser.waitForAngular().then(function () {
                    webdriverUtils.waitTillElementPresent(fileTree.fileNumber).then(function () {
                        webdriverUtils.showNodeChildrenByText(folder1, 'folder').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                                webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                                    filesArea.actionsDropdownButton.click().then(function () {
                                        docPageActionsDropdown.renameAction.click().then(function () {
                                            browser.waitForAngular();
                                            expect(renameDialog.renameContainer.isPresent()).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('After typing a new name, pressing the cancel button allows the doc name(s) to remain unaltered', function () {
            webdriverUtils.waitTillElementVisible(renameDialog.newNameInput).then(function () {
                renameDialog.newNameInput.sendKeys('newDocumentName').then(function () {
                    renameDialog.cancelButton.click().then(function () {
                        expect(renameDialog.renameContainer.isPresent()).toBe(false);
                        expect(fileTree.documentsInFileTree.getText()).not.toContain('newDocumentName');
                    });
                });
            });
        });

        if (browser.browserName == 'chrome') { //multiselect in automation only works in chrome
            it('A user can rename multiple documents at the same time using the Rename Action', function () {
                webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () { //select 11/15/13 2 Miscellaneous
                    webdriverUtils.ctrlClick(fileTree.documentByText(document2)).then(function () {
                        renameDoc('newDocumentName2').then(function () {
                            expect(fileTree.fileTreeNodesByText('newDocumentName2').count()).toBe(2);

                            webdriverUtils.waitTillElementVisible(fileTree.documentByText('12/9/2015')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('12/9/2015', 'document').then(function () {
                                    renameDoc('F1D2').then(function () {
                                        expect(fileTree.documentsInFileTree.getText()).toContain('12/9/2015 F1D2');

                                        webdriverUtils.waitTillElementVisible(fileTree.documentByText('12/8/2015')).then(function () {
                                            webdriverUtils.clickOnNodeInFileTree('12/8/2015', 'document').then(function () {
                                                renameDoc('F1D1').then(function () {
                                                    expect(fileTree.documentsInFileTree.getText()).toContain('12/8/2015 F1D1');
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

            it('A user can rename a single document using the Rename action', function () {
                webdriverUtils.waitTillElementVisible(fileTree.documentByText(document3)).then(function () {
                    webdriverUtils.clickOnNodeInFileTree(document3, 'document').then(function () {
                        renameDoc('1 Miscellaneous').then(function () {
                            expect(fileTree.documentsInFileTree.getText()).toContain('12/10/2015 1 Miscellaneous');
                            webdriverUtils.clickOnNodeInFileTree('12/10/2015 1 Miscellaneous', 'document').then(function () {
                                renameDoc('F1D3').then(function () {
                                    expect(fileTree.documentsInFileTree.getText()).not.toContain('newDocumentName2');
                                });
                            });
                        });
                    });
                });
            });
        }

        it('With one or more pages selected, the page view should display a "Rename" action button in the pane which opens a Rename Page modal', function () {
            prepareTest();
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folder1, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document3)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document3, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('page1ForRename')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('page1ForRename', 'page').then(function () {
                                    filesArea.pageActionsButton.click().then(function () {
                                        docPageActionsDropdown.renameAction.click().then(function () {
                                            expect(renameDialog.renameContainer.isPresent()).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('After typing a new name, pressing the cancel button allows the page name(s) to remain unaltered', function () {
            webdriverUtils.waitTillElementVisible(renameDialog.newNameInput).then(function () {
                renameDialog.newNameInput.sendKeys('newPageName').then(function () {
                    renameDialog.cancelButton.click().then(function () {
                        expect(renameDialog.renameContainer.isPresent()).toBe(false);
                        expect(fileTree.pagesInFileTree.getText()).not.toContain('newPageName');
                    });
                });
            });
        });

        if (browser.browserName == 'chrome') { //multiselect in automation only works in chrome

            it('A user can rename multiple pages at the same time using the Rename Action', function () {
                webdriverUtils.clickOnNodeInFileTree('page1ForRename', 'page').then(function () {
                    webdriverUtils.ctrlClick(fileTree.pageByText('page2ForRename')).then(function () {
                        renamePage('newPageName1').then(function () {
                            expect(fileTree.fileTreeNodesByText('newPageName1').count()).toBe(2);
                        });
                    });
                });
            });

            it('A user can rename a single page using the Rename action', function () {
                webdriverUtils.clickOnNodeInFileTree('1:', 'page').then(function () {
                    renamePage('page1ForRename').then(function () {
                        webdriverUtils.clickOnNodeInFileTree('2:', 'page').then(function () {
                            renamePage('page2ForRename').then(function () {
                                expect(fileTree.pagesInFileTree.getText()).not.toContain('newPageName2');
                            });
                        });
                    });
                });
            });

            it('A user can rename a document and one or more of its child pages at once', function () {
                prepareTest();
                webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                    webdriverUtils.showNodeChildrenByText(folder1, 'folder').then(function () {
                        webdriverUtils.waitTillElementVisible(fileTree.documentByText(document3)).then(function () {
                            webdriverUtils.showNodeChildrenByText(document3, 'document').then(function () {
                                webdriverUtils.waitTillElementVisible(fileTree.pageByText('page1ForRename')).then(function () {
                                    webdriverUtils.clickOnNodeInFileTree('page1ForRename', 'page').then(function () {
                                        webdriverUtils.ctrlClick(fileTree.documentByText(document3)).then(function () {
                                            renameDoc('pageAndParentDoc').then(function () {
                                                expect(fileTree.documentsInFileTree.getText()).toContain('12/10/2015 pageAndParentDoc');
                                                expect(fileTree.pagesInFileTree.getText()).toContain('1: pageAndParentDoc');
                                                webdriverUtils.clickOnNodeInFileTree('12/10/2015 pageAndParentDoc', 'document').then(function () {
                                                    renameDoc('F1D3').then(function () {
                                                        expect(fileTree.documentsInFileTree.getText()).toContain('12/10/2015 F1D3');
                                                        webdriverUtils.clickOnNodeInFileTree('pageAndParentDoc', 'page').then(function () {
                                                            renamePage('page1ForRename');
                                                            expect(fileTree.pagesInFileTree.getText()).toContain('1: page1ForRename');
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

            it('A user can rename a document and one or more of its non-child page at once', function () {
                prepareTest();
                webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                    webdriverUtils.showNodeChildrenByText(folder1, 'folder').then(function () {
                        webdriverUtils.waitTillElementVisible(fileTree.documentByText(document3)).then(function () {
                            webdriverUtils.showNodeChildrenByText(document3, 'document').then(function () {
                                webdriverUtils.waitTillElementVisible(fileTree.documentByText(document4)).then(function () {
                                    webdriverUtils.clickOnNodeInFileTree(document4, 'document').then(function () {
                                        webdriverUtils.waitTillElementVisible(fileTree.pageByText('page1ForRename')).then(function () {
                                            webdriverUtils.ctrlClick(fileTree.pageByText('page1ForRename')).then(function () {
                                                renamePage('testDocAndNonChildPageRename').then(function () {
                                                    expect(fileTree.documentsInFileTree.getText()).toContain('12/11/2015 testDocAndNonChildPageRename');
                                                    expect(fileTree.pagesInFileTree.getText()).toContain('1: testDocAndNonChildPageRename');
                                                    webdriverUtils.clickOnNodeInFileTree('12/11/2015 testDocAndNonChildPageRename', 'document').then(function () {
                                                        renameDoc('F1D4').then(function () {
                                                            webdriverUtils.clickOnNodeInFileTree('1: testDocAndNonChildPageRename', 'page').then(function () {
                                                                renamePage('page1ForRename').then(function () {
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    });
}