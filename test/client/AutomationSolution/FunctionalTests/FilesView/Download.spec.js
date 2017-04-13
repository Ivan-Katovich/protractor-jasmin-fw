exports.tags = ['File_Manipulation', 'Upload_Download'];
/*
    FilesView -> Download spec;
    Created: ...
    Refactored: 9/27/2016, navasaal
*/

/* modeling; */
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var searchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var downloadDialog = require('./../../PageObjects/ModalDialogs/EmailDownloadPrintDialog.js');
var ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var FileTree = require('../../PageObjects/Containers/FileTree.js');
var DocumentPageActionsDropdown = require('./../../PageObjects/DropdownLists/DocumentPageActionsDropdown.js');
var searchUtil = require('../../BusinessProcess/Search.js');

/* objects; */
var docPageActionsDropdown = new DocumentPageActionsDropdown();
var fileTree = new FileTree();
var openFilesDropdown = new OpenFilesDropdown();
var recordHeader = new recordHeaderElement();
var searchPage = new searchPage();
var navigationBar = new NavigationBar();
var filesArea = new filesview();
var downloadDialog = new downloadDialog();
var errorMessage = new ErrorMessage();

/* vars; */
var fileName = 'FilesViewdwnld';
var folderName = 'Folder1';
var document1 = 'F1D1';

