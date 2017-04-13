exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    IR_copyExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),
    q = require('q'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),

    fileTree = new IR_FileTree(),
    filesArea = new IR_Filesview(),
    copyExplorer = new IR_copyExplorer(),
    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),

    fileName = 'FileForMoveTesting',
    fileNumber = 'FileForMoveTesting',
    fileWithRelatedFiles = 'FileForAutoTesting',
    NoFilesMsg = 'No files found',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.unfreezeFile('FrozenFile');
}


describe('Copy - Find', function () {

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

        it('Searchbox should be displayd and the search requires at least 3 characters to begin search', function (done) {
            var document = 'AuditDocument';

            searchUtil.openFile(fileName);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.find_Input.isDisplayed()).toBe(true);
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(false);

            copyExplorer.find_Input.sendKeys('%');
            browser.waitForAngular();
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(false);
            copyExplorer.find_Input.clear();

            copyExplorer.find_Input.sendKeys('fi');
            browser.waitForAngular();
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(false);

            copyExplorer.find_Input.sendKeys('%');
            browser.waitForAngular();
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(true);
            expect(copyExplorer.find_DropdownElements.count()).toBeGreaterThan(5);

            copyExplorer.find_DropdownElements.count().then(function (count) {
                expect(count).toBeGreaterThan(5);
                for (var i = 0; i < count; i++) {
                    copyExplorer.find_ResultFileNumber(i).getText().then(function (resultFileName) {
                        expect(resultFileName.substring(0, 2).toLowerCase()).toEqual('fi');
                    });
                }
                copyExplorer.find_Input.clear();
                copyExplorer.find_Input.sendKeys('f%%');
                browser.waitForAngular();
                for (var i = 0; i < 10; i++) {
                    copyExplorer.find_ResultFileNumber(i).getText().then(function (resultFileName) {
                        expect(resultFileName.substring(0, 1).toUpperCase()).toEqual('F');
                    });
                }
                done();
            });
        });

        it('Should return "No files found" in result dropdown when search keyword matches no files', function (done) {
            var searchKeyword = 'InvalidSearchKeyword%#@!';
            var document = 'ApplicationDocument1';

            searchUtil.openFile(fileName);
            webdriverUtils.showNodeChildrenByText(document, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.page(0)).then(function () {
                    fileTree.page(0).click();
                    browser.waitForAngular();
                    filesArea.pageActionsButton.click();
                    docPageActionsDropdown.copyAction.click();
                    browser.waitForAngular();

                    copyExplorer.find_Input.sendKeys('filefor');
                    browser.waitForAngular();
                    expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(true);
                    expect(copyExplorer.find_DropdownElements.count()).toBeGreaterThan(1);

                    copyExplorer.find_Input.clear();
                    copyExplorer.find_Input.sendKeys(searchKeyword);
                    expect(copyExplorer.find_DropdownElements.count()).toEqual(1);
                    expect(copyExplorer.find_DropdownElement(0).getText()).toEqual(NoFilesMsg);
                    done();
                });
            });
        });

        it('Should not return frozen files in the result dropdown', function (done) {
            var searchKeyword = 'FrozenFile';
            var document = 'ApplicationDocument1';

            fileUtils.freezeFile('FrozenFile', 'XP1');
            searchUtil.openFile(fileName);
            webdriverUtils.showNodeChildrenByText(document, 'document');
            fileTree.page(0).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            copyExplorer.find_Input.sendKeys(searchKeyword);
            expect(copyExplorer.find_DropdownElements.count()).toEqual(1);
            expect(copyExplorer.find_DropdownElement(0).getText()).toEqual(NoFilesMsg);
            done();
        });

        it('The "clear text" button should display when one or more chars are in text field, and the button should clear the searchbox', function (done) {
            var document = 'ApplicationDocument1';

            searchUtil.openFile(fileName);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.find_Input.isDisplayed()).toBe(true);
            expect(copyExplorer.find_ClearButton.isDisplayed()).toBe(false);

            copyExplorer.find_Input.sendKeys('n');
            browser.waitForAngular();
            expect(copyExplorer.find_Input.getAttribute('value')).toEqual('n');
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBeFalsy();
            expect(copyExplorer.find_ClearButton.isDisplayed()).toBe(true);

            copyExplorer.find_ClearButton.click();
            expect(copyExplorer.find_Input.getAttribute('value')).toEqual('');
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBeFalsy();
            expect(copyExplorer.find_ClearButton.isDisplayed()).toBe(false);
            done();
        });

        it('Should find files by File Number when appropriate value of File Number is entered as a search keyword', function (done) {
            var searchKeyword_fileNumber = 'tt%';
            var document = 'AuditDocument';

            searchUtil.openFile(fileName);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            copyExplorer.find_Input.sendKeys(searchKeyword_fileNumber);
            browser.waitForAngular();
            expect(copyExplorer.find_Input.getAttribute('value')).toEqual(searchKeyword_fileNumber);
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBeTruthy();

            copyExplorer.find_DropdownElements.count().then(function (count) {
                expect(count).toBeGreaterThan(0);
                for (var i = 0; i < count; i++) {
                    copyExplorer.find_ResultFileNumber(i).getText().then(function (resultFileName) {
                        expect(resultFileName.substring(0, 2).toLowerCase()).toEqual('tt');
                    });
                }
                done();
            });
        });

        it('Should find files by File Name when appropriate value of File Name is entered as a search keyword', function (done) {
            var searchKeyword_fileNumber = 'filefor';
            var document = 'ApplicationDocument1';

            searchUtil.openFile(fileName);
            webdriverUtils.showNodeChildrenByText(document, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.page(0)).then(function () {
                    fileTree.page(0).click().then(function () {
                        browser.waitForAngular();
                        filesArea.pageActionsButton.click();
                        docPageActionsDropdown.copyAction.click();
                        browser.waitForAngular();

                        copyExplorer.find_Input.sendKeys(searchKeyword_fileNumber);
                        browser.waitForAngular();
                        expect(copyExplorer.find_Input.getAttribute('value')).toEqual(searchKeyword_fileNumber);
                        expect(copyExplorer.find_Dropdown.isDisplayed()).toBeTruthy();

                        copyExplorer.find_DropdownElements.count().then(function (count) {
                            expect(count).toBeGreaterThan(1);
                            for (var i = 0; i < count; i++) {
                                copyExplorer.find_ResultFileName(i).getText().then(function (resultFileName) {
                                    expect(resultFileName.substring(0, 7).toLowerCase()).toEqual(searchKeyword_fileNumber);
                                });
                            }
                            done();
                        });
                    });
                });
            });
        });

        it('Related files should be indicated by a special icon in the serch result dropdown', function (done) {
            var document = 'Document_AuditType';
            var searchKeyword = 'related';

            searchUtil.openFile(fileWithRelatedFiles);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            copyExplorer.find_Input.sendKeys(searchKeyword);
            browser.waitForAngular();

            copyExplorer.find_DropdownElements.count().then(function (count) {
                expect(count).toBeGreaterThan(1);
                for (var i = 0; i < count; i++) {
                    expect(copyExplorer.relatedFileIcon(i).isDisplayed()).toBe(true);
                    copyExplorer.find_ResultFileName(i).getText().then(function (resultFileName) {
                        expect(resultFileName.substring(0, 11).toLowerCase()).toEqual('relatedfile');
                    });
                }
                done();
            });
        });

        it('While searching, Copy button and Set type dropdown are grayed out until an appropriate selection is made', function () {
            var folder = 'File Note Folder';
            var document = 'NoteDocument';
            var searchKeyword = 'filefor';
            var destinationFolder = 'File Note';

            searchUtil.openFile(fileName);

            webdriverUtils.showNodeChildrenByText(folder, 'folder');
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.moveButton.getAttribute('disabled')).toBe(null);
            expect(copyExplorer.docTypeDropdown.getAttribute('disabled')).toBe(null);

            copyExplorer.find_Input.sendKeys(searchKeyword);
            browser.waitForAngular();
            expect(copyExplorer.find_Dropdown.isDisplayed()).toBe(true);
            expect(copyExplorer.moveButton.getAttribute('disabled')).toBe('true');

            copyExplorer.find_ResultItemByFileName(fileWithRelatedFiles).click();
            browser.waitForAngular();
            expect(copyExplorer.moveButton.getAttribute('disabled')).toBe('true');

            copyExplorer.getItemInColumnByText(1, destinationFolder).click();
            expect(copyExplorer.moveButton.getAttribute('disabled')).toBe(null);

            copyExplorer.find_ClearButton.click();
            copyExplorer.find_Input.sendKeys('%%%');
            expect(copyExplorer.docTypeDropdown.getAttribute('disabled')).toBe('true');

        });

        it('While searching, the heading should change from "Within file fileNumber fileName" to "To file fileNumber fileName"', function () {
            var folder = 'File Note Folder';
            var document = 'NoteDocument';
            var searchKeyword = 'filefor';

            searchUtil.openFile(fileName);

            webdriverUtils.showNodeChildrenByText(folder, 'folder');
            browser.waitForAngular();
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.withinFileText).toEqual('Within file ' + fileName + ' ' + fileNumber + ' or');

            copyExplorer.find_Input.sendKeys(searchKeyword);
            browser.waitForAngular();
            copyExplorer.find_ResultItemByFileName(fileWithRelatedFiles).click();
            browser.waitForAngular();
            expect(copyExplorer.withinFileText).toEqual('To file ' + fileWithRelatedFiles + ' ' + fileWithRelatedFiles + ' or');

            copyExplorer.find_ClearButton.click();
            copyExplorer.find_Input.sendKeys(searchKeyword);
            browser.waitForAngular();
            copyExplorer.find_ResultItemByFileName(fileName).click();
            browser.waitForAngular();
            expect(copyExplorer.withinFileText).toEqual('Within file ' + fileName + ' ' + fileNumber + ' or');

            copyExplorer.find_ClearButton.click();
            expect(copyExplorer.find_Input.getAttribute('value')).toEqual('');
            expect(copyExplorer.withinFileText).toEqual('Within file ' + fileName + ' ' + fileNumber + ' or');
        });

        it('Selecting a new file in the search result box should re-populate Copy explorer with the new file structure', function (done) {
            var searchKeyword = 'filefor';

            var initialFolder1 = 'File Note Folder';
            var initialFolder2 = 'New Mail Folder';
            var initialFolder3 = 'Policy Info Folder';
            var initialFolder4 = 'Underwriting Info Folder';
            var initialFolder5 = 'Print Folder';
            var initialFolder6 = 'Agents Folder 1';
            var initialFolder7 = 'Agents Folder 2';

            var initialDoc1 = 'ApplicationDocument2';
            var initialDoc2 = 'ApplicationDocument1';
            var initialDoc3 = 'AuditDocument';
            var initialDoc4 = 'RenewalPolicyDocument';
            var initialDoc5 = 'NoteDocument';   // 2 col
            var initialDoc6 = 'MiscellaneousDocument';  // 2 col

            var destinationFolder1 = 'File Note';
            var destinationFolder2 = 'Cancellation/Reinstatement';
            var destinationFolder3 = 'UnderwritingInfoFolder';
            var destinationFolder4 = 'PrintFolder';
            var destinationDoc1 = 'Application';
            var destinationDoc2 = 'Document_AuditType';
            var destinationDoc3 = 'ReinistatementRequestDocument'; // 2 col
            var destinationDoc4 = 'DocumentAutoTesting';
            var destinationDoc5 = 'Document_NoteType';

            searchUtil.openFile(fileName);
            webdriverUtils.showNodeChildrenByText(initialDoc2, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.page(0)).then(function () {
                    fileTree.page(0).click().then(function () {
                        browser.waitForAngular();
                        filesArea.pageActionsButton.click();
                        docPageActionsDropdown.copyAction.click();
                        browser.waitForAngular();

                        expect(copyExplorer.itemInColumn(1, 0).getText()).toEqual(initialFolder1);
                        expect(copyExplorer.itemInColumn(1, 1).getText()).toEqual(initialFolder2);
                        expect(copyExplorer.itemInColumn(1, 2).getText()).toEqual(initialFolder3);
                        expect(copyExplorer.itemInColumn(1, 3).getText()).toEqual(initialFolder4);
                        expect(copyExplorer.itemInColumn(1, 4).getText()).toEqual(initialFolder5);
                        expect(copyExplorer.itemInColumn(1, 5).getText()).toContain(initialDoc1);
                        expect(copyExplorer.itemInColumn(1, 6).getText()).toContain(initialDoc2);
                        expect(copyExplorer.itemInColumn(1, 7).getText()).toContain(initialDoc3);
                        expect(copyExplorer.itemInColumn(1, 8).getText()).toContain(initialDoc4);

                        copyExplorer.find_Input.sendKeys(searchKeyword);
                        browser.waitForAngular();
                        copyExplorer.find_ResultItemByFileName(fileWithRelatedFiles).click();

                        expect(copyExplorer.itemInColumn(1, 0).getText()).toEqual(destinationFolder1);
                        expect(copyExplorer.itemInColumn(1, 1).getText()).toEqual(destinationFolder2);
                        expect(copyExplorer.itemInColumn(1, 2).getText()).toContain(destinationFolder3);
                        expect(copyExplorer.itemInColumn(1, 3).getText()).toContain(destinationFolder4);
                        expect(copyExplorer.itemInColumn(1, 4).getText()).toContain(destinationDoc1);
                        expect(copyExplorer.itemInColumn(1, 5).getText()).toContain(destinationDoc2);

                        copyExplorer.getItemInColumnByText(1, destinationFolder1).click();
                        expect(copyExplorer.itemInColumn(2, 0).getText()).toContain(destinationDoc4);
                        expect(copyExplorer.itemInColumn(2, 1).getText()).toContain(destinationDoc5);
                        copyExplorer.getItemInColumnByText(1, destinationFolder2).click();
                        expect(copyExplorer.itemInColumn(2, 0).getText()).toContain(destinationDoc3);

                        copyExplorer.find_ClearButton.click();
                        copyExplorer.find_Input.sendKeys(searchKeyword);
                        browser.waitForAngular();
                        copyExplorer.find_ResultItemByFileName(fileName).click();
                        browser.waitForAngular();

                        expect(copyExplorer.itemInColumn(1, 0).getText()).toEqual(initialFolder1);
                        expect(copyExplorer.itemInColumn(1, 1).getText()).toEqual(initialFolder2);
                        expect(copyExplorer.itemInColumn(1, 2).getText()).toEqual(initialFolder3);
                        expect(copyExplorer.itemInColumn(1, 3).getText()).toEqual(initialFolder4);
                        expect(copyExplorer.itemInColumn(1, 4).getText()).toEqual(initialFolder5);
                        expect(copyExplorer.itemInColumn(1, 5).getText()).toContain(initialDoc1);
                        expect(copyExplorer.itemInColumn(1, 6).getText()).toContain(initialDoc2);
                        expect(copyExplorer.itemInColumn(1, 7).getText()).toContain(initialDoc3);
                        expect(copyExplorer.itemInColumn(1, 8).getText()).toContain(initialDoc4);

                        copyExplorer.getItemInColumnByText(1, initialFolder5).click();
                        expect(copyExplorer.itemInColumn(2, 0).getText()).toEqual(initialFolder6);
                        copyExplorer.getItemInColumnByText(2, initialFolder6).click();
                        expect(copyExplorer.itemInColumn(3, 0).getText()).toEqual(initialFolder7);

                        copyExplorer.getItemInColumnByText(1, initialFolder1).click();
                        expect(copyExplorer.itemInColumn(2, 0).getText()).toContain(initialDoc5);

                        copyExplorer.getItemInColumnByText(1, initialFolder2).click();
                        expect(copyExplorer.itemInColumn(2, 0).getText()).toContain(initialDoc6);
                        done();
                    });
                });
            });
        });

        it('Selecting a new file in the search result box should re-populate Document type dropdown with available types for this file', function (done) {
            var document = 'AuditDocument',
                initialType = 'Audit',
                searchKeyword1 = 'FileSecurity',
                searchKeyword2 = 'filefor',
                destinationFile1 = 'FileSecurityTesting',
                destinationFile2 = 'FileForMoveTesting',
                destinationType1 = 'Application',
                destinationType2 = 'Bind Request',
                destinationType3 = 'Cancellation for nonpayment',
                destinationType4 = 'GIF_Format',
                destinationFolder1 = 'File Note_SecurityFolder',
                destinationFolder2 = 'Cancellation/Reinstatement_SecurityFolder',
                destinationFolder3 = 'Reinsurance_SecurityFolder';

            searchUtil.openFile(fileName);

            webdriverUtils.selectNodeIconByText(document);
            browser.waitForAngular();
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();

            expect(copyExplorer.docTypeDropdown.getText()).toEqual(initialType);

            copyExplorer.find_Input.sendKeys(searchKeyword1);
            browser.waitForAngular();
            copyExplorer.find_ResultItemByFileName(destinationFile1).click();
            browser.waitForAngular();
            expect(copyExplorer.withinFileText).toEqual('To file ' + destinationFile1 + ' ' + destinationFile1 + ' or');

            webdriverUtils.clickOnElement(copyExplorer.docTypeButton);
            expect(copyExplorer.docTypeDropdownElements.count()).toEqual(4);
            expect(copyExplorer.docTypeDropdownElement(0).getText()).toEqual(destinationType1);
            expect(copyExplorer.docTypeDropdownElement(1).getText()).toEqual(destinationType2);
            expect(copyExplorer.docTypeDropdownElement(2).getText()).toEqual(destinationType3);
            expect(copyExplorer.docTypeDropdownElement(3).getText()).toEqual(destinationType4);

            webdriverUtils.clickOnElement(copyExplorer.docTypeDropdownElement(0));
            expect(copyExplorer.docTypeDropdown.getText()).toEqual(destinationType1);
            expect(copyExplorer.getItemsInColumn(1).count()).toEqual(3);
            expect(copyExplorer.itemInColumn(1, 0).getText()).toEqual(destinationFolder1);
            expect(copyExplorer.itemInColumn(1, 1).getText()).toEqual(destinationFolder2);
            expect(copyExplorer.itemInColumn(1, 2).getText()).toEqual(destinationFolder3);

            webdriverUtils.clickOnElement(copyExplorer.docTypeButton);
            webdriverUtils.clickOnElement(copyExplorer.docTypeDropdownElement(2));
            expect(copyExplorer.getItemsInColumn(1).count()).toEqual(1);
            expect(copyExplorer.itemInColumn(1, 0).getText()).toEqual(destinationFolder3);

            copyExplorer.find_ClearButton.click();
            copyExplorer.find_Input.sendKeys(searchKeyword2);
            browser.waitForAngular();
            copyExplorer.find_ResultItemByFileName(destinationFile2).click();
            browser.waitForAngular();
            expect(copyExplorer.docTypeDropdown.getText()).toEqual(destinationType3);
            done();
        });

    }
});