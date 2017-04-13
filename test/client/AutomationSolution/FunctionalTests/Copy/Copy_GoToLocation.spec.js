exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    filesArea = new IR_Filesview(),
    copyExplorer = new IR_MoveExplorer(),
    errorMessage = new IR_ErrorMessage(),

    file1 = 'FileForMoveTesting',
    file2 = 'FileForAutoTesting',
    applicationDocument1ID,
    copyErrorMsg_changedType = 'document type is not allowed in the destination',
    copyErrorMsg_deletedDoc = 'no longer exists',
    copyErrorMsg2 = 'Unable to copy the following document(s) because:',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.restoreDocumentByID(applicationDocument1ID)
        .then(function () {
            return fileUtils.changeDocumentType(file1, 'AuditDocument', 'Audit');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, null, 'AuditDocument', '29592312.jpg');
        })
    // return fileUtils.deletePageFromDocumentInFolder(file1, null, 'AuditDocument', '29592312.jpg')
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting Info Folder', 'ApplicationDocument1');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting Info Folder', 'ApplicationDocument2');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Agents Folder 3', 'MiscellaneousDocument');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, null, 'MiscellaneousDocument');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, null, 'Document_AuditType', '29592312.jpg');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, 'ApplicationDocument1');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, 'ApplicationDocument2');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, null, 'Document_AuditType', 'refresh.txt');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, null, 'Document_AuditType', '1.jpg');
        });
        // .then(function () {
        //     return browser.sleep(6000);
        // });
}

function findFile(file) {
    return copyExplorer.find_Input.clear()
        .then(function () {
            return copyExplorer.find_Input.sendKeys(file);
        })
        .then(copyExplorer.find_DropdownElement(0).click);
}

