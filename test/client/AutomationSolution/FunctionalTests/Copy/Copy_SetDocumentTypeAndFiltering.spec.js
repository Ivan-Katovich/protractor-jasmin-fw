exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_MultiSelectView = require('./../../pageObjects/Containers/MultiSelectView.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_FileTree = require('./../../pageObjects/Containers/FileTree.js'),
    IR_ErrorMessage = require('./../../pageObjects/ModalDialogs/ErrorMessage.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    multiSelectView = new IR_MultiSelectView(),
    filesArea = new IR_Filesview(),
    errorMessage = new IR_ErrorMessage(),
    moveExplorer = new IR_MoveExplorer(),
    file = 'FileForAutoTesting',
    file1 = 'FileForCopyTesting',
    file2 = 'CopyFile',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Miscellaneous_Document')
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Application_Document1');
        })
        .then(function () {
            return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Application_Document2');
        })
        .then(function () {
            return fileUtils.changeDocumentLocation(file1, 'File_Note_Folder', 'Note_Document', 'Note');
        })
        .then(function () {
            return fileUtils.changeDocumentLocation(file1, 'New_Mail_Folder', 'Miscellaneous_Document', 'Miscellaneous');
        })
        .then(function () {
            return fileUtils.changeDocumentLocation(file1, null, 'Audit_Document', 'Audit');
        })
        .then(function () {
            return fileUtils.changePageLocation(file1, 'Audit_Document', 'refresh_.txt', 2);
        })
        .then(function () {
            return fileUtils.changePageLocation(file1, 'Audit_Document', '1_.jpg', 1);
        })
        .then(function () {
            return fileUtils.changeDocumentLocation(file1, null, 'Application_Document1', 'Application');
        })
        .then(function () {
            return fileUtils.changePageLocation(file1, 'Application_Document1', '29592312_.jpg', 1);
        })
        .then(function () {
            return fileUtils.changeDocumentLocation(file1, null, 'Application_Document2', 'Application');
        })
        .then(function () {
            return fileUtils.changePageLocation(file1, 'Application_Document2', '1c9c98c7429d_.jpg', 1);
        })
        .then(function () {
            return fileUtils.changeDocumentLocation(file1, 'Agents_Folder_3', 'Mail_Document', 'Mail');
        })
        .then(function () {
            return fileUtils.changeDocumentLocation(file1, null, 'Renewal_Policy_Document', 'Renewal Policy');
        });
}


