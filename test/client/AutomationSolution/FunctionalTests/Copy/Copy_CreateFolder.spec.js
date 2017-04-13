exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),
    IR_ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    q = require('q'),
    
    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    
    fileTree = new IR_FileTree(),
    navigationBar = new NavigationBar(),
    filesArea = new IR_Filesview(),
    copyExplorer = new IR_MoveExplorer(),
    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    errorMessage = new IR_ErrorMessage(),
    
    file1 = 'CopyFileToCreate',
    file2 = 'FileForAutoTesting',
    newFolder = 'NewFolder',
    newDocument = 'NewDocument',
    fileWithRep = 'FileWithRepFolder',
    fileWithoutFolders = 'FileWithNoFolders',

    isFirst = true;

function findFile(file) {
    return copyExplorer.find_Input.clear()
        .then(function () {
            return copyExplorer.find_Input.sendKeys(file);
        })
        .then(copyExplorer.find_DropdownElement(0).click)
}

function createNewFolder(folderType, folderDescription) {
    return copyExplorer.newFolderDropdown.click()
        .then(copyExplorer.newFolderTypeByText(folderType).click)
        .then(copyExplorer.newlyCreatedFolder.click)
        .then(copyExplorer.newlyCreatedFolder.clear)
        .then(function () {
            return copyExplorer.newlyCreatedFolder.sendKeys(folderDescription);
        })
        .then(function () {
            return copyExplorer.newlyCreatedFolder.waitReady();
        })
        .then(function () {
            return browser.sleep(100);
        });
}

function createNewDocument(docType, docDescription) {
    return copyExplorer.newDocumentDropdown.click()
        .then(copyExplorer.newDocumentTypeByText(docType).click)
        .then(copyExplorer.newlyCreatedDocument.click)
        .then(copyExplorer.newlyCreatedDocument.clear)
        .then(function () {
            return copyExplorer.newlyCreatedDocument.sendKeys(docDescription);
        })
        .then(function () {
            return copyExplorer.newlyCreatedDocument.waitReady();
        })
        .then(function () {
            return browser.sleep(100);
        });
}

function restoreFileStructure() {
    return fileUtils.deleteDocumentInFolder(file1, newFolder, 'ApplicationDocCreateOnCopy')
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file1, newFolder);
        })
        .then(function () {
            return fileUtils.deleteAllPagesFromDocumentInFolder(file2, newFolder, newDocument);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, newDocument);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file2, newFolder);
        })
        .then(function () {
            return fileUtils.deleteAllPagesFromDocumentInFolder(fileWithRep, newFolder, newDocument);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileWithRep, newDocument);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileWithRep, newFolder);
        });
}


