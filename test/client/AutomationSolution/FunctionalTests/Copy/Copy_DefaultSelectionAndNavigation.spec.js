exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),
    
    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    filesArea = new IR_Filesview(),
    moveExplorer = new IR_MoveExplorer(),
    file = 'CopyFile',

    isFirst = true;


if (browser.params.siteBase == 'iis') {

    describe('Copy - Default Selection and Navigation', function () {

        beforeEach(function () {
            if(isFirst){
                isFirst = false;
                return browser.executeScript('window.localStorage.clear();')
                    .then(function () {
                        return browser.driver.get(browser.params.defaultUrl);
                    });
            }else{
                return browser.driver.get(browser.params.defaultUrl);
            }
        });

        afterEach(function () {
            return browser.executeScript('window.localStorage.clear();');
        });

        it('1-After selecting document in the file tree and clicking Copy button, Copy explorer should appear with opened parent folder ' +
                'selected by default in appropriate column of explorer', function () {
                    var parentFolder = 'Download';
                    searchUtil.openFile(file).then(function () {
                        webdriverUtils.showNodeChildrenByText(parentFolder, 'folder').then(function () {
                            browser.waitForAngular().then(function () {
                                webdriverUtils.selectNodeIconByText('Native2').then(function () {
                                    browser.waitForAngular().then(function () {
                                        filesArea.actionsDropdownButton.click().then(function () {
                                            docPageActionsDropdown.copyAction.click();
                                            expect(moveExplorer.title('Copy 1 document').isDisplayed()).toBe(true);
                                            //verify parent folder is selected and 'opened'
                                            expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                                            expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                                            expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                                            //veryfy copy buttons are enabled
                                            expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                                            expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

        it('2-After selecting document on the file level in the file tree and clicking Copy button, Copy explorer should appear with nothing opened and selected, ' +
                'just displaying folders from the file level in the first column', function () {
                    searchUtil.openFile(file);
                    webdriverUtils.selectNodeIconByText('AuditDoc').then(function () {
                        browser.waitForAngular();
                        filesArea.actionsDropdownButton.click().then(function () {
                            docPageActionsDropdown.copyAction.click();
                            expect(moveExplorer.title('Copy 1 document').isDisplayed()).toBe(true);
                            expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                            expect(moveExplorer.getSelectedItemsInColumn(1).count()).toBe(0);
                            expect(moveExplorer.getItemsInColumn(1).count()).toBeGreaterThan(0);
                            //veryfy copy buttons are disabled
                            expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                            expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                        });
                    });
                });

        it('3-After selecting several documents from different folders and clicking Copy button, Copy explorer should appear with common parent selected (if exists) or with nothing opened and selected, ' +
                'just displaying folders from the file level in the first column', function () {
                    var folder1 = 'Premium Finance';
                    var folder2 = 'Download';
                    var document1 = 'Description';
                    var document2 = 'WithoutType';
                    searchUtil.openFile(file);
                    webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                    webdriverUtils.showNodeChildrenByText(folder2, 'folder');
                    browser.waitForAngular();
                    webdriverUtils.ctrlClick(fileTree.documentByText(document1));
                    webdriverUtils.ctrlClick(fileTree.documentByText(document2));
                    browser.waitForAngular();
                    filesArea.actionsDropdownButton.click().then(function () {
                        docPageActionsDropdown.copyAction.click();
                        expect(moveExplorer.title('Copy 2 documents').isDisplayed()).toBe(true);
                        expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                        expect(moveExplorer.getSelectedItemsInColumn(1).count()).toBe(0);
                        expect(moveExplorer.getItemsInColumn(1).count()).toBeGreaterThan(0);
                        expect(moveExplorer.docTypeDropdown.isDisplayed()).toBeTruthy();
                        //veryfy copy buttons are disabled
                        expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                        expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
                        //verify that source of one of document is available for copy
                        moveExplorer.getItemInColumnByText(1, folder1).click();
                        expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                        expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                    });
                });

        it('4-After selecting one page in the file tree and clicking Copy, copy explorer should appear with parent folder opened and selected and parent document ' +
                'selected by default in appropriate columns of explorer', function () {
                    var parentFolder = 'Premium Finance';
                    var parentDoc = 'Description';
                    searchUtil.openFile(file);
                    webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
                    browser.waitForAngular();
                    webdriverUtils.showNodeChildrenByText(parentDoc, 'document');
                    browser.waitForAngular();
                    webdriverUtils.clickOnNodeInFileTree('Facebook', 'page');
                    filesArea.pageActionsButton.click();
                    docPageActionsDropdown.copyAction.click().then(function () {
                        expect(moveExplorer.title('Copy 1 page').isDisplayed()).toBe(true);
                        expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                        expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                        expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                        expect(moveExplorer.getSelectedItemInColumn(2).getText()).toContain(parentDoc);
                        //veryfy copy buttons are enabled
                        expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                        expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                    });
                });

        it('5-After selecting several pages from different documents in the file tree and clicking Copy, copy explorer should appear with parent opened and selected by default in appropriate column of explorer', function () {
            var parentFolder = 'Premium Finance';
            var parentDoc1 = 'Description';
            var parentDoc2 = 'Miscellaneous';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc1, 'document');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc2, 'document');
            browser.waitForAngular();
            webdriverUtils.ctrlClick(fileTree.pageByText('Facebook'));
            webdriverUtils.ctrlClick(fileTree.pageByText('Empty'));
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click().then(function () {
                expect(moveExplorer.title('Copy 2 pages').isDisplayed()).toBe(true);
                expect(moveExplorer.docTypeDropdown.isDisplayed()).toBeFalsy();
                expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                expect(moveExplorer.getSelectedItemsInColumn(2).count()).toBe(0);
                //veryfy copy buttons are disabled
                expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
                //verify that source of the pages are available for copy
                moveExplorer.getItemInColumnByText(2, parentDoc2).click();
                expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                moveExplorer.getItemInColumnByText(2, parentDoc1).click();
                expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
            });
        });


        it('6-After selecting several documents on the deep level of the file tree and clicking Copy button, copy explorer should appear with full path till parent folder ' +
            'opened and selected by default in appropriate columns of explorer', function () {
                var parentFolder1 = 'PrintNew';
                var parentFolder2 = 'Agents1';
                var parentFolder3 = 'Agents';
                var parentFolder4 = 'Agents';
                var folder5 = 'AgentsInside';
                searchUtil.openFile(file);

                webdriverUtils.showNodeChildrenByText(parentFolder1, 'folder');
                browser.waitForAngular();
                fileTree.expandCollapseFolderNode(parentFolder2, 0).click();
                browser.waitForAngular();
                fileTree.expandCollapseFolderNode(parentFolder3, 1).click();
                browser.waitForAngular();
                fileTree.expandCollapseFolderNode(parentFolder4, 2).click();
                browser.waitForAngular();
                fileTree.documentByTextAndIndex('Doc', 0).click();
                webdriverUtils.ctrlClick(fileTree.documentByText("WithoutType"));
                browser.waitForAngular();

                //webdriverUtils.shiftDown();
                filesArea.actionsDropdownButton.click().then(function () {
                    docPageActionsDropdown.copyAction.click();
                    browser.waitForAngular();
                    expect(moveExplorer.title('Copy 2 documents').isDisplayed()).toBe(true);
                    //verify parent folders areselected and 'opened'
                    expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                    expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder1);
                    expect(moveExplorer.getIconInColumnByText(1, parentFolder1).getAttribute('class')).toContain('folder-open');
                    expect(moveExplorer.getSelectedItemInColumn(2).getText()).toContain(parentFolder2);
                    expect(moveExplorer.getIconInColumnByText(2, parentFolder2).getAttribute('class')).toContain('folder-open');
                    expect(moveExplorer.getSelectedItemInColumn(3).getText()).toContain(parentFolder3);
                    expect(moveExplorer.getIconInColumnByText(3, parentFolder3).getAttribute('class')).toContain('folder-open');
                    expect(moveExplorer.getSelectedItemInColumn(4).getText()).toContain(parentFolder4);
                    expect(moveExplorer.getIconInColumnByText(4, parentFolder4).getAttribute('class')).toContain('folder-open');
                    //not parent folder should not be selected and opened
                    expect(moveExplorer.getSelectedItemsInColumn(5).count()).toBe(0);
                    expect(moveExplorer.getIconInColumnByText(5, folder5).getAttribute('class')).not.toContain('folder-open');
                    //veryfy copy buttons are enabled
                    expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                    expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                });
            });

        it('7-After selecting several pages in the file tree and clicking Copy, copy explorer should appear with parent folder opened and selected and parent document ' +
                'selected by default in appropriate columns of explorer', function () {
                    var parentFolder = 'Premium Finance';
                    var parentDoc = 'Description';
                    searchUtil.openFile(file);
                    webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
                    browser.waitForAngular();
                    webdriverUtils.showNodeChildrenByText(parentDoc, 'document');
                    browser.waitForAngular();
                    webdriverUtils.selectNodeIconByText('2:').then(function () {
                        webdriverUtils.ctrlClick(fileTree.pageByText('3:'));
                        browser.waitForAngular();
                        filesArea.pageActionsButton.click();
                        docPageActionsDropdown.copyAction.click().then(function () {
                            expect(moveExplorer.title('Copy 2 pages').isDisplayed()).toBe(true);
                            expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                            expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                            expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                            expect(moveExplorer.getSelectedItemInColumn(2).getText()).toContain(parentDoc);
                            //veryfy copy buttons are enabled
                            expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                            expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                        });
                    });
                });

        it('8-After selecting documents and pages in the file tree and clicking Copy, copy explorer should appear with parent opened and selected (if exists) by default in appropriate column of explorer', function () {
            var parentFolder1 = 'PrintNew';
            var parentSubFolder1 = 'Agents1';
            var parentFolder2 = 'Premium Finance';
            var document1 = 'Mail123';
            var parentDoc2 = 'Description';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder1, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentSubFolder1, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentFolder2, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc2, 'document');
            browser.waitForAngular();
            webdriverUtils.ctrlClick(fileTree.pageByText('Facebook-logo-thumbs-up.png'));
            webdriverUtils.ctrlClick(fileTree.documentByText(document1));
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click().then(function () {
                expect(moveExplorer.title('Copy 1 document and 1 page').isDisplayed()).toBe(true);
                expect(moveExplorer.docTypeDropdown.isDisplayed()).toBeFalsy();
                expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                expect(moveExplorer.getSelectedItemsInColumn(1).count()).toBe(0);
                expect(moveExplorer.getItemsInColumn(1).count()).toBeGreaterThan(0);
                //veryfy copy buttons are disabled
                expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
                //verify that source are available for copy
                moveExplorer.getItemInColumnByText(1, parentFolder1).click();
                moveExplorer.getItemInColumnByText(2, parentSubFolder1).click();
                moveExplorer.getItemInColumnByText(3, document1).click();
                expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
            });
        });

        it('9-After selecting document in the file tree user should be able to navigate to the other folder within the same file and other documents and pages should not be displayed in Copy Explorer', function () {
            var parentFolder = 'Download';
            var newFolder = 'PrintNew';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText('NativeType').then(function () {
                browser.waitForAngular();
                filesArea.actionsDropdownButton.click().then(function () {
                    docPageActionsDropdown.copyAction.click();
                    //verify parent folder selected and opened and documents are not displayed
                    expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                    expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                    expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                    //click new folder and verify that it becomes selected and opened and previous folder is closed
                    moveExplorer.getItemInColumnByText(1, newFolder).click();
                    expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(newFolder);
                    expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).not.toContain('folder-open');
                    expect(moveExplorer.getIconInColumnByText(1, newFolder).getAttribute('class')).toContain('folder-open');
                    //verify copy buttons become enabled
                    expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                    expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                });
            });
        });

        it('10-After selecting a page in the file tree user should be able to navigate to the other document for copying within the same folder and pages should not be displayed in the copy explorer', function () {
            var parentFolder = 'Download';
            var parentDoc = 'NativeType';
            var newDoc = 'Native2';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document');
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText('No Description');
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click().then(function () {
                expect(moveExplorer.getSelectedItemInColumn(2).getText()).toContain(parentDoc);
                //click new doc withing the same folder and verify if it becomes selected
                moveExplorer.getItemInColumnByText(2, newDoc).click();
                expect(moveExplorer.getSelectedItemInColumn(2).getText()).toContain(newDoc);
                //verify copy buttons become enabled
                expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
            });
        });

        it('11-After selecting a page in the file tree user should be able to navigate to the other folder and other document for copying the same file and pages should not be displayed in the copy explorer', function () {
            var parentFolder = 'Download';
            var parentDoc = 'NativeType';
            var newFolder = 'Premium Finance';
            var newDoc = 'Description';
            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.pageByText('No Description')).then(function () {
                    webdriverUtils.clickOnNodeInFileTree('No Description', 'page').then(function () {
                        browser.waitForAngular();
                        filesArea.pageActionsButton.click();
                        docPageActionsDropdown.copyAction.click().then(function () {
                            //verify that parent folder selected and opened and that parent doc is selected
                            expect(moveExplorer.getSelectedItemInColumn(0).getText()).toContain(file);
                            expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(parentFolder);
                            expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).toContain('folder-open');
                            expect(moveExplorer.getSelectedItemInColumn(2).getText()).toContain(parentDoc);
                            moveExplorer.getItemsInColumn(2).count().then(function (docCount) {
                                //select new folder and verify that count it becomes selected and opened and child docs collection changed
                                moveExplorer.getItemInColumnByText(1, newFolder).click().then(function () {
                                    moveExplorer.getItemsInColumn(2).count().then(function (newDocCount) {
                                        expect(newDocCount).not.toEqual(docCount);
                                        expect(moveExplorer.getSelectedItemInColumn(1).getText()).toContain(newFolder);
                                        expect(moveExplorer.getIconInColumnByText(1, parentFolder).getAttribute('class')).not.toContain('folder-open');
                                        expect(moveExplorer.getIconInColumnByText(1, newFolder).getAttribute('class')).toContain('folder-open');
                                        //select new doc and verify that it becomes selected
                                        moveExplorer.getItemInColumnByText(2, newDoc).click();
                                        expect(moveExplorer.getSelectedItemInColumn(2).getText()).toContain(newDoc);
                                        //verify copy buttons become enabled
                                        expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                                        expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('12-After selecting a page user should NOT be able to copy it directly to folders (only to documents in folders)', function () {
            var parentFolder = 'Download';
            var parentDoc = 'NativeType';
            var newFolder = 'PrintNew';
            var newFolder2 = 'Agents1';
            var newFolder3 = 'Agents';

            searchUtil.openFile(file);
            webdriverUtils.showNodeChildrenByText(parentFolder, 'folder');
            browser.waitForAngular();
            webdriverUtils.showNodeChildrenByText(parentDoc, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.pageByText('No Description')).then(function () {
                    webdriverUtils.clickOnNodeInFileTree('No Description', 'page').then(function () {
                        browser.waitForAngular();
                        filesArea.pageActionsButton.click();
                        docPageActionsDropdown.copyAction.click().then(function () {
                            moveExplorer.getItemInColumnByText(0, file).click().then(function () {
                                expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                                expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
                                moveExplorer.getItemInColumnByText(1, newFolder).click().then(function () {
                                    expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                                    expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
                                    moveExplorer.getItemInColumnByText(2, newFolder2).click().then(function () {
                                        expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                                        expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
                                        moveExplorer.getItemInColumnByText(3, newFolder3).click().then(function () {
                                            expect(moveExplorer.copyButton.isEnabled()).toBe(false);
                                            expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(false);
                                            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
                                            browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                                            //verify copy buttons become enabled
                                            expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                                            expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('13-User should be able to navigate into folders inserted to other folders and back by clicking parent nodes in Move Explorer', function () {
            searchUtil.openFile(file);
            //select do on file level
            webdriverUtils.selectNodeIconByText('AuditDoc').then(function () {
                browser.waitForAngular();
                filesArea.actionsDropdownButton.click().then(function () {
                    docPageActionsDropdown.copyAction.click();
                    expect(moveExplorer.getSelectedItemsInColumn(0).count()).toBe(1);
                    //verify PrintNew folder is closed
                    expect(moveExplorer.getIconInColumnByText(1, 'PrintNew').getAttribute('class')).not.toContain('folder-open');
                    //navigate to deep inserted folders and verify that they becomes opened and loading new levels
                    moveExplorer.getItemInColumnByText(1, 'PrintNew').click().then(function () {
                        expect(moveExplorer.getIconInColumnByText(1, 'PrintNew').getAttribute('class')).toContain('folder-open');
                        expect(moveExplorer.getItemsInColumn(2).count()).toBe(1);
                        expect(moveExplorer.getIconInColumnByText(2, 'Agents1').getAttribute('class')).not.toContain('folder-open');
                        moveExplorer.getItemInColumnByText(2, 'Agents1').click().then(function () {
                            expect(moveExplorer.getIconInColumnByText(2, 'Agents1').getAttribute('class')).toContain('folder-open');
                            expect(moveExplorer.getItemsInColumn(3).count()).toBe(1);
                            expect(moveExplorer.getIconInColumnByText(3, 'Agents').getAttribute('class')).not.toContain('folder-open');
                            moveExplorer.getItemInColumnByText(3, 'Agents').click().then(function () {
                                expect(moveExplorer.getIconInColumnByText(3, 'Agents').getAttribute('class')).toContain('folder-open');
                                expect(moveExplorer.getItemsInColumn(4).count()).toBe(1);
                                expect(moveExplorer.getIconInColumnByText(4, 'Agents').getAttribute('class')).not.toContain('folder-open');
                                moveExplorer.getItemInColumnByText(4, 'Agents').click().then(function () {
                                    expect(moveExplorer.getIconInColumnByText(4, 'Agents').getAttribute('class')).toContain('folder-open');
                                    expect(moveExplorer.getItemsInColumn(5).count()).toBe(1);
                                    //navigate back by clicking one of the parent folders
                                    moveExplorer.getItemInColumnByText(2, 'Agents1').click().then(function () {
                                        expect(moveExplorer.getIconInColumnByText(2, 'Agents1').getAttribute('class')).toContain('folder-open');
                                        expect(moveExplorer.getItemsInColumn(3).count()).toBe(1);
                                        expect(moveExplorer.getIconInColumnByText(3, 'Agents').getAttribute('class')).not.toContain('folder-open');
                                        //navigate to deep inserted folders again                        
                                        moveExplorer.getItemInColumnByText(3, 'Agents').click().then(function () {
                                            expect(moveExplorer.getItemsInColumn(4).count()).toBe(1);
                                            moveExplorer.getItemInColumnByText(4, 'Agents').click().then(function () {
                                                expect(moveExplorer.getItemsInColumn(5).count()).toBe(1);
                                                moveExplorer.getItemInColumnByText(5, 'AgentsInside').click().then(function () {
                                                    expect(moveExplorer.getItemsInColumn(6).count()).toBe(1);
                                                    //navigate back by clicking other folder on the file level 
                                                    moveExplorer.getItemInColumnByText(1, 'Download').click().then(function () {
                                                        expect(moveExplorer.getIconInColumnByText(1, 'Download').getAttribute('class')).toContain('folder-open');
                                                        expect(moveExplorer.getIconInColumnByText(1, 'PrintNew').getAttribute('class')).not.toContain('folder-open');
                                                        //navigate back by clicking on the file level 
                                                        moveExplorer.getItemInColumnByText(0, file).click().then(function () {
                                                            expect(moveExplorer.copyButton.isEnabled()).toBe(true);
                                                            expect(moveExplorer.copyWithAnnotationsButton.isEnabled()).toBe(true);
                                                            expect(moveExplorer.getItemsInColumn(0).count()).toBe(1);
                                                            expect(moveExplorer.getItemsInColumn(1).count()).toBe(5);
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