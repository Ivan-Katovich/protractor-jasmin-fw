exports.tags = ['File_Navigation', 'File_Tree'];

var RecordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var Filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var FileTree = require('./../../pageObjects/Containers/FileTree.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var searchUtil = require('../../BusinessProcess/Search.js');

var leftRailBar = new LeftRailBar();
var openFilesDropdown = new OpenFilesDropdown();
var fileTree = new FileTree();
var recordHeader = new RecordHeaderElement();
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var filesArea = new Filesview();

var file = 'TrueTree';
var folder = 'Folder1';
var document = 'F1D1';
var page = 'cat.jpg';
var descr = '1: cat.jpg';

describe('True tree basic tests', function () {

    beforeEach(function () {
        return browser.executeScript('window.localStorage.clear();')
        .then(function () {
            return browser.driver.get(browser.params.defaultUrl);
        })
        .then(function () {
            return browser.waitForAngular();
        })
        .then(function () {
            return searchUtil.openFile(file);
        })
        .then(function () {
            return filesArea.createIcon.waitReady();
        });
    });

    if (browser.params.siteBase == 'iis') {

        it('1-when a user clicks the arrow icon on a node with children that has not previously been expanded; the file tree expands', function () {
            return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document));
            })
            .then(function () {
                return fileTree.documentByText(document).getText();
            })
            .then(function (childText) {
                return expect(childText).toContain(document);
            });
        });

        it('2-when a user clicks the arrow icon on a node with children that has previously been expanded; the file tree colapses ', function () {
            return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(fileTree.documentByText(document).isPresent()).toBe(false);
            });
        });

        it('3-upon expanding/collapsing a node with expandable/collapsable children, the exapnd/collapse state of the children will be maintained', function () {
            return webdriverUtils.showNodeChildrenByText(folder, 'folder')
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document, 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText(page));
            })
            .then(function () {
                return fileTree.pageByText(page).getText();
            })
            .then(function (childText) {
                return expect(fileTree.pageByText(childText).getText()).toContain(page);
            })
            .then(function(){
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillNotPresent(fileTree.pageByText(page));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document));
            })
            .then(function () {
                return expect(fileTree.pageByText(page).isPresent()).toBe(true);
            });
        });

        it('4-when a node in the tree is selected and a user selects another node the view updates to the new nodes view', function () {
            return fileTree.folderByText(folder).click()
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.folderViewSymbol);
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder, 'folder');
            })
            .then(function () {
                return fileTree.documentByText(document).click();
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton);
            })
            .then(function () {
                return filesArea.fileViewTitle.getText();
            })
            .then(function (documentTitle) {
                return expect(documentTitle).toContain(document);
            });
        });

        it('When a node has children double clicking the node text should expand/collapse the children in the state they were in', function () {
            fileTree.folderByText(folder).click().then(function (folderToDoubleClick) {
                webdriverUtils.doubleClick(folderToDoubleClick).then(function () {
                    browser.sleep(2000).then(function () {
                        expect(fileTree.documentByText(document).isPresent()).toBe(true);
                        fileTree.documentByText(document).click().then(function (docToDoubleClick) {
                            webdriverUtils.doubleClick(docToDoubleClick).then(function () {
                                browser.sleep(1000).then(function () {
                                    expect(fileTree.pageByText(page).isPresent()).toBe(true);
                                });
                            });
                        });
                    });
                });
            });
        });
           
        it('When navigating away from a file and then back, the state of the tree should persist (expanded nodes still expanded, highlighted node the same, etc)', function () {
            return webdriverUtils.showNodeChildrenByText(folder, 'folder')
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document, 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText(page));
            })
            .then(fileTree.pageByText(page).click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(navigationBar.searchIcon.click)
            .then(searchPage.clearResultsButton.click)
            .then(function () {
                return searchPage.fileNumberSearchBox.clear();
            })
            .then(function () {
                return searchPage.fileNumberSearchBox.sendKeys('AddPage');
            })
            .then(searchPage.searchButton.click)
            .then(function () {
                return filesArea.createIcon.waitReady();
            })
            .then(leftRailBar.openFilesDropdown.click)
            .then(function () {
                return webdriverUtils.clickOnElement(openFilesDropdown.openFileRecord(1));
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document))
            })
            .then(function () {
                return expect(fileTree.pageByText(page).isPresent()).toBe(true);
            });
        });

        it('When toggling the tree, the state of the tree should persist (expanded nodes still expanded, highlighted node the same, etc)', function () {
            webdriverUtils.showNodeChildrenByText(folder, 'folder').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.documentByText(document)).then(function () {
                    webdriverUtils.showNodeChildrenByText(document, 'document').then(function () {
                        webdriverUtils.waitTillElementVisible(fileTree.pageByText(page)).then(function () {
                            fileTree.pageByText(page).click().then(function () {
                                fileTree.fileTreeSymbol.click().then(function () {
                                    browser.sleep(500).then(function () {
                                        fileTree.fileTreeSymbol.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(fileTree.documentByText(document)).then(function () {
                                                expect(fileTree.pageByText(page).isPresent()).toBe(true);
                                                expect(fileTree.selectedPages.getText()).toContain(descr);
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