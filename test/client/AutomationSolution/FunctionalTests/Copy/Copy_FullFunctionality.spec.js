exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_MultiSelectView = require('./../../pageObjects/Containers/MultiSelectView.js'),
    NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),
    q = require('q'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    navigationBar = new NavigationBar(),
    multiSelectView = new IR_MultiSelectView(),
    filesArea = new IR_Filesview(),
    moveExplorer = new IR_MoveExplorer(),
    errorMessage = new IR_ErrorMessage(),

    auditDocToPartCopyID,
    applicationDocToPartCopy1ID,
    file1 = 'FileForCopyTesting',
    file2 = 'FileToPartialCopy',
    copyErrorMsg_changedType = 'document type is not allowed in the destination',
    copyErrorMsg_deletedDoc = 'no longer exists',
    copyErrorMsg2 = 'Unable to copy the following document(s) because:',
    copyErrorMsgMixed = 'Unable to copy the following document(s) and page(s) because:',
    copyErrorMsg_deletedDoc_common = 'Unable to complete copy. Document(s) no longer exists.',
    copyErrorMsg_changedType_common = 'Unable to complete copy. Document type(s) is not allowed in the destination',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.deletePageFromDocumentInFolder(file1, null, 'Audit_Document', '29592312_.jpg')
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, null, 'Application_Document1', '1_.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, null, 'Application_Document1', 'refresh_.txt');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, null, 'Application_Document1', '1c9c98c7429d_.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, 'New_Mail_Folder', 'Miscellaneous_Document', '29592312_.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, 'New_Mail_Folder', 'Miscellaneous_Document', '1c9c98c7429d_.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, 'New_Mail_Folder', 'Miscellaneous_Document', '1_.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, 'New_Mail_Folder', 'Miscellaneous_Document', 'refresh_.txt');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Audit_Document');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Application_Document1');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Application_Document2');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'File_Note_Folder', 'Audit_Document');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'File_Note_Folder', 'Application_Document1');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Agents_Folder_3', 'Miscellaneous_Document');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, null, 'Miscellaneous_Document');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, 'Agents_Folder_3', 'Mail_Document', '1_.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file1, 'Agents_Folder_3', 'Mail_Document', 'refresh_.txt');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Miscellaneous_Document');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Agents_Folder_1', 'Audit_Document');
        })
        .then(function () {
            return fileUtils.changeDocumentType(file1, 'Audit_Document', 'Audit');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Agents_Folder_1', 'Application_Document1');
        })
        .then(function () {
            return fileUtils.changeDocumentType(file1, 'Application_Document1', 'Application');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Agents_Folder_1', 'Application_Document2');
        })
        .then(function () {
            return fileUtils.changeDocumentType(file1, 'Application_Document2', 'Application');
        })
        .then(function () {
            return fileUtils.restoreDocumentByID(auditDocToPartCopyID);
        })
        .then(function () {
            return fileUtils.restoreDocumentByID(applicationDocToPartCopy1ID);
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file2, 'AgentsFolderToPartCopy', 'AuditDocToPartCopy');
        })
        .then(function () {
            return fileUtils.changeDocumentType(file2, 'AuditDocToPartCopy', 'Audit');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file2, 'AgentsFolderToPartCopy', 'ApplicationDocToPartCopy1');
        })
        .then(function () {
            return fileUtils.changeDocumentType(file2, 'ApplicationDocToPartCopy1', 'Application');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file2, 'AgentsFolderToPartCopy', 'ApplicationDocToPartCopy2');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, 'NewMailFolderToPartCopy', 'MiscellaneousDocToPartCopy', '29592312_PartCopy.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, 'NewMailFolderToPartCopy', 'MiscellaneousDocToPartCopy', '1c9c98c7429d_PartCopy.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, 'NewMailFolderToPartCopy', 'MiscellaneousDocToPartCopy', '1_PartCopy.jpg');
        })
        .then(function () {
            return fileUtils.deletePageFromDocumentInFolder(file2, 'NewMailFolderToPartCopy', 'MiscellaneousDocToPartCopy', 'refresh_PartCopy.txt');
        });
        // .then(function () {
        //     return browser.sleep(20000);
        // });
}