describe('File Actions - Download', function () {

    if (browser.params.siteBase == 'iis') {

        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl)
            .then(function () {
                return searchUtil.openFile(fileName);
            })
            .then(function () {
                return filesArea.createIcon.waitReady();
            });
        });

        it('1-Given a single document is selected when the user clicks Download from the document level actions drop down menu' +
            'the Download Set Up dialog appears with checkbox option to download with/without annotations unchecked by default', function () {
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
            .then(docPageActionsDropdown.downloadAction.click)
            .then(function () {
                return expect(downloadDialog.title('Download Set Up').isDisplayed()).toBe(true);
            })
            .then(function () {
                return expect(downloadDialog.withAnnotationsCheckbox.getAttribute("checked")).not.toBe(true);
            });
        });

        it('2-When a user clicks Cancel in download dialog the window closes', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
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
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.cancelButton.click)
            .then(function () {
               return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('3-Given a single document selected when the user clicks the with or without annotation check box ' +
            'they are able to click next to download the document without errors', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
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
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.withAnnotationsCheckbox.click)
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('4-Given a single document is selected when the user renames that item in the collection' +
            'the text is changed in the input field and the user is able to download the document with our errors', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
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
            .then(docPageActionsDropdown.downloadAction.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(downloadDialog.renameInputField);
            })
            .then(function () {
                return downloadDialog.renameInputField.clear();
            })
            .then(function () {
                return downloadDialog.renameInputField.sendKeys('test_value');
            })
            .then(function () {
                return downloadDialog.renameInputField.getAttribute('value');
            })
            .then(function (text) {
                return expect(text).toBe('test_value');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('5-Given a single page is selected when the clicks the X on that item in the collection' +
            'the item is removed from the modal and the next button becomes disabled', function () {
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
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('jpeg'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('jpeg', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.pageActionsButton.waitReady();
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.downloadAction.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(downloadDialog.nextButton);
            })
            .then(downloadDialog.removeItemInModal.click)
            .then(function () {
                return webdriverUtils.waitTillElementVisible(downloadDialog.getNumberOfElementsInModal);
            })
            .then(function () {
                return downloadDialog.getNumberOfElementsInModal.count();
            })
            .then(function (count) {
                return expect(count).toBe(0);
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(downloadDialog.nextButton);
            })
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).toContain('disabled');
            });
        });

        it('6-Given a single document is selected when the clicks the X on that item in the collection' +
            'the item is removed from the modal and the next button becomes disabled', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
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
            .then(docPageActionsDropdown.downloadAction.click)
            .then(function () {
                return downloadDialog.nextButton.waitReady();
            })
            .then(downloadDialog.removeItemInModal.click)
            .then(function () {
                return downloadDialog.getNumberOfElementsInModal.count();
            })
            .then(function (count) {
                return expect(count).toBe(0);
            })
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).toContain('disabled');
            });
        });

        it('7-User should be able to download PDF file without any error', function () {
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
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('pdf.pdf'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('pdf.pdf', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.pageActionsButton.waitReady();
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.withAnnotationsCheckbox.click)
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('8-User should be able to download TXT file without any error', function () {
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
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('txt.txt'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('txt.txt', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.pageActionsButton.waitReady();
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.withAnnotationsCheckbox.click)
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('9-User should be able to download JPEG file without any error', function () {
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
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('jpeg.jpeg'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('jpeg.jpeg', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.pageActionsButton.waitReady();
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.withAnnotationsCheckbox.click)
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('10-User should be able to download GIF file without any error', function () {
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
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('gif.gif'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('gif.gif', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.pageActionsButton.waitReady();
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.withAnnotationsCheckbox.click)
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('11-User should be able to download TIFF file without any error', function () {
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
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('tiff.tiff'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('tiff.tiff', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.pageActionsButton.waitReady();
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.withAnnotationsCheckbox.click)
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        it('12-User should be able to download HTML file without any error', function () {
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
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText('html.html'));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('html.html', 'page');
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.pageActionsButton.waitReady();
            })
            .then(filesArea.pageActionsButton.click)
            .then(docPageActionsDropdown.downloadAction.click)
            .then(downloadDialog.withAnnotationsCheckbox.click)
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(function () {
                return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
            })
            .then(downloadDialog.cancelButton.click)
            .then(function () {
                return expect(errorMessage.error.count()).toEqual(0);
            });
        });

        if (!(browser.browserName === 'internet explorer')) {

            it('13-Given multiple pages are selected when the clicks the X on an item in the collection' +
                'the item is removed from the modal and the next button remains not disabled ', function () {
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
                    return webdriverUtils.waitTillElementVisible(fileTree.pageByText('html.html'));
                })
                .then(function () {
                    return webdriverUtils.clickOnNodeInFileTree('html.html', 'page');
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return webdriverUtils.ctrlClick(fileTree.pageByText('jpeg.jpeg'));
                })
                .then(function () {
                    return webdriverUtils.waitTillElementVisible(filesArea.pageActionsButton);
                })
                .then(function () {
                    return filesArea.pageActionsButton.waitReady();
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.downloadAction.click)
                .then(function () {
                    return webdriverUtils.waitTillElementVisible(downloadDialog.nextButton);
                })
                .then(downloadDialog.removeItemInModal.click)
                .then(function () {
                    return downloadDialog.getNumberOfElementsInModal.count();
                })
                .then(function (count) {
                    return expect(count).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.waitTillElementVisible(downloadDialog.nextButton);
                })
                .then(function () {
                    return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                })
                .then(downloadDialog.cancelButton.click)
                .then(function () {
                    return expect(errorMessage.error.count()).toEqual(0);
                });
            });

            xit('14-Given multiple documents are selected when the clicks the X on an item in the collection' +
                'the item is removed from the modal and the next button remains not disabled ', function () {
                return browser.driver.get(browser.params.defaultUrl)
                .then(function () {
                    return searchUtil.openFile('FilesViewEmContents');
                })
                .then(function () {
                    return filesArea.createIcon.waitReady();
                })
                .then(function(){
                    return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folderName, 'folder');
                })
                .then(function () {
                    return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1));
                })
                .then(function () {
                    return webdriverUtils.clickOnNodeInFileTree('F1D3', 'document');
                })
                .then(function () {
                    return webdriverUtils.ctrlClick(fileTree.documentByText('F1D2'));
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return filesArea.actionsDropdownButton.waitReady();
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.downloadAction.click)
                .then(function () {
                    return webdriverUtils.waitTillElementVisible(downloadDialog.nextButton);
                })
                .then(downloadDialog.removeItemInModal.click)
                .then(function () {
                    return downloadDialog.getNumberOfElementsInModal.count();
                })
                .then(function (count) {
                    return expect(count).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.waitTillElementVisible(downloadDialog.nextButton);
                })
                .then(function () {
                    return expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');
                })
                .then(downloadDialog.cancelButton.click)
                .then(function () {
                    return expect(errorMessage.error.count()).toEqual(0);
                });
            });

            /* todo; */
            xit('15-Given a mixed collection is selected when the clicks the X on that item in the collection' +
                'the item is removed from the modal and the next button remains not disabled', function () {

                webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                    webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {

                        webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                            webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {

                                webdriverUtils.waitTillElementVisible(fileTree.pageByText('xlsx.xlsx')).then(function () {
                                    webdriverUtils.clickOnNodeInFileTree('xlsx.xlsx', 'page').then(function () {

                                        webdriverUtils.waitTillElementVisible(fileTree.documentByText('TIFF_Multipage_Format')).then(function () {
                                            webdriverUtils.shiftClick(fileTree.documentByText('TIFF')).then(function () {

                                                filesArea.actionsDropdownButton.click().then(function () {
                                                    webdriverUtils.waitTillElementVisible(filesArea.actionsDropdownItemByText('Download')).then(function () {
                                                        filesArea.actionsDropdownItemByText('Download').click().then(function () {
                                                            webdriverUtils.waitTillElementVisible(downloadDialog.nextButton).then(function () {
                                                                downloadDialog.removeItemInModal.click().then(function () {
                                                                    webdriverUtils.waitTillElementVisible(downloadDialog.getNumberOfElementsInModal).then(function () {
                                                                        downloadDialog.getNumberOfElementsInModal.count().then(function (count) {
                                                                            expect(count).toBe(10);
                                                                            webdriverUtils.waitTillElementVisible(downloadDialog.nextButton).then(function () {
                                                                                expect(downloadDialog.nextButton.getAttribute('class')).not.toContain('disabled');

                                                                                downloadDialog.nextButton.click().then(function () {
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
