exports.tags = ['File_Manipulation', 'Copy'];
var IR_Filesview = require('../../pageObjects/FilesView.js'),
    userSettingsDropdown = require('./../../pageObjects/DropdownLists/UserSettingsDropdown.js'),
    NaviBar = require('../../PageObjects/Containers/NavigationBar.js'),
    IR_MoveExplorer = require('./../../pageObjects/ModalDialogs/MoveExplorer.js'),
    IR_LoginPage = require('../../pageObjects/LoginPage.js'),
    IR_FileTree = require('../../pageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    navigationBar = new NaviBar(),
    loginPage = new IR_LoginPage(),
    settingsDropdown = new userSettingsDropdown(),
    filesArea = new IR_Filesview(),
    copyExplorer = new IR_MoveExplorer(),

    file1 = 'FileSecurityTesting',
    file2 = 'FileForMoveTesting',
    userName = 'Imageright\\bk1',
    password = 'Password1';

if (browser.params.siteBase == 'iis') {
    describe('Copy - Permissions', function () {

        beforeAll(function () {
            return settingsDropdown.userSettingsDropdown.click()
                .then(settingsDropdown.signOut.click)
                .then(function () {
                    return browser.sleep(1000);
                })
                .then(function () {
                    return settingsDropdown.logBackAnchorLink.click();
                })
                .then(function () {
                    return loginPage.login(userName, password);
                })
                .then(function () {
                    return browser.executeScript('window.localStorage.clear();');
                });
        });

        beforeEach(function () {
            return browser.driver.get(browser.params.defaultUrl)
                .then(function () {
                    return navigationBar.vertaforeLogo.waitReady();
                });
        });

        afterEach(function () {
            return browser.executeScript('window.localStorage.clear();');
        });

        afterAll(function () {
            return browser.driver.get(browser.params.defaultUrl)
                .then(settingsDropdown.userSettingsDropdown.click)
                .then(settingsDropdown.signOut.click)
                .then(function () {
                    return browser.sleep(2000);
                })
                .then(function () {
                    return settingsDropdown.logBackAnchorLink.click();
                })
                .then(function () {
                    return loginPage.login(browser.params.defaultUserName, browser.params.defaultPassword);
                });
        });

        it('1 - When a user copies a page but has the denied "write" permission on a destination document type the Copy buttons should be disabled', function () {
            var folder = 'Reinsurance_SecurityFolder',
                document = 'ApplicationDocSecureTest',
                destinationDocument = 'GIF_Format_SecurityDocument';

            return searchUtil.openFile(file1)
                .then(function () {
                    return webdriverUtils.showNodeChildrenByText(document, 'document');
                })
                .then(fileTree.page(0).click)
                .then(filesArea.pageActionsButton.click)
                .then(docPageActionsDropdown.copyAction.click)
                .then(copyExplorer.getItemInColumnByText(1, folder).click)
                .then(copyExplorer.getItemInColumnByText(2, destinationDocument).click)
                .then(function () {
                    expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
                    expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');
                });
        });


        it('2 - When a user copies a page but has the denied "write" and "child write enabled" permission on a destination folder type the Copy buttons should be disabled', function () {
            var destinationFolder = 'File Note_SecurityFolder';
            var document = ' ApplicationDocSecureTest';
            var destinationDocument = 'ApplicationDocSecure1';

            searchUtil.openFile(file1);
            webdriverUtils.showNodeChildrenByText(document, 'document');
            browser.waitForAngular();
            fileTree.page(0).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.getItemInColumnByText(1, destinationFolder).click();
            copyExplorer.getItemInColumnByText(2, destinationDocument).click();

            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');
        });


        it('3 - When a user copies a document but has the denied "write" and "child write enabled" permission on a destination folder type the Copy buttons should be disabled', function () {
            var destinationFolder = 'File Note_SecurityFolder';
            var document = 'ApplicationDocSecureTest';

            searchUtil.openFile(file1);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.getItemInColumnByText(1, destinationFolder).click();

            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');
        });


        it('4 - When a user copies a document but has the denied "write" and "append" permission on a destination folder type the Copy button should be disabled', function () {
            var destinationFolder = 'Cancellation/Reinstatement_SecurityFolder';
            var document = 'ApplicationDocSecureTest';

            searchUtil.openFile(file1);
            webdriverUtils.selectNodeIconByText(document);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.getItemInColumnByText(1, destinationFolder).click();

            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');
        });

        // ////////////////////////////////

        it('5 - When a user copies a page to a new file but has the denied "write" permission on a destination document type the Copy button should be disabled', function () {
            var initialDocument = 'ApplicationDocument1';
            var destinationFolder = 'Reinsurance_SecurityFolder';
            var destinationDocument1 = 'ApplicationDocSecureTest';
            var destinationDocument2 = 'GIF_Format_SecurityDocument';

            searchUtil.openFile(file2);
            webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
            browser.waitForAngular();
            fileTree.page(0).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.find_Input.sendKeys(file1);
            browser.waitForAngular();
            copyExplorer.find_DropdownElement(0).click();

            copyExplorer.getItemInColumnByText(1, destinationFolder).click();
            copyExplorer.getItemInColumnByText(2, destinationDocument2).click();
            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');

            copyExplorer.getItemInColumnByText(1, destinationDocument1).click();
            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe(null);
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe(null);
        });


        it('6 - When a user copies a page to a new file but has the denied "write" and "child write enabled" permission on a destination folder type the Copy button should be disabled', function () {
            var initialDocument = 'ApplicationDocument1';
            var destinationFolder = 'File Note_SecurityFolder';
            var destinationDocument1 = 'ApplicationDocSecureTest';
            var destinationDocument2 = 'ApplicationDocSecure1';

            searchUtil.openFile(file2);
            webdriverUtils.showNodeChildrenByText(initialDocument, 'document');
            browser.waitForAngular();
            fileTree.page(0).click();
            browser.waitForAngular();
            filesArea.pageActionsButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.find_Input.sendKeys(file1);
            browser.waitForAngular();
            copyExplorer.find_DropdownElement(0).click();

            copyExplorer.getItemInColumnByText(1, destinationFolder).click();
            copyExplorer.getItemInColumnByText(2, destinationDocument2).click();
            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');

            copyExplorer.getItemInColumnByText(1, destinationDocument1).click();
            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe(null);
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe(null);
        });


        it('7 - When a user copies a document to a new file but has the denied "write" and "child write enabled" permission on a destination folder type the Copy button should be disabled', function () {
            var initialDocument = 'ApplicationDocument2';
            var destinationFolder = 'File Note_SecurityFolder';

            searchUtil.openFile(file2);
            webdriverUtils.selectNodeIconByText(initialDocument);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.find_Input.sendKeys(file1);
            browser.waitForAngular();
            copyExplorer.find_DropdownElement(0).click();
            browser.waitForAngular();
            copyExplorer.getItemInColumnByText(1, destinationFolder).click();
            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');
        });


        it('8 - When a user copies a document to a new file but has the denied "write" and "append" permission on a destination folder type the Copy button should be disabled', function () {
            var initialDocument = 'ApplicationDocument2';
            var destinationFolder = 'Cancellation/Reinstatement_SecurityFolder';

            searchUtil.openFile(file2);
            webdriverUtils.selectNodeIconByText(initialDocument);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.find_Input.sendKeys(file1);
            browser.waitForAngular();
            copyExplorer.find_DropdownElement(0).click();
            browser.waitForAngular();
            copyExplorer.getItemInColumnByText(1, destinationFolder).click();

            expect(copyExplorer.copyButton.getAttribute('disabled')).toBe('true');
            expect(copyExplorer.copyWithAnnotationsButton.getAttribute('disabled')).toBe('true');
        });

        it('9 - When a user copies a document to a new file but has the denied "Write Instance" and "Child Write Enable" permissions on a destination file type the file shouldn\'t be found', function () {
            var file = 'FileNotesTesting';
            var initialDocument = 'ApplicationDocument2';
            var noFilesMsg = 'No files found';

            searchUtil.openFile(file2);
            webdriverUtils.selectNodeIconByText(initialDocument);
            filesArea.actionsDropdownButton.click();
            docPageActionsDropdown.copyAction.click();
            browser.waitForAngular();
            copyExplorer.find_Input.sendKeys(file);
            browser.waitForAngular();
            expect(copyExplorer.find_DropdownElement(0).getText()).toEqual(noFilesMsg);
        });

    });
}