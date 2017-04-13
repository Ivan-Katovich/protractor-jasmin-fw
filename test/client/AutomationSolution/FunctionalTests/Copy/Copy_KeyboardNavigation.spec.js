exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_CopyExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    helper = require('../../utils/helper.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    filesArea = new IR_Filesview(),
    copyExplorer = new IR_CopyExplorer(),
    file = 'CopyFile',
    file1 = 'FileForCopyTesting',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.deleteDocumentInFolder(file1, 'Underwriting_Info_Folder', 'Audit_Document');
}

if (browser.params.siteBase == 'iis') {

    describe('Copy - Keyboard Navigation', function () {

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

        it('1-After selecting document in the file tree user should be able to navigate in copy explorer using keys UP/DOWN to the other folder within the same column', function (done) {
            var parentFolder = 'Download';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText('NativeType');
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click().then(function () {
                docPageActionsDropdown.copyAction.click();
                browser.waitForAngular();
                expect(copyExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                expect(copyExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                expect(copyExplorer.getItemInColumnByText(1, parentFolder).getAttribute('class')).toContain('focused');
                webdriverUtils.pressTabs(4);
                //navigate up 
                browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
                expect(copyExplorer.getItemInColumnByText(1, 'PrintNew').getAttribute('class')).toContain('focused');
                browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
                expect(copyExplorer.getItemInColumnByText(1, 'Print').getAttribute('class')).toContain('focused');
                browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
                expect(copyExplorer.getItemInColumnByText(1, 'Premium Finance').getAttribute('class')).toContain('focused');
                //select folder
                browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                expect(copyExplorer.getIconInColumnByText(1, 'Premium Finance').getAttribute('class')).toContain('folder-open');
                //navigate down
                browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
                expect(copyExplorer.getItemInColumnByText(1, 'Print').getAttribute('class')).toContain('focused');
                browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
                expect(copyExplorer.getItemInColumnByText(1, 'PrintNew').getAttribute('class')).toContain('focused');
                //select other folder
                browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                expect(copyExplorer.getIconInColumnByText(1, 'PrintNew').getAttribute('class')).toContain('folder-open');
                //verify copy buttons become enabled
                expect(copyExplorer.copyButton.isEnabled()).toBe(true);
                expect(copyExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                done();
            });
        });

        it('2-After selecting a page in the file tree user should be able to navigate in copy explorer using keys UP/DOWN to the other document within the same column', function (done) {
            var parentFolder = 'Download';
            var parentDoc = 'NativeType';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document').then(function () {
                browser.waitForAngular().then(function () {
                    fileTree.page(0).click().then(function () {
                        browser.waitForAngular();
                        filesArea.pageActionsButton.click();
                        docPageActionsDropdown.copyAction.click().then(function () {
                            expect(copyExplorer.getSelectedItemInColumn(2).getText()).toContain(parentDoc);
                            expect(copyExplorer.getItemInColumnByText(2, parentDoc).getAttribute('class')).toContain('focused');
                            //navigate down
                            webdriverUtils.pressTabs(2);
                            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
                            expect(copyExplorer.getItemInColumnByText(2, 'WithAnnotationType').getAttribute('class')).toContain('focused');
                            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
                            expect(copyExplorer.getItemInColumnByText(2, 'Native2').getAttribute('class')).toContain('focused');
                            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
                            expect(copyExplorer.getItemInColumnByText(2, 'WithoutType').getAttribute('class')).toContain('focused');
                            //select doc
                            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                            expect(copyExplorer.getSelectedItemInColumn(2).getText()).toContain('WithoutType');
                            //navigate up
                            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
                            expect(copyExplorer.getItemInColumnByText(2, 'Native2').getAttribute('class')).toContain('focused');
                            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
                            expect(copyExplorer.getItemInColumnByText(2, 'WithAnnotationType').getAttribute('class')).toContain('focused');
                            //select other doc
                            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                            expect(copyExplorer.getSelectedItemInColumn(2).getText()).toContain('WithAnnotationType');
                            //verify copy buttons become enabled
                            expect(copyExplorer.copyButton.isEnabled()).toBe(true);
                            expect(copyExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                            done();
                        });
                    });
                });
            });
        });

        it('3-After selecting a page in the file tree user should be able to navigate in copy explorer using keys LEFT/RIGHT between columns to select the other folder and other document for copying', function (done) {
            var parentFolder = 'Download';
            var parentDoc = 'NativeType';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular().then(function () {
                webdriverUtils.showNodeChildrenByText(parentDoc, 'document');
                browser.waitForAngular().then(function () {
                    fileTree.page(0).click();
                    browser.waitForAngular().then(function () {
                        filesArea.pageActionsButton.click();
                        docPageActionsDropdown.copyAction.click().then(function () {
                            //verify that parent folder selected and opened and that parent doc is selected
                            expect(copyExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                            expect(copyExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                            expect(copyExplorer.getSelectedItemInColumn(2).getText()).toContain(parentDoc);
                            //select other folder and document
                            webdriverUtils.pressTabs(2);
                            browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
                            expect(copyExplorer.getItemInColumnByText(1, 'Download').getAttribute('class')).toContain('focused');
                            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
                            expect(copyExplorer.getItemInColumnByText(1, 'PrintNew').getAttribute('class')).toContain('focused');
                            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                            expect(copyExplorer.getIconInColumnByText(1, 'PrintNew').getAttribute('class')).toContain('folder-open');
                            expect(copyExplorer.getItemInColumnByText(2, 'Agents1').getAttribute('class')).toContain('focused');
                            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                            expect(copyExplorer.getIconInColumnByText(2, 'Agents1').getAttribute('class')).toContain('folder-open');
                            expect(copyExplorer.getItemInColumnByText(3, 'Agents').getAttribute('class')).toContain('focused');
                            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
                            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                            expect(copyExplorer.getItemInColumnByText(3, 'Mail123').getAttribute('class')).toContain('focused');
                            //verify copy buttons become enabled
                            expect(copyExplorer.copyButton.isEnabled()).toBe(true);
                            expect(copyExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                            done();
                        });
                    });
                });
            });
        });

        it('4-User should be able to expand document type dropdown by clicking Space button and change document type using keyboard in copy explorer', function (done) {
            var initialFolder = 'Download';
            var document = 'NativeType';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(initialFolder, 'folder');
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            expect(copyExplorer.getItemsInColumn(1).count()).toBe(4);
            webdriverUtils.pressTabs(2);
            browser.actions().sendKeys(protractor.Key.SPACE).perform();
            browser.actions().sendKeys(protractor.Key.SPACE).perform();
            browser.waitForAngular();
            browser.actions().sendKeys('DOC_Fomat').perform();
            webdriverUtils.pressEnter();
            expect(copyExplorer.getItemsInColumn(1).count()).toBe(2);
            browser.waitForAngular();
            webdriverUtils.pressTab();
            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
            browser.waitForAngular();
            expect(copyExplorer.getItemInColumnByText(1, 'Print').getAttribute('class')).toContain('focused');
            expect(copyExplorer.getIconInColumnByText(1, 'Print').getAttribute('class')).toContain('folder-open');
            //verify copy buttons become enabled
            expect(copyExplorer.copyButton.isEnabled()).toBe(true);
            expect(copyExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
            done();
        });

        it('5-Pressing the down arrow key in search field will put focus on the first item in the search results and users can arrow up or down to move selection', function (done) {
            var document = 'AuditDoc';
            var searchKeyword = 'file';

            searchUtil.openFile(file);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(false);
            copyExplorer.find_Input.sendKeys(searchKeyword);
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(true);

            expect(copyExplorer.find_DropdownElement(0).getAttribute('class')).toContain('active');
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            expect(copyExplorer.find_DropdownElement(3).getAttribute('class')).toContain('active');
            browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
            expect(copyExplorer.find_DropdownElement(2).getAttribute('class')).toContain('active');
            done();
        });

        it('6-Hitting Return/Enter selects that file in search field, re-populate 1st column with new data, and close the search results box. Typed text remains in searchbox until user deletes.', function (done) {
            var document = 'AuditDoc';
            var searchKeyword = 'filefor';
            var initialFolder1 = 'Underwriting Info';
            var initialFolder2 = 'Premium Finance';
            var initialFolder3 = 'Print';
            var destinationFile = 'FileForMoveTesting';
            var destinationFolder1 = 'Underwriting Info Folder';
            var destinationFolder2 = 'Print Folder';

            searchUtil.openFile(file);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.withinFileText).toEqual('Within file ' + file + ' ' + file + ' or');
            expect(copyExplorer.itemInColumn(1, 0).getText()).toEqual(initialFolder1);
            expect(copyExplorer.itemInColumn(1, 1).getText()).toEqual(initialFolder2);
            expect(copyExplorer.itemInColumn(1, 2).getText()).toEqual(initialFolder3);

            copyExplorer.find_Input.sendKeys(searchKeyword);
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(true);
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

            expect(copyExplorer.find_DropdownElement(2).getAttribute('class')).toContain('active');
            webdriverUtils.pressEnter();
            expect(copyExplorer.find_Input.getAttribute('value')).toEqual(searchKeyword);
            expect(copyExplorer.withinFileText).toEqual('To file ' + destinationFile + ' ' + destinationFile + ' or');
            expect(copyExplorer.itemInColumn(1, 0).getText()).toEqual(destinationFolder1);
            expect(copyExplorer.itemInColumn(1, 1).getText()).toEqual(destinationFolder2);

            copyExplorer.find_ClearButton.click();
            expect(copyExplorer.find_Input.getAttribute('value')).toEqual('');
            done();
        });

        it('7-User should be able to navigate in Copy Explorer using Tab and Shift + Tab while copying a document', function () {
            var document = 'AuditDoc',
                filteredType = 'Bind Request';

            return searchUtil.openFile(file)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(function () {
                    return copyExplorer.find_Input.waitReady();
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.find_Input);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.docTypeButton);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.newFolderDropdown);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.columnsBox);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.cancelButton);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.copyButton);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.copyWithAnnotationsButton);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.find_Input);
                })

                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.copyWithAnnotationsButton);
                })
                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.copyButton);
                })
                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.cancelButton);
                })
                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.columnsBox);
                })
                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.newFolderDropdown);
                })
                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.docTypeButton);
                })
                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.find_Input);
                })
                .then(function () {
                    return webdriverUtils.shiftTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.copyWithAnnotationsButton);
                })

                .then(copyExplorer.docTypeButton.click)
                .then(copyExplorer.getDocTypeDropdownElementByText(filteredType).click)
                .then(copyExplorer.find_Input.click)
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.docTypeButton);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.newFolderDropdown);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.columnsBox);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.cancelButton);
                })
                .then(function () {
                    return webdriverUtils.pressTab();
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.find_Input);
                });
        });

        it('8-User should be able to navigate in Copy Explorer using Tab and Shift + Tab while copying a page', function (done) {
            var parentFolder = 'Download';
            var parentDoc = 'NativeType';

            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document');
            browser.waitForAngular();
            fileTree.page(0).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.find_Input);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.columnsBox);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.cancelButton);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.copyButton);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.copyWithAnnotationsButton);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.find_Input);

            webdriverUtils.shiftTab();
            webdriverUtils.isElementFocused(copyExplorer.copyWithAnnotationsButton);
            webdriverUtils.shiftTab();
            webdriverUtils.isElementFocused(copyExplorer.copyButton);
            webdriverUtils.shiftTab();
            webdriverUtils.isElementFocused(copyExplorer.cancelButton);
            webdriverUtils.shiftTab();
            webdriverUtils.isElementFocused(copyExplorer.columnsBox);
            webdriverUtils.shiftTab();
            webdriverUtils.isElementFocused(copyExplorer.find_Input);
            webdriverUtils.shiftTab();
            webdriverUtils.isElementFocused(copyExplorer.copyWithAnnotationsButton);

            copyExplorer.itemInColumn(0, 0).click();
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.cancelButton);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.find_Input);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.newFolderDropdown);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.newDocumentDropdown);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.columnsBox);
            webdriverUtils.pressTab();
            webdriverUtils.isElementFocused(copyExplorer.cancelButton);
            done();
        });

        it('9-When tabbing to the New Folder button, the user should be able to open the dropdown selection menu by clicking arrow down ' +
            'navigate in the list by arrow up/down and select folder type by clicking Enter', function () {

            var folder = 'Download',
                document = 'NativeType',
                page = 'No Description.jpg',
                folderType = 'New Mail';

            return searchUtil.openFile(file)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document, 'document');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(page);
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.itemInColumn(0, 0).click)
                .then(function () {
                    return webdriverUtils.shiftTabs(2);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return webdriverUtils.shiftTabs(1);
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.newFolderDropdown);
                })
                .then(function () {
                    return webdriverUtils.pressDowns(1);
                })
                .then(function () {
                    return browser.waitForAngular();
                })
                .then(function () {
                    return webdriverUtils.pressDowns(4);
                })
                .then(function () {
                    return webdriverUtils.isElementFocused(copyExplorer.newFolderTypeLinkByText(folderType));
                })
                .then(function () {
                    return webdriverUtils.pressEnter();
                })
                .then(function () {
                    return copyExplorer.newlyCreatedFolderColumn();
                })
                .then(function (num) {
                    return expect(num).toEqual(2);
                })
                .then(function () {
                    return expect(copyExplorer.newlyCreatedFolder.getAttribute('title')).toEqual(folderType);
                });
        });

        it('10-When tabbing to the New Document button, the user should be able to open the dropdown selection menu by clicking arrow down' +
            ' navigate in the list by arrow up/down and select document type by clicking Enter', function (done) {

                var folder = 'Download';
                var document = 'NativeType';
                var page = 'No Description.jpg';
                var docType = 'Audit';

                searchUtil.openFile(file);
                webdriverUtils.showNodeChildrenByText(folder, 'folder');
                webdriverUtils.showNodeChildrenByText(document, 'document');
                webdriverUtils.selectNodeIconByText(page);
                filesArea.pageActionsButton.click();
                docPageActionsDropdown.copyAction.click();
                browser.waitForAngular();

                copyExplorer.itemInColumn(0, 0).click();

                webdriverUtils.shiftTabs(2);
                webdriverUtils.isElementFocused(copyExplorer.newDocumentDropdown);
                webdriverUtils.pressDowns(1);
                browser.waitForAngular();
                webdriverUtils.pressDowns(2);
                browser.waitForAngular();
                webdriverUtils.isElementFocused(copyExplorer.newDocumentTypeLinkByText(docType));
                webdriverUtils.pressEnter();
                copyExplorer.newlyCreatedDocumentColumn()
                    .then(function (num) {
                        expect(num).toEqual(2);
                    })
                    .then(function () {
                        return expect(copyExplorer.newlyCreatedDocument.getAttribute('title')).toEqual(docType);
                    })
                    .then(function () {
                        done();
                    });
            });

        it('11-User should be able to click Escape for closing any dropdown if it is opened or to exit the modal', function () {

            var folder = 'Download',
                document = 'NativeType',
                page = 'No Description.jpg';

            return searchUtil.openFile(file)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(folder, 'folder');
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document, 'document');
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(page);
                })
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.find_Input.clear)
                .then(function () {
                    return copyExplorer.find_Input.sendKeys('filefor');
                })
                .then(function () {
                    return expect(copyExplorer.find_DropdownElement(0).isDisplayed());
                })
                .then(function () {
                    return webdriverUtils.pressEscape();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(1);
                })
                .then(copyExplorer.itemInColumn(0, 0).click)
                .then(copyExplorer.newFolderDropdown.click)
                .then(function () {
                    return expect(copyExplorer.newFolderDropdownElement(0).isDisplayed());
                })
                .then(function () {
                    return webdriverUtils.pressEscape();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(1);
                })
                .then(copyExplorer.newDocumentDropdown.click)
                .then(function () {
                    return expect(copyExplorer.newDocumentDropdownElement(0).isDisplayed());
                })
                .then(function () {
                    return webdriverUtils.pressEscape();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(1);
                })
                .then(function () {
                    return webdriverUtils.pressEscape();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(0);
                })
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.docTypeButton.click)
                .then(function () {
                    return expect(copyExplorer.docTypeDropdownList.isDisplayed());
                })
                .then(function () {
                    return webdriverUtils.pressEscape();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(1);
                })
                .then(copyExplorer.itemInColumn(0, 0).click)
                .then(function () {
                    return webdriverUtils.pressEscape();
                })
                .then(function () {
                    return expect(element.all(by.className('modal-body')).count()).toEqual(0);
                });
        });

        it('12-User should be able to cancel copying by clicking Enter button when focus is on Cancel button', function (done) {
            var destinationFolder = 'Underwriting_Info_Folder';
            var document = 'Audit_Document';

            searchUtil.openFile(file1);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular().then(function () {
                copyExplorer.getItemInColumnByText(1, destinationFolder).click();
                webdriverUtils.pressTab();
                webdriverUtils.pressEnter();

                browser.waitForAngular().then(function () {
                    var elements = element.all(by.className('modal-body'));
                    expect(elements.count()).toEqual(0);
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
                    webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
                    done();
                });
            });
        });

        it('13-User should be able to perform copying by clicking Enter button when focus is on Copy button', function () {
            var destinationFolder = 'Underwriting_Info_Folder',
                document = 'Audit_Document';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return browser.waitForAngular()
                })
                .then(function () {
                    return webdriverUtils.pressTabs(2);
                })
                .then(function () {
                    return browser.waitForAngular()
                })
                .then(function () {
                    return webdriverUtils.pressEnter();
                })
                .then(webdriverUtils.waitForGrowl)
                .then(webdriverUtils.waitForGrowlDisappears)
                .then(function () {
                    expect(element.all(by.className('modal-body')).count()).toEqual(0);
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                })
        });

        it('14-User should be able to perform copying with annotations by clicking Enter button when focus is on Copy With Annotations button', function () {
            var destinationFolder = 'Underwriting_Info_Folder',
                document = 'Audit_Document';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.selectNodeIconByText(document);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, destinationFolder).click)
                .then(function () {
                    return webdriverUtils.pressTabs(3);
                })
                .then(function () {
                    return webdriverUtils.pressEnter();
                })
                .then(function () {
                    expect(element.all(by.className('modal-body')).count()).toEqual(0);
                    expect(fileTree.fileTreeNodesByText(document).count()).toBe(1);
                })
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(destinationFolder, 'folder');
                })
                .then(function () {
                    return expect(fileTree.fileTreeNodesByText(document).count()).toBe(2);
                });
        });
    });
}