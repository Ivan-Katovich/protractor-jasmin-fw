
exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_copyExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    IR_ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    searchUtil = require('../../BusinessProcess/Search.js'),
    q = require('q'),
    helper = require('../../utils/helper.js'),

    fileTree = new IR_FileTree(),
    navigationBar = new NavigationBar(),
    filesArea = new IR_Filesview(),
    copyExplorer = new IR_copyExplorer(),
    errorMessage = new IR_ErrorMessage(),
    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),

    file1 = 'FileForMoveTesting',
    file2 = 'FileForAutoTesting',
    newDocument = 'NewDocument',

    isFirst = true;


if (browser.params.siteBase == 'iis') {

    describe('Copy - Create Document', function () {

        function findFile(file) {
            return copyExplorer.find_Input.clear()
                .then(function () {
                    return copyExplorer.find_Input.sendKeys(file);
                })
                .then(copyExplorer.find_DropdownElement(0).click);
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
            return fileUtils.deleteAllPagesFromDocumentInFolder(file1, 'New Mail Folder', newDocument)
                .then(function () {
                    return fileUtils.deleteAllPagesFromDocumentInFolder(file2, 'PrintFolder', newDocument);
                })
                .then(function () {
                    return fileUtils.deleteAllPagesFromDocumentInFolder(file1, null, newDocument);
                })
                .then(function () {
                    return fileUtils.deleteAllPagesFromDocumentInFolder(file2, null, newDocument);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(file1, newDocument);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(file2, newDocument);
                });
        }

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

        it('1-New Document button becomes active when documents can be created in selected folder', function () {
            var document1 = 'ApplicationDocument1',
                document2 = 'NoteDocument',
                page = '29592312.jpg',
                folder1 = 'Print Folder',
                folder2 = 'File Note Folder',

                folder3 = 'PrintFolder',
                subFolder1 = 'AgentsFolder1',
                subFolder2 = 'AgentsFolder2',
                subFolder3 = 'AgentsFolder3',
                document3 = 'Mail Document';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(false);
                })
                .then(copyExplorer.getItemInColumnByText(0, file1).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder2).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(2, document2).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(false);
                })
                .then(function () {
                    return findFile(file2);
                })
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder3).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(4, subFolder3).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(true);
                })
                .then(copyExplorer.getItemInColumnByText(5, document3).click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdown.isEnabled()).toBe(false);
                });
        });

        it('2-New document dropdown contains only document types allowed for the selcted folder', function () {
            var document1 = 'ApplicationDocument1',
                page = '29592312.jpg',
                folder1 = 'File Note Folder',
                folder2 = 'New Mail Folder',
                folder3 = 'Policy Info Folder',

                folder4 = 'PrintFolder',
                subFolder1 = 'AgentsFolder1',

                type1 = 'Note',
                type2 = 'Miscellaneous',
                type3 = 'Endorsement DEC',
                type4 = 'Original Policy',
                type5 = 'Renewal Policy',
                type6 = 'Application',
                type7 = 'Audit',
                type8 = 'Format_Native',
                type9 = 'Format_withAnnotations',
                type10 = 'Format_withoutAnnotations',
                type11 = 'Mail';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(0, file1).click)
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(function () {
                    expect(copyExplorer.newDocumentTypes.count()).toEqual(3);
                    expect(copyExplorer.newDocumentDropdownElement(0).getText()).toEqual(type6);
                    expect(copyExplorer.newDocumentDropdownElement(1).getText()).toEqual(type7);
                    expect(copyExplorer.newDocumentDropdownElement(2).getText()).toEqual(type5);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(function () {
                    expect(copyExplorer.newDocumentTypes.count()).toEqual(1);
                    expect(copyExplorer.newDocumentDropdownElement(0).getText()).toEqual(type1);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder2).click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(function () {
                    expect(copyExplorer.newDocumentTypes.count()).toEqual(1);
                    expect(copyExplorer.newDocumentDropdownElement(0).getText()).toEqual(type2);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder3).click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(function () {
                    expect(copyExplorer.newDocumentTypes.count()).toEqual(3);
                    expect(copyExplorer.newDocumentDropdownElement(0).getText()).toEqual(type3);
                    expect(copyExplorer.newDocumentDropdownElement(1).getText()).toEqual(type4);
                    expect(copyExplorer.newDocumentDropdownElement(2).getText()).toEqual(type5);
                })
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(0, file2).click)
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(function () {
                    expect(copyExplorer.newDocumentTypes.count()).toEqual(3);
                    expect(copyExplorer.newDocumentDropdownElement(0).getText()).toEqual(type6);
                    expect(copyExplorer.newDocumentDropdownElement(1).getText()).toEqual(type7);
                    expect(copyExplorer.newDocumentDropdownElement(2).getText()).toEqual(type5);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder4).click)
                .then(copyExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(function () {
                    expect(copyExplorer.newDocumentTypes.count()).toEqual(6);
                    expect(copyExplorer.newDocumentDropdownElement(0).getText()).toEqual(type6);
                    expect(copyExplorer.newDocumentDropdownElement(1).getText()).toEqual(type7);
                    expect(copyExplorer.newDocumentDropdownElement(2).getText()).toEqual(type8);
                    expect(copyExplorer.newDocumentDropdownElement(3).getText()).toEqual(type9);
                    expect(copyExplorer.newDocumentDropdownElement(4).getText()).toEqual(type10);
                    expect(copyExplorer.newDocumentDropdownElement(5).getText()).toEqual(type11);
                });
        });


        it('3-New document textedit should appear in the selected folder location using default type name', function () {
            var document1 = 'ApplicationDocument2',
                page = '1c9c98c7429d.jpg',
                folder1 = 'File Note Folder',
                folder2 = 'Policy Info Folder',

                folder4 = 'PrintFolder',
                subFolder1 = 'AgentsFolder1',
                subFolder2 = 'AgentsFolder2',

                type1 = 'Note',
                type2 = 'Renewal Policy',
                type3 = 'Format_Native';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(copyExplorer.newDocumentDropdownElement(0).click)
                .then(function () {
                    return copyExplorer.newlyCreatedDocumentColumn();
                })
                .then(function (num) {
                    return expect(num).toEqual(3);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(type1);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder2).click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(copyExplorer.newDocumentDropdownElement(2).click)
                .then(function () {
                    return copyExplorer.newlyCreatedDocumentColumn();
                })
                .then(function (num) {
                    return expect(num).toEqual(3);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(type2);
                })
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder4).click)
                .then(copyExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(copyExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(copyExplorer.newDocumentTypeByText(type3).click)
                .then(function () {
                    return copyExplorer.newlyCreatedDocumentColumn();
                })
                .then(function (num) {
                    return expect(num).toEqual(5);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(type3);
                })
                .then(copyExplorer.getItemInColumnByText(0, file2).click)
                .then(copyExplorer.find_Input.click)
                .then(copyExplorer.newDocumentDropdown.click)
                .then(copyExplorer.newDocumentTypeByText(type2).click)
                .then(function () {
                    return copyExplorer.newlyCreatedDocumentColumn();
                })
                .then(function (num) {
                    return expect(num).toEqual(2);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(type2);
                });
        });

        it('4-When user creates new document changes defoult document name but selects new folder location the previously created document should disappear', function () {
            var document1 = 'ApplicationDocument2',
                page = '1c9c98c7429d.jpg',
                folder1 = 'File Note Folder',
                folder2 = 'New Mail Folder',

                folder4 = 'PrintFolder',
                subFolder1 = 'AgentsFolder1',
                subFolder2 = 'AgentsFolder2',
                subFolder3 = 'AgentsFolder3',

                type1 = 'Note',
                type2 = 'Miscellaneous',
                type3 = 'Application',

                newlyCreatedDoc1 = 'My' + type1 + 'Doc',
                newlyCreatedDoc2 = 'My' + type2 + 'Doc',
                newlyCreatedDoc3 = 'My' + type3 + 'Doc',

                firstDocColumnNumber,
                secondDocColumnNumber,
                thirdDocColumnNumber;

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(copyExplorer.find_Input.click)
                .then(function () {
                    return createNewDocument(type1, newlyCreatedDoc1);
                })
                .then(function () {
                    return copyExplorer.newlyCreatedDocumentColumn();
                })
                .then(function (num) {
                    firstDocColumnNumber = num;
                    return expect(firstDocColumnNumber).toEqual(3);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(newlyCreatedDoc1);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder2).click)
                .then(function () {
                    return createNewDocument(type2, newlyCreatedDoc2);
                })
                .then(function () {
                    return copyExplorer.newlyCreatedDocumentColumn();
                })
                .then(function (num) {
                    secondDocColumnNumber = num;
                    return expect(secondDocColumnNumber).toEqual(3);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(newlyCreatedDoc2);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(function () {
                    return expect(copyExplorer.getItemInColumnByText(firstDocColumnNumber - 1, newlyCreatedDoc1).isPresent()).toBe(false);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder2).click)
                .then(function () {
                    return expect(copyExplorer.getItemInColumnByText(secondDocColumnNumber - 1, newlyCreatedDoc2).isPresent()).toBe(false);
                })
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder4).click)
                .then(copyExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(copyExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(copyExplorer.getItemInColumnByText(4, subFolder3).click)
                .then(function () {
                    return createNewDocument(type3, newlyCreatedDoc3);
                })
                .then(function () {
                    return copyExplorer.newlyCreatedDocumentColumn();
                })
                .then(function (num) {
                    thirdDocColumnNumber = num;
                    return expect(thirdDocColumnNumber).toEqual(6);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(newlyCreatedDoc3);
                })
                .then(function () {
                    return findFile(file1);
                })
                .then(function () {
                    return findFile(file2)
                })
                .then(copyExplorer.getItemInColumnByText(1, folder4).click)
                .then(copyExplorer.getItemInColumnByText(2, subFolder1).click)
                .then(copyExplorer.getItemInColumnByText(3, subFolder2).click)
                .then(copyExplorer.getItemInColumnByText(4, subFolder3).click)
                .then(function () {
                    return expect(copyExplorer.getItemInColumnByText(thirdDocColumnNumber - 1, newlyCreatedDoc3).isPresent()).toBe(false);
                });
        });

        it('5-When user creates new document but clicks Cancel button in the Copy explorer the new document should not be created', function () {
            var document1 = 'ApplicationDocument2',
                page = '1c9c98c7429d.jpg',
                folder1 = 'New Mail Folder',
                type1 = 'Miscellaneous',
                newlyCreatedDoc1 = 'My' + type1 + 'Doc';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(function () {
                    return createNewDocument(type1, newlyCreatedDoc1);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(newlyCreatedDoc1);
                })
                .then(copyExplorer.cancelButton.click)
                .then(fileTree.fileNumber.click)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                })
                .then(function () {
                    return expect(fileTree.documentByText(newlyCreatedDoc1).isPresent()).toBe(false);
                });
        });

        it('6-New Document is only actually created once the COPY button is clicked and pages should be moved', function () {
            var document1 = 'AuditDocument',
                page1 = '1.jpg',
                page2 = 'refresh.txt',
                folder1 = 'New Mail Folder',
                type1 = 'Miscellaneous';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page1).click)
                .then(function () {
                    return fileTree.pageByText(page2).ctrlClick();
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(function () {
                    return createNewDocument(type1, newDocument);
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
                    expect(fileTree.expandedFolders.get(0).getText()).toEqual(folder1);
                    expect(fileTree.expandedDocuments.count()).toEqual(2);
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(newDocument);
                    expect(fileTree.selectedDocument(0).getText()).toContain(newDocument);
                    expect(fileTree.pagesByText(page1).count()).toEqual(2);
                    expect(fileTree.pagesByText(page2).count()).toBe(2);
                });
        });

        it('7-New Document is only created for a different file once the COPY button is clicked and pages should be moved', function () {
            var document1 = 'ApplicationDocument1',
                page1 = '29592312.jpg',
                folder1 = 'PrintFolder',
                type1 = 'Audit';

            return searchUtil.openFile(file1)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page1).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(1, folder1).click)
                .then(function () {
                    return createNewDocument(type1, newDocument);
                })
                .then(copyExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    expect(message).toContain('1 page was successfully copied to');
                    expect(message).toContain(file2);
                })
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return browser.waitForAngular(); // TODO can be an error
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(newDocument).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(newDocument, 'document');
                })
                .then(function () {
                    return expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                });
        });

        it('8-New Document on the file level is only actually created once the COPY button is clicked and pages should be moved', function () {
            var document1 = 'AuditDocument',
                page1 = '1.jpg',
                page2 = 'refresh.txt',
                type1 = 'Application';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page1).click)
                .then(function () {
                    return fileTree.pageByText(page2).ctrlClick();
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(0, file1).click)
                .then(copyExplorer.find_Input.click)
                .then(function () {
                    return createNewDocument(type1, newDocument)
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
                    expect(message).toContain('2 pages were successfully copied to');
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
                    expect(fileTree.expandedDocuments.get(0).getText()).toContain(newDocument);
                    expect(fileTree.selectedDocument(0).getText()).toContain(newDocument);
                    expect(fileTree.pagesByText(page1).count()).toEqual(2);
                    expect(fileTree.pagesByText(page2).count()).toBe(2);
                });
        });

        it('9-New Document on file level is only created for a new file once the COPY button is clicked and pages should be moved', function () {
            var document1 = 'ApplicationDocument1',
                page1 = '29592312.jpg',
                type1 = 'Audit';

            return searchUtil.openFile(file1)
                .then(function () {
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return searchUtil.displayOpenedFile(file1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document1, 'document');
                })
                .then(fileTree.pageByText(page1).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return findFile(file2);
                })
                .then(copyExplorer.getItemInColumnByText(0, file2).click)
                .then(copyExplorer.find_Input.click)
                .then(function () {
                    return createNewDocument(type1, newDocument);
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
                    return searchUtil.reopenFile(file2);
                })
                .then(function () {
                    return browser.waitForAngular(); // TODO can be an error
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(newDocument).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(newDocument, 'document');
                })
                .then(function () {
                    return expect(fileTree.pageByText(page1).isPresent()).toBe(true);
                });
        });
    });
}