describe('Copy - Create Folder', function () {

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

        it('1-New Folder button becomes active when folder can be created on selected level', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var folder1 = 'UnderwritingInfoFolderCreateOnCopy';
            var folder2 = 'PrintFolderCreateOnCopy';

            var folder3 = 'PrintFolder';
            var subFolder1 = 'AgentsFolder1';
            var subFolder2 = 'AgentsFolder2';
            var subFolder3 = 'AgentsFolder3';

            searchUtil.openFile(file1);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(true);
            copyExplorer.getItemInColumnByText(0, file1).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(true);

            copyExplorer.getItemInColumnByText(1, folder1).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            copyExplorer.getItemInColumnByText(1, folder2).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(true);

            findFile(file2);
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(true);
            copyExplorer.getItemInColumnByText(1, folder3).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            copyExplorer.getItemInColumnByText(2, subFolder1).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            copyExplorer.getItemInColumnByText(3, subFolder2).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            copyExplorer.getItemInColumnByText(4, subFolder3).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(true);
            copyExplorer.getItemInColumnByText(3, subFolder2).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            done();
        });

        it('2-New Folder dropdown contains only folder types allowed for the selected level and does not contain non-repeatable folders if they have been created before', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var page = '1_CreateOnCopy.jpg';

            var folder1 = 'Agents';
            var folder2 = 'File Note';
            var folder3 = 'New Mail';
            var folder4 = 'Policy Info';
            var folder5 = 'Reinsurance';

            var folderType1 = 'Agents';
            var folderType2 = 'Policy Info';
            var folderType3 = 'File Note';
            var folderType4 = 'New Mail';
            var folderType5 = 'Reinsurance';
            var folderType6 = 'Exibits';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(document, 'document');
            fileTree.pageByText(page).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            findFile(fileWithRep);
            copyExplorer.getItemInColumnByText(0, fileWithRep).click();
            copyExplorer.find_Input.click();    // workaround because of tooltip
            webdriverUtils.clickOnElement(copyExplorer.newFolderDropdown);
            expect(copyExplorer.newFolderTypesByText(folderType1).count()).toBe(1);
            expect(copyExplorer.newFolderTypesByText(folderType2).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType3).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType4).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType5).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType6).count()).toBe(0);
            copyExplorer.getItemInColumnByText(1, folder1).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            copyExplorer.getItemInColumnByText(1, folder2).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            copyExplorer.getItemInColumnByText(1, folder3).click();
            webdriverUtils.clickOnElement(copyExplorer.newFolderDropdown);
            expect(copyExplorer.newFolderTypesByText(folderType1).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType2).count()).toBe(1);
            expect(copyExplorer.newFolderTypesByText(folderType3).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType4).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType5).count()).toBe(0);
            expect(copyExplorer.newFolderTypesByText(folderType6).count()).toBe(0);
            copyExplorer.getItemInColumnByText(2, folder4).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            copyExplorer.getItemInColumnByText(2, folder5).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            done();
        });

        it('3-New Folder dropdown should be disabled if folders are prohibited according to template', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var page = '1_CreateOnCopy.jpg';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(document, 'document');
            fileTree.pageByText(page).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            findFile(fileWithoutFolders);
            copyExplorer.getItemInColumnByText(0, fileWithoutFolders).click();
            expect(copyExplorer.newFolderDropdown.isEnabled()).toBe(false);
            done();
        });

        it('4-New folder textedit should appear in the selected level using default type name', function () {
            var document = 'ApplicationDocCreateOnCopy',
                folder1 = 'PrintFolderCreateOnCopy',

                folder2 = 'PrintFolder',
                subFolder1 = 'AgentsFolder1',
                subFolder2 = 'AgentsFolder2',
                subFolder3 = 'AgentsFolder3',

                type1 = 'Agents';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.newFolderDropdown.click)
                .then(copyExplorer.newFolderDropdownElement(0).click)
                .then(function () {
                    return copyExplorer.newlyCreatedFolderColumn();
                })
                .then(function (num) {
                    return expect(num).toEqual(3);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(type1);
                })
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder2).click)
                .then(copyExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(copyExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(copyExplorer.getItemInColumnByText(4, subFolder3).click)
                .then(copyExplorer.newFolderDropdown.click)
                .then(copyExplorer.newFolderTypeByText(type1).click)
                .then(function () {
                    return copyExplorer.newlyCreatedFolderColumn();
                })
                .then(function (num) {
                    return expect(num).toEqual(6);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(type1);
                })
        });

        it('5-User should be able to create folders, subfolders and documents and change their default names to custom', function (done) {
            var type1 = 'Print',
                type2 = 'Agents',
                type3 = 'Application',
                newlyCreatedFldr1 = 'My' + type1 + 'Folder1',
                newlyCreatedFldr2 = 'My' + type2 + 'Folder2',
                newlyCreatedDoc3 = 'My' + type3 + 'Doc3',

                document = 'ApplicationDocCreateOnCopy',
                page = '1_CreateOnCopy.jpg';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(document, 'document');
            fileTree.pageByText(page).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            copyExplorer.getItemInColumnByText(0, file1).click();
            copyExplorer.find_Input.click();    // workaround because of tooltip
            createNewFolder(type1, newlyCreatedFldr1).then(function () {
                expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(newlyCreatedFldr1);
                createNewFolder(type2, newlyCreatedFldr2).then(function () {
                    expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(newlyCreatedFldr2);
                    createNewDocument(type3, newlyCreatedDoc3).then(function () {
                        expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(newlyCreatedDoc3);
                        done();
                    });
                });
            });
        });

        it('6-When user creates new folder changes default folder name but selects new location the previously created folder should disappear', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var folder1 = 'PrintFolderCreateOnCopy';
            var folder2 = 'UnderwritingInfoFolderCreateOnCopy';

            var folder3 = 'PrintFolder';
            var subFolder1 = 'AgentsFolder1';
            var subFolder2 = 'AgentsFolder2';
            var subFolder3 = 'AgentsFolder3';

            var type1 = 'Agents';
            var newlyCreatedFldr1 = 'My' + type1 + 'Folder1';
            var newlyCreatedFldr2 = 'My' + type1 + 'Folder2';

            searchUtil.openFile(file1);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            copyExplorer.getItemInColumnByText(1, folder1).click();
            copyExplorer.find_Input.click();    // workaround because of tooltip

            copyExplorer.getColumns.count().then(function (initialCount1) {
                createNewFolder(type1, newlyCreatedFldr1).then(function () {
                    copyExplorer.newlyCreatedFolderColumn().then(function (firstFldrColumnNumber) {

                        expect(copyExplorer.getColumns.count()).toEqual(initialCount1 + 1);
                        expect(firstFldrColumnNumber).toEqual(3);
                        expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(newlyCreatedFldr1);

                        copyExplorer.getItemInColumnByText(1, folder2).click();
                        copyExplorer.getItemInColumnByText(1, folder1).click();
                        expect(copyExplorer.getColumns.count()).toEqual(initialCount1);

                        findFile(file2).then(function () {
                            copyExplorer.getItemInColumnByText(1, folder3).click();
                            copyExplorer.getItemInColumnByText(2, subFolder1).click();
                            copyExplorer.getItemInColumnByText(3, subFolder2).click();
                            copyExplorer.getItemInColumnByText(4, subFolder3).click();
                            copyExplorer.getColumns.count().then(function (initialCount2) {

                                createNewFolder(type1, newlyCreatedFldr2).then(function () {
                                    copyExplorer.newlyCreatedFolderColumn().then(function (secondFldrColumnNumber) {
                                        expect(copyExplorer.getColumns.count()).toEqual(initialCount2 + 1);
                                        expect(secondFldrColumnNumber).toEqual(6);
                                        expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(newlyCreatedFldr2);

                                        findFile(file1);
                                        findFile(file2);
                                        copyExplorer.getItemInColumnByText(1, folder3).click();
                                        copyExplorer.getItemInColumnByText(2, subFolder1).click();
                                        copyExplorer.getItemInColumnByText(3, subFolder2).click();
                                        copyExplorer.getItemInColumnByText(4, subFolder3).click();
                                        expect(copyExplorer.getColumns.count()).toEqual(initialCount2);
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('7-When user creates new folder but clicks Cancel button in the copy explorer the new folder should not be created', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var folder1 = 'PrintFolderCreateOnCopy';
            var type1 = 'Agents';
            var newlyCreatedFldr1 = 'My' + type1 + 'Folder1';

            searchUtil.openFile(file1);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            copyExplorer.getItemInColumnByText(1, folder1).click();
            createNewFolder(type1, newlyCreatedFldr1).then(function () {
                expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(newlyCreatedFldr1);
                copyExplorer.cancelButton.click();
                browser.waitForAngular();

                fileTree.fileNumber.click();
                webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                expect(fileTree.folderByText(newlyCreatedFldr1).isPresent()).toBe(false);
                done();
            });
        });

        it('8-New Folder is only actually created within current file once the COPY button is clicked and docment should be copied', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var folder1 = 'PrintFolderCreateOnCopy';
            var type1 = 'Agents';

            searchUtil.openFile(file1);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            copyExplorer.getItemInColumnByText(1, folder1).click();
            createNewFolder(type1, newFolder).then(function () {
                copyExplorer.copyButton.click();
                webdriverUtils.waitForGrowl();
                errorMessage.growlNotificationText.then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(file1);
                    browser.waitForAngular();

                    expect(fileTree.fileNumber.getText()).toEqual(file1.toUpperCase());
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
                    webdriverUtils.showNodeChildrenByText(folder1, 'folder');

                    expect(fileTree.expandedFolders.count()).toEqual(1);
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(folder1);
                    expect(fileTree.folderByText(newFolder).isPresent()).toBe(true);

                    webdriverUtils.showNodeChildrenByText(newFolder, 'folder');
                    expect(fileTree.expandedFolders.count()).toEqual(2);
                    expect(fileTree.expandedFolders.get(1).getText()).toEqual(newFolder);
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                    done();
                });
            });
        });

        it('9-New Folder is only created for a new file once the COPY button is clicked and page should be copied to new document in a new folder', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var page = '1_CreateOnCopy.jpg';

            var folder1 = 'PrintFolder';
            var subFolder1 = 'AgentsFolder1';
            var subFolder2 = 'AgentsFolder2';
            var subFolder3 = 'AgentsFolder3';

            var folderType = 'Agents';
            var documentType = 'Audit';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(document, 'document');
            fileTree.pageByText(page).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            findFile(file2);
            copyExplorer.getItemInColumnByText(1, folder1).click();
            copyExplorer.getItemInColumnByText(2, subFolder1).click();
            copyExplorer.getItemInColumnByText(3, subFolder2).click();
            copyExplorer.getItemInColumnByText(4, subFolder3).click();

            createNewFolder(folderType, newFolder).then(function () {
                createNewDocument(documentType, newDocument).then(function () {
                    copyExplorer.copyButton.click();
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain('1 page was successfully copied to');
                        expect(message).toContain(file2);
                        browser.waitForAngular();
                        browser.sleep(2000);
                        
                        searchUtil.reopenFile(file2);
                        browser.waitForAngular();
                        webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                        webdriverUtils.showNodeChildrenByText(subFolder1, 'folder');
                        webdriverUtils.showNodeChildrenByText(subFolder2, 'folder');
                        webdriverUtils.showNodeChildrenByText(subFolder3, 'folder');
                        expect(fileTree.fileTreeNodesByText(newFolder).count()).toBe(1);
                        webdriverUtils.showNodeChildrenByText(newFolder, 'folder');
                        expect(fileTree.fileTreeNodesByText(newDocument).count()).toBe(1);
                        webdriverUtils.showNodeChildrenByText(newDocument, 'document');
                        expect(fileTree.pageByText(page).isPresent()).toBe(true);
                        done();
                    });
                });
            });
        });

        it('10-New Repeatable Folder on file level is only created for a new file once the COPY button is clicked and page should be copied to new document in a new repeatable folder', function (done) {
            var document = 'ApplicationDocCreateOnCopy';
            var page = '1_CreateOnCopy.jpg';

            var folderType = 'Agents';
            var documentType = 'Audit';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(document, 'document');
            fileTree.pageByText(page).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            findFile(fileWithRep);
            copyExplorer.getItemInColumnByText(0, fileWithRep).click();
            copyExplorer.find_Input.click();    // workaround because of tooltip
            createNewFolder(folderType, newFolder).then(function () {
                createNewDocument(documentType, newDocument).then(function () {
                    copyExplorer.copyButton.click();
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain('1 page was successfully copied to');
                        expect(message).toContain(fileWithRep);
                        browser.waitForAngular();
                        browser.sleep(2000);

                        searchUtil.reopenFile(fileWithRep);
                        browser.waitForAngular();
                        expect(fileTree.fileTreeNodesByText(newFolder).count()).toBe(1);
                        webdriverUtils.showNodeChildrenByText(newFolder, 'folder');
                        expect(fileTree.fileTreeNodesByText(newDocument).count()).toBe(1);
                        webdriverUtils.showNodeChildrenByText(newDocument, 'document');
                        expect(fileTree.pageByText(page).isPresent()).toBe(true);
                        done();
                    });
                });
            });
        });

        it('11-New not-repeatable folder on file level is only created for a new file once the COPY button is clicked and mixed collection should be copied to new document' +
            'and it should not be possible to create one more not-repeatable folder', function () {
            var document = 'ApplicationDocCreateOnCopy',
                document2 = 'HelpDoc_CreateOnCopy',
                page = '1_CreateOnCopy.jpg',
                page1 = 'Page1_CreateOnCopy',
                page2 = 'Page2_CreateOnCopy',

                folderType = 'Premium Finance',
                documentType = 'Application';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(function () {
                    return fileTree.documentByText(document2).ctrlClick();
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(fileWithRep);
                })
                .then(copyExplorer.getItemInColumnByText(0, fileWithRep).click)
                .then(copyExplorer.find_Input.click)
                .then(function () {
                    return createNewFolder(folderType, newFolder);
                })
                .then(function () {
                    return createNewDocument(documentType, newDocument);
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    expect(message).toContain('1 document and 1 page were successfully copied to');
                    expect(message).toContain(fileWithRep);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(fileWithRep);
                })
                .then(copyExplorer.getItemInColumnByText(0, fileWithRep).click)
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.newFolderDropdown.click)
                .then(function () {
                    return expect(copyExplorer.newFolderTypesByText(folderType).count()).toBe(0);
                })
                .then(copyExplorer.cancelButton.click)
                .then(function () {
                    return searchUtil.reopenFile(fileWithRep);
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(newFolder).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(newFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(newDocument).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(newDocument, 'document');
                })
                .then(function () {
                    expect(fileTree.pageByText(page).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                    expect(fileTree.pageByText(page2).isPresent()).toBe(true);
                });
        });

    }
});