if (browser.params.siteBase == 'iis') {

    describe('Copy - Go To Location', function () {

        beforeAll(function () {
            return fileUtils.getDocumentID(file1, 'ApplicationDocument1')
                .then(function (result) {
                    applicationDocument1ID = result;
                });
        });

        beforeEach(function () {
            if(isFirst){
                isFirst = false;
                return restoreFileStructure()
                    .then(function () {
                        return browser.executeScript('window.localStorage.clear();');
                    })
                    .then(function () {
                        return browser.driver.get(browser.params.defaultUrl);
                    });
            }else{
                return browser.driver.get(browser.params.defaultUrl);
            }
        });

        afterEach(function () {
            return restoreFileStructure()
                .then(function () {
                    return browser.executeScript('window.localStorage.clear();');
                });
        });

        it('1-When user copies page within current file and presses Go To Location button he should be navigated to the new location of it', function () {
            var initialDocument = 'ApplicationDocument1',
                destinationDocument = 'AuditDocument',
                page = '29592312.jpg';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(function () {
                    return expect(fileTree.expandedDocuments.count()).toEqual(1);
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, destinationDocument).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 page was successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedDocuments.count()
                            .then(function (count) {
                                return count === 2;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedDocumentByText(destinationDocument).isPresent()).toBe(true);
                    expect(fileTree.fileTreeNodesByText(page).count()).toBe(2);
                });
        });

        it('2-When user copies several documents within current file and presses Go To Location button he should be navigated to the new location of them', function () {
            var destinationFolder = 'Underwriting Info Folder',
                document1 = 'ApplicationDocument1',
                document2 = 'ApplicationDocument2';

            return searchUtil.openFile(file1)
                .then(fileTree.documentByText(document1).click)
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedFolders.count()
                            .then(function (count) {
                                return count === 1;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(2);
                });
        });

        it('3-When user copies document within current file to the deep subfolder and presses Go To Location button he should be navigated to the new location of it', function () {
            var initialFolder = 'New Mail Folder',
                destinationSubFolder = 'Agents Folder 3',
                folder = 'Print Folder',
                subFolder1 = 'Agents Folder 1',
                subFolder2 = 'Agents Folder 2',
                document = 'MiscellaneousDocument';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.expandedFolders.count()).toEqual(1);
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, folder).click)
                .then(copyExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(copyExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(copyExplorer.getItemInColumnByText(4, destinationSubFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                }).then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedFolders.count()
                            .then(function (count) {
                                return count === 5;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedFolders.get(4).getText()).toEqual(destinationSubFolder);
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                });
        });

        it('4-When user copies document within current file to the file level and presses Go To Location button he should be navigated to the new location of it', function () {
            var initialFolder = 'New Mail Folder',
                document = 'MiscellaneousDocument',
                documentType = 'Audit';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.expandedFolders.count()).toEqual(1);
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.docTypeButton.click)
                .then(copyExplorer.getDocTypeDropdownElementByText(documentType).click)
                .then(copyExplorer.getItemInColumnByText(0, file1).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedFolders.count()
                            .then(function (count) {
                                return count === 1;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                });
        });

        // ////////////  To a new file  ////////////////

        it('5-When user copies page to new file and presses Go To Location button he should be navigated to the new location of it', function () {
            var initialDocument = 'ApplicationDocument1',
                destinationDocument = 'Document_AuditType',
                page = '29592312.jpg';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationDocument).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                }).then(function (message) {
                    expect(message).toContain('1 page was successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedDocuments.count()
                            .then(function (count) {
                                return count === 1;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.expandedDocumentByText(destinationDocument).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page).isPresent()).toBe(true);
                });
        });

        it('6-When user copies several documents to new file which was previously opened and presses Go To Location button he should be navigated to the new location of them', function () {
            var destinationFolder = 'UnderwritingInfoFolder',
                document1 = 'ApplicationDocument1',
                document2 = 'ApplicationDocument2';

            return searchUtil.openFile(file1)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file1);
                })
                .then(fileTree.documentByText(document1).click)
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedFolders.count()
                            .then(function (count) {
                                return count === 1;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                });
        });

        it('7-When user copies pages to new file which was previously opened to the deep subfolder and presses Go To Location button he should be navigated to the new location of them', function () {
            var initialDocument = 'AuditDocument',
                page1 = '1.jpg',
                page2 = 'refresh.txt',
                destinationFolder = 'PrintFolder',
                destinationSubFolder1 = 'AgentsFolder1',
                destinationSubFolder2 = 'AgentsFolder2',
                destinationSubFolder3 = 'AgentsFolder3',
                destinationDocument = 'Mail Document';

            return searchUtil.openFile(file1)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
                })
                .then(fileTree.pageByText(page1).click)
                .then(function () {
                    return fileTree.pageByText(page2).ctrlClick();
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(copyExplorer.getItemInColumnByText(2, destinationSubFolder1).click)
                .then(copyExplorer.getItemInColumnByText(3, destinationSubFolder2).click)
                .then(copyExplorer.getItemInColumnByText(4, destinationSubFolder3).click)
                .then(copyExplorer.getItemInColumnByText(5, destinationDocument).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 pages were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedFolders.count()
                            .then(function (count) {
                                return count === 4;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.get(3).getText()).toEqual(destinationSubFolder3);
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(destinationDocument);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                });
        });

        it('8-In case of a partially sucessful copy of documents to a new file which was previously opened press on the Go To Location button should navigate on the destination folder of the successfully moved document', function () {
            var destinationFolder = 'PrintFolder',
                destinationSubFolder = 'AgentsFolder1',
                document1 = 'AuditDocument',
                document2 = 'ApplicationDocument1',
                document3 = 'ApplicationDocument2',
                changedType = 'Renewal Policy';

            return searchUtil.openFile(file1)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file1);
                })
                .then(fileTree.documentByText(document1).click)
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(function () {
                    return fileTree.documentByText(document3).ctrlClick();
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(copyExplorer.getItemInColumnByText(2, destinationSubFolder).click)
                .then(function () {
                    return fileUtils.changeDocumentType(file1, document1, changedType);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByID(applicationDocument1ID);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(function () {
                    return browser.ignoreSynchronization = true;
                })
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file2);
                    expect(message).toContain(copyErrorMsg2);
                    expect(message).toContain(document1);
                    expect(message).toContain(copyErrorMsg_changedType);
                    expect(message).toContain(document2);
                    expect(message).toContain(copyErrorMsg_deletedDoc);
                })
                .then(function () {
                    return errorMessage.growlNotificationButtonProt.click();
                })
                .then(function () {
                    browser.ignoreSynchronization = false;
                    return browser.wait(function(){
                        return fileTree.expandedFolders.count()
                            .then(function (count) {
                                return count === 2;
                            })
                    }, 10000, 'Time out waiting for expanded item');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.get(1).getText()).toEqual(destinationSubFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document3).isPresent()).toBe(true);
                });
        });
    });
}