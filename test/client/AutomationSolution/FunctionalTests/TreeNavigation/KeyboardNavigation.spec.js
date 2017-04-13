exports.tags = ['File_Navigation', 'File_Tree'];

//var mockBackend = require('../../lib/mockBackend.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var Filesview = require('../../PageObjects/FilesView.js');
var mockUtils = require('../../utils/mockUtils.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var dataBaseHelper = require('../../utils/dataBaseHelper.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var fileTree = new FileTree();
var filesArea = new Filesview();
var openFilesDropdown = new OpenFilesDropdown();
var recordHeader = new RecordHeader();

var fileName = 'KeyboardNavigation';
var folder1 = 'Folder1';
var folder2 = 'Folder2';
var folder2Document1 = 'F2D1';
var folder3 = 'Folder3';
var firstNodeInTree = 'Folder1';
var lastNodeInTree = 'Document1';

describe('Navigation via keyboard', function () {
    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                    navigationBar.searchIcon.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.sendKeys(fileName).then(function () {
                                searchPage.searchButton.click();
                            });
                        });
                    });
                });
            });
        });

        it('When the focus is on the root node of the tree and the user presses the UP arrow' +
                'the root node stays in focus and file view is displayed', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                browser.actions().sendKeys(protractor.Key.UP).perform().then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(fileName);
                    });
                });
            });
        });

        it('When the focus is on the last node of the tree and the user presses the DOWN arrow' +
                'the last node stays in focus and view stays the same', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(lastNodeInTree, 'document').then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(lastNodeInTree);
                        browser.actions().sendKeys(protractor.Key.DOWN).perform().then(function () {
                            filesArea.fileViewTitle.getText().then(function (title) {
                                expect(title).toContain(lastNodeInTree);
                            });
                        });
                    });
                });
            });
        });

        it('When the focus is on a node in the tree with a node above it and the user presses the UP arrow' +
                'the focus is moved, selected style is applied, and view updates to the node above', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(folder2, 'folder').then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(folder2);
                        browser.actions().sendKeys(protractor.Key.UP).perform().then(function () {
                            filesArea.fileViewTitle.getText().then(function (title) {
                                expect(title).toContain(folder1);
                            });
                        });
                    });
                });
            });
        });

        it('When the focus is on a node in the tree with a node below it and the user presses the DOWN arrow' +
                'the focus is moved, selected style is applied, and view updates to the node below', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(folder2, 'folder').then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(folder2);
                        browser.actions().sendKeys(protractor.Key.DOWN).perform().then(function () {
                            filesArea.fileViewTitle.getText().then(function (title) {
                                expect(title).toContain(folder3);
                            });
                        });
                    });
                });
            });
        });

        it('When the focus is on a node in the tree AND the node has children when the user presses the RIGHT arrow' +
                'the nodes children expand, view stays the same, focus stays on current node', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(folder2, 'folder').then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(folder2);
                        browser.actions().sendKeys(protractor.Key.RIGHT).perform().then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.documentByText(folder2Document1)).then(function () {
                                filesArea.fileViewTitle.getText().then(function (title) {
                                    expect(title).toContain(folder2);
                                });
                            });
                        });
                    });
                });
            });
        });

        it('When the focus is on a node in the tree that has been expanded and the user presses the RIGHT arrow' +
                'first node is in focus, selected style is applied, and view updates to view of the child,', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(folder2, 'folder').then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(folder2);
                        browser.actions().sendKeys(protractor.Key.RIGHT).perform().then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.documentByText(folder2Document1)).then(function () {
                                filesArea.fileViewTitle.getText().then(function (title) {
                                    expect(title).toContain(folder2);
                                    browser.actions().sendKeys(protractor.Key.RIGHT).perform().then(function () {
                                        filesArea.fileViewTitle.getText().then(function (title) {
                                            expect(title).toContain(folder2Document1);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('When the focus is on a node in the tree that has been expanded and the user presses the LEFT arrow' +
                'the nodes children are collapsed, focus stays on the current node', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(folder2, 'folder').then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(folder2);
                        browser.actions().sendKeys(protractor.Key.RIGHT).perform().then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.documentByText(folder2Document1)).then(function () {
                                browser.actions().sendKeys(protractor.Key.LEFT).perform().then(function () {
                                    webdriverUtils.waitTillNotPresent(fileTree.documentByText(folder2Document1)).then(function () {
                                        filesArea.fileViewTitle.getText().then(function (title) {
                                            expect(title).toContain(folder2);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('When the focus is on a node in the tree that has children collapsed and the user presses the LEFT arrow' +
                'the parent node of the child is focused, selected style is applied, and view updates to the parent nodes view', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(folder2, 'folder').then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(folder2);
                        browser.actions().sendKeys(protractor.Key.RIGHT).perform().then(function () {
                            filesArea.fileViewTitle.getText().then(function (title) {
                                expect(title).toContain(folder2);
                                browser.actions().sendKeys(protractor.Key.RIGHT).perform().then(function () {
                                    filesArea.fileViewTitle.getText().then(function (title) {
                                        expect(title).toContain(folder2Document1);
                                        webdriverUtils.waitTillElementVisible(fileTree.documentByText(folder2Document1)).then(function () {
                                            browser.actions().sendKeys(protractor.Key.LEFT).perform().then(function () {
                                                webdriverUtils.waitTillElementVisible(fileTree.documentByText(folder2Document1)).then(function () {
                                                    filesArea.fileViewTitle.getText().then(function (title) {
                                                        expect(title).toContain(folder2);
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

        it('When the focus in on a first level child of the file and the user presses the LEFT arrow' +
                'the file node is in focus, the view updates to the file view', function() {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                browser.actions().sendKeys(protractor.Key.RIGHT).perform().then(function () {
                    filesArea.fileViewTitle.getText().then(function (title) {
                        expect(title).toContain(firstNodeInTree);
                        webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                            browser.actions().sendKeys(protractor.Key.LEFT).perform().then(function () {
                                filesArea.fileViewTitle.getText().then(function (title) {
                                    expect(title).toContain(fileName);
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});