if (browser.params.siteBase == 'iis') {

    describe('Copy Explorer - Set Document Type and Filtering', function () {

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

        // //////////////  SET DOCUMENT TYPE DROPDOWN  //////////////////

        it('1-Set Document Type dropdown should be present in the Copy explorer with selectable value and it is possible to do search by keyword', function () {
            var type = 'Audit',
                keyword = 'ori',
                searchedType = 'Original Policy',

                textInDropdown;

            return searchUtil.openFile(file)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText("Document_AuditType");
                })
                .then(function () {
                    return expect(filesArea.documentType).toEqual(type);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    expect(moveExplorer.docTypeDropdown.isDisplayed()).toBe(true);
                    expect(moveExplorer.docTypeDropdown.getText()).toEqual(type);
                })
                .then(moveExplorer.docTypeButton.click)
                .then(function () {
                    return expect(moveExplorer.docTypeDropdownElements.count()).toBeGreaterThan(1);
                })
                .then(function () {
                    return moveExplorer.docTypeDropdownElement(2).getText();
                })
                .then(function (text) {
                    textInDropdown = text;
                    return moveExplorer.docTypeDropdownElement(2).click();
                })
                .then(function () {
                    return moveExplorer.docTypeDropdown.getText();
                })
                .then(function (textInInput) {
                    return expect(textInDropdown).toEqual(textInInput);
                })
                .then(moveExplorer.docTypeButton.click)
                .then(function () {
                    return moveExplorer.docTypeInput.sendKeys(keyword);
                })
                .then(function () {
                    return expect(moveExplorer.docTypeDropdownElements.count()).toBe(1);
                })
                .then(moveExplorer.docTypeDropdownElement(0).getText)
                .then(function (type) {
                    return expect(type).toEqual(searchedType);
                })
                .then(moveExplorer.docTypeDropdownElement(0).click)
                .then(function () {
                    return expect(moveExplorer.docTypeDropdown.getText()).toEqual(searchedType);
                });
        });

        it('2-Set Document Type dropdown should display the type of single document which is selected for copying', function () {
            var type1 = 'Audit';
            var docOfType1 = 'Document_AuditType';

            var type2 = 'Application';
            var docOfType2 = 'Application';

            searchUtil.openFile(file);
            webdriverUtils.selectNodeIconByText(docOfType1);
            browser.waitForAngular();
            expect(filesArea.documentType).toEqual(type1);

            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.docTypeDropdown.getText()).toEqual(type1);

            moveExplorer.cancelButton.click();
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText(docOfType2);
            browser.waitForAngular();
            expect(filesArea.documentType).toEqual(type2);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.docTypeDropdown.getText()).toEqual(type2);
        });

        it('3-Set Document Type dropdown should display the type of several documents of the same type which is selected for copying', function () {
            var type = 'Note';
            var folder = 'File Note';
            var document1 = 'Document_NoteType';
            var document2 = 'DocumentAutoTesting';

            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(folder, 'folder');
            browser.waitForAngular();

            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            expect(multiSelectView.multiSelectTitle).toContain('2 items selected');
            expect(multiSelectView.envelopes.count()).toEqual(2);
            multiSelectView.multiSelectActionsButton.click();
            browser.waitForAngular();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(moveExplorer.docTypeDropdown.getText()).toEqual(type);
        });

        it('4-Set Document Type dropdown shouldn\'t be displayed if pages are selected for copying', function () {
            var folder = 'File Note';
            var document = 'DocumentAutoTesting';
            var page1 = 'processesConsoleDebugvsInstallDesktop.jpg';
            var page2 = 'TIFpages(2).tif';

            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(folder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(document, 'document');
            browser.waitForAngular();

            webdriverUtils.ctrlClick(fileTree.pageByText(page1));
            webdriverUtils.ctrlClick(fileTree.pageByText(page2));
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.docTypeDropdown.isDisplayed()).toBeFalsy();
        });

        it('5-Set Document Type dropdown should display a dash when selected for copying documents have different types and it should be possible to change it to other type and back', function () {
            var docOfType1 = 'Document_AuditType';
            var docOfType2 = 'Application';
            var keyword = 'ori';
            var searchedType = 'Original Policy';

            searchUtil.openFile(file);
            webdriverUtils.ctrlClick(fileTree.documentByText(docOfType1));
            webdriverUtils.ctrlClick(fileTree.documentByText(docOfType2));
            webdriverUtils.waitTillElementVisible(multiSelectView.multiSelectViewContainer);
            expect(multiSelectView.multiSelectTitle).toContain('2 items selected');
            expect(multiSelectView.envelopes.count()).toEqual(2);

            multiSelectView.multiSelectActionsButton.click();
            browser.waitForAngular();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.docTypeDropdown.getText()).toEqual('---');
            //change doc type
            webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
            moveExplorer.docTypeInput.sendKeys(keyword);

            expect(moveExplorer.docTypeDropdownElement(0).getText()).toEqual(searchedType);
            webdriverUtils.clickOnElement(moveExplorer.docTypeDropdownElement(0));
            expect(moveExplorer.docTypeDropdown.getText()).toEqual(searchedType);
            expect(moveExplorer.copyButton.getText()).toEqual('Copy');
            expect(moveExplorer.copyWithAnnotationsButton.getText()).toEqual('Copy with Annotations');
            //change doc type back
            webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
            moveExplorer.docTypeInput.clear();
            moveExplorer.docTypeInput.sendKeys('---');
            webdriverUtils.clickOnElement(moveExplorer.docTypeDropdownElement(0));
            expect(moveExplorer.copyButton.getText()).toEqual('Copy');
            expect(moveExplorer.copyWithAnnotationsButton.getText()).toEqual('Copy with Annotations');
        });

        it('6-If user selects documents of heterogeneous types Copy Explorer should display by default only folders which support all selected heterogeneous types', function () {
            var document1 = 'AuditDoc',
                document2 = 'Renewal Policy',
                folder1 = 'Underwriting Info',
                folder2 = 'PolicyFolder',
                commonFolder = 'Download';
            //select doc of type 1 and veryfy available folders for copying
            searchUtil.openFile(file2);
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText(document1);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.getItemsInColumn(1).count()).toBe(5);
            expect(moveExplorer.itemInColumn(1, 0).getText()).toEqual(folder1);
            expect(moveExplorer.itemInColumn(1, 4).getText()).toEqual(commonFolder);
            moveExplorer.cancelButton.click();
            browser.waitForAngular();
            //select doc of type 2 and veryfy available folders for copying
            webdriverUtils.selectNodeIconByText(document2);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.getItemsInColumn(1).count()).toBe(5);
            expect(moveExplorer.itemInColumn(1, 0).getText()).toEqual(folder2);
            expect(moveExplorer.itemInColumn(1, 4).getText()).toEqual(commonFolder);
            moveExplorer.cancelButton.click();
            //select both docs and veryfy available folders for copying
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            browser.sleep(1500);
            multiSelectView.multiSelectActionsButton.click();
            browser.waitForAngular();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.getItemsInColumn(1).count()).toBe(4);
            expect(moveExplorer.itemInColumn(1, 3).getText()).toEqual(commonFolder);
        });

        // //////////////  FILTERING  //////////////////

        it('7-When document type is selected in the "Set Document type" DDL the "Copy Explorer" contains only folders for which the selected document type ' +
            'is available in File template.', function () {
                var filteredFolder1 = 'Underwriting_Info_Folder';
                var filteredFolder2 = 'Print_Folder';
                var filteredFolder3 = 'Policy_Info_Folder';
                var document = 'Audit_Document';
                var initialType = 'Audit';
                var filteredType = 'Endorsement DEC';

                searchUtil.openFile(file1);
                webdriverUtils.selectNodeIconByText(document);
                filesArea.actionsDropdownButton.click();
                docPageActionsDropdown.copyAction.click();
                browser.waitForAngular();

                expect(moveExplorer.docTypeDropdown.getText()).toEqual(initialType);
                expect(moveExplorer.getItemsInColumn(1).count()).toEqual(2);
                expect(moveExplorer.itemInColumn(1, 0).getText()).toEqual(filteredFolder1);
                expect(moveExplorer.itemInColumn(1, 1).getText()).toEqual(filteredFolder2);
                expect(moveExplorer.copyButton.getText()).toEqual('Copy');
                expect(moveExplorer.copyWithAnnotationsButton.getText()).toEqual('Copy with Annotations');

                webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
                webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(filteredType));
                expect(moveExplorer.getItemsInColumn(1).count()).toEqual(1);
                expect(moveExplorer.itemInColumn(1, 0).getText()).toEqual(filteredFolder3);

                webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
                webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(initialType));
                expect(moveExplorer.getItemsInColumn(1).count()).toEqual(2);
                expect(moveExplorer.itemInColumn(1, 0).getText()).toEqual(filteredFolder1);
                expect(moveExplorer.itemInColumn(1, 1).getText()).toEqual(filteredFolder2);
                expect(moveExplorer.copyButton.getText()).toEqual('Copy');
                expect(moveExplorer.copyWithAnnotationsButton.getText()).toEqual('Copy with Annotations');
            });

        it('8-When subfolder contains the selected document type but Parent folder doesn\'t the "Copy" buttons should be disabled if Parent folder selected' +
            ' and enabled if subfolder is selected', function () {
                var filteredFolder = 'File_Note_Folder';
                var filteredParentFolder = 'Print_Folder';
                var filteredSubFolder1 = 'Agents_Folder_1';
                var filteredSubFolder2 = 'Agents_Folder_2';
                var filteredSubFolder3 = 'Agents_Folder_3';
                var document = 'Audit_Document';
                var filteredType = 'Note';

                searchUtil.openFile(file1);
                webdriverUtils.selectNodeIconByText(document);
                filesArea.actionsDropdownButton.click();
                docPageActionsDropdown.copyAction.click();
                browser.waitForAngular();

                expect(moveExplorer.getItemsInColumn(1).count()).toEqual(2);
                webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
                webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(filteredType));

                expect(moveExplorer.getItemsInColumn(1).count()).toEqual(2);
                expect(moveExplorer.itemInColumn(1, 0).getText()).toEqual(filteredFolder);
                expect(moveExplorer.itemInColumn(1, 1).getText()).toEqual(filteredParentFolder);

                moveExplorer.getItemInColumnByText(1, filteredParentFolder).click();
                expect(moveExplorer.copyButton.getAttribute('disabled')).toBe('true');
                expect(moveExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');

                moveExplorer.getItemInColumnByText(2, filteredSubFolder1).click();
                expect(moveExplorer.copyButton.getAttribute('disabled')).toBe('true');
                expect(moveExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');

                moveExplorer.getItemInColumnByText(3, filteredSubFolder2).click();
                expect(moveExplorer.copyButton.getAttribute('disabled')).toBe('true');
                expect(moveExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');

                moveExplorer.getItemInColumnByText(4, filteredSubFolder3).click();
                expect(moveExplorer.copyButton.getAttribute('disabled')).toBe(null);
                expect(moveExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe(null);
            });

        it('9-When user selects document type in the Copy Explorer but there are no folders which correspond to this type ' +
            'then file level should be displayed without errors and user should be able to create a new folder according to template', function () {
                var document = 'Audit_Document';
                var type = 'Cancellation for noncompliance';

                searchUtil.openFile(file1);
                webdriverUtils.selectNodeIconByText(document);
                filesArea.actionsDropdownButton.click();
                docPageActionsDropdown.copyAction.click();
                browser.waitForAngular();
                expect(moveExplorer.informationMessage.isDisplayed()).toBe(false);

                webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
                webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(type));

                expect(moveExplorer.getItemsInColumn(0).count()).toEqual(1);
                expect(moveExplorer.getItemsInColumn(1).count()).toEqual(0);
                expect(moveExplorer.newFolderDropdown.isEnabled()).toBe(true);
                expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
            });

        it('10-When user copies single document but selects another type in the document type filter the document type should be changed', function () {
            var initialFolder = 'New_Mail_Folder',
                document = 'Miscellaneous_Document',
                initialType = 'Miscellaneous',
                destinationFolder = 'Underwriting_Info_Folder',
                filteredType = 'Audit';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(function () {
                    return expect(filesArea.documentType).toEqual(initialType);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return expect(moveExplorer.docTypeDropdown.getText()).toEqual(initialType);
                })
                .then(moveExplorer.docTypeButton.click)
                .then(moveExplorer.getDocTypeDropdownElementByText(filteredType).click)
                .then(moveExplorer.getItemInColumnByText(1, destinationFolder).click)
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
                .then(function () {
                    return errorMessage.growlNotificationButton.click();
                })
                .then(function () {
                    expect(fileTree.expandedFolders.count()).toEqual(2);
                    expect(fileTree.expandedFolders.get(1).getText()).toEqual(destinationFolder);
                    expect(fileTree.document(0).getText()).toContain(document);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(function () {
                    return expect(filesArea.documentType).toEqual(filteredType);
                });
        });

        it('11-When user copies several documents the same type but selects another type in the document type filter the document type should be changed', function () {
            var document1 = 'Application_Document1';
            var document2 = 'Application_Document2';
            var destinationFolder = 'Underwriting_Info_Folder';
            var initialType = 'Application';
            var filteredType = 'Miscellaneous';

            searchUtil.openFile(file1);
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            webdriverUtils.ctrlClick(fileTree.documentByText(document2));
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(moveExplorer.docTypeDropdown.getText()).toEqual(initialType);

            webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
            webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(filteredType));
            moveExplorer.getItemInColumnByText(1, destinationFolder).click();

            moveExplorer.copyButton.click();
            webdriverUtils.waitForGrowl();
            errorMessage.growlNotificationText.then(function (message) {
                expect(message).toContain('2 documents were successfully copied to');
                expect(message).toContain(file1);
                errorMessage.growlNotificationButton.click();
                browser.waitForAngular();
                expect(fileTree.expandedFolders.count()).toEqual(1);
                expect(fileTree.expandedFolders.get(0).getText()).toEqual(destinationFolder);
                webdriverUtils.ctrlClick(fileTree.documentByText(document1));
                webdriverUtils.ctrlClick(fileTree.documentByText(document2));
                expect(filesArea.documentType).toEqual(filteredType);
                expect(fileTree.fileTreeNodesByText(document1).count()).toBe(2);
                expect(fileTree.fileTreeNodesByText(document2).count()).toBe(2);
            });
        });

        it('12-When user copies document and selects another type in the document type filter but clicks Cancel button in the Copy explorer the initial document type should be left', function () {
            var initialFolder = 'New_Mail_Folder';
            var document = 'Miscellaneous_Document';
            var initialType = 'Miscellaneous';
            var destinationFolder = 'Underwriting_Info_Folder';
            var filteredType = 'Audit';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
            webdriverUtils.selectNodeIconByText(document);
            expect(filesArea.documentType).toEqual(initialType);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(moveExplorer.docTypeDropdown.getText()).toEqual(initialType);

            webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
            webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(filteredType));
            moveExplorer.getItemInColumnByText(1, destinationFolder).click();

            moveExplorer.cancelButton.click();
            browser.waitForAngular();

            expect(fileTree.expandedFolders.count()).toEqual(1);
            expect(fileTree.expandedFolders.get(0).getText()).toEqual(initialFolder);
            expect(fileTree.document(0).getText()).toContain(document);

            expect(filesArea.documentType).toEqual(initialType);
        });

        it('13-When user selects a path for document copying in the Copy explorer then changes type in the document type filter and returns ' +
            'the initial type back the path previously selected should persist', function () {
                var filteredParentFolder = 'Print_Folder';
                var filteredSubFolder1 = 'Agents_Folder_1';
                var filteredSubFolder2 = 'Agents_Folder_2';
                var filteredSubFolder3 = 'Agents_Folder_3';
                var document = 'Audit_Document';
                var initialType = 'Audit';
                var filteredType = 'Bind Request';

                searchUtil.openFile(file1);
                webdriverUtils.selectNodeIconByText(document);
                filesArea.actionsDropdownButton.click();
                docPageActionsDropdown.copyAction.click();
                browser.waitForAngular();
                expect(moveExplorer.docTypeDropdown.getText()).toEqual(initialType);

                moveExplorer.getItemInColumnByText(1, filteredParentFolder).click();
                moveExplorer.getItemInColumnByText(2, filteredSubFolder1).click();
                moveExplorer.getItemInColumnByText(3, filteredSubFolder2).click();

                webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
                webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(filteredType));

                expect(moveExplorer.getItemsInColumn(1).count()).toEqual(1);
                expect(moveExplorer.getItemsInColumn(2).count()).toEqual(0);
                expect(moveExplorer.getItemsInColumn(3).count()).toEqual(0);
                expect(moveExplorer.getItemsInColumn(4).count()).toEqual(0);

                webdriverUtils.clickOnElement(moveExplorer.docTypeButton);
                webdriverUtils.clickOnElement(moveExplorer.getDocTypeDropdownElementByText(initialType));
                browser.waitForAngular();

                expect(moveExplorer.getSelectedItemInColumn(1).getText()).toEqual(filteredParentFolder);
                expect(moveExplorer.getIconInColumnByText(1, filteredParentFolder).getAttribute('class')).toContain('folder-open');

                expect(moveExplorer.getSelectedItemInColumn(2).getText()).toEqual(filteredSubFolder1);
                expect(moveExplorer.getIconInColumnByText(2, filteredSubFolder1).getAttribute('class')).toContain('folder-open');

                expect(moveExplorer.getSelectedItemInColumn(3).getText()).toEqual(filteredSubFolder2);
                expect(moveExplorer.getIconInColumnByText(3, filteredSubFolder2).getAttribute('class')).toContain('folder-open');

                expect(moveExplorer.getIconInColumnByText(4, filteredSubFolder3).getAttribute('class')).not.toContain('folder-open');
                expect(moveExplorer.getItemInColumnByText(4, filteredSubFolder3).getAttribute('class')).toContain('focused');
            });

    });
}