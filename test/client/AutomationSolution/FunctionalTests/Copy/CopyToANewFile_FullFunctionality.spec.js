exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_MultiSelectView = require('./../../pageObjects/Containers/MultiSelectView.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_FileTree = require('./../../pageObjects/Containers/FileTree.js'),
    NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    IR_ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    navigationBar = new NavigationBar(),
    fileTree = new IR_FileTree(),
    filesArea = new IR_Filesview(),
    copyExplorer = new IR_MoveExplorer(),
    errorMessage = new IR_ErrorMessage(),
    multiSelectView = new IR_MultiSelectView(),

    auditDocToPartCopyID,
    applicationDocToPartCopy1ID,
    file1 = 'FileForMoveTesting',
    file2 = 'FileForAutoTesting',
    file3 = 'FileToPartialCopy',
    message = 'The selected document type is not allowed in the existing folders within this file. Please select a different document type or cancel and create a folder that supports this document type.',
    copyErrorMsg_changedType = 'document type is not allowed in the destination',
    copyErrorMsg_deletedDoc = 'no longer exists',
    copyErrorMsg2 = 'Unable to copy the following document(s) because:',
    copyErrorMsg_deletedDoc_common = 'Unable to complete copy. Document(s) no longer exists.',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.deleteDocumentByDescription(file2, 'NoteDocument')
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, 'MiscellaneousDocument');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, 'AuditDocument');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, null, 'Document_AuditType', 'refresh.txt');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, null, 'Document_AuditType', '1.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, null, 'Document_AuditType', '1c9c98c7429d.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, 'AgentsFolder3', 'Mail Document', 'refresh.txt');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, 'AgentsFolder3', 'Mail Document', '1.jpg');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, 'ApplicationDocument1');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, null, 'Document_AuditType', '29592312.jpg');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, 'ApplicationDocument2');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file2, 'AgentsFolder1', 'AuditDocToPartCopy');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file2, 'AgentsFolder1', 'ApplicationDocToPartCopy1');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file2, 'AgentsFolder1', 'ApplicationDocToPartCopy2');
        })
        .then(function () {
            return fileUtils.restoreDocumentByID(auditDocToPartCopyID);
        })
        .then(function () {
            return fileUtils.restoreDocumentByID(applicationDocToPartCopy1ID);
        })
        .then(function () {
            return fileUtils.changeDocumentType(file3, 'AuditDocToPartCopy', 'Audit');
        })
        .then(function () {
            return fileUtils.changeDocumentType(file3, 'ApplicationDocToPartCopy1', 'Application');
        });
        // .then(function () {
        //     return browser.sleep(10000);
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

    describe('Copy to a new file - Full functionality', function () {

        beforeAll(function () {
            return fileUtils.getDocumentID(file3, 'AuditDocToPartCopy')
                .then(function (result1) {
                    return auditDocToPartCopyID = result1;
                })
                .then(function () {
                    return fileUtils.getDocumentID(file3, 'ApplicationDocToPartCopy1');
                })
                .then(function (result2) {
                    return applicationDocToPartCopy1ID = result2;
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

        it('1-User should be able to copy page to a new file and destination should automatically be updated', function () {
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
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 page was successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(initialDocument);
                    expect(fileTree.pageByText(page).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');
                })
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(destinationDocument);
                    expect(fileTree.pageByText(page).isPresent()).toBe(true);
                });
        });

        it('2-User should be able to copy page to a new file which was previously opened and destination should automatically be updated', function () {
            var initialDocument = 'ApplicationDocument1',
                destinationDocument = 'Document_AuditType',
                page = '29592312.jpg';

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
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 page was successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(initialDocument);
                    expect(fileTree.pageByText(page).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');
                })
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(destinationDocument);
                    expect(fileTree.pageByText(page).isPresent()).toBe(true);
                });
        });


        it('3-User should be able to copy several pages to a new file which was previously opened and destination should automatically be updated', function () {
            var initialDocument = 'AuditDocument',
                destinationDocument = 'Document_AuditType',
                page1 = '1.jpg',
                page2 = 'refresh.txt';

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
                .then(copyExplorer.getItemInColumnByText(1, destinationDocument).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 pages were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(initialDocument);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');
                })
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(destinationDocument);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                });
        });

        it('4-User should be able to copy several pages from different documents to new file and source and destination should automatically be updated', function () {
            var initialDocument1 = 'AuditDocument',
                initialDocument2 = 'ApplicationDocument2',
                destinationDocument1 = 'Document_AuditType',
                page1 = '1.jpg',
                page2 = '1c9c98c7429d.jpg';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument1, 'document');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument2, 'document');
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
                .then(copyExplorer.getItemInColumnByText(1, destinationDocument1).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 pages were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument1, 'document');
                })
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(destinationDocument1);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                });
        });

        it('5-User should be able to copy document to a new file which was previously opened and destination should automatically be updated', function () {
            var initialFolder = 'File Note Folder',
                initialDocument = 'NoteDocument',
                destinationFolder = 'File Note';

            return searchUtil.openFile(file1)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(initialDocument);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(function () {
                    return copyExplorer.getItemInColumnByText(1, destinationFolder).click();
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(initialFolder);
                    expect(fileTree.documentByText(initialDocument).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(initialDocument).isPresent()).toBe(true);
                })
        });

        it('6-User should be able to copy document to the file level of a new file which was previously opened and destination should automatically be updated', function () {
            var initialFolder = 'File Note Folder',
                initialDocument = 'NoteDocument',
                filteredType = 'Audit';

            return searchUtil.openFile(file1)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(initialDocument);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.docTypeButton.click)
                .then(copyExplorer.getDocTypeDropdownElementByText(filteredType).click)
                .then(copyExplorer.getItemInColumnByText(0, file2).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(initialFolder);
                    expect(fileTree.documentByText(initialDocument).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return expect(fileTree.documentByText(initialDocument).isPresent()).toBe(true);
                })

        });

        it('7-User should be able to copy several documents to a new file and destination should automatically be updated', function () {
            var destinationFolder = 'UnderwritingInfoFolder',
                document1 = 'ApplicationDocument1',
                document2 = 'ApplicationDocument2';

            return searchUtil.openFile(file1)
                .then(fileTree.documentByText(document1).click)
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(function () {
                    return expect(multiSelectView.multiSelectTitle).toContain('2 items selected');
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
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return expect(filesArea.fileViewTitle.getText()).toEqual(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                });
        });

        it('8-User should be able to copy several documents of the same type to a new file which was previously opened and destination should automatically be updated', function () {
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
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                });
        });

        it('9-User should be able to copy several documents from different levels to new file and source and destination should automatically be updated', function () {
            var folder1 = 'New Mail Folder',
                destinationFolder = 'UnderwritingInfoFolder',
                document1 = 'MiscellaneousDocument',
                document2 = 'ApplicationDocument2';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder1, 'folder');
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
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return expect(filesArea.fileViewTitle.getText()).toEqual(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                });
        });

        it('10-User should be able to copy documents and pages to new file and source and destination should automatically be updated', function () {
            var destinationDocument = 'Document_AuditType',
                document1 = 'ApplicationDocument1',
                document2 = 'ApplicationDocument2',
                page1 = '29592312.jpg',
                page2 = '1c9c98c7429d.jpg';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document2, 'document');
                })
                .then(fileTree.pageByText(page2).click)
                .then(function () {
                    return fileTree.documentByText(document1).ctrlClick();
                }).then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationDocument).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document and 1 page were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return expect(filesArea.fileViewTitle.getText()).toEqual(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');
                })
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(destinationDocument);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                })
        });

        it('11-User should be able to copy several documents of heterogeneous types to new file which was previously opened and destination should automatically be updated', function () {
            var destinationFolder = 'UnderwritingInfoFolder',
                document1 = 'AuditDocument',
                document2 = 'ApplicationDocument1';

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
                .then(function () {
                    return expect(copyExplorer.docTypeDropdown.getText()).toEqual('---');
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                });
        });


        it('12-User should be able to copy several documents of heterogeneous types to a new file with changing document type to new one and destination should automatically be updated', function () {
            var destinationFolder = 'File Note',
                document1 = 'AuditDocument',
                document2 = 'ApplicationDocument1',
                type = 'Note';

            return searchUtil.openFile(file1)
                .then(fileTree.documentByText(document1).click)
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(function () {
                    return expect(copyExplorer.docTypeDropdown.getText()).toEqual('---');
                })
                .then(copyExplorer.docTypeButton.click)
                .then(function () {
                    return copyExplorer.docTypeInput.sendKeys(type);
                })
                .then(copyExplorer.docTypeDropdownElement(0).click)
                .then(function () {
                    return expect(copyExplorer.docTypeDropdown.getText()).toEqual(type);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return expect(filesArea.fileViewTitle.getText()).toEqual(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                });
        });

        it('13-User should be able to copy several documents of heterogeneous types to a new file which was previously opened with changing document type to new one and destination should automatically be updated', function () {
            var destinationFolder = 'File Note',
                document1 = 'AuditDocument',
                document2 = 'ApplicationDocument1',
                type = 'Note';

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
                .then(function () {
                    return expect(copyExplorer.docTypeDropdown.getText()).toEqual('---');
                })
                .then(copyExplorer.docTypeButton.click)
                .then(function () {
                    return copyExplorer.docTypeInput.sendKeys(type);
                })
                .then(copyExplorer.docTypeDropdownElement(0).click)
                .then(function () {
                    return expect(copyExplorer.docTypeDropdown.getText()).toEqual(type);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                })
        });


        it('14-User should be able to copy pages to the document in the deep subfolder to a new file which was previously opened and destination should automatically be updated', function () {
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
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 pages were successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(initialDocument);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder1, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder2, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder3, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');
                })
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(destinationDocument);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                });
        });

        it('15-When user copies document to a new file but clicks Cancel button the document should be left at the initial location', function () {
            var initialFolder = 'New Mail Folder',
                document = 'MiscellaneousDocument',
                destinationFolder = 'PrintFolder';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
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
                .then(copyExplorer.cancelButton.click)
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(initialFolder);
                    expect(fileTree.documentByText(document).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.documentByText(document).isPresent()).toBe(false);
                });
        });

        // ///////////////// Errors on Move  ///////////////////////

        it('16-In case of changing document type to incompatible for destination, copying of single document to a new file should be performed with initial type and destination should automatically be updated', function () {
            var destinationFolder = 'PrintFolder',
                destinationSubFolder = 'AgentsFolder1',
                document = 'AuditDocToPartCopy',
                initialType = 'Audit',
                changedType = 'Renewal Policy';

            return searchUtil.openFile(file3)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(copyExplorer.getItemInColumnByText(2, destinationSubFolder).click)
                .then(function () {
                    return fileUtils.changeDocumentType(file3, document, changedType);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file3.toUpperCase());
                    expect(fileTree.documentByText(document).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.documentByText(document).isPresent()).toBe(true);
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(function () {
                    return expect(filesArea.documentType).toEqual(initialType);
                });
        });

        it('17-In case of deletting of document, copying of it to a new file which was previously opened should not be performed and appropriate growl error message should be displayed', function () {
            var destinationFolder = 'PrintFolder',
                destinationSubFolder = 'AgentsFolder1',
                document = 'AuditDocToPartCopy';

            return searchUtil.openFile(file3)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file3);
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(copyExplorer.getItemInColumnByText(2, destinationSubFolder).click)
                .then(function () {
                    return fileUtils.deleteDocumentByID(auditDocToPartCopyID);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain(copyErrorMsg_deletedDoc_common);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file3.toUpperCase());
                    expect(fileTree.documentByText(document).isPresent()).toBe(false);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.documentByText(document).isPresent()).toBe(false);
                });
        });

        it('18-In case of deletting of document, copying of it to the file level of a new file which was previously opened should not be performed and appropriate growl error message should be displayed', function () {
            var document = 'AuditDocToPartCopy';

            return searchUtil.openFile(file3)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file3);
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(0, file2).click)
                .then(function () {
                    return fileUtils.deleteDocumentByID(auditDocToPartCopyID);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain(copyErrorMsg_deletedDoc_common);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file3.toUpperCase());
                    expect(fileTree.documentByText(document).isPresent()).toBe(false);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return expect(fileTree.documentByText(document).isPresent()).toBe(false);
                });
        });
        // ///////////////// Partial Move  ///////////////////////

        it('19-In case of a partially sucessful copy of documents to a new file which was previously opened due to doc type changing successfully moved documents should appear in destination folder and not copied - in source folder', function () {
            var destinationFolder = 'PrintFolder',
                destinationSubFolder = 'AgentsFolder1',
                document1 = 'AuditDocToPartCopy',
                document2 = 'ApplicationDocToPartCopy1',
                document3 = 'ApplicationDocToPartCopy2',
                changedType = 'Renewal Policy';

            return searchUtil.openFile(file3)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file3);
                })
                .then(fileTree.documentByText(document1).click)
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(function () {
                    return fileTree.documentByText(document3).ctrlClick();
                })
                .then(function () {
                    return expect(multiSelectView.multiSelectTitle).toContain('3 items selected');
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(copyExplorer.getItemInColumnByText(2, destinationSubFolder).click)
                .then(function () {
                    return fileUtils.changeDocumentType(file3, document1, changedType);
                })
                .then(function () {
                    return fileUtils.changeDocumentType(file3, document2, changedType);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file2);
                    expect(message).toContain(copyErrorMsg2);
                    expect(message).toContain(document1);
                    expect(message).toContain(document2);
                    expect(message).toContain(copyErrorMsg_changedType);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file3.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document3).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.documentByText(document1).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document3).isPresent()).toBe(true);
                });
        });

        it('20-In case of a partially sucessful copy of documents to a new file due to deletting of documents successfully moved documents should appear in destination folder and not moved - in source folder', function () {
            var destinationFolder = 'PrintFolder',
                destinationSubFolder = 'AgentsFolder1',
                document1 = 'AuditDocToPartCopy',
                document2 = 'ApplicationDocToPartCopy1',
                document3 = 'ApplicationDocToPartCopy2';

            return searchUtil.openFile(file3)
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
                    return fileUtils.deleteDocumentByID(auditDocToPartCopyID);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByID(applicationDocToPartCopy1ID);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file2);
                    expect(message).toContain(copyErrorMsg2);
                    expect(message).toContain(document1);
                    expect(message).toContain(document2);
                    expect(message).toContain(copyErrorMsg_deletedDoc);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file3.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document3).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.documentByText(document1).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document3).isPresent()).toBe(true);
                });
        });


        it('21-In case of a partially sucessful copy of documents to a new file which was previously opened because of different reasons correct error message should be displayed successfully moved documents should appear in destination folder and not moved - in source folder', function () {
            var destinationFolder = 'PrintFolder',
                destinationSubFolder = 'AgentsFolder1',
                document1 = 'AuditDocToPartCopy',
                document2 = 'ApplicationDocToPartCopy1',
                document3 = 'ApplicationDocToPartCopy2',
                changedType = 'Renewal Policy';

            return searchUtil.openFile(file3)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file3);
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
                    return fileUtils.changeDocumentType(file3, document1, changedType);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByID(applicationDocToPartCopy1ID);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(copyExplorer.copyButton.click)
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
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileNumber.getText()).toEqual(file3.toUpperCase());
                    expect(fileTree.documentByText(document1).isPresent()).toBe(true);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document3).isPresent()).toBe(true);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file2);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.documentByText(document1).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document2).isPresent()).toBe(false);
                    expect(fileTree.documentByText(document3).isPresent()).toBe(true);
                });
        });
    });
}