if (browser.params.siteBase == 'iis') {

    describe('Copy - Full functionality', function () {

        beforeAll(function () {
            return fileUtils.getDocumentID(file2, 'AuditDocToPartCopy')
                .then(function (result1) {
                    return auditDocToPartCopyID = result1;
                })
                .then(function () {
                    return fileUtils.getDocumentID(file2, 'ApplicationDocToPartCopy1');
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

        it('1-User should be able to copy page to new destination within one file and source and destination should automatically be updated', function () {
            var initialDocument = 'Application_Document1',
                destinationDocument1 = 'Audit_Document',
                page = '29592312_.jpg';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
                })
                .then(fileTree.page(0).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.getItemInColumnByText(1, destinationDocument1).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 page was successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(initialDocument);
                    expect(fileTree.fileTreeNodesByText(page).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument1, 'document');
                })
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(2);
                    expect(fileTree.fileTreeNodesByText(page).count()).toBe(2);
                });
        });

        it('2-User should be able to copy several pages to new destination within one file and source and destination should automatically be updated', function () {
            var initialDocument = 'Audit_Document',
                destinationDocument1 = 'Application_Document1',
                page1 = '1_.jpg',
                page2 = 'refresh_.txt';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
                })
                .then(fileTree.pageByText(page1).click)
                .then(function () {
                    return fileTree.pageByText(page2).ctrlClick();
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.getItemInColumnByText(1, destinationDocument1).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    expect(message).toContain('2 pages were successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.expandedDocuments.count()).toEqual(1);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(initialDocument);
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument1, 'document');
                })
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(2);
                });
        });

        it('3-User should be able to copy several pages from different documents to new destination within one file and source and destination should automatically be updated', function () {
            var initialDocument1 = 'Audit_Document',
                initialDocument2 = 'Application_Document2',
                destinationDocument1 = 'Application_Document1',
                page1 = '1_.jpg',
                page2 = '1c9c98c7429d_.jpg';

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
                .then(moveExplorer.getItemInColumnByText(1, destinationDocument1).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 pages were successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument1, 'document');
                })
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(2);
                });
        });

        it('4-User should be able to copy document to new destination within one file and source and destination should automatically be updated', function () {
            var destinationFolder = 'Underwriting_Info_Folder',
                document = 'Audit_Document';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                });
        });

        it('5-User should be able to copy document to file level within one file and source and destination should automatically be updated', function () {
            var folder1 = 'New_Mail_Folder',
                document = 'Miscellaneous_Document',
                filteredType = 'Audit';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.docTypeButton.click)
                .then(moveExplorer.getDocTypeDropdownElementByText(filteredType).click)
                .then(moveExplorer.getItemInColumnByText(0, file1).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                });
        });


        it('6-User should be able to copy several documents to new destination within one file and source and destination should automatically be updated', function () {
            var destinationFolder = 'Underwriting_Info_Folder',
                document1 = 'Application_Document1',
                document2 = 'Application_Document2';

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
                .then(moveExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document1).count()).toBe(2);
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document2).count()).toBe(2);
                });
        });

        it('7-User should be able to copy several documents from different levels to new destination within one file and source and destination should automatically be updated', function (done) {
            var folder1 = 'New_Mail_Folder';
            var destinationFolder = 'Underwriting_Info_Folder';
            var document1 = 'Miscellaneous_Document';
            var document2 = 'Application_Document2';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(folder1, 'folder');
            browser.waitForAngular();
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            moveExplorer.getItemInColumnByText(1, destinationFolder).click();
            browser.waitForAngular();
            moveExplorer.copyButton.click().then(function () {
                webdriverUtils.waitForGrowl();
                errorMessage.growlNotificationText.then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file1);

                    browser.waitForAngular();
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);

                    webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');

                    browser.waitForAngular();

                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(2);
                    done();
                });
            });
        });

        it('8-User should be able to copy documents and pages to new destination within one file and source and destination should automatically be updated', function (done) {
            var destinationFolder = 'New_Mail_Folder';
            var destinationDocument = 'Miscellaneous_Document';
            var document1 = 'Application_Document1';
            var document2 = 'Application_Document2';
            var page1 = '29592312_.jpg';
            var page2 = '1c9c98c7429d_.jpg';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(document2, 'document');
            webdriverUtils.ctrlClick(fileTree.pageByText(page2));
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            moveExplorer.getItemInColumnByText(1, destinationFolder).click();
            moveExplorer.getItemInColumnByText(2, destinationDocument).click();
            browser.waitForAngular();
            moveExplorer.copyButton.click().then(function () {
                webdriverUtils.waitForGrowl();
                errorMessage.growlNotificationText.then(function (message) {
                    expect(message).toContain('1 document and 1 page were successfully copied to');
                    expect(message).toContain(file1);

                    browser.waitForAngular();
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(0);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(1);

                    webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                    webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');

                    browser.waitForAngular();
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(2);
                    done();
                });
            });
        });

        it('9-User should be able to copy several documents of heterogeneous types to new destination within one file and source and destination should automatically be updated', function (done) {
            var destinationFolder = 'Underwriting_Info_Folder';
            var document1 = 'Audit_Document';
            var document2 = 'Application_Document1';
            var type1 = 'Audit';
            var type2 = 'Application';

            searchUtil.openFile(file1);
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            browser.waitForAngular();
            expect(multiSelectView.multiSelectTitle).toContain('2 items selected');
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            moveExplorer.getItemInColumnByText(1, destinationFolder).click();
            browser.waitForAngular();
            moveExplorer.copyButton.click().then(function () {
                webdriverUtils.waitForGrowl();
                errorMessage.growlNotificationText.then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file1);
                    browser.waitForAngular();
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);

                    webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                    browser.waitForAngular();
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(2);
                    webdriverUtils.selectNodeIconByText(document1);
                    expect(filesArea.documentType).toEqual(type1);
                    webdriverUtils.selectNodeIconByText(document2);
                    expect(filesArea.documentType).toEqual(type2);
                    done();
                });
            });
        });

        it('10-User should be able to copy several documents of heterogeneous types to new destination within one file with changing document type to new one and source and destination should automatically be updated', function () {
            var destinationFolder = 'File_Note_Folder',
                document1 = 'Audit_Document',
                document2 = 'Application_Document1',
                type = 'Note';

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
                .then(moveExplorer.docTypeButton.click)
                .then(function () {
                    return moveExplorer.docTypeInput.sendKeys(type);
                })
                .then(function () {
                    return expect(moveExplorer.docTypeDropdownElement(0).getText()).toEqual(type);
                })
                .then(moveExplorer.docTypeDropdownElement(0).click)
                .then(moveExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 documents were successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(2);
                })
                .then(fileTree.fileTreeNodesByText(document1).get(0).click)
                .then(function () {
                    return expect(filesArea.documentType).toEqual(type);
                })
                .then(fileTree.fileTreeNodesByText(document2).get(0).click)
                .then(function () {
                    return expect(filesArea.documentType).toEqual(type);
                });
        });

        it('11-User should be able to copy document to the deep subfolder within one file and source and destination should automatically be updated', function () {
            var initialFolder = 'New_Mail_Folder',
                destinationSubFolder = 'Agents_Folder_3',
                folder = 'Print_Folder',
                subFolder1 = 'Agents_Folder_1',
                subFolder2 = 'Agents_Folder_2',
                document = 'Miscellaneous_Document';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.getItemInColumnByText(1, folder).click)
                .then(moveExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(moveExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(moveExplorer.getItemInColumnByText(4, destinationSubFolder).click)
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(subFolder1, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(subFolder2, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                });
        });

        it('12-User should be able to copy pages to the document in the deep subfolder within one file and source and destination should automatically be updated', function () {
            var initialDocument = 'Audit_Document',
                destinationDocument1 = 'Mail_Document',
                page1 = '1_.jpg',
                page2 = 'refresh_.txt',
                folder1 = 'Print_Folder',
                subFolder1 = 'Agents_Folder_1',
                subFolder2 = 'Agents_Folder_2',
                subFolder3 = 'Agents_Folder_3';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
                })
                .then(fileTree.pageByText(page1).click)
                .then(function () {
                    return fileTree.pageByText(page2).ctrlClick();
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.getItemInColumnByText(1, folder1).click)
                .then(moveExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(moveExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(moveExplorer.getItemInColumnByText(4, subFolder3).click)
                .then(function () {
                    return moveExplorer.getItemInColumnByText(5, destinationDocument1).waitReady();
                })
                .then(function (el) {
                    return el.click();
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('2 pages were successfully copied to');
                    expect(message).toContain(file1);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(subFolder1, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(subFolder2, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(subFolder3, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument1, 'document');
                })
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(page1).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(2);
                });
        });

        it('13-When user copies pages but clicks Cancel button in the copy explorer the pages should be left at the initial location', function (done) {
            var initialDocument = 'Audit_Document';
            var destinationDocument = 'Application_Document1';
            var page1 = '1_.jpg';
            var page2 = 'refresh_.txt';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
            browser.waitForAngular();
            webdriverUtils.ctrlClick(fileTree.pageByText(page1));
            webdriverUtils.ctrlClick(fileTree.pageByText(page2));
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(1, destinationDocument).click();
            moveExplorer.cancelButton.click();
            browser.waitForAngular();

            expect(fileTree.fileTreeNodesByText(page1).count()).toBe(1);
            expect(fileTree.fileTreeNodesByText(page2).count()).toBe(1);
            webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');
            expect(fileTree.fileTreeNodesByText(page1).count()).toBe(1);
            expect(fileTree.fileTreeNodesByText(page2).count()).toBe(1);
            done();
        });

        it('14-When user copies document but clicks Cancel button in the copy explorer the document should be left at the initial location', function (done) {
            var initialFolder = 'New_Mail_Folder';
            var document = 'Miscellaneous_Document';
            var destinationFolder = 'Underwriting_Info_Folder';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
            webdriverUtils.selectNodeIconByText(document);
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            moveExplorer.getItemInColumnByText(1, destinationFolder).click();
            moveExplorer.cancelButton.click();
            browser.waitForAngular();

            expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
            webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
            expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
            done();
        });

        // ///////////////// Errors on copy  ///////////////////////

        it('15-In case of changing document type to incompatible for destination, copying of document should be performed with initialy selected type and appropriate growl message should be displayed', function () {
            var folder = 'PrintFolderToPartCopy',
                destinationSubFolder = 'AgentsFolderToPartCopy',
                document1 = 'AuditDocToPartCopy',
                changedType = 'Renewal Policy';

            return searchUtil.openFile(file2)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document1);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.getItemInColumnByText(1, folder).click)
                .then(moveExplorer.getItemInColumnByText(2, destinationSubFolder).click)
                .then(function () {
                    return fileUtils.changeDocumentType(file2, document1, changedType);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
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
                    return expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document1).count()).toBe(2);
                });
        });

        it('16-In case of deletting of document, copying of it should not be performed and appropriate growl error message should be displayed', function (done) {
            var folder = 'PrintFolderToPartCopy';
            var destinationSubFolder = 'AgentsFolderToPartCopy';
            var document1 = 'AuditDocToPartCopy';

            searchUtil.openFile(file2);
            webdriverUtils.selectNodeIconByText(document1);
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(1, folder).click();
            moveExplorer.getItemInColumnByText(2, destinationSubFolder).click().then(function () {

                //fileUtils.deleteDocumentInFolder(file2, null, document1);
                fileUtils.deleteDocumentByID(auditDocToPartCopyID);
                browser.waitForAngular();
                moveExplorer.copyButton.click().then(function () {
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain(copyErrorMsg_deletedDoc_common);

                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(0);

                        webdriverUtils.showNodeChildrenByText(folder, 'folder');
                        webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(0);
                        done();
                    });
                });
            });
        });

        it('17-In case of deletting of document, copying of it to the file level should not be performed and appropriate growl error message should be displayed', function (done) {
            var folder = 'PrintFolderToPartCopy';
            var destinationSubFolder = 'AgentsFolderToPartCopy';
            var document1 = 'AuditDocToPartCopy';

            searchUtil.openFile(file2);
            webdriverUtils.selectNodeIconByText(document1);
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(0, file2).click().then(function () {

                //fileUtils.deleteDocumentInFolder(file2, null, document1);
                fileUtils.deleteDocumentByID(auditDocToPartCopyID);
                browser.waitForAngular();
                moveExplorer.copyButton.click().then(function () {
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain(copyErrorMsg_deletedDoc_common);

                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(0);

                        webdriverUtils.showNodeChildrenByText(folder, 'folder');
                        webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(0);
                        done();
                    });
                });
            });
        });

        it('18-In case of failing copy of documents because of same reason (document type changed) correct error message should be displayed', function (done) {
            var folder = 'PrintFolderToPartCopy';
            var destinationSubFolder = 'AgentsFolderToPartCopy';
            var document1 = 'AuditDocToPartCopy';
            var document2 = 'ApplicationDocToPartCopy1';
            var changedType = 'Renewal Policy';

            searchUtil.openFile(file2);
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            browser.waitForAngular();
            expect(multiSelectView.multiSelectTitle).toContain('2 items selected');
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(1, folder).click();
            moveExplorer.getItemInColumnByText(2, destinationSubFolder).click().then(function () {

                fileUtils.changeDocumentType(file2, document1, changedType);
                fileUtils.changeDocumentType(file2, document2, changedType);
                browser.waitForAngular();
                moveExplorer.copyButton.click().then(function () {
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain(copyErrorMsg_changedType_common);
                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);

                        webdriverUtils.showNodeChildrenByText(folder, 'folder');
                        webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');

                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);
                        done();
                    });
                });
            });
        });

        it('19-In case of failing copy of documents because of different reasons correct error message should be displayed', function (done) {
            var folder = 'PrintFolderToPartCopy';
            var destinationSubFolder = 'AgentsFolderToPartCopy';
            var document1 = 'AuditDocToPartCopy';
            var document2 = 'ApplicationDocToPartCopy1';
            var changedType = 'Renewal Policy';

            searchUtil.openFile(file2);
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            browser.waitForAngular();
            expect(multiSelectView.multiSelectTitle).toContain('2 items selected');
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(1, folder).click();
            moveExplorer.getItemInColumnByText(2, destinationSubFolder).click().then(function () {

                fileUtils.changeDocumentType(file2, document1, changedType);
                //fileUtils.deleteDocumentInFolder(file2, null, document2);
                fileUtils.deleteDocumentByID(applicationDocToPartCopy1ID);
                browser.waitForAngular();
                moveExplorer.copyButton.click().then(function () {
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).not.toContain('successfully copied to');
                        expect(message).not.toContain(file2);
                        expect(message).toContain(copyErrorMsg2);
                        expect(message).toContain(document1);
                        expect(message).toContain(copyErrorMsg_changedType);
                        expect(message).toContain(document2);
                        expect(message).toContain(copyErrorMsg_deletedDoc);

                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);

                        webdriverUtils.showNodeChildrenByText(folder, 'folder');
                        webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');

                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);
                        done();
                    });
                });
            });
        });

        // ///////////////// Partial copy  ///////////////////////

        it('20-In case of a partially sucessful copy of documents due to doc type changing user should be navigated to the destination folder and the only copied document is displayd here', function (done) {
            var folder = 'PrintFolderToPartCopy';
            var destinationSubFolder = 'AgentsFolderToPartCopy';
            var document1 = 'AuditDocToPartCopy';
            var document2 = 'ApplicationDocToPartCopy1';
            var document3 = 'ApplicationDocToPartCopy2';
            var changedType = 'Renewal Policy';

            searchUtil.openFile(file2);
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            webdriverUtils.ctrlClick(fileTree.documentByText(document3));
            browser.waitForAngular();
            expect(multiSelectView.multiSelectTitle).toContain('3 items selected');
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(1, folder).click();
            moveExplorer.getItemInColumnByText(2, destinationSubFolder).click().then(function () {

                fileUtils.changeDocumentType(file2, document1, changedType);
                fileUtils.changeDocumentType(file2, document2, changedType);
                browser.waitForAngular();
                moveExplorer.copyButton.click().then(function () {
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain('1 document was successfully copied to');
                        expect(message).toContain(file2);
                        expect(message).toContain(copyErrorMsg2);
                        expect(message).toContain(document1);
                        expect(message).toContain(document2);
                        expect(message).toContain(copyErrorMsg_changedType);

                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document3).count()).toBe(1);

                        webdriverUtils.showNodeChildrenByText(folder, 'folder');
                        webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');

                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document3).count()).toBe(2);
                        done();
                    });
                });
            });

        });

        it('21-In case of a partially sucessful copy of documents due to deletting of documents successfully copied documents should appear in destination folder and not copied - in source folder', function (done) {
            var folder = 'PrintFolderToPartCopy';
            var destinationSubFolder = 'AgentsFolderToPartCopy';
            var document1 = 'AuditDocToPartCopy';
            var document2 = 'ApplicationDocToPartCopy1';
            var document3 = 'ApplicationDocToPartCopy2';

            searchUtil.openFile(file2);
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            webdriverUtils.ctrlClick(fileTree.documentByText(document3));
            browser.waitForAngular();
            expect(multiSelectView.multiSelectTitle).toContain('3 items selected');
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(1, folder).click();
            moveExplorer.getItemInColumnByText(2, destinationSubFolder).click().then(function () {

                //fileUtils.deleteDocumentInFolder(file2, null, document1);
                //fileUtils.deleteDocumentInFolder(file2, null, document2);
                fileUtils.deleteDocumentByID(auditDocToPartCopyID);
                fileUtils.deleteDocumentByID(applicationDocToPartCopy1ID);
                browser.waitForAngular();
                moveExplorer.copyButton.click().then(function () {
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain('1 document was successfully copied to');
                        expect(message).toContain(file2);
                        expect(message).toContain(copyErrorMsg2);
                        expect(message).toContain(document1);
                        expect(message).toContain(document2);
                        expect(message).toContain(copyErrorMsg_deletedDoc);

                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(0);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);
                        expect(fileTree.fileTreeNodesByText(document3).count()).toBe(1);

                        webdriverUtils.showNodeChildrenByText(folder, 'folder');
                        webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');

                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(0);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);
                        expect(fileTree.fileTreeNodesByText(document3).count()).toBe(2);
                        done();
                    });
                });
            });
        });


        it('22-In case of a partially sucessful copy of documents because of different reasons correct error message should be displayed successfully copied documents should appear in destination folder and not copied - in source folder', function (done) {
            var folder = 'PrintFolderToPartCopy';
            var destinationSubFolder = 'AgentsFolderToPartCopy';
            var document1 = 'AuditDocToPartCopy';
            var document2 = 'ApplicationDocToPartCopy1';
            var document3 = 'ApplicationDocToPartCopy2';
            var changedType = 'Renewal Policy';

            searchUtil.openFile(file2);
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            webdriverUtils.ctrlClick(fileTree.documentByText(document3));
            browser.waitForAngular();
            expect(multiSelectView.multiSelectTitle).toContain('3 items selected');
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            moveExplorer.getItemInColumnByText(1, folder).click();
            moveExplorer.getItemInColumnByText(2, destinationSubFolder).click().then(function () {

                fileUtils.changeDocumentType(file2, document1, changedType);
                //fileUtils.deleteDocumentInFolder(file2, null, document2);
                fileUtils.deleteDocumentByID(applicationDocToPartCopy1ID);
                browser.waitForAngular();
                moveExplorer.copyButton.click().then(function () {
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain('1 document was successfully copied to');
                        expect(message).toContain(file2);
                        expect(message).toContain(copyErrorMsg2);
                        expect(message).toContain(document1);
                        expect(message).toContain(copyErrorMsg_changedType);
                        expect(message).toContain(document2);
                        expect(message).toContain(copyErrorMsg_deletedDoc);

                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);
                        expect(fileTree.fileTreeNodesByText(document3).count()).toBe(1);

                        webdriverUtils.showNodeChildrenByText(folder, 'folder');
                        webdriverUtils.showNodeChildrenByText(destinationSubFolder, 'folder');

                        expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                        expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);
                        expect(fileTree.fileTreeNodesByText(document3).count()).toBe(2);
                        done();
                    });
                });
            });
        });

        it('23-In case of a partially sucessful copy of mixed collection because of different reasons correct error message should be displayed and successfully copied documents should appear in destination folder and not copied - in source folder', function () {
            var folder = 'NewMailFolderToPartCopy',
                destinationDocument = 'MiscellaneousDocToPartCopy',
                document1 = 'AuditDocToPartCopy',
                document2 = 'ApplicationDocToPartCopy1',
                document3 = 'ApplicationDocToPartCopy2',
                page3 = '1c9c98c7429d_PartCopy.jpg',
                page1_1 = 'refresh_PartCopy.txt',
                page1_2 = '1_PartCopy.jpg',
                page2 = '29592312_PartCopy.jpg',
                changedType = 'Renewal Policy';

            return searchUtil.openFile(file2)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document3, 'document');
                })
                .then(fileTree.pageByText(page3).click)
                .then(function () {
                    return fileTree.documentByText(document1).ctrlClick();
                })
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(moveExplorer.getItemInColumnByText(1, folder).click)
                .then(moveExplorer.getItemInColumnByText(2, destinationDocument).click)
                .then(function () {
                    return fileUtils.changeDocumentType(file2, document1, changedType);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByID(applicationDocToPartCopy1ID);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    expect(message).toContain('1 document and 1 page were successfully copied to');
                    expect(message).toContain(file2);
                    expect(message).toContain(copyErrorMsgMixed);
                    expect(message).toContain(document2);
                    expect(message).toContain(copyErrorMsg_deletedDoc);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);
                    expect(fileTree.fileTreeNodesByText(page3).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationDocument, 'document');
                })
                .then(function () {
                    expect(fileTree.fileTreeNodesByText(document1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(document2).count()).toBe(0);
                    expect(fileTree.fileTreeNodesByText(page3).count()).toBe(2);
                    expect(fileTree.fileTreeNodesByText(page2).count()).toBe(0);
                    expect(fileTree.fileTreeNodesByText(page1_1).count()).toBe(1);
                    expect(fileTree.fileTreeNodesByText(page1_2).count()).toBe(1);
                });
        });
    });
}