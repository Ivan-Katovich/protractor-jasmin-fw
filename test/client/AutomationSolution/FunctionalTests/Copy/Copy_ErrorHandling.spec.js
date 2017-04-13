exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),
    q = require('q'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    helper = require('../../utils/helper.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    errorMessage = new IR_ErrorMessage(),
    filesArea = new IR_Filesview(),
    moveExplorer = new IR_MoveExplorer(),
    file = 'MoveErrorHandling',
    file2 = 'FileForMoveTesting',
    frozenFile = 'FrozenFile',
    itemRemovedMessage = 'The item(s) you are working with is not available any more. Please refresh the data.',
    fileIsFrozenMessage = 'Unable to complete copy. File is frozen.',
    noLongerExistsMessage = 'The selected item no longer exists. The data was refreshed. Please try again.',

    isFirst = true;


if (browser.params.siteBase == 'iis') {

    describe('Copy Error Handling', function () {

        function restoreFileStructure() {
            return fileUtils.restoreFileByDescription(file)
                .then(function () {
                    return fileUtils.restoreDocumentByDescription(file, 'Print');
                })
                .then(function () {
                    return fileUtils.restoreDocumentByDescription(file, 'Finance');
                })
                .then(function () {
                    return fileUtils.restoreDocumentByDescription(file, 'Application');
                })
                .then(function () {
                    return fileUtils.restoreDocumentByDescription(file, 'ApplicationPrint');
                })
                .then(function () {
                    return fileUtils.restoreDocumentByDescription(file, 'ApplicationFinance');
                })
                .then(function () {
                    return fileUtils.unfreezeFile(frozenFile);
                })
                .then(function () {
                    return fileUtils.deletePage(frozenFile, 'Note', '1c9c98c7429d.jpg');
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(frozenFile, 'Bind Request');
                });
                // .then(function () {
                //     return browser.sleep(2000);
                // });
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


        //error handling on clicking copy from the tree if parent levels were deleted 

        it('If user selects a document and clicks Copy button while the file has already been deleted it should display appropriate error message', function () {
            var parentFolder = 'Print';

            return searchUtil.openFile(file,'Name')
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText('Audit');
                })
                .then(function () {
                    return fileUtils.deleteFileByDescription(file);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    return expect(message).toContain(itemRemovedMessage);
                })
                .then(function () {
                    return errorMessage.growlNotificationButton.click();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(0);
                });
        });

        it('If user selects a page and clicks Copy button while the file has already been deleted it should display appropriate error message', function () {
            var parentFolder = 'Print',
                parentDoc = 'ApplicationPrint';

            searchUtil.openFile(file,'Name');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.page(0)).then(function () {
                    fileTree.page(0).click().then(function () {
                        browser.sleep(1000).then(function () {
                            fileUtils.deleteFileByDescription(file);
                            filesArea.pageActionsButton.click();
                            docPageActionsDropdown.copyAction.click().then(function () {
                                webdriverUtils.waitForGrowl();
                                errorMessage.growlNotificationText.then(function (message) {
                                    expect(message).toContain(itemRemovedMessage);
                                    errorMessage.growlNotificationButton.click();
                                    browser.waitForAngular();
                                    var elements = element.all(by.className('modal-body'));
                                    expect(elements.count()).toEqual(0);
                                });
                            });
                        });
                    });
                });
            });
        });

        it('If user selects a document and clicks Copy button while the parent folder has already been deleted it should display appropriate error message', function () {
            var parentFolder = 'Print';

            return searchUtil.openFile(file,'Name')
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText('Audit');
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(file, parentFolder);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    return expect(message).toContain(itemRemovedMessage);
                })
                .then(function () {
                    return errorMessage.growlNotificationButton.click();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(0);
                });
        });

        it('If user selects a page and clicks Copy button while the parent folder has already been deleted it should display appropriate error message', function () {
            var parentFolder = 'Print';
            var parentDoc = 'ApplicationPrint';
            searchUtil.openFile(file,'Name');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.page(0)).then(function () {
                    fileTree.page(0).click().then(function () {
                        browser.sleep(1000).then(function () {
                            fileUtils.deleteDocumentByDescription(file, parentFolder);
                            filesArea.pageActionsButton.click();
                            docPageActionsDropdown.copyAction.click().then(function () {
                                webdriverUtils.waitForGrowl();
                                errorMessage.growlNotificationText.then(function (message) {
                                    expect(message).toContain(itemRemovedMessage);
                                    errorMessage.growlNotificationButton.click();
                                    browser.waitForAngular();
                                    var elements = element.all(by.className('modal-body'));
                                    expect(elements.count()).toEqual(0);
                                });
                            });
                        });
                    });
                });
            });
        });

        it('If user selects a page and clicks Copy button while the parent document has already been deleted it should display appropriate error message', function () {
            var parentFolder = 'Print';
            var parentDoc = 'ApplicationPrint';
            searchUtil.openFile(file,'Name');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.page(0)).then(function () {
                    fileTree.page(0).click().then(function () {
                        browser.sleep(1000).then(function () {
                            fileUtils.deleteDocumentByDescription(file, parentDoc);
                            browser.sleep(1000);
                            filesArea.pageActionsButton.click();
                            docPageActionsDropdown.copyAction.click().then(function () {
                                webdriverUtils.waitForGrowl();
                                errorMessage.growlNotificationText.then(function (message) {
                                    expect(message).toContain(itemRemovedMessage);
                                    errorMessage.growlNotificationButton.click();
                                    browser.waitForAngular();
                                    var elements = element.all(by.className('modal-body'));
                                    expect(elements.count()).toEqual(0);
                                });
                            });
                        });
                    });
                });
            });
        });

        //error handling on navigation in copy explorer if file was deleted

        it('If user selects a document for copying and do some Navigation in Copy Explorer while the file has already been deleted it should display appropriate error message', function () {
            var parentFolder = 'Print';
            var newFolder = 'Finance';
            searchUtil.openFile(file,'Name');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText('ApplicationPrint');
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click().then(function () {
                docPageActionsDropdown.copyAction.click().then(function () {
                    moveExplorer.getItemInColumnByText(1, newFolder).waitReady().then(function () {
                        fileUtils.deleteFileByDescription(file);
                        browser.sleep(1000);
                        moveExplorer.getItemInColumnByText(1, newFolder).click();
                        webdriverUtils.waitForGrowl();
                        errorMessage.growlNotificationText.then(function (message) {
                            expect(message).toContain(itemRemovedMessage);
                            errorMessage.growlNotificationButton.click();
                            browser.waitForAngular();
                            var elements = element.all(by.className('modal-body'));
                            expect(elements.count()).toEqual(0);
                        });
                    });
                });
            });
        });

        //error handling on navigation in copy explorer if item is deleted before selected
        it('If user selects a document for copying and, before clicking a folder in copy explorer the folder is deleted, should display appropriate error message', function () {
            var parentFolder = 'Print',
                newFolder = 'Finance';

            return searchUtil.openFile(file,'Name')
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText('ApplicationPrint');
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return moveExplorer.getItemInColumnByText(1, newFolder).waitReady();
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(file, newFolder);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(file, parentFolder);
                })
                .then(function () {
                    return fileUtils.deleteDocumentByDescription(file, 'Application');
                })
                .then(function () {
                    return browser.sleep(1000);
                })
                .then(moveExplorer.getItemInColumnByText(1, newFolder).click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText;
                })
                .then(function (message) {
                    return expect(message).toContain(noLongerExistsMessage);
                });
        });

        it('If user selects a page for copying and, before clicking a folder in copy explorer, the folder is deleted, should display appropriate error message', function () {
            var parentFolder = 'Print';
            var parentDoc = 'ApplicationPrint';
            var newFolder = 'Finance';
            searchUtil.openFile(file,'Name');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document').then(function () {
                fileTree.page(0).click().then(function () {
                    browser.waitForAngular();
                    filesArea.pageActionsButton.click();
                    docPageActionsDropdown.copyAction.click().then(function () {
                        browser.sleep(1000).then(function () {
                            fileUtils.deleteDocumentByDescription(file, parentFolder);
                            fileUtils.deleteDocumentByDescription(file, newFolder);
                            fileUtils.deleteDocumentByDescription(file, 'Application');
                        }).then(function(){
                            return browser.sleep(1000);
                        }).then(function(){
                            moveExplorer.getItemInColumnByText(1, newFolder).click();
                            webdriverUtils.waitForGrowl();
                            errorMessage.growlNotificationText.then(function (message) {
                                expect(message).toContain(noLongerExistsMessage);
                            });
                        });
                    });
                });
            });
        });
        
        //error handling on navigation to a new file in copy explorer if file was deleted

        it('If user selects a page for copying and after searching of another file but before clicking to open other file, the file gets deleted it should display appropriate error message', function () {
            var fileNumber = 'tt',
                initialDocument = 'ApplicationDocument1',
                errMsg1 = 'The file ' + fileNumber + ' ' + file + ' has been deleted..',
                errMsg2 = 'Please select a different file.';

            return searchUtil.openFile(file2,'Name')
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
                })
                .then(fileTree.page(0).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return moveExplorer.find_Input.sendKeys(file);
                })
                .then(function () {
                    return browser.driver.wait(function () {
                        return moveExplorer.find_Dropdown.isPresent()
                            .then(function (is) {
                                return is === true;
                            });
                    },10000);
                })
                .then(function () {
                    return fileUtils.deleteFileByDescription(file);
                })
                .then(moveExplorer.find_DropdownElement(0).click)
                .then(function () {
                    expect(moveExplorer.fileNotFoundMessage).toContain(errMsg1);
                    expect(moveExplorer.fileNotFoundMessage).toContain(errMsg2);
                });
        });

        it('If user selects a document for copying  and after searching of another file but before clicking to open other file, the file gets deleted it should display appropriate error message', function () {
            var fileNumber = 'tt',
                initialDocument = 'ApplicationDocument1',
                errMsg1 = 'The file ' + fileNumber + ' ' + file + ' has been deleted..',
                errMsg2 = 'Please select a different file.';

            return searchUtil.openFile(file2,'Name')
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(initialDocument);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return moveExplorer.find_Input.sendKeys(file);
                })
                .then(function () {
                    return browser.driver.wait(function () {
                        return moveExplorer.find_Dropdown.isPresent()
                            .then(function (is) {
                                return is === true;
                            });
                    },10000);
                })
                .then(function () {
                    return fileUtils.deleteFileByDescription(file);
                })
                .then(moveExplorer.find_DropdownElement(0).click)
                .then(function(){
                    expect(moveExplorer.fileNotFoundMessage).toContain(errMsg1);
                    expect(moveExplorer.fileNotFoundMessage).toContain(errMsg2);
                });
        });

        //error handling for frozen files

        it('If file is frozen and user selects a page for copying to the same file, it should display appropriate error message', function () {
            var parentFolder = 'Reinsurance',
                parentFolder2 = 'Billing Information',
                parentDoc = 'Bind Request',
                newDoc = 'Application';
            searchUtil.openFile(frozenFile,'Name');
            fileUtils.freezeFile(frozenFile, 'XP1');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentFolder2, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document');
            browser.waitForAngular();
            fileTree.page(0).click().then(function () {
                filesArea.pageActionsButton.click();
                docPageActionsDropdown.copyAction.click().then(function () {
                    moveExplorer.getItemInColumnByText(2, newDoc).waitReady().then(function (el) {
                        el.click();
                        browser.sleep(1000);
                        moveExplorer.copyButton.click()
                            .then(function () {
                                webdriverUtils.waitForGrowl();
                                errorMessage.growlNotificationText.then(function (message) {
                                    expect(message).toContain(fileIsFrozenMessage);
                                });
                            });
                    });
                });
            });
        });

        it('If file is frozen and user selects a page for copying to a nonfrozen file, copy should be successfuly performed', function () {
            var parentFolder = 'Reinsurance',
                parentFolder2 = 'Billing Information',
                parentDoc = 'Bind Request',
                destinationFile = 'FileToCopy',
                destinationFolder = 'FileNote',
                destinationDoc = 'NoteDoc';
            searchUtil.openFile(frozenFile,'Name');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentFolder2, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document');
            browser.waitForAngular();
            fileTree.page(0).click().then(function () {
                filesArea.pageActionsButton.click();
                docPageActionsDropdown.copyAction.click().then(function () {
                    browser.sleep(1000).then(function () {
                        moveExplorer.find_Input.sendKeys(destinationFile);
                        browser.waitForAngular();
                        moveExplorer.find_ResultItemByFileName(destinationFile).click();
                        browser.waitForAngular();
                        moveExplorer.getItemInColumnByText(1, destinationFolder).click();
                        browser.waitForAngular();
                        moveExplorer.getItemInColumnByText(2, destinationDoc).click();
                        fileUtils.freezeFile(frozenFile, 'XP1');
                        browser.sleep(1000);
                        moveExplorer.copyButton.click();
                        webdriverUtils.waitForGrowl();
                        errorMessage.growlNotificationText.then(function (message) {
                            expect(message).toContain('1 page was successfully copied to');
                            expect(message).toContain(destinationFile);
                        });
                    });
                });
            });
        });

        it('If file is frozen and user selects a document for copying to the same file, it should display appropriate error message', function () {
            var parentFolder = 'Reinsurance';
            var parentFolder2 = 'Billing Information';
            var doc = 'Bind Request';
            fileUtils.freezeFile(frozenFile, 'XP1');
            searchUtil.openFile(frozenFile,'Name');
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentFolder2, 'folder');
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText(doc);
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click().then(function () {
                docPageActionsDropdown.copyAction.click();
                browser.sleep(1000).then(function () {
                    moveExplorer.copyButton.click();
                    webdriverUtils.waitForGrowl();
                    errorMessage.growlNotificationText.then(function (message) {
                        expect(message).toContain(fileIsFrozenMessage);
                    });
                });
            });
        });

        it('If file is frozen and user selects a document for copying to the other file, copy should be successfuly performed', function () {
            var parentFolder = 'Reinsurance',
                parentFolder2 = 'Billing Information',
                doc = 'Bind Request',
                destinationFile = 'FileToCopy',
                destinationFolder = 'FileNote';

            return searchUtil.openFile(frozenFile,'Name')
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(parentFolder2, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(doc);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return moveExplorer.find_Input.sendKeys(destinationFile);
                })
                .then(moveExplorer.find_ResultItemByFileName(destinationFile).click)
                .then(moveExplorer.docTypeButton.click)
                .then(moveExplorer.getDocTypeDropdownElementByText('Note').click)
                .then(moveExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return fileUtils.freezeFile(frozenFile, 'XP1');
                })
                .then(function () {
                    return browser.sleep(1000);
                })
                .then(moveExplorer.copyButton.click)
                .then(webdriverUtils.waitForGrowl)
                .then(function () {
                    return errorMessage.growlNotificationText
                })
                .then(function (message) {
                    expect(message).toContain('1 document was successfully copied to');
                    expect(message).toContain(destinationFile);
                });
        });
    });
}