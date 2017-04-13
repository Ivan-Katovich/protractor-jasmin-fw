exports.tags = ['File_Manipulation', 'Actions'];

var SearchPage = require('../../PageObjects/SearchPage.js');
var Filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var MultiSelectView = require('./../../PageObjects/Containers/MultiSelectView.js');
var FileTree = require('../../PageObjects/Containers/FileTree.js');
var DocumentPageActionsDropdown = require('./../../PageObjects/DropdownLists/DocumentPageActionsDropdown.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var fileUtils = require('../../utils/fileUtils.js');
var ContextMenu = require('./../../PageObjects/DropdownLists/ContextMenu.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var DownloadDialog = require('./../../PageObjects/ModalDialogs/EmailDownloadPrintDialog.js');
var searchUtil = require('../../BusinessProcess/Search.js');

var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var filesArea = new Filesview();
var recordHeader = new RecordHeader();
var docPageActionsDropdown = new DocumentPageActionsDropdown();
var contextMenu = new ContextMenu();
var fileTree = new FileTree();
var multiSelectView = new MultiSelectView();
var downloadDialog = new DownloadDialog();

var filename = 'FileActions';
var folder1 = 'Folder1';
var document1 = 'F1D1';
var document2 = 'F1D2';


describe('File Actions Menu/Viewer', function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return fileUtils.unfreezeFile(filename)
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            })
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return searchUtil.openFile(filename);
            })
            .then(function () {
                return filesArea.createIcon.waitReady();
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder1, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document1, 'document');
            })
            .then(function () {
                return browser.waitForAngular();
            });
        });

        afterAll(function () {
            return fileUtils.unfreezeFile('FileActions');
        });

        it('1-when selecting/deselecting pages and documents, the view should display the multiselect view unless a page is the last clicked in which case it displays a page', function () {
            return webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page')
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton)
            })
            .then(function () {
                return expect(filesArea.pageActionsButton.isDisplayed()).toBe(true);
            })
            .then(function(){
                return webdriverUtils.ctrlClick(fileTree.pageByText('xls.xls'))
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton)
            })
            .then(function () {
                return expect(filesArea.pageActionsButton.isDisplayed()).toBe(true);
            })
            .then(function(){
                return webdriverUtils.ctrlClick(fileTree.documentByText(document1))
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton)
            })
            .then(function () {
                return expect(filesArea.actionsDropdownButton.isDisplayed()).toBe(true);
            })
            .then(function(){
                return webdriverUtils.ctrlClick(fileTree.pageByText('docx.docx'))
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                    return expect(filesArea.pageActionsButton.isDisplayed()).toBe(true);
                });
            });
        });

        it('2-With one non-html page selected, user should see choice of Move, Copy, Add Page, Email, Download, Print, Rename, and Copy Shortcut in the page actions menu', function () {
            return webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page')
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton)
            })
            .then(filesArea.pageActionsButton.click)
            .then(function () {
                expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).not.toContain('disabled');
                expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).toContain('disabled');
                expect(filesArea.actionsDropdownItemByText('Edit Description').getAttribute('class')).not.toContain('disabled');
                expect(filesArea.actionsDropdownItemByText('Copy Shortcut').getAttribute('class')).not.toContain('disabled');
            });
        });

        it('3-With one document selected, user should see choice of Move, Copy, Add Page, Email, Download, Print, Rename, and Copy Shortcut in doc actions menu', function () {
            webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                    filesArea.actionsDropdownButton.click().then(function () {
                        expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                        expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                        expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                        expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                        expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).not.toContain('disabled');
                        expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                        expect(filesArea.actionsDropdownItemByText('Edit Description').getAttribute('class')).not.toContain('disabled');
                        expect(filesArea.actionsDropdownItemByText('Copy Shortcut').getAttribute('class')).not.toContain('disabled');

                    });
                });
            });
        });

        /* todo; */
        xit('4-On right-click of collapsed document node, user should see choice of Expand, Move, Copy, Add Page, Email, Download, Print, Rename, and Copy Shortcut in context menu', function () {
            webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                var expectedArray = ['Expand', '', '', '', 'Copy', 'Move', 'Add Page', 'Rename', '', 'Print', 'Download', 'Email', 'Copy Shortcut'];
                var doc = fileTree.documentByText(document1);
                webdriverUtils.contextClick(doc).then(function () {
                    webdriverUtils.waitTillElementVisible(contextMenu.menuOptions).then(function () {
                        expect(contextMenu.menu.isDisplayed()).toBe(true);
                        contextMenu.menuOptions.getText().then(function (docOptions) {
                            console.log('doc options: ', docOptions);
                            expect(conversionUtils.isArraysIdentical(docOptions, expectedArray)).toBe(true);
                        });
                    });
                });
            });
        });

        /* todo; */
        xit('5-On right-click of expanded document node, user should see choice of Collapse, Move, Copy, Add Page, Email, Download, Print, Rename, and Copy Shortcut in context menu', function () {
            var expectedArray = ['Collapse', '', '', '', 'Copy', 'Move', 'Add Page', 'Rename', '', 'Print', 'Download', 'Email', 'Copy Shortcut'];
            var doc = fileTree.documentByText(document1);
            webdriverUtils.contextClick(doc).then(function () {
                webdriverUtils.waitTillElementVisible(contextMenu.menuOptions).then(function () {
                    expect(contextMenu.menu.isDisplayed()).toBe(true);
                    contextMenu.menuOptions.getText().then(function (docOptions) {
                        console.log('doc options: ', docOptions);
                        expect(conversionUtils.isArraysIdentical(docOptions, expectedArray)).toBe(true);
                    });
                });
            });
        });

        it('6-Clicking the expand/collapse option in the context menu on a document should toggle whether the docs child pages show', function () {
            var docToToggle = fileTree.documentByText(document1);
            webdriverUtils.contextClick(docToToggle).then(function () {
                webdriverUtils.waitTillElementVisible(contextMenu.expandCollapse).then(function () {
                    contextMenu.expandCollapse.click().then(function () {
                        browser.waitForAngular().then(function () {
                            expect(fileTree.pageByText('xls.xls').isPresent()).toBe(false);
                            webdriverUtils.contextClick(docToToggle).then(function () {
                                webdriverUtils.waitTillElementVisible(contextMenu.expandCollapse).then(function () {
                                    contextMenu.expandCollapse.click().then(function () {
                                        browser.waitForAngular().then(function () {
                                            expect(fileTree.pageByText('xls.xls').isPresent()).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('7-Clicking the expand/collapse option in the context menu on a folder should toggle whether the folders child documents show', function () {
            var folderToToggle = fileTree.folderByText(folder1);
            webdriverUtils.contextClick(folderToToggle).then(function () {
                webdriverUtils.waitTillElementVisible(contextMenu.expandCollapse).then(function () {
                    contextMenu.expandCollapse.click().then(function () {
                        expect(fileTree.documentByText(document1).isPresent()).toBe(false);
                        webdriverUtils.contextClick(folderToToggle).then(function () {
                            webdriverUtils.waitTillElementVisible(contextMenu.expandCollapse).then(function () {
                                contextMenu.expandCollapse.click().then(function () {
                                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                                });
                            });
                        });
                    });
                });
            });
        });
          
        it('8-After opening a context menu of a tree node, right-clicking outside of the tree should close the context menu', function () {
            var doc = fileTree.documentByText(document1);
            var searchIcon = navigationBar.searchIcon;
            webdriverUtils.contextClick(doc).then(function () {
                webdriverUtils.waitTillElementVisible(contextMenu.menuOptions).then(function () {
                    expect(contextMenu.copy.isDisplayed()).toBe(true);
                    webdriverUtils.contextClick(searchIcon).then(function () {
                        browser.sleep(1000).then(function () { //give time for fade out
                            expect(contextMenu.copy.isDisplayed()).toBe(false);
                        });
                    });
                });
            });
        });

        it('9-After opening a context menu of a tree node, pressing ESCAPE key should close the context menu', function () {
            var doc = fileTree.documentByText(document1);
            webdriverUtils.contextClick(doc).then(function () {
                webdriverUtils.waitTillElementVisible(contextMenu.menuOptions).then(function () {
                    expect(contextMenu.copy.isDisplayed()).toBe(true);
                    webdriverUtils.pressEscape().then(function() {
                        expect(contextMenu.copy.isDisplayed()).toBe(false);
                    });
                });
            });
        });

        it('10-After opening a context menu of a tree node, pressing the up arrow should navigate up the menu from the bottom', function () {
            var doc = fileTree.documentByText(document1);
            webdriverUtils.contextClick(doc).then(function () {
                webdriverUtils.waitTillElementVisible(contextMenu.menuOptions).then(function () {
                    webdriverUtils.pressUps(3).then(function () {
                        webdriverUtils.pressEnter().then(function () {
                            expect(downloadDialog.cancelButton.isDisplayed()).toBe(true);
                        });
                    });
                });
            });
        });

        it('11-With a document and one or more non-html child pages selected, all actions except Add Page should be available on both doc and page actions menu', function () {
            webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                webdriverUtils.ctrlClick(fileTree.pageByText('xls.xls')).then(function () {
                    webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                        filesArea.pageActionsButton.click().then(function () {
                            expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                            expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                            expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                            expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                            expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                            expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                            expect(filesArea.actionsDropdownItemByText('Edit Description').getAttribute('class')).not.toContain('disabled');

                            //doc actions menu
                            webdriverUtils.clickOnNodeInFileTree('xls.xls', 'page').then(function () {
                                webdriverUtils.ctrlClick(fileTree.documentByText(document1)).then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                                        filesArea.actionsDropdownButton.click().then(function () {
                                            expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Edit Description').getAttribute('class')).not.toContain('disabled');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        if (!(browser.browserName === 'internet explorer')) {

            /* todo; */
            xit('With 2 non-html pages from the same document selected, all actions except Add Page should be available in page actions dropdown', function () {
                webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page').then(function () {
                    webdriverUtils.ctrlClick(fileTree.pageByText('xls.xls')).then(function () {
                        webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                            filesArea.pageActionsButton.click().then(function () {
                                expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Rename').getAttribute('class')).not.toContain('disabled');
                            });
                        });
                    });
                });
            });

            xit('With 2 pages from different documents selected, all actions except Add Page should be available', function () {
                webdriverUtils.showNodeChildrenByText(document2, 'document').then(function () {
                    webdriverUtils.clickOnNodeInFileTree('pptx.pptx', 'page').then(function () {
                        webdriverUtils.ctrlClick(fileTree.pageByText('xlsx.xlsx')).then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                                filesArea.pageActionsButton.click().then(function () {
                                    expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                    expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                    expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                    expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                                    expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                    expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                    expect(filesArea.actionsDropdownItemByText('Rename').getAttribute('class')).not.toContain('disabled');
                                });
                            });
                        });
                    });
                });
            });

            xit('With 2 documents selected, all actions except Add Page should be available', function () {
                webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                    webdriverUtils.ctrlClick(fileTree.documentByText(document2)).then(function () {
                        webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                            filesArea.actionsDropdownButton.click().then(function () {
                                expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Rename').getAttribute('class')).not.toContain('disabled');
                            });
                        });
                    });
                });
            });

            xit('With a document and one or more non-html non-child pages selected, all actions except Add Page should be available', function () {
                webdriverUtils.clickOnNodeInFileTree(document2, 'document').then(function () {
                    webdriverUtils.ctrlClick(fileTree.pageByText('xlsx.xlsx')).then(function () {
                        webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                            filesArea.pageActionsButton.click().then(function () {
                                expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Rename').getAttribute('class')).not.toContain('disabled');

                                //doc actions menu
                                webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page').then(function () {
                                    webdriverUtils.ctrlClick(fileTree.documentByText(document2)).then(function () {
                                        webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                                            filesArea.actionsDropdownButton.click().then(function () {
                                                expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                                expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                                expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                                expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).not.toContain('disabled');
                                                expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                                expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                                expect(filesArea.actionsDropdownItemByText('Rename').getAttribute('class')).not.toContain('disabled');
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

            xit('If user selects a non-html page or doc in frozen (read-only) file, Move, Add Page, and Rename should be disabled in actions list', function () {
                fileUtils.freezeFile(filename, 'XP1');
                browser.waitForAngular().then(function () {
                    webdriverUtils.clickOnNodeInFileTree('xlsx', 'page').then(function () {
                        webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                            filesArea.pageActionsButton.click().then(function () {
                                expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                expect(filesArea.actionsDropdownItemByText('Rename').getAttribute('class')).toContain('disabled');

                                //single doc
                                webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                                        filesArea.actionsDropdownButton.click().then(function () {
                                            expect(filesArea.actionsDropdownItemByText('Email').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Download').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Move').getAttribute('class')).toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Copy').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Add Page').getAttribute('class')).toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Print').getAttribute('class')).not.toContain('disabled');
                                            expect(filesArea.actionsDropdownItemByText('Rename').getAttribute('class')).toContain('disabled');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    }
});
