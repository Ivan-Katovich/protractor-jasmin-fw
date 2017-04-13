exports.tags = ['File_Manipulation', 'Print'];
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var searchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var printDialog = require('./../../PageObjects/ModalDialogs/EmailDownloadPrintDialog.js');
var ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var FileTree = require('../../PageObjects/Containers/FileTree.js');
var DocumentPageActionsDropdown = require('./../../PageObjects/DropdownLists/DocumentPageActionsDropdown.js');
var searchUtil = require('../../BusinessProcess/Search.js');

var docPageActionsDropdown = new DocumentPageActionsDropdown();
var fileTree = new FileTree();
var openFilesDropdown = new OpenFilesDropdown();
var recordHeader = new recordHeaderElement();
var searchPage = new searchPage();
var navigationBar = new NavigationBar();
var filesArea = new filesview();
var printDialog = new printDialog();
var errorMessage = new ErrorMessage();

var fileName = 'FilesViewptr';
var folderName = 'Folder1';
var document1 = 'F1D1';
var document2 = 'F1D2';

describe('File Actions - Print', function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return searchUtil.openFile(fileName);
            })
            .then(function () {
                return filesArea.createIcon.waitReady();
            });
        });

        it('1-Given a single document is selected when the user clicks Print from the document level actions drop down menu' +
            'the print modal appears with options for print', function () {
            return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folderName, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(document1, 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton);
            })
            .then(filesArea.actionsDropdownButton.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print'));
            })
            .then(function () {
                return filesArea.actionsDropdownItemByText('Print').click();
            })
            .then(function () {
                expect(printDialog.title('Print Set Up').isDisplayed()).toBe(true);
                expect(printDialog.withAnnotationsCheckbox.isDisplayed()).toBe(true);
            });
        });

        it('2-When a user clicks Cancel in Print dialog the window closes', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                                filesArea.actionsDropdownButton.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                        filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                            webdriverUtils.waitTillElementVisible(printDialog.cancelButton).then(function () {
                                                printDialog.cancelButton.click().then(function () {
                                                    expect(errorMessage.error.count()).toEqual(0);
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

        it('3-Given a single document selected when the user clicks the with or without annotation check box ' +
            'they are able to click next to print the document without errors', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                                filesArea.actionsDropdownButton.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                        filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                            webdriverUtils.waitTillElementVisible(printDialog.withAnnotationsCheckbox).then(function () {
                                                printDialog.withAnnotationsCheckbox.click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                        expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                                                        printDialog.nextButton.isDisplayed().then(function (isVisible) {
                                                            expect(isVisible).toBeTruthy();
                                                        });
//                                                        in this scenario it fires window.print - which is not supported by webdriver
//                                                        printDialog.nextButton.click().then(function () {
//                                                            expect(errorMessage.error.count()).toEqual(0);
//                                                        });
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

        /* todo; needs to add blank page and resave DB backup;  */
        xit('4-Given a single blank page is selected when the user opens the Print modal' +
            'the default name is correct', function () {
            navigationBar.searchIcon.click()
            .then(function () {
                return webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton);
            })
            .then(searchPage.clearResultsButton.click)
            .then(searchPage.clearCriteriaButton.click)
            .then(function () {
                return searchPage.fileNameSearchBox.sendKeys('n3');
            })
            .then(searchPage.searchButton.click)
            .then(function () {
                return filesArea.createIcon.waitReady();
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('File Note', 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText('DocWithBlankPage'));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText('DocWithBlankPage', 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText(''));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('', 'page');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton)
            })
            .then(filesArea.pageActionsButton.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print'))
            })
            .then(filesArea.actionsDropdownItemByText('Print').click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(printDialog.itemByIndex(0));
            })
            .then(function () {
                return printDialog.itemByIndex(0).getAttribute('value');
            })
            .then(function (text) {
                return expect(text).toContain('');
            })
            .then(function () {
                return printDialog.nextButton.isDisplayed().then(function (isVisible) {
                    return expect(isVisible).toBeTruthy();
                });
            });
        });

        it('5-Given a single page is selected when the clicks the X on that item in the collection' +
            'the item is removed from the modal and the next button becomes disabled', function () {
            return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folderName, 'folder')
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1))
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document1, 'document')
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('txt.txt'))
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('txt.txt', 'page')
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton)
            })
            .then(filesArea.pageActionsButton.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print'))
            })
            .then(function () {
                return filesArea.actionsDropdownItemByText('Print').click();
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(printDialog.nextButton)
            })
            .then(printDialog.removeItemInModal.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(printDialog.getNumberOfElementsInModal)
            })
            .then(function () {
                return printDialog.getNumberOfElementsInModal.count()
            })
            .then(function (count) {
                return expect(count).toBe(0);
            })
            .then(function(){
                return webdriverUtils.waitTillElementVisible(printDialog.nextButton)
            })
            .then(function () {
                return expect(printDialog.nextButton.getAttribute('class')).toContain('disabled');
            });
        });

        it('6-Given multiple pages are selected when the clicks the X on an item in the collection' +
            'the item is removed from the modal and the next button remains not disabled ', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('xlsx.xlsx')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page').then(function () {
                                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('doc.doc')).then(function () {
                                        webdriverUtils.ctrlClick(fileTree.pageByText('doc.doc')).then(function () {
                                            webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                                                filesArea.pageActionsButton.click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                        filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                printDialog.removeItemInModal.click().then(function () {
                                                                    webdriverUtils.waitTillElementVisible(printDialog.getNumberOfElementsInModal).then(function () {
                                                                        printDialog.getNumberOfElementsInModal.count().then(function (count) {
                                                                            expect(count).toBe(1);
                                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                                expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
//                                                                                in this scenario it shows another modal window
                                                                                printDialog.nextButton.click().then(function () {
                                                                                    expect(errorMessage.error.count()).toEqual(1);
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
                        });
                    });
                });
            });
        });

        it('7-Given a single page with unprintable content (xlsx here) is selected the Print functionality' +
            'is disabled in the actions dropdown menu', function () {
            return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folderName, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document1, 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('xlsx.xlsx'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton);
            })
            .then(function () {
                return filesArea.pageActionsButton.click();
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print'));
            })
            .then(function () {
                return filesArea.actionsDropdownItemByText('Print').getAttribute('class');
            })
            .then(function (state) {
                return expect(state).toContain('disabled');
            });
        });

        //ToDo: test  print shortcut for unsupported types allows print modal but notifies user after that print not allowed
        xit('Given a single page with unprintable content(mp3 here), is selected, user can still access' +
            'the print modal through keyboard shortcut, but upon clicking the next button in the modal, ' +
            'a popup will display notifying user the selected content cannot be printed', function () { });

        it('8-Given a single document is selected when the clicks the X on that item in the collection' +
            'the item is removed from the modal and the next button becomes disabled', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                                filesArea.actionsDropdownButton.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                        filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                printDialog.removeItemInModal.click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.getNumberOfElementsInModal).then(function () {
                                                        printDialog.getNumberOfElementsInModal.count().then(function (count) {
                                                            expect(count).toBe(0);
                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                expect(printDialog.nextButton.getAttribute('class')).toContain('disabled');

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

        it('9-Given multiple documents are selected when the clicks the X on an item in the collection' +
            'the item is removed from the modal and the next button remains not disabled ', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.documentByText(document2)).then(function () {
                                webdriverUtils.ctrlClick(fileTree.documentByText(document2)).then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownButton).then(function () {
                                        filesArea.actionsDropdownButton.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                        printDialog.removeItemInModal.click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(printDialog.getNumberOfElementsInModal).then(function () {
                                                                printDialog.getNumberOfElementsInModal.count().then(function (count) {
                                                                    expect(count).toBe(1);
                                                                    webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                        expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
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
            });
        });

        it('10-Given a mixed collection is selected when the clicks the X on that item in the collection' +
            'the item is removed from the modal and the next button remains not disabled', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('xlsx.xlsx')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page').then(function () {
                                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                                        webdriverUtils.shiftClick(fileTree.documentByText(document1)).then(function () {
                                            filesArea.actionsDropdownButton.click().then(function () {
                                                webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                    filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                        webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                            printDialog.removeItemInModal.click().then(function () {
                                                                webdriverUtils.waitTillElementVisible(printDialog.getNumberOfElementsInModal).then(function () {
                                                                    printDialog.getNumberOfElementsInModal.count().then(function (count) {
                                                                        expect(count).toBe(7);
                                                                        webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                            expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');

//                                                                            in this scenario it fires window.print - which is not supported by webdriver
//                                                                            printDialog.nextButton.click().then(function () {
//                                                                                expect(errorMessage.error.count()).toEqual(0);
//                                                                            });
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
                });
            });
        });

        it('11-User should be able to print PDF file without any error', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('pdf.pdf')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('pdf.pdf', 'page').then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                                        filesArea.pageActionsButton.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.withAnnotationsCheckbox).then(function () {
                                                        printDialog.withAnnotationsCheckbox.click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                                                                printDialog.nextButton.isDisplayed().then(function (isVisible) {
                                                                    expect(isVisible).toBeTruthy();
                                                                });
//                                                        in this scenario it fires window.print - which is not supported by webdriver
//                                                        printDialog.nextButton.click().then(function () {
//                                                            expect(errorMessage.error.count()).toEqual(0);
//                                                        });
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

        it('12-User should be able to print TXT file without any error', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('txt.txt')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('txt.txt', 'page').then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                                        filesArea.pageActionsButton.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.withAnnotationsCheckbox).then(function () {
                                                        printDialog.withAnnotationsCheckbox.click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                                                                printDialog.nextButton.isDisplayed().then(function (isVisible) {
                                                                    expect(isVisible).toBeTruthy();
                                                                });
//                                                        in this scenario it fires window.print - which is not supported by webdriver
//                                                        printDialog.nextButton.click().then(function () {
//                                                            expect(errorMessage.error.count()).toEqual(0);
//                                                        });
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

        it('13-User should be able to print JPEG file without any error', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('jpeg.jpeg')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('jpeg.jpeg', 'page').then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                                        filesArea.pageActionsButton.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.withAnnotationsCheckbox).then(function () {
                                                        printDialog.withAnnotationsCheckbox.click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                                                                printDialog.nextButton.isDisplayed().then(function (isVisible) {
                                                                    expect(isVisible).toBeTruthy();
                                                                    browser.sleep(500);
                                                                });
//                                                        in this scenario it fires window.print - which is not supported by webdriver
//                                                        printDialog.nextButton.click().then(function () {
//                                                            expect(errorMessage.error.count()).toEqual(0);
//                                                            browser.sleep(500);
//                                                        })
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

        it('14-User should be able to print GIF file without any error', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('gif.gif')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('gif.gif', 'page').then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                                        filesArea.pageActionsButton.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.withAnnotationsCheckbox).then(function () {
                                                        printDialog.withAnnotationsCheckbox.click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                                                                printDialog.nextButton.isDisplayed().then(function (isVisible) {
                                                                    expect(isVisible).toBeTruthy();
                                                                    browser.sleep(500);
                                                                });
//                                                        in this scenario it fires window.print - which is not supported by webdriver
//                                                        printDialog.nextButton.click().then(function () {
//                                                            expect(errorMessage.error.count()).toEqual(0);
//                                                            browser.sleep(500);
//                                                        });
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

        it('15-User should be able to print TIFF file without any error', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                        webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.pageByText('tiff.tiff')).then(function () {
                                webdriverUtils.clickOnNodeInFileTree('tiff.tiff', 'page').then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton).then(function () {
                                        filesArea.pageActionsButton.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Print')).then(function () {
                                                filesArea.actionsDropdownItemByText('Print').click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(printDialog.withAnnotationsCheckbox).then(function () {
                                                        printDialog.withAnnotationsCheckbox.click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(printDialog.nextButton).then(function () {
                                                                expect(printDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                                                                printDialog.nextButton.isDisplayed().then(function (isVisible) {
                                                                    expect(isVisible).toBeTruthy();
                                                                    browser.sleep(500);
                                                                });
//                                                        in this scenario it fires window.print - which is not supported by webdriver
//                                                        printDialog.nextButton.click().then(function () {
//                                                            expect(errorMessage.error.count()).toEqual(0);
//                                                            browser.sleep(500);
//                                                        